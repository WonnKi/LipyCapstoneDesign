package com.lipy.book_record.controller;

import com.lipy.book_record.dto.ApplicantInfo;
import com.lipy.book_record.entity.Member;
import com.lipy.book_record.entity.Socialing;
import com.lipy.book_record.entity.SocialingApplication;
import com.lipy.book_record.service.MemberService;
import com.lipy.book_record.service.SocialingApplicationService;
import com.lipy.book_record.service.SocialingService;
import com.lipy.book_record.service.UserActivityLogService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class SocialingApplicationController {
    private final SocialingApplicationService socialingApplicationService;
    private final SocialingService socialingService;
    private final MemberService memberService;
    private final UserActivityLogService userActivityLogService;

    @PostMapping("/socialing/apply")
    public ResponseEntity<Long> applyForSocialing(@RequestParam Long socialingId, HttpServletRequest request) {
        try {
            // 현재 로그인한 사용자의 정보를 가져옴
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String email = userDetails.getUsername();
            Member member = memberService.findByEmail(email);

            Long takeId = socialingApplicationService.applyForSocialing(member.getId(), socialingId);

            // IP 주소 가져오기
            String ipAddress = request.getRemoteAddr();

            // 로그 저장
            userActivityLogService.logActivity(member.getId(), "APPLY_SOCIALING", "User applied for socialing with ID: " + socialingId, ipAddress);

            return ResponseEntity.ok(takeId);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @DeleteMapping("/socialing/apply/{applicationId}") // 소셜링 신청 취소
    public ResponseEntity<String> cancelSocialingApplication(@PathVariable Long applicationId, HttpServletRequest request) {
        try {
            // 현재 로그인한 사용자의 정보를 가져옴
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String email = userDetails.getUsername();
            Member member = memberService.findByEmail(email);

            // 신청 정보 가져오기
            SocialingApplication application = socialingApplicationService.findById(applicationId);

            // 현재 로그인한 사용자가 신청한 것인지 확인
            if (!application.getMember().getId().equals(member.getId())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You can only cancel your own application.");
            }

            socialingApplicationService.cancelSocialingApplication(applicationId);

            // IP 주소 가져오기
            String ipAddress = request.getRemoteAddr();

            // 로그 저장
            userActivityLogService.logActivity(member.getId(), "CANCEL_SOCIALING", "User canceled socialing application with ID: " + applicationId, ipAddress);

            return ResponseEntity.ok("Socialing application canceled successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/{id}/isApplied")
    public ResponseEntity<Map<String, Object>> isApplied(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            // 현재 로그인한 사용자의 정보를 가져옴
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String email = userDetails.getUsername();
            Member member = memberService.findByEmail(email);

            SocialingApplication application = socialingApplicationService.findByMemberAndSocialing(member.getId(), id);
            if (application != null) {
                response.put("isApplied", true);
                response.put("applicationId", application.getId());
            } else {
                response.put("isApplied", false);
            }
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("isApplied", false);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/apply/{socialingId}") // 소셜링 신청정보 받기
    public ResponseEntity<?> getApplicantNamesBySocialingId(@PathVariable Long socialingId) {
        // 현재 로그인한 사용자의 정보를 가져옴
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String email = userDetails.getUsername();
        Member member = memberService.findByEmail(email);

        // 소셜링 게시글 작성자인지 확인
        Socialing socialing = socialingService.findById(socialingId);
        if (socialing.getWriter().equals(member.getNickname())) {
            List<String> applicantInfos = socialingApplicationService.findApplicantInfoBySocialingId(socialingId);
            return ResponseEntity.ok(applicantInfos);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to view this information.");
        }
    }
}