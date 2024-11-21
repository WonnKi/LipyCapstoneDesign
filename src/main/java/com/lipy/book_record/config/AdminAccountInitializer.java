//package com.lipy.book_record.config;
//
//import com.lipy.book_record.entity.Member;
//import com.lipy.book_record.service.MemberService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.stereotype.Component;
//
//@Component
//public class AdminAccountInitializer implements CommandLineRunner {
//
//        @Autowired
//        private MemberService memberService;  // MemberService를 통해 사용자 관리
//
//        @Autowired
//        private PasswordEncoder passwordEncoder;  // 비밀번호 암호화용
//
//        @Override
//        public void run(String... args) throws Exception {
//                Member admin = new Member();
//                admin.setEmail("admin@naver.com");
//                admin.setPassword(passwordEncoder.encode("admin123"));  // 비밀번호 암호화
//                admin.setUsername("admin");
//                admin.setNickname("admin");
//                admin.setAge(22);
//                admin.setGender("남");
//                admin.setPhonenumber("01012345678");
//                admin.setRole(Member.Role.ADMIN);  // ADMIN 역할 설정
//
//            Member member = new Member();
//            member.setEmail("skyblue@naver.com");
//            member.setPassword(passwordEncoder.encode("123")); // 비밀번호 암호화
//            member.setUsername("홍길동");
//            member.setNickname("바람의아이");
//            member.setAge(30);
//            member.setGender("남");
//            member.setPhonenumber("01012345678");
//            member.setRole(Member.Role.MEMBER);
//
////            Member member1 = new Member();
////            member1.setEmail("sunshine123@naver.com");
////            member1.setPassword(passwordEncoder.encode("123"));
////            member1.setUsername("이지호");
////            member1.setNickname("햇살사랑");
////            member1.setAge(25);
////            member1.setGender("남");
////            member1.setPhonenumber("01023456789");
////            member1.setRole(Member.Role.MEMBER);
////
////            Member member2 = new Member();
////            member2.setEmail("flowerpower@naver.com");
////            member2.setPassword(passwordEncoder.encode("123"));
////            member2.setUsername("김하린");
////            member2.setNickname("꽃길여정");
////            member2.setAge(28);
////            member2.setGender("여");
////            member2.setPhonenumber("01034567890");
////            member2.setRole(Member.Role.MEMBER);
////
////            Member member3 = new Member();
////            member3.setEmail("oceanbreeze@naver.com");
////            member3.setPassword(passwordEncoder.encode("123"));
////            member3.setUsername("최수혁");
////            member3.setNickname("바다의속삭임");
////            member3.setAge(32);
////            member3.setGender("남");
////            member3.setPhonenumber("01045678901");
////            member3.setRole(Member.Role.MEMBER);
////
////            Member member4 = new Member();
////            member4.setEmail("starlight99@naver.com");
////            member4.setPassword(passwordEncoder.encode("123"));
////            member4.setUsername("장미연");
////            member4.setNickname("별빛찬란");
////            member4.setAge(29);
////            member4.setGender("여");
////            member4.setPhonenumber("01056789012");
////            member4.setRole(Member.Role.MEMBER);
////
////            Member member5 = new Member();
////            member5.setEmail("forestwalker@naver.com");
////            member5.setPassword(passwordEncoder.encode("123"));
////            member5.setUsername("한상준");
////            member5.setNickname("숲속방랑자");
////            member5.setAge(27);
////            member5.setGender("남");
////            member5.setPhonenumber("01067890123");
////            member5.setRole(Member.Role.MEMBER);
////
////            Member member6 = new Member();
////            member6.setEmail("purplehaze@naver.com");
////            member6.setPassword(passwordEncoder.encode("123"));
////            member6.setUsername("이하늘");
////            member6.setNickname("보랏빛향기");
////            member6.setAge(24);
////            member6.setGender("여");
////            member6.setPhonenumber("01078901234");
////            member6.setRole(Member.Role.MEMBER);
////
////            Member member7 = new Member();
////            member7.setEmail("sunnyday@naver.com");
////            member7.setPassword(passwordEncoder.encode("123"));
////            member7.setUsername("정도현");
////            member7.setNickname("햇빛가득");
////            member7.setAge(33);
////            member7.setGender("남");
////            member7.setPhonenumber("01089012345");
////            member7.setRole(Member.Role.MEMBER);
////
////            Member member8 = new Member();
////            member8.setEmail("mistymountains@naver.com");
////            member8.setPassword(passwordEncoder.encode("123"));
////            member8.setUsername("박소민");
////            member8.setNickname("안개산책");
////            member8.setAge(26);
////            member8.setGender("여");
////            member8.setPhonenumber("01090123456");
////            member8.setRole(Member.Role.MEMBER);
////
////            Member member9 = new Member();
////            member9.setEmail("goldenhour@naver.com");
////            member9.setPassword(passwordEncoder.encode("123"));
////            member9.setUsername("윤지훈");
////            member9.setNickname("황금빛순간");
////            member9.setAge(31);
////            member9.setGender("남");
////            member9.setPhonenumber("01001234567");
////            member9.setRole(Member.Role.MEMBER);
////
////            Member member10 = new Member();
////            member10.setEmail("silvercloud@naver.com");
////            member10.setPassword(passwordEncoder.encode("123"));
////            member10.setUsername("김민정");
////            member10.setNickname("은빛구름");
////            member10.setAge(27);
////            member10.setGender("여");
////            member10.setPhonenumber("01012345000");
////            member10.setRole(Member.Role.MEMBER);
////
////            Member member11 = new Member();
////            member11.setEmail("bluewhale@naver.com");
////            member11.setPassword(passwordEncoder.encode("123"));
////            member11.setUsername("서준호");
////            member11.setNickname("바다고래");
////            member11.setAge(35);
////            member11.setGender("남");
////            member11.setPhonenumber("01023456000");
////            member11.setRole(Member.Role.MEMBER);
////
////            Member member12 = new Member();
////            member12.setEmail("rainyday@naver.com");
////            member12.setPassword(passwordEncoder.encode("123"));
////            member12.setUsername("이현아");
////            member12.setNickname("비오는날");
////            member12.setAge(30);
////            member12.setGender("여");
////            member12.setPhonenumber("01034567000");
////            member12.setRole(Member.Role.MEMBER);
////
////            Member member13 = new Member();
////            member13.setEmail("moondust@naver.com");
////            member13.setPassword(passwordEncoder.encode("123"));
////            member13.setUsername("홍성민");
////            member13.setNickname("달빛의향기");
////            member13.setAge(29);
////            member13.setGender("남");
////            member13.setPhonenumber("01045678000");
////            member13.setRole(Member.Role.MEMBER);
////
////            Member member14 = new Member();
////            member14.setEmail("frostyday@naver.com");
////            member14.setPassword(passwordEncoder.encode("123"));
////            member14.setUsername("김수연");
////            member14.setNickname("서리빛아침");
////            member14.setAge(32);
////            member14.setGender("여");
////            member14.setPhonenumber("01056789000");
////            member14.setRole(Member.Role.MEMBER);
////
////            Member member15 = new Member();
////            member15.setEmail("twilightsky@naver.com");
////            member15.setPassword(passwordEncoder.encode("123"));
////            member15.setUsername("이재훈");
////            member15.setNickname("황혼하늘");
////            member15.setAge(28);
////            member15.setGender("남");
////            member15.setPhonenumber("01067890000");
////            member15.setRole(Member.Role.MEMBER);
////
////            Member member16 = new Member();
////            member16.setEmail("lavenderdream@naver.com");
////            member16.setPassword(passwordEncoder.encode("123"));
////            member16.setUsername("박다영");
////            member16.setNickname("라벤더향기");
////            member16.setAge(25);
////            member16.setGender("여");
////            member16.setPhonenumber("01078901000");
////            member16.setRole(Member.Role.MEMBER);
////
////            Member member17 = new Member();
////            member17.setEmail("aurorasky@naver.com");
////            member17.setPassword(passwordEncoder.encode("123"));
////            member17.setUsername("최영민");
////            member17.setNickname("오로라하늘");
////            member17.setAge(31);
////            member17.setGender("남");
////            member17.setPhonenumber("01089012000");
////            member17.setRole(Member.Role.MEMBER);
////
////            Member member18 = new Member();
////            member18.setEmail("springbreeze@naver.com");
////            member18.setPassword(passwordEncoder.encode("123"));
////            member18.setUsername("김서현");
////            member18.setNickname("봄바람속삭임");
////            member18.setAge(29);
////            member18.setGender("여");
////            member18.setPhonenumber("01090123000");
////            member18.setRole(Member.Role.MEMBER);
////
////            Member member19 = new Member();
////            member19.setEmail("autumnday@naver.com");
////            member19.setPassword(passwordEncoder.encode("123"));
////            member19.setUsername("한지훈");
////            member19.setNickname("가을속기억");
////            member19.setAge(34);
////            member19.setGender("남");
////            member19.setPhonenumber("01001234000");
////            member19.setRole(Member.Role.MEMBER);
////
////            Member member20 = new Member();
////            member20.setEmail("starrynight@naver.com");
////            member20.setPassword(passwordEncoder.encode("123"));
////            member20.setUsername("강민수");
////            member20.setNickname("별헤는밤");
////            member20.setAge(27);
////            member20.setGender("남");
////            member20.setPhonenumber("01034567001");
////            member20.setRole(Member.Role.MEMBER);
////
////            Member member21 = new Member();
////            member21.setEmail("morningdew@naver.com");
////            member21.setPassword(passwordEncoder.encode("123"));
////            member21.setUsername("유나연");
////            member21.setNickname("새벽이슬");
////            member21.setAge(26);
////            member21.setGender("여");
////            member21.setPhonenumber("01045678001");
////            member21.setRole(Member.Role.MEMBER);
////
////            Member member22 = new Member();
////            member22.setEmail("summerheat@naver.com");
////            member22.setPassword(passwordEncoder.encode("123"));
////            member22.setUsername("조성훈");
////            member22.setNickname("여름의열기");
////            member22.setAge(28);
////            member22.setGender("남");
////            member22.setPhonenumber("01056789001");
////            member22.setRole(Member.Role.MEMBER);
////
////            Member member23 = new Member();
////            member23.setEmail("winterwhisper@naver.com");
////            member23.setPassword(passwordEncoder.encode("123"));
////            member23.setUsername("임소희");
////            member23.setNickname("겨울의속삭임");
////            member23.setAge(24);
////            member23.setGender("여");
////            member23.setPhonenumber("01067890001");
////            member23.setRole(Member.Role.MEMBER);
////
////            Member member24 = new Member();
////            member24.setEmail("raindrops@naver.com");
////            member24.setPassword(passwordEncoder.encode("123"));
////            member24.setUsername("오준수");
////            member24.setNickname("비내리는날");
////            member24.setAge(30);
////            member24.setGender("남");
////            member24.setPhonenumber("01078901001");
////            member24.setRole(Member.Role.MEMBER);
////
////            Member member25 = new Member();
////            member25.setEmail("dreamcatcher@naver.com");
////            member25.setPassword(passwordEncoder.encode("123"));
////            member25.setUsername("최하영");
////            member25.setNickname("꿈꾸는자");
////            member25.setAge(29);
////            member25.setGender("여");
////            member25.setPhonenumber("01089012001");
////            member25.setRole(Member.Role.MEMBER);
////
////            Member member26 = new Member();
////            member26.setEmail("wildflower@naver.com");
////            member26.setPassword(passwordEncoder.encode("123"));
////            member26.setUsername("서태호");
////            member26.setNickname("들꽃향기");
////            member26.setAge(31);
////            member26.setGender("남");
////            member26.setPhonenumber("01090123001");
////            member26.setRole(Member.Role.MEMBER);
////
////            Member member27 = new Member();
////            member27.setEmail("firefly@naver.com");
////            member27.setPassword(passwordEncoder.encode("123"));
////            member27.setUsername("김다솜");
////            member27.setNickname("반딧불이");
////            member27.setAge(23);
////            member27.setGender("여");
////            member27.setPhonenumber("01001234001");
////            member27.setRole(Member.Role.MEMBER);
////
////            Member member28 = new Member();
////            member28.setEmail("mysticriver@naver.com");
////            member28.setPassword(passwordEncoder.encode("123"));
////            member28.setUsername("윤재호");
////            member28.setNickname("신비의강");
////            member28.setAge(32);
////            member28.setGender("남");
////            member28.setPhonenumber("01012345001");
////            member28.setRole(Member.Role.MEMBER);
////
////            Member member29 = new Member();
////            member29.setEmail("hiddenforest@naver.com");
////            member29.setPassword(passwordEncoder.encode("123"));
////            member29.setUsername("박지민");
////            member29.setNickname("숲의속삭임");
////            member29.setAge(27);
////            member29.setGender("여");
////            member29.setPhonenumber("01023456001");
////            member29.setRole(Member.Role.MEMBER);
////
////
////
////            /*List<Member> members = new ArrayList<>();
////
////            for (int i = 1; i <= 10; i++) {
////            Member member = new Member();
////            member.setEmail("member" + i + "@naver.com");
////            member.setPassword(passwordEncoder.encode("member123"));  // 비밀번호 암호화
////            member.setUsername("홍길동" + i);
////            member.setNickname("의정부사람" + i);
////            member.setAge(20 + i);  // 나이 21부터 30까지 설정
////            member.setGender(i % 2 == 0 ? "남" : "여");  // 짝수는 남, 홀수는 여
////            member.setRole(Member.Role.MEMBER);  // MEMBER 역할 설정
////
////            members.add(member);
////            }
////            * */
////
////
////            memberService.save(member1);
////            memberService.save(member2);
////            memberService.save(member3);
////            memberService.save(member4);
////            memberService.save(member5);
////            memberService.save(member6);
////            memberService.save(member7);
////            memberService.save(member8);
////            memberService.save(member9);
////            memberService.save(member10);
////            memberService.save(member11);
////            memberService.save(member12);
////            memberService.save(member13);
////            memberService.save(member14);
////            memberService.save(member15);
////            memberService.save(member16);
////            memberService.save(member17);
////            memberService.save(member18);
////            memberService.save(member19);
////            memberService.save(member20);
////            memberService.save(member21);
////            memberService.save(member22);
////            memberService.save(member23);
////            memberService.save(member24);
////            memberService.save(member25);
////            memberService.save(member26);
////            memberService.save(member27);
////            memberService.save(member28);
////            memberService.save(member29);
////
////            memberService.save(admin);
//            memberService.save(member);
//            System.out.println("Admin account created: admin@example.com");
//        }
//}