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
                admin.setNickname("admin");
                admin.setAge(22);
                admin.setGender("남");
                admin.setPhonenumber("01012345678");
                admin.setRole(Member.Role.ADMIN);  // ADMIN 역할 설정

                Member member = new Member();
                member.setEmail("member@naver.com");
                member.setPassword(passwordEncoder.encode("123"));  // 비밀번호 암호화
                member.setUsername("홍길동");
                member.setNickname("유저1");
                member.setAge(30);
                member.setGender("남");
                member.setPhonenumber("01012345678");
                member.setRole(Member.Role.MEMBER);  // MEMBER 역할 설정

                Member member1 = new Member();
                member1.setEmail("member1@naver.com");
                member1.setPassword(passwordEncoder.encode("123"));
                member1.setUsername("이지호");
                member1.setNickname("유저2");
                member1.setAge(25);
                member1.setGender("남");
                member1.setPhonenumber("01012345678");
                member1.setRole(Member.Role.MEMBER);

                Member member2 = new Member();
                member2.setEmail("member2@naver.com");
                member2.setPassword(passwordEncoder.encode("123"));
                member2.setUsername("김하린");
                member2.setNickname("유저3");
                member2.setAge(30);
                member2.setGender("여");
                member2.setPhonenumber("01012345678");
                member2.setRole(Member.Role.MEMBER);

                Member member3 = new Member();
                member3.setEmail("member3@naver.com");
                member3.setPassword(passwordEncoder.encode("123"));
                member3.setUsername("최민준");
                member3.setNickname("유저4");
                member3.setAge(28);
                member3.setGender("남");
                member3.setPhonenumber("01012345678");
                member3.setRole(Member.Role.MEMBER);

                Member member4 = new Member();
                member4.setEmail("member4@naver.com");
                member4.setPassword(passwordEncoder.encode("123"));
                member4.setUsername("박서윤");
                member4.setNickname("유저5");
                member4.setAge(22);
                member4.setGender("여");
                member4.setPhonenumber("01012345678");
                member4.setRole(Member.Role.MEMBER);

                Member member5 = new Member();
                member5.setEmail("member5@naver.com");
                member5.setPassword(passwordEncoder.encode("123"));
                member5.setUsername("한시우");
                member5.setNickname("유저6");
                member5.setAge(35);
                member5.setGender("남");
                member5.setPhonenumber("01012345678");
                member5.setRole(Member.Role.MEMBER);

                Member member6 = new Member();
                member6.setEmail("member6@naver.com");
                member6.setPassword(passwordEncoder.encode("123"));
                member6.setUsername("장다연");
                member6.setNickname("유저7");
                member6.setAge(29);
                member6.setGender("여");
                member6.setPhonenumber("01012345678");
                member6.setRole(Member.Role.MEMBER);

                Member member7 = new Member();
                member7.setEmail("member7@naver.com");
                member7.setPassword(passwordEncoder.encode("123"));
                member7.setUsername("백윤재");
                member7.setNickname("유저8");
                member7.setAge(24);
                member7.setGender("남");
                member7.setPhonenumber("01012345678");
                member7.setRole(Member.Role.MEMBER);

                Member member8 = new Member();
                member8.setEmail("member8@naver.com");
                member8.setPassword(passwordEncoder.encode("123"));
                member8.setUsername("오수현");
                member8.setNickname("유저9");
                member8.setAge(32);
                member8.setGender("여");
                member8.setPhonenumber("01012345678");
                member8.setRole(Member.Role.MEMBER);

                Member member9 = new Member();
                member9.setEmail("member9@naver.com");
                member9.setPassword(passwordEncoder.encode("123"));
                member9.setUsername("정준서");
                member9.setNickname("유저10");
                member9.setAge(27);
                member9.setGender("남");
                member9.setPhonenumber("01012345678");
                member9.setRole(Member.Role.MEMBER);

                Member member10 = new Member();
                member10.setEmail("member10@naver.com");
                member10.setPassword(passwordEncoder.encode("123"));
                member10.setUsername("박하랑");
                member10.setNickname("유저11");
                member10.setAge(31);
                member10.setGender("여");
                member10.setPhonenumber("01012345678");
                member10.setRole(Member.Role.MEMBER);

            /*List<Member> members = new ArrayList<>();

            for (int i = 1; i <= 10; i++) {
            Member member = new Member();
            member.setEmail("member" + i + "@naver.com");
            member.setPassword(passwordEncoder.encode("member123"));  // 비밀번호 암호화
            member.setUsername("홍길동" + i);
            member.setNickname("의정부사람" + i);
            member.setAge(20 + i);  // 나이 21부터 30까지 설정
            member.setGender(i % 2 == 0 ? "남" : "여");  // 짝수는 남, 홀수는 여
            member.setRole(Member.Role.MEMBER);  // MEMBER 역할 설정

            members.add(member);
            }
            * */

                memberService.save(member);
                memberService.save(member1);
                memberService.save(member2);
                memberService.save(member3);
                memberService.save(member4);
                memberService.save(member5);
                memberService.save(member6);
                memberService.save(member7);
                memberService.save(member8);
                memberService.save(member9);
                memberService.save(member10);
                memberService.save(admin);
                System.out.println("Admin account created: admin@example.com");
        }
}