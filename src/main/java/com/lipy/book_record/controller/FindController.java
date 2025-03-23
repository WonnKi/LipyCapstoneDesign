package com.lipy.book_record.controller;

import com.lipy.book_record.entity.Member;
import com.lipy.book_record.repository.MemberRepository;
import com.lipy.book_record.service.EmailService;
import com.lipy.book_record.service.FindService;
import com.lipy.book_record.service.MemberService;
import com.lipy.book_record.service.VerificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/find")
@RequiredArgsConstructor
public class FindController {
    private final FindService findService;
    private final MemberRepository memberRepository;
    private final VerificationService verificationService;
    private final EmailService emailService;

    @PostMapping("/id/{userName}")
    public ResponseEntity<String> findEmail(@PathVariable("userName") String name){
        return ResponseEntity.ok(findService.findId(name));
    }
    
    // 메일 보내기
    @PostMapping("/password/request")
    public ResponseEntity<?> requestPasswordReset(@RequestBody Map<String, String> request) {
        String email = request.get("email");

        // 이메일이 존재하는지 확인
        Member user = memberRepository.findByEmail(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No user found with this email.");
        }

        // 인증 코드 생성 및 저장
        String verificationCode = verificationService.generateVerificationCode();
        verificationService.saveVerificationCode(email, verificationCode);

        // 인증 코드 이메일 전송
        emailService.sendVerificationCode(email, verificationCode);

        return ResponseEntity.ok("Verification code sent to your email.");
    }
    
    // 인증 확인하기
    @PostMapping("/password/verify")
    public ResponseEntity<?> verifyResetCode(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String code = request.get("code");

        boolean isVerified = verificationService.verifyCode(email, code);
        if (isVerified) {
            return ResponseEntity.ok("Verification successful. You can now reset your password.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid verification code.");
        }
    }
}
