package com.example.backend.DTO;

public class StatusUpdateRequest {
    private String status;
    private String therapistEmail; // Add this field

    // Getters and setters
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTherapistEmail() {
        return therapistEmail;
    }

    public void setTherapistEmail(String therapistEmail) {
        this.therapistEmail = therapistEmail;
    }
}
