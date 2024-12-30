package com.example.backend.controller;

import com.example.backend.model.Appointment;
import com.example.backend.model.Feedback;
import com.example.backend.model.FeedbackRequest;
import com.example.backend.model.Users;
import com.example.backend.repository.FeedbackRepository;
import com.example.backend.repository.UsersRepository;
import com.example.backend.service.AppointmentService;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user")
public class UserController {




    @Autowired
    private UsersRepository usersRepository;
    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private AppointmentService appointmentService;


    @GetMapping("/{email}")

    public ResponseEntity<?> getUserDetails(@PathVariable String email) {

        Optional<Users> userOpt = usersRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            Users user = userOpt.get();

            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }




        // PUT - Update user by email
        @PutMapping("/{email}")
        public ResponseEntity<Users> updateUser(@PathVariable String email, @RequestBody Users updatedUser) {
            Optional<Users> existingUserOpt = usersRepository.findByEmail(email);

            if (existingUserOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null); // Return 404 if user not found
            }

            Users existingUser = existingUserOpt.get();

            // Update the user's fields if they are not null or invalid (e.g., age should not be negative)
            if (updatedUser.getName() != null) {
                existingUser.setName(updatedUser.getName());
            }

            if (updatedUser.getAge() != null && updatedUser.getAge() >= 0) {
                existingUser.setAge(updatedUser.getAge());
            }


            if (updatedUser.getGender() != null) {
                existingUser.setGender(updatedUser.getGender());
            }


            if (updatedUser.getProfilePicture() != null) {
                existingUser.setProfilePicture(updatedUser.getProfilePicture());
            }

            // Save the updated user
            Users updated = usersRepository.save(existingUser);
            return ResponseEntity.ok(updated); // Return the updated user
        }




    @GetMapping("/feedback/{email}")
    public ResponseEntity<Object> getFeedbackByEmail(@PathVariable String email) {
        Optional<Feedback> feedback = feedbackRepository.findByEmail(email);

        if (feedback.isPresent()) {
            Map<String, Integer> scores = feedback.get().getScores();
            Map<String, Object> response = new HashMap<>();
            response.put("email", email);
            response.put("scores", scores);

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Feedback not found for email: " + email);
        }
    }
    @GetMapping("/feedback/therapist")
    public ResponseEntity<List<Map<String, Object>>> getFeedbackForTherapist(@RequestParam String therapistEmail) {
        // Fetch accepted appointments for the given therapist email
        List<Appointment> acceptedAppointments = appointmentService.getAcceptedAppointmentsForTherapist(therapistEmail);
        List<Map<String, Object>> feedbackDetails = new ArrayList<>();

        if (acceptedAppointments.isEmpty()) {
            return ResponseEntity.ok(feedbackDetails); // No accepted appointments, return empty list
        }

        for (Appointment appointment : acceptedAppointments) {
            String email = appointment.getEmail();

            // Fetch feedback associated with the appointment's user email
            Optional<Feedback> feedbackOpt = feedbackRepository.findByEmail(email);
            Map<String, Object> feedbackInfo = new HashMap<>();
            feedbackInfo.put("name", appointment.getName());
            feedbackInfo.put("email", email);

            if (feedbackOpt.isPresent()) {
                Feedback feedback = feedbackOpt.get();

                // Retrieve and add scores if present
                Map<String, Integer> scoresMap = feedback.getScores();
                feedbackInfo.put("scores", scoresMap != null ? new ArrayList<>(scoresMap.values()) : new ArrayList<>());
            } else {
                // Log if no feedback found, but still include user info with empty scores
                System.out.println("No feedback found for email: " + email);
                feedbackInfo.put("scores", new ArrayList<>()); // Empty scores
            }

            feedbackDetails.add(feedbackInfo);
        }

        return ResponseEntity.ok(feedbackDetails);
    }






    @PostMapping("/feedback")
    public ResponseEntity<String> saveOrUpdateFeedback(@RequestBody FeedbackRequest feedbackRequest) {
        try {
            Optional<Feedback> existingFeedbackOpt = feedbackRepository.findByEmail(feedbackRequest.getEmail());

            Feedback feedback;
            if (existingFeedbackOpt.isPresent()) {
                feedback = existingFeedbackOpt.get();
            } else {
                feedback = new Feedback();
                feedback.setEmail(feedbackRequest.getEmail());
                feedback.setScores(new HashMap<>());
            }

            feedback.getScores().put(feedbackRequest.getDate(), feedbackRequest.getTotalScore());
            feedbackRepository.save(feedback);

            return ResponseEntity.ok(existingFeedbackOpt.isPresent()
                    ? "Feedback updated successfully!"
                    : "Feedback submitted successfully!");
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while saving feedback. Please try again later.");
        }
    }

    @GetMapping("/name/{email}")
    public ResponseEntity<?> getUserName(@PathVariable String email) {
        Optional<Users> userOpt = usersRepository.findByEmail(email);

        if (userOpt.isPresent()) {
            Users user = userOpt.get();

            // Create a response map to return only the required fields
            Map<String, Object> response = new HashMap<>();
            response.put("username", user.getName()); // Assuming 'name' is the username
            response.put("profilePicture", user.getProfilePicture()); // Assuming this stores profile picture URL or binary data

            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

}




