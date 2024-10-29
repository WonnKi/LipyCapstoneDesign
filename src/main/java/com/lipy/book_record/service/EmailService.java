package com.lipy.book_record.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service


public class EmailService {
    
    @Autowired
    private JavaMailSender emailSender;
    
    public void sendVerificationCode(String to, String code) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("이메일 인증 코드");
        message.setText("당신의 이메일 인증코드: " + code);
        emailSender.send(message);
    }
}