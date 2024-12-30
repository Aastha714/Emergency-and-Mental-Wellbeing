package com.example.backend.repository;

import com.example.backend.model.Users;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UsersRepository extends MongoRepository<Users, String> {
    Optional<Users> findByEmail(String email);
    Optional<Users> findByResetToken(String token);
}