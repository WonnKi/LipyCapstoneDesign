package com.lipy.book_record.controller;

import com.lipy.book_record.dto.LoginRequest;
import com.lipy.book_record.dto.RegisterRequest;
import com.lipy.book_record.dto.SocialingListResponse;
import com.lipy.book_record.entity.Member;
import com.lipy.book_record.service.MemberService;
import com.lipy.book_record.util.JwtUtil;
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

@RestController
public class MemberController {
    @Autowired
    private MemberService memberService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    loginRequest.getUsername(), loginRequest.getPassword());

            Authentication authentication = authenticationManager.authenticate(authenticationToken);

            SecurityContextHolder.getContext().setAuthentication(authentication);

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String jwtToken = jwtUtil.generateToken(userDetails);

            return ResponseEntity.ok().body("login succeed "+jwtToken);
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

        // 사용자 정보에서 name을 포함하여 반환
        Map<String, String> userInfo = new HashMap<>();
        userInfo.put("username", member.getUsername());
        userInfo.put("name", member.getName());

        return ResponseEntity.ok(userInfo);
    }

    @GetMapping("/socialing/{socialingId}/is-interest")
    public ResponseEntity<Boolean> isInterestSocialing(@PathVariable Long socialingId) {
        // 현재 로그인한 사용자의 정보를 가져옴
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String username = userDetails.getUsername();
        Member member = memberService.findByUsername(username);

        boolean isInterest = memberService.isInterestSocialing(member.getId(), socialingId);
        return ResponseEntity.ok(isInterest);
    }
}