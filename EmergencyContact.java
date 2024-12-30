package com.example.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Document(collection = "emergency_contacts")
public class EmergencyContact {

    @Id
    private String id; // Unique identifier for the EmergencyContact document
    private String userId; // ID of the user owning these emergency contacts
    private List<Contact> contacts; // List of contacts

    // Constructor to initialize with a userId and an empty contact list
    public EmergencyContact(String userId) {
        this.userId = userId;
        this.contacts = new ArrayList<>();
    }

    @Getter
    @Setter
    public static class Contact {
        private String id; // Unique identifier for each contact
        private String name; // Name of the contact
        private String phoneNumber; // Phone number of the contact
        private String relationship; // Relationship of the contact to the user

        // Default constructor with automatic ID generation
        public Contact() {
            this.id = UUID.randomUUID().toString();
        }
    }
}
