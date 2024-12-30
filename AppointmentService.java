package com.example.backend.service;

import com.example.backend.DTO.AppointmentRequest;
import com.example.backend.model.Appointment;
import com.example.backend.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private SendEmailService sendEmailService;

    public List<Appointment> getAppointmentsByUserEmail(String email) {
        return appointmentRepository.findByEmail(email);  // Updated to use 'findByEmail'
    }

    public void saveAppointment(AppointmentRequest request) {
        Appointment appointment = new Appointment();
        appointment.setName(request.getName());
        appointment.setEmail(request.getEmail());
        appointment.setDate(request.getDate());
        appointment.setTime(request.getTime());
        appointment.setMessage(request.getMessage());
        appointment.setStatus("Pending");
        appointment.setTherapistEmail(
                request.getTherapistEmail() == null || request.getTherapistEmail().isEmpty()
                        ? ""
                        : request.getTherapistEmail()
        );

        appointmentRepository.save(appointment);

        if (appointment.getTherapistEmail() != null && !appointment.getTherapistEmail().isEmpty()) {
            String subject = "Appointment Request Received";
            String body = String.format(
                    "Dear %s,\n\n" +
                            "Thank you for booking an appointment with us. Your request has been received and is currently under review.\n\n" +
                            "Here are the details of your appointment:\n" +
                            "- Date: %s\n" +
                            "- Time: %s\n" +
                            "- Therapist: %s\n\n" +
                            "Please note that your appointment is not yet confirmed. You will receive another email once your request has been processed.\n\n" +
                            "Best regards,\n" +
                            "Hope Line Team",
                    request.getName(),
                    request.getDate(),
                    request.getTime(),
                    appointment.getTherapistEmail()
            );
            sendEmailService.sendEmail(request.getEmail(), body, subject);
        }



    }

    public List<Appointment> getAppointmentsByTherapist(String therapistEmail) {
        return appointmentRepository.findByTherapistEmail(therapistEmail);
    }

    public List<Appointment> getPendingAppointmentsWithEmptyTherapistEmail() {
        return appointmentRepository.findByTherapistEmailAndStatus("", "Pending");
    }
    public List<Appointment> getAcceptedAppointmentsForTherapist(String therapistEmail) {
        return appointmentRepository.findByTherapistEmailAndStatus(therapistEmail,"Accepted");
    }

    public Appointment updateAppointmentStatus(String id, String status, String therapistEmail) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found"));

        // Update status and therapist email
        appointment.setStatus(status);

        if ("Accepted".equalsIgnoreCase(status) && therapistEmail != null && !therapistEmail.isEmpty()) {
            appointment.setTherapistEmail(therapistEmail);

            // Send email to the user
            String subject = "Your Appointment Has Been Accepted";
            String body = String.format(
                    "Dear %s,\n\n" +
                            "We are pleased to inform you that your appointment request has been accepted by the therapist.\n\n" +
                            "Here are the details of your confirmed appointment:\n" +
                            "- Date: %s\n" +
                            "- Time: %s\n" +
                            "- Therapist: %s\n\n" +
                            "Please ensure you are available at the scheduled time. If you have any questions or need to reschedule, feel free to contact us.\n\n" +
                            "Thank you for choosing Hope Line.\n\n" +
                            "Best regards,\n" +
                            "Hope Line Team",
                    appointment.getName(),
                    appointment.getDate(),
                    appointment.getTime(),
                    therapistEmail // Include the therapist's email (or name if available)
            );
            sendEmailService.sendEmail(appointment.getEmail(), body, subject);

        } else if ("Pending".equalsIgnoreCase(status)) {
            appointment.setTherapistEmail(""); // Reset therapist email if status changes to Pending
        }

        return appointmentRepository.save(appointment);
    }



}
