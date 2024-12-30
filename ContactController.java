package com.example.backend.controller;
import com.example.backend.model.Contact;
import com.example.backend.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/contact")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @PostMapping
    public ResponseEntity<String> createContact(@RequestBody Contact contact) {
        contactService.saveContact(contact);
        return ResponseEntity.ok("Contact saved successfully!");
    }
}
