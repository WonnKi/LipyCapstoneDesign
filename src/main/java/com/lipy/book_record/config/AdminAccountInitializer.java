package com.lipy.book_record.config;

import com.lipy.book_record.entity.Member;
import com.lipy.book_record.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminAccountInitializer implements CommandLineRunner {

    @Autowired
    private MemberService memberService;  // MemberService를 통해 사용자 관리

    @Autowired
    private PasswordEncoder passwordEncoder;  // 비밀번호 암호화용

    @Override
    public void run(String... args) throws Exception {
        // 이메일을 기반으로 Admin 계정이 있는지 확인
            Member admin = new Member();
            admin.setEmail("admin@naver.com");
            admin.setPassword(passwordEncoder.encode("admin123"));  // 비밀번호 암호화
            admin.setUsername("admin");
            admin.setNickname("Administrator");
            admin.setRole(Member.Role.ADMIN);  // ADMIN 역할 설정
            memberService.save(admin);
            System.out.println("Admin account created: admin@example.com");
    }
}
