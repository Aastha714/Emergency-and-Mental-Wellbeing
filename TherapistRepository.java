package com.example.backend.repository;

import com.example.backend.model.Therapist;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface TherapistRepository extends MongoRepository<Therapist,String> {
    Optional<Therapist> findByEmail(String email);
    Optional<Therapist> findByResetToken(String token);
}
