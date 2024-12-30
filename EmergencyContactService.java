package com.example.backend.service;

import com.example.backend.exception.UserNotFoundException;
import com.example.backend.model.EmergencyContact;
import com.example.backend.model.EmergencyContact.Contact;
import com.example.backend.repository.EmergencyContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmergencyContactService {

    @Autowired
    private EmergencyContactRepository repository;

    // Get contacts for a user
    public EmergencyContact getContactsByUserId(String userId) {
        return repository.findByUserId(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    public EmergencyContact addContact(String userId, Contact newContact) {
        // Retrieve or initialize a new EmergencyContact object for the user
        EmergencyContact userContact = repository.findByUserId(userId)
                .orElse(new EmergencyContact(userId)); // Create a new record if user not found

        // Initialize the contact list if null
        if (userContact.getContacts() == null) {
            userContact.setContacts(new ArrayList<>());
        }

        // Add the new contact to the list
        userContact.getContacts().add(newContact);

        // Save the updated EmergencyContact object to the database
        return repository.save(userContact);
    }

    // Update the entire contact list
    public EmergencyContact updateContacts(String userId, List<Contact> contacts) {
        EmergencyContact userContact = repository.findByUserId(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        userContact.setContacts(contacts);
        return repository.save(userContact);
    }
    public void deleteContact(String userId, String phoneNumber, String relationship) {
        EmergencyContact userContact = repository.findByUserId(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        if (userContact.getContacts() != null) {
            userContact.getContacts().removeIf(contact ->
                    contact.getPhoneNumber().equals(phoneNumber) &&
                            (relationship.equals("Not Specified") ?
                                    (contact.getRelationship() == null || "Not Specified".equals(contact.getRelationship()))
                                    : relationship.equals(contact.getRelationship()))
            );
            repository.save(userContact);
        }
    }


}

