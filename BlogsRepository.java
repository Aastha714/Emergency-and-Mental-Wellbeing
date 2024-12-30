package com.example.backend.repository;

import com.example.backend.model.Blog;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface BlogsRepository extends MongoRepository<Blog,String> {

    Optional<Blog> findByEmail(String email);
}
