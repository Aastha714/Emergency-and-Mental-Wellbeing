package com.example.backend.controller;


import com.example.backend.Config.TwilioConfig;
import com.example.backend.DTO.SOSRequest;
import com.example.backend.model.EmergencyContact;
import com.example.backend.service.EmergencyContactService;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user/api")
@CrossOrigin
public class SOSController {

    @Autowired
    private EmergencyContactService emergencyContactService;

    @Autowired
    private TwilioConfig twilioConfig;

    @Value("${twilio.fromPhoneNumber}")
    private String fromPhoneNumber;

    public SOSController(TwilioConfig twilioConfig) {
        // Initialize Twilio with the credentials from TwilioConfig
        Twilio.init(twilioConfig.getAccountSid(), twilioConfig.getAuthToken());
    }

    @PostMapping("/send-sos")
    public ResponseEntity<String> sendSOS(@RequestBody SOSRequest sosRequest, HttpServletRequest request) {
        try {
            String userId = sosRequest.getUserId();  // Get userId from request body
            System.out.println("SOS is requested from userID: " + userId);

            // Fetch the emergency contact details for the user
            EmergencyContact emergencyContact = emergencyContactService.getContactsByUserId(userId);

            if (emergencyContact == null || emergencyContact.getContacts().isEmpty()) {
                return ResponseEntity.status(404).body("No emergency contacts found.");
            }

            String messageBody = String.format(
                    "SOS! I am %s. You are my Emergency Contact and I have an emergency at Location: Latitude: %s, Longitude: %s. Please assist immediately. " +
                            "View the location on the map: https://www.google.com/maps?q=%s,%s",
                    sosRequest.getUsername(),
                    sosRequest.getLatitude(), sosRequest.getLongitude(),
                    sosRequest.getLatitude(), sosRequest.getLongitude());

            for (EmergencyContact.Contact contact : emergencyContact.getContacts()) {
                if (!contact.getPhoneNumber().equals(fromPhoneNumber)) {
                    Message message = Message.creator(
                            new PhoneNumber(contact.getPhoneNumber()),  // Send SMS to contact's phone
                            new PhoneNumber(fromPhoneNumber),           // Twilio phone number
                            messageBody
                    ).create();
                } else {
                    System.out.println("Skipping sending message to same phone number: " + contact.getPhoneNumber());
                }
            }


            return ResponseEntity.ok("SOS message sent to emergency contacts successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error sending SOS message: " + e.getMessage());
        }
    }


    // Helper function to get userId from cookies
    private String getUserIdFromSession(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("userId".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        throw new IllegalArgumentException("User not logged in");
    }
}
