package com.example.backend.controller;

import com.example.backend.DTO.LoginResponse;
import com.example.backend.model.LoginRequest;
import com.example.backend.model.Therapist;
import com.example.backend.model.Users;
import com.example.backend.repository.TherapistRepository;
import com.example.backend.repository.UsersRepository;
import com.example.backend.service.SendEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.util.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TherapistRepository therapistRepository;

    @Autowired
    private SendEmailService sendEmailService;

    // Register a new user
    @PostMapping("/signUp/user")
    public ResponseEntity<?> registerAsUser(@RequestBody Users user) {
        // Check if the email already exists
        if (usersRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("User with this email already exists.");
        }

        // Validate input
        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            return ResponseEntity.badRequest().body("Password cannot be null or empty.");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword())); // Hash the password
        user.setRoles(Collections.singletonList("USER")); // Standardized role prefix
        user.setProfilePicture("http://res.cloudinary.com/dwcqn9ilb/image/upload/v1733560697/wczploctk3ioxtndygve.png"); // Default value (could be a base64 image or URL in a real app)
        usersRepository.save(user);

        return ResponseEntity.status(HttpStatus.CREATED).body("User registered successfully.");
    }

    @PostMapping("/signUp/therapist")
    public ResponseEntity<?> registerAsTherapist(@RequestBody Therapist therapist) {
        // Check if the email already exists
        if (therapistRepository.findByEmail(therapist.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Therapist with this email already exists.");
        }

        // Validate input
        if (therapist.getPassword() == null || therapist.getPassword().isEmpty()) {
            return ResponseEntity.badRequest().body("Password cannot be null or empty.");
        }

        therapist.setPassword(passwordEncoder.encode(therapist.getPassword())); // Hash the password
        therapist.setRoles(Collections.singletonList("THERAPIST")); // Standardized role prefix
        therapist.setProfilePicture("http://res.cloudinary.com/dwcqn9ilb/image/upload/v1733560697/wczploctk3ioxtndygve.png"); // Default value
        therapistRepository.save(therapist);

        return ResponseEntity.status(HttpStatus.CREATED).body("Therapist registered successfully.");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        if (loginRequest.getEmail() == null || loginRequest.getPassword() == null) {
            return ResponseEntity.badRequest().body("Email and password must not be null.");
        }

        Optional<Users> userOpt = usersRepository.findByEmail(loginRequest.getEmail());
        if (userOpt.isPresent()) {
            Users user = userOpt.get();
            if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                // Returning user roles and name in a Map
                Map<String, Object> response = new HashMap<>();
                response.put("roles", user.getRoles());
                response.put("name", user.getName());
                return ResponseEntity.ok(response);  // Respond with roles and name
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials for user.");
            }
        }

        Optional<Therapist> therapistOpt = therapistRepository.findByEmail(loginRequest.getEmail());
        if (therapistOpt.isPresent()) {
            Therapist therapist = therapistOpt.get();
            if (passwordEncoder.matches(loginRequest.getPassword(), therapist.getPassword())) {
                // Returning therapist roles and name in a Map
                Map<String, Object> response = new HashMap<>();
                response.put("roles", therapist.getRoles());
                response.put("name", therapist.getName());
                return ResponseEntity.ok(response);  // Respond with roles and name
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials for therapist.");
            }
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or therapist not found.");
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");

        // Check in Users repository
        Optional<Users> userOpt = usersRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            Users user = userOpt.get();
            String token = UUID.randomUUID().toString();
            user.setResetToken(token);
            user.setResetTokenExpiry(new Date(System.currentTimeMillis() + 3600000)); // 1 hour expiry
            usersRepository.save(user);

            sendPasswordResetEmail(email, token, "User");
            return ResponseEntity.ok("Password reset email sent successfully to user.");
        }

        // Check in Therapist repository
        Optional<Therapist> therapistOpt = therapistRepository.findByEmail(email);
        if (therapistOpt.isPresent()) {
            Therapist therapist = therapistOpt.get();
            String token = UUID.randomUUID().toString();
            therapist.setResetToken(token);
            therapist.setResetTokenExpiry(new Date(System.currentTimeMillis() + 3600000)); // 1 hour expiry
            therapistRepository.save(therapist);

            sendPasswordResetEmail(email, token, "Therapist");
            return ResponseEntity.ok("Password reset email sent successfully to therapist.");
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Email not found.");
    }

    private void sendPasswordResetEmail(String email, String token, String role) {
        String resetLink = "http://localhost:5173/reset-password?token=" + token;
        String emailBody = String.format(
                "Dear %s,\n\n"
                        + "We received a request to reset your password for your Hope Line account.\n"
                        + "Click the link below to reset your password:\n\n"
                        + "%s\n\n"
                        + "If you did not request a password reset, please ignore this email.\n\n"
                        + "Best regards,\n"
                        + "Hope Line Team",
                role, resetLink
        );
        sendEmailService.sendEmail(email, emailBody, "Password Reset Request - Hope Line");
    }


    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String token = request.get("token");
        String newPassword = request.get("newPassword");
        String confirmPassword = request.get("confirmPassword");

        if (!newPassword.equals(confirmPassword)) {
            return ResponseEntity.badRequest().body("Passwords do not match.");
        }

        // Check in Users repository
        Optional<Users> userOpt = usersRepository.findByResetToken(token);
        if (userOpt.isPresent()) {
            Users user = userOpt.get();
            if (isTokenExpired(user.getResetTokenExpiry())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid or expired token.");
            }

            user.setPassword(passwordEncoder.encode(newPassword));
            user.setResetToken(null);
            user.setResetTokenExpiry(null);
            usersRepository.save(user);

            return ResponseEntity.ok("Password reset successfully for user.");
        }

        // Check in Therapist repository
        Optional<Therapist> therapistOpt = therapistRepository.findByResetToken(token);
        if (therapistOpt.isPresent()) {
            Therapist therapist = therapistOpt.get();
            if (isTokenExpired(therapist.getResetTokenExpiry())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid or expired token.");
            }

            therapist.setPassword(passwordEncoder.encode(newPassword));
            therapist.setResetToken(null);
            therapist.setResetTokenExpiry(null);
            therapistRepository.save(therapist);

            return ResponseEntity.ok("Password reset successfully for therapist.");
        }

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid or expired token.");
    }

    private boolean isTokenExpired(Date expiryDate) {
        return expiryDate == null || expiryDate.before(new Date());
    }

}
