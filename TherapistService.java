package com.example.backend.service;

import com.example.backend.model.Therapist;
import com.example.backend.repository.TherapistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TherapistService {

    @Autowired
    private TherapistRepository therapistRepository;


    public List<Therapist> getAllTherapists() {
        // Filter therapists where role is not ADMIN
        return therapistRepository.findAll()
                .stream()
                .filter(user -> user.getRoles() != null && user.getRoles().contains("THERAPIST"))
                .toList();
    }

    public void deleteTherapist(String id) {
        therapistRepository.deleteById(id);
    }
}
