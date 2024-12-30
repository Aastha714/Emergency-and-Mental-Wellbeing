package com.example.backend.service;

import com.example.backend.model.*;
import com.example.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private TherapistRepository therapistRepository;

    @Autowired
    private BlogsRepository blogRepository;

    @Autowired
    private EmergencyContactRepository emergencyContactRepository;

    @Autowired
    private UsersService usersService;

    @Autowired
    private TherapistService therapistService;

    // Get all users
    public List<Users> getAllUsers() {
        return usersService.getAllUsers();
    }

    // Get all therapists
    public List<Therapist> getAllTherapists() {
        return therapistService.getAllTherapists();
    }

    // Get all blogs
    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }

    // Get all emergency contacts
    public List<EmergencyContact> getAllEmergencyContacts() {
        return emergencyContactRepository.findAll();
    }

    // Delete a user
    public void deleteUser(String id) {
        if (!usersRepository.existsById(id)) {
            throw new IllegalArgumentException("User not found with id: " + id);
        }
        usersRepository.deleteById(id);
    }

    // Delete a therapist
    public void deleteTherapist(String id) {
        if (!therapistRepository.existsById(id)) {
            throw new IllegalArgumentException("Therapist not found with id: " + id);
        }
        therapistRepository.deleteById(id);
    }

    // Delete a blog
    public void deleteBlog(String id) {
        if (!blogRepository.existsById(id)) {
            throw new IllegalArgumentException("Blog not found with id: " + id);
        }
        blogRepository.deleteById(id);
    }

    // Delete an emergency contact
    public void deleteEmergencyContact(String id) {
        if (!emergencyContactRepository.existsById(id)) {
            throw new IllegalArgumentException("Emergency contact not found with id: " + id);
        }
        emergencyContactRepository.deleteById(id);
    }
}
