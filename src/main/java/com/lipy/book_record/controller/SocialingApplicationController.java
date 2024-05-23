package com.lipy.book_record.controller;

import com.lipy.book_record.entity.Member;
import com.lipy.book_record.service.MemberService;
import com.lipy.book_record.service.SocialingApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SocialingApplicationController {
    @Autowired
    private SocialingApplicationService socialingApplicationService;
    @Autowired
    private MemberService memberService;

    @PostMapping("/socialing/apply")
    public ResponseEntity<Long> applyForSocialing(@RequestParam("socialingId") Long socialingId) {
        try {
            // 현재 로그인한 사용자의 정보를 가져옴
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String username = userDetails.getUsername();
            Member member = memberService.findByUsername(username);

            Long takeId = socialingApplicationService.applyForSocialing(member.getId(), socialingId);
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
