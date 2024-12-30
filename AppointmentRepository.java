package com.example.backend.repository;

import com.example.backend.model.Appointment;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AppointmentRepository extends MongoRepository<Appointment,String> {
    List<Appointment> findByEmail(String email);
    List<Appointment> findByTherapistEmail(String therapistEmail);
    List<Appointment> findByTherapistEmailAndStatus(String therapistEmail, String status);
}
