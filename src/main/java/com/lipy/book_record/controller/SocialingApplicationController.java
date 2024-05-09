package com.lipy.book_record.controller;

import com.lipy.book_record.service.SocialingApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SocialingApplicationController {
    @Autowired
    private SocialingApplicationService socialingApplicationService;

    @PostMapping("/socialing/apply")
    public ResponseEntity<Long> applyForSocialing(@RequestParam Long userId, @RequestParam Long socialingId) {
        try {
            Long takeId = socialingApplicationService.applyForSocialing(userId, socialingId);
            return ResponseEntity.ok(takeId);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
