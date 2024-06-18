package com.lipy.book_record.controller;

import com.lipy.book_record.dto.LoginRequest;
import com.lipy.book_record.dto.RegisterRequest;
import com.lipy.book_record.dto.SocialingListResponse;
import com.lipy.book_record.entity.Member;
import com.lipy.book_record.service.EmailService;
import com.lipy.book_record.service.MemberService;
import com.lipy.book_record.service.VerificationService;
import com.lipy.book_record.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.context.SecurityContextHolder;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
public class MemberController {
    private final MemberService memberService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final EmailService emailService;
    private final VerificationService verificationService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    loginRequest.getEmail(), loginRequest.getPassword());

            Authentication authentication = authenticationManager.authenticate(authenticationToken);

            SecurityContextHolder.getContext().setAuthentication(authentication);

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String email = userDetails.getUsername();
            Member member = memberService.findByUsername(email);
            Long memberId = member.getId();

            String jwtToken = jwtUtil.generateToken(userDetails,memberId);



            return ResponseEntity.ok().body("login succeed "+jwtToken);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("login failed: " + e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerMember(@RequestBody RegisterRequest registerRequest) {
        try {
            Member member = new Member(
                    registerRequest.getUsername(),
                    passwordEncoder.encode(registerRequest.getPassword()),
                    registerRequest.getEmail(),
                    registerRequest.getNickname()
            );
            memberService.save(member);
            return ResponseEntity.ok().body("Membership registration successful");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }


    @DeleteMapping("/logout")
    public ResponseEntity<?> logout() {
        SecurityContextHolder.getContext().setAuthentication(null);
        return ResponseEntity.ok().body("Logout successful");
    }

    @PostMapping("/socialing/{socialingId}/interest")
    public ResponseEntity<?> addFavoriteSocialing(@PathVariable("socialingId") Long socialingId) {
        // 현재 로그인한 사용자의 정보를 가져옴
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String username = userDetails.getUsername();
        Member member = memberService.findByUsername(username);

        memberService.addFavoriteSocialing(member.getId(), socialingId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/socialing/{socialingId}/interest")
    public ResponseEntity<String> removeInterestSocialing(@PathVariable("socialingId") Long socialingId) {
        // 현재 로그인한 사용자의 정보를 가져옴
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String username = userDetails.getUsername();
        Member member = memberService.findByUsername(username);

        memberService.cancelFavoriteSocialing(member.getId(), socialingId);
        return ResponseEntity.ok("Interest socialing removed successfully");
    }
    @GetMapping("/interest/me")
    public ResponseEntity<List<SocialingListResponse>> getFavoriteSocialings(Principal principal) {
        Member member = memberService.findByUsername(principal.getName());
        List<SocialingListResponse> favoriteSocialings = memberService.getFavoriteSocialings(member.getId());
        return ResponseEntity.ok().body(favoriteSocialings);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || authentication.getPrincipal() == "anonymousUser") {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Member member = memberService.findByUsername(userDetails.getUsername());

        Map<String, String> userInfo = new HashMap<>();
        userInfo.put("username", member.getUsername());
        userInfo.put("nickname", member.getNickname());

        return ResponseEntity.ok(userInfo);
    }

    @GetMapping("/socialing/{socialingId}/is-in terest")
    public ResponseEntity<Boolean> isInterestSocialing(@PathVariable Long socialingId) {
        // 현재 로그인한 사용자의 정보를 가져옴
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String username = userDetails.getUsername();
        Member member = memberService.findByUsername(username);

        boolean isInterest = memberService.isInterestSocialing(member.getId(), socialingId);
        return ResponseEntity.ok(isInterest);
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendVerificationCode(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            String verificationCode = verificationService.generateVerificationCode();
            verificationService.saveVerificationCode(email, verificationCode);
            emailService.sendVerificationCode(email, verificationCode);
            return ResponseEntity.ok("Verification code sent successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verifyEmail(@RequestParam("email") String email, @RequestParam("code") String code) {
        boolean isVerified = verificationService.verifyCode(email, code);
        if (isVerified) {
            return ResponseEntity.ok("Email verified successfully.");
        } else {
            return ResponseEntity.status(400).body("Invalid verification code.");
        }
    }

    @GetMapping("/{id}/isFavorite")
    public ResponseEntity<Map<String, Object>> isFavorite(@PathVariable("id") Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            // 현재 로그인한 사용자의 정보를 가져옴
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String username = userDetails.getUsername();
            Member member = memberService.findByUsername(username);

            // 관심있는 소셜링 여부를 확인
            boolean isFavorite = memberService.isFavoriteSocialing(member.getId(), id);
            response.put("isFavorite", isFavorite);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("isFavorite", false);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }



}