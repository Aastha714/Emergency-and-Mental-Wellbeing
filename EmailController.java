package com.example.backend.controller;

import com.example.backend.service.SendEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailController {
    @Autowired
    private SendEmailService sendEmailService;

    @GetMapping("/sendEmail")
    public String sendEmail(){
        sendEmailService.sendEmail("lovelyibrahim69@gmail.com","Test Body","Test Subject");
        return "Sent Successfully";
    }
}
