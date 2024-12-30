package com.example.backend.DTO;

import lombok.Data;
import java.time.LocalDate;

@Data
public class AppointmentRequest {
    private String name;
    private String email;
    private String therapistEmail;
    private LocalDate date;
    private String time;
    private String message;
    private String status;
}
