package com.example.backend.service;

import com.example.backend.model.Users;
import com.example.backend.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsersService {
    @Autowired
    private UsersRepository usersRepository;

    public List<Users> getAllUsers() {
        // Return users where roles list contains "USER"
        return usersRepository.findAll()
                .stream()
                .filter(user -> user.getRoles() != null && user.getRoles().contains("USER"))
                .toList();
    }

    public Users getUserById(String id) {
        return usersRepository.findById(id).orElse(null);
    }

    public Users saveUser(Users user) {
        return usersRepository.save(user);
    }

    public void deleteUser(String id) {
        usersRepository.deleteById(id);
    }
}
