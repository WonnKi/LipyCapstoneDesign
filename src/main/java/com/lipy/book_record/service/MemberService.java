package com.lipy.book_record.service;

import com.lipy.book_record.dto.SocialingListResponse;
import com.lipy.book_record.entity.Member;
import com.lipy.book_record.entity.Socialing;
import com.lipy.book_record.repository.MemberRepository;
import com.lipy.book_record.repository.SocialingRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberService {
//    @Autowired
//    private MemberRepository memberRepository;
//    @Autowired
//    private SocialingRepository socialingRepository;

    private final MemberRepository memberRepository;
    private final SocialingRepository socialingRepository;

    @Autowired
    public MemberService(MemberRepository memberRepository, SocialingRepository socialingRepository) {
        this.memberRepository = memberRepository;
        this.socialingRepository = socialingRepository;
    }

    public void save(Member member) {
        memberRepository.save(member);
    }

    public Member findByUsername(String username) {
        return memberRepository.findByUsername(username);
    }

    private SocialingListResponse mapToSocialingListResponse(Socialing socialing) {
        return new SocialingListResponse(
                socialing.getId(),
                socialing.getTitle(),
                socialing.getDescription(),
                socialing.getWriter(),
                socialing.getCurrentparticipants(),
                socialing.getMaxparticipants(),
                socialing.getDate()
        );
    }
    public List<SocialingListResponse> getFavoriteSocialings(Long memberId) { //관심있는 소셜링 가져오기
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new EntityNotFoundException("Member not found with id: " + memberId));

        return member.getFavoriteSocialings().stream()
                .map(this::mapToSocialingListResponse)
                .toList();
    }

    public void cancelFavoriteSocialing(Long memberId, Long socialingId) {
        Socialing socialing = socialingRepository.findById(socialingId)
                .orElseThrow(() -> new RuntimeException("소셜링을 찾을 수 없습니다."));
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("멤버를 찾을 수 없습니다."));

        socialing.removeInterestedMember(member);
        member.removeFavoriteSocialing(socialing);

        socialingRepository.save(socialing);
        memberRepository.save(member);
    }

    public void addFavoriteSocialing(Long memberId, Long socialingId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("Member not found with id: " + memberId));

        Socialing socialing = socialingRepository.findById(socialingId)
                .orElseThrow(() -> new IllegalArgumentException("Socialing not found with id: " + socialingId));

        // 멤버의 즐겨찾기에 소셜링 추가
        member.getFavoriteSocialings().add(socialing);
        memberRepository.save(member);
    }

    public boolean isInterestSocialing(Long memberId, Long socialingId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return member.getFavoriteSocialings().stream().anyMatch(socialing -> socialing.getId().equals(socialingId));
    }
}