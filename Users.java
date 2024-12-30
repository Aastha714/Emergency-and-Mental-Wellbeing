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
@Document(collection = "users")
public class Users {
    @Id
    private String id;
    private String email;
    private String name;
    private Integer age;
    private String password;
    private String gender;
    private String profilePicture;  // Use Binary to store profile picture
    private List<String> roles;
    private String resetToken;          // Stores token for password reset
    private Date resetTokenExpiry;
}
