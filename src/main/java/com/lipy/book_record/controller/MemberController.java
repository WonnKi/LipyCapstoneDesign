package com.lipy.book_record.controller;

import com.lipy.book_record.dto.LoginRequest;
import com.lipy.book_record.dto.RegisterRequest;
import com.lipy.book_record.dto.SocialingListResponse;
import com.lipy.book_record.entity.Member;
import com.lipy.book_record.service.MemberService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;

@RestController
public class MemberController {
    private static final Logger logger = LoggerFactory.getLogger(MemberController.class);

    @Autowired
    private MemberService memberService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    loginRequest.getUsername(), loginRequest.getPassword());

            Authentication authentication = authenticationManager.authenticate(authenticationToken);

            SecurityContextHolder.getContext().setAuthentication(authentication);

            return ResponseEntity.ok().body("login succeed");
        } catch (Exception e) {
            return ResponseEntity.status(401).body("login failed: " + e.getMessage());
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerMember(@RequestBody RegisterRequest registerRequest) {
        try {
            Member member = new Member();
            member.setUsername(registerRequest.getUsername());
            member.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
            member.setName(registerRequest.getName());
            member.setEmail(registerRequest.getEmail());
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

    @PostMapping("/socialing/{socialingId}/interest/{memberId}")
    public ResponseEntity<?> addFavoriteSocialing(@PathVariable Long memberId, @PathVariable Long socialingId) {
        memberService.addFavoriteSocialing(memberId, socialingId);
        return ResponseEntity.ok().build();
    }
    @DeleteMapping("/socialing/{socialingId}/interest/{memberId}")
    public ResponseEntity<String> removeInterestSocialing(@PathVariable Long memberId, @PathVariable Long socialingId) {
        memberService.cancelFavoriteSocialing(memberId, socialingId);
        return ResponseEntity.ok("Interest socialing removed successfully");
    }
    @GetMapping("/socialing/interest/{memberId}")
    public ResponseEntity<List<SocialingListResponse>> getFavoriteSocialings(@PathVariable Long memberId) {
        List<SocialingListResponse> favoriteSocialings = memberService.getFavoriteSocialings(memberId);
        return ResponseEntity.ok().body(favoriteSocialings);
    }

}
