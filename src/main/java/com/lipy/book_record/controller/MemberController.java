package com.lipy.book_record.controller;

import com.lipy.book_record.dto.*;
import com.lipy.book_record.entity.Member;
import com.lipy.book_record.service.EmailService;
import com.lipy.book_record.service.MemberService;
import com.lipy.book_record.service.UserActivityLogService;
import com.lipy.book_record.service.VerificationService;
import com.lipy.book_record.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
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
import java.util.UUID;

@RequiredArgsConstructor
@RestController
public class MemberController {
    private final MemberService memberService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final EmailService emailService;
    private final VerificationService verificationService;
    private final UserActivityLogService userActivityLogService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletRequest request) {
        try {
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    loginRequest.getEmail(), loginRequest.getPassword());

            Authentication authentication = authenticationManager.authenticate(authenticationToken);

            SecurityContextHolder.getContext().setAuthentication(authentication);

            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String email = userDetails.getUsername();
            Member member = memberService.findByEmail(email);
            UUID memberId = member.getId();
            String role = member.getRole().name();

            String jwtToken = jwtUtil.generateToken(userDetails, memberId, role);

            // IP 주소 정보 가져오기
            String ipAddress = request.getRemoteAddr();
            userActivityLogService.logActivity(memberId, "LOGIN_SUCCESS", "User logged in successfully", ipAddress);
            return ResponseEntity.ok().body("login succeed " + jwtToken);
        } catch (Exception e) {
            String ipAddress = request.getRemoteAddr();
            userActivityLogService.logActivity(null, "LOGIN_FAILED", "Login attempt failed for email: " + loginRequest.getEmail(), ipAddress);
            return ResponseEntity.status(401).body("login failed: " + e.getMessage());
        }
    }
    @PostMapping("/register")
    public ResponseEntity<?> registerMember(@RequestBody RegisterRequest registerRequest) {
        try {
            Member member = new Member();
            member.setEmail(registerRequest.getEmail());
            member.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
            member.setUsername(registerRequest.getUsername());
            member.setNickname(registerRequest.getNickname());
            member.setGender(registerRequest.getGender());
            member.setAge(registerRequest.getAge());
            member.setPhonenumber(registerRequest.getPhonenumber());
            member.setRole(Member.Role.MEMBER); // 기본적으로 MEMBER 역할 부여
            memberService.save(member);
            return ResponseEntity.ok().body("Membership registration successful");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error: " + e.getMessage());
        }
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
    public ResponseEntity<?> verifyEmail(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String code = request.get("code");

        if (email == null || code == null) {
            return ResponseEntity.status(400).body("Email and code are required.");
        }
        boolean isVerified = verificationService.verifyCode(email, code);
        if (isVerified) {
            return ResponseEntity.ok("Email verified successfully.");
        } else {
            return ResponseEntity.status(400).body("Invalid verification code.");
        }
    }


    @DeleteMapping("/logout")
    public ResponseEntity<String> logout(@RequestHeader("Authorization") String token) {
        SecurityContextHolder.getContext().setAuthentication(null);
        return ResponseEntity.ok("Logout successful");
    }

    @PostMapping("/socialing/{socialingId}/interest")
    public ResponseEntity<?> addInterestSocialing(@PathVariable Long socialingId, HttpServletRequest request) {
        // 현재 로그인한 사용자의 정보를 가져옴
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String email = userDetails.getUsername();
        Member member = memberService.findByEmail(email);

        // 관심 소셜링 추가
        memberService.addFavoriteSocialing(member.getId(), socialingId);

        // IP 주소 가져오기
        String ipAddress = request.getRemoteAddr();

        // 로그 저장
        userActivityLogService.logActivity(member.getId(), "ADD_INTEREST_SOCIALING", "User added interest for socialing ID: " + socialingId, ipAddress);

        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/socialing/{socialingId}/interest")
    public ResponseEntity<String> removeInterestSocialing(@PathVariable Long socialingId, HttpServletRequest request) {
        // 현재 로그인한 사용자의 정보를 가져옴
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String email = userDetails.getUsername();
        Member member = memberService.findByEmail(email);

        // 관심 소셜링 삭제
        memberService.cancelFavoriteSocialing(member.getId(), socialingId);

        // IP 주소 가져오기
        String ipAddress = request.getRemoteAddr();

        // 로그 저장
        userActivityLogService.logActivity(member.getId(), "REMOVE_INTEREST_SOCIALING", "User removed interest for socialing ID: " + socialingId, ipAddress);

        return ResponseEntity.ok("Interest socialing removed successfully");
    }

    @GetMapping("/interest/me")
    public ResponseEntity<List<SocialingListResponse>> getFavoriteSocialings(Principal principal) {
        Member member = memberService.findByEmail(principal.getName());
        List<SocialingListResponse> favoriteSocialings = memberService.getFavoriteSocialings(member.getId());
        return ResponseEntity.ok().body(favoriteSocialings);
    }

    @GetMapping("/{id}/isFavorite")
    public ResponseEntity<Map<String, Object>> isFavorite(@PathVariable Long id) {
        Map<String, Object> response = new HashMap<>();
        try {
            // 현재 로그인한 사용자의 정보를 가져옴
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String email = userDetails.getUsername();
            Member member = memberService.findByEmail(email);

            // 관심있는 소셜링 여부를 확인
            boolean isFavorite = memberService.isFavoriteSocialing(member.getId(), id);
            response.put("isFavorite", isFavorite);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            response.put("isFavorite", false);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || authentication.getPrincipal() == "anonymousUser") {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        Member member = memberService.findByEmail(userDetails.getUsername());

        // 사용자 정보에서 name을 포함하여 반환
        Map<String, String> userInfo = new HashMap<>();
        userInfo.put("Email", member.getEmail());
        userInfo.put("Nickname", member.getNickname());

        return ResponseEntity.ok(userInfo);
    }

    @PutMapping("members/{userId}")
    public ResponseEntity<MemberDto> updateMember(@PathVariable UUID userId, @RequestBody UpdateMemberRequest updateMemberRequest) {
        MemberDto updatedMember = memberService.updateMember(userId, updateMemberRequest);
        return ResponseEntity.ok(updatedMember);
    }

    @GetMapping("/check-email")
    public ResponseEntity<?> checkEmail(@RequestParam String email) {
        boolean isAvailable = memberService.isEmailAvailable(email);
        if (isAvailable) {
            return ResponseEntity.ok().body("사용 가능한 이메일입니다.");
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 사용 중인 이메일입니다.");
        }
    }

    @GetMapping("/check-nickname")
    public ResponseEntity<?> checkNickname(@RequestParam String nickname) {
        boolean isAvailable = memberService.isNicknameAvailable(nickname);
        if (isAvailable) {
            return ResponseEntity.ok().body("사용 가능한 닉네임입니다.");
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("이미 사용 중인 닉네임입니다.");
        }
    }
}