package com.example.backend.model;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;


@Data
@Document(collection = "Appointments")
public class Appointment {
    @Id
    private String id;
    private String name;
    private String email;
    private String therapistEmail;
    private LocalDate date;
    private String time;
    private String message;
    private String status;

}
