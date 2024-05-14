package com.lipy.book_record.service;

import com.lipy.book_record.entity.Member;
import com.lipy.book_record.entity.Socialing;
import com.lipy.book_record.entity.SocialingApplication;
import com.lipy.book_record.repository.MemberRepository;
import com.lipy.book_record.repository.SocialingApplicationRepository;
import com.lipy.book_record.repository.SocialingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SocialingApplicationService {
    private final MemberRepository memberRepository;
    private final SocialingApplicationRepository socialingApplicationRepository;
    private final SocialingRepository socialingRepository;


    public Long applyForSocialing(Long userId, Long socialingId) {
        Member user = memberRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
        Socialing socialing = socialingRepository.findById(socialingId)
                .orElseThrow(() -> new RuntimeException("소셜링을 찾을 수 없습니다."));

        if (socialing.isFull()) {
            throw new IllegalArgumentException("소셜링의 최대 참여자 수를 초과했습니다.");
        }

        if (userAlreadyApplied(user, socialing)) {
            throw new IllegalArgumentException("이미 소셜링에 신청하셨습니다.");
        }

        SocialingApplication socialingApplication = socialingApplicationRepository.save(
                SocialingApplication.builder()
                        .member(user)
                        .socialing(socialing)
                        .build());

        socialing.addApplication(socialingApplication);
        socialing.increaseParticipants(); // 현재 참여자 수 증가
        socialingRepository.save(socialing);

        return socialingApplication.getId();
    }

    public List<String> findApplicantInfoBySocialingId(Long socialingId) {
        List<SocialingApplication> applications = socialingApplicationRepository.findBySocialingId(socialingId);
        return applications.stream().map(app -> app.getMember().getUsername() + " (" + app.getMember().getEmail() + ")").collect(Collectors.toList());
    }
    private boolean userAlreadyApplied(Member user, Socialing socialing) {
        return socialing.getApplications().stream()
                .anyMatch(application -> application.getMember().getId().equals(user.getId()));
    }

    public void cancelSocialingApplication(Long applicationId) {
        SocialingApplication socialingApplication = socialingApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Socialing application not found."));

        // 소셜링 참여자 수 감소
        Socialing socialing = socialingApplication.getSocialing();
        socialing.decreaseParticipants(); // 현재 참여자 수 감소
        socialingRepository.save(socialing); // 변경된 소셜링 정보 저장

        // 소셜링 신청 삭제
        socialingApplicationRepository.delete(socialingApplication);
    }
}