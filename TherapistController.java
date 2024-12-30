package com.example.backend.controller;

import com.example.backend.model.Appointment;
import com.example.backend.model.Feedback;
import com.example.backend.model.Therapist;
import com.example.backend.model.Users;
import com.example.backend.repository.FeedbackRepository;
import com.example.backend.repository.TherapistRepository;
import com.example.backend.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.*;

@RestController
@RequestMapping("/therapist")
public class TherapistController {

    @Autowired
    private TherapistRepository therapistRepository;
    @Autowired
    private AppointmentService appointmentService;

    @Autowired
    private FeedbackRepository feedbackRepository;

    @GetMapping("/{email}")

    public ResponseEntity<?> getUserDetails(@PathVariable String email) {

        Optional<Therapist> therapistOpt = therapistRepository.findByEmail(email);
        if (therapistOpt.isPresent()) {
            Therapist therapist = therapistOpt.get();


            return ResponseEntity.ok(therapist);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }
    @GetMapping("/{email}/name")
    public ResponseEntity<String> getTherapistNameByEmail(@PathVariable String email) {
        // Fetch therapist details by email
        Optional<Therapist> therapistOpt = therapistRepository.findByEmail(email);

        // If therapist exists, return the name; otherwise, return NOT_FOUND
        if (therapistOpt.isPresent()) {
            String therapistName = therapistOpt.get().getName();
            return ResponseEntity.ok(therapistName);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Therapist not found");
        }
    }


    @GetMapping("/all")
    public ResponseEntity<List<Therapist>> getAllTherapists() {
        List<Therapist> therapists = therapistRepository.findAll();
        return ResponseEntity.ok(therapists);
    }
    @PutMapping("/{email}")
    public ResponseEntity<Therapist> updateTherapist(
            @PathVariable String email,
            @RequestBody Therapist updatedTherapist) {

        // Fetch the existing therapist using email
        Therapist existingTherapist = therapistRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Therapist not found"));

        // Update fields if they are not null or invalid
        if (updatedTherapist.getName() != null) {
            existingTherapist.setName(updatedTherapist.getName());
        }



        if (updatedTherapist.getProfilePicture() != null) {
            existingTherapist.setProfilePicture(updatedTherapist.getProfilePicture());
        }

        if (updatedTherapist.getSpecialization() != null) {
            existingTherapist.setSpecialization(updatedTherapist.getSpecialization());
        }

        if (updatedTherapist.getLicenceNo() != null) {
            existingTherapist.setLicenceNo(updatedTherapist.getLicenceNo());
        }

        // Save the updated therapist to the database
        Therapist savedTherapist = therapistRepository.save(existingTherapist);

        return ResponseEntity.ok(savedTherapist);
    }






}