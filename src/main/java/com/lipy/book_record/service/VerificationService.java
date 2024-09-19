package com.lipy.book_record.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class VerificationService {

    private final Map<String, String> verificationCodes = new HashMap<>();

    public String generateVerificationCode() {
        Random random = new Random();
        int code = 100000 + random.nextInt(900000);
        return String.valueOf(code);
    }

    public void saveVerificationCode(String email, String code) {
        verificationCodes.put(email, code);
    }

    public boolean verifyCode(String email, String code) {
        return code.equals(verificationCodes.get(email));
    }

    public void removeVerificationCode(String email) {
        verificationCodes.remove(email);
    }
}