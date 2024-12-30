package com.example.backend.controller;

import com.example.backend.model.*;
import com.example.backend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // Fetch all users
    @GetMapping("/users")
    public ResponseEntity<List<Users>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    // Fetch all therapists
    @GetMapping("/therapists")
    public ResponseEntity<List<Therapist>> getAllTherapists() {
        return ResponseEntity.ok(adminService.getAllTherapists());
    }

    // Fetch all blogs
    @GetMapping("/blogs")
    public ResponseEntity<List<Blog>> getAllBlogs() {
        return ResponseEntity.ok(adminService.getAllBlogs());
    }

    // Fetch all emergency contacts
    @GetMapping("/emergency-contacts")
    public ResponseEntity<List<EmergencyContact>> getAllContacts() {
        return ResponseEntity.ok(adminService.getAllEmergencyContacts());
    }

    // Delete user
    @DeleteMapping("/deleteUser/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        adminService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    // Delete therapist
    @DeleteMapping("/deleteTherapist/{id}")
    public ResponseEntity<Void> deleteTherapist(@PathVariable String id) {
        adminService.deleteTherapist(id);
        return ResponseEntity.ok().build();
    }

    // Delete blog
    @DeleteMapping("/deleteBlog/{id}")
    public ResponseEntity<Void> deleteBlog(@PathVariable String id) {
        adminService.deleteBlog(id);
        return ResponseEntity.ok().build();
    }

    // Delete emergency contact
    @DeleteMapping("/deleteContact/{id}")
    public ResponseEntity<Void> deleteEmergencyContact(@PathVariable String id) {
        adminService.deleteEmergencyContact(id);
        return ResponseEntity.ok().build();
    }
}
