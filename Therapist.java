package com.example.backend.model;

import lombok.Getter;
import lombok.Setter;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@Document(collection = "therapist")
public class Therapist {
    @Id
    private String id;
    private String email;
    private String name;
    private String specialization;
    private String licenceNo;
    private String password;
    private String profilePicture;
    private List<String> roles;
    private String resetToken;          // Stores token for password reset
    private Date resetTokenExpiry;

}