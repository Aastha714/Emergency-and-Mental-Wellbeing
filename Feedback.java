package com.example.backend.model;


import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
@Document(collection = "feedback")
public class Feedback {
    @Id
    private String id;
    private String email;
    private Map<String, Integer> scores = new HashMap<>();
}
