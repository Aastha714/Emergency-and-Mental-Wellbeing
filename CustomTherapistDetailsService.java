package com.example.backend.service;

import com.example.backend.model.Therapist;
import com.example.backend.repository.TherapistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomTherapistDetailsService implements UserDetailsService {

    @Autowired
    private TherapistRepository therapistRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Therapist therapist = therapistRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Therapist not found with email: " + email));

        return User.builder()
                .username(therapist.getEmail())
                .password(therapist.getPassword()) // Hashed password
                .roles(therapist.getRoles().toArray(new String[0]))
                .build();
    }
}
