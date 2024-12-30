package com.example.backend.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Document(collection = "Blogs")
public class Blog {
    private String id;
    private String image;
    private String email;
    private int likes =0;
    private String title;
    private String content;
    private Set<String> likedBy = new HashSet<>();
}
