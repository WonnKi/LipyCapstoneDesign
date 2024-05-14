package com.lipy.book_record.controller;

import com.lipy.book_record.service.SocialingApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    @DeleteMapping("/socialing/apply/{applicationId}") // 소셜링 신청 취소
    public ResponseEntity<String> cancelSocialingApplication(@PathVariable Long applicationId) {
        socialingApplicationService.cancelSocialingApplication(applicationId);
        return ResponseEntity.ok("Socialing application canceled successfully.");

    }

    @GetMapping("/socialing/apply/{applicationId}") //소셜링 신청정보 받기
    public ResponseEntity<List<String>> getApplicantNamesBySocialingId(@PathVariable Long applicationId) {
        List<String> applicant = socialingApplicationService.findApplicantInfoBySocialingId(applicationId);
        return ResponseEntity.ok(applicant);
    }
}
