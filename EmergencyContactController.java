package com.example.backend.controller;

import com.example.backend.model.EmergencyContact;
import com.example.backend.model.EmergencyContact.Contact;
import com.example.backend.service.EmergencyContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/emergency-contacts")
public class EmergencyContactController {

    @Autowired
    private EmergencyContactService service;

    @GetMapping("/user/{userId}")
    public EmergencyContact getContactsByUserId(@PathVariable String userId) {
        return service.getContactsByUserId(userId);
    }

    @PostMapping("/add/{userId}")
    public ResponseEntity<?> addContact(@PathVariable String userId, @RequestBody Contact newContact) {
        try {
            EmergencyContact updatedContact = service.addContact(userId, newContact);
            return ResponseEntity.ok(updatedContact); // Return updated contact list
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to add contact: " + e.getMessage());
        }
    }

    @PutMapping("/update/{userId}")
    public EmergencyContact updateContacts(@PathVariable String userId, @RequestBody List<Contact> contacts) {
        return service.updateContacts(userId, contacts);
    }
    @DeleteMapping("/delete/{userId}")
    public void deleteContact(@PathVariable String userId, @RequestParam String phoneNumber, @RequestParam String relationship) {
        service.deleteContact(userId, phoneNumber, relationship);
    }

}
