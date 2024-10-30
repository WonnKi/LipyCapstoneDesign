package com.lipy.book_record.service;

import com.lipy.book_record.dto.MemberDto;
import com.lipy.book_record.dto.SocialingListResponse;
import com.lipy.book_record.dto.UpdateMemberRequest;
import com.lipy.book_record.entity.Member;
import com.lipy.book_record.entity.Socialing;
import com.lipy.book_record.repository.MemberRepository;
import com.lipy.book_record.repository.SocialingRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class MemberService  {
    private final MemberRepository memberRepository;
    private final SocialingRepository socialingRepository;
    private final PasswordEncoder passwordEncoder;

    public void save(Member member) {
        memberRepository.save(member);
    }

    public Member findByEmail(String email) {
        Optional<Member> memberOptional = Optional.ofNullable(memberRepository.findByEmail(email));
        return memberOptional.orElse(null);
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

    public boolean isFavoriteSocialing(UUID memberId, Long socialingId) {
        Member member =  memberRepository.findById(memberId).orElse(null);
        if (member == null) {
            throw new IllegalArgumentException("Invalid member ID");
        }

        // 관심있는 소셜링 목록에서 확인
        return member.getFavoriteSocialings().stream()
                .anyMatch(socialing -> socialing.getId().equals(socialingId));
    }

    public List<SocialingListResponse> getFavoriteSocialings(UUID memberId) { //관심있는 소셜링 가져오기
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new EntityNotFoundException("Member not found with id: " + memberId));

        return member.getFavoriteSocialings().stream()
                .map(this::mapToSocialingListResponse)
                .toList();
    }

    public void cancelFavoriteSocialing(UUID memberId, Long socialingId) {
        Socialing socialing = socialingRepository.findById(socialingId)
                .orElseThrow(() -> new RuntimeException("소셜링을 찾을 수 없습니다."));
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("멤버를 찾을 수 없습니다."));

        socialing.removeInterestedMember(member);
        member.removeFavoriteSocialing(socialing);

        socialingRepository.save(socialing);
        memberRepository.save(member);
    }

    public void addFavoriteSocialing(UUID memberId, Long socialingId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("Member not found with id: " + memberId));

        Socialing socialing = socialingRepository.findById(socialingId)
                .orElseThrow(() -> new IllegalArgumentException("Socialing not found with id: " + socialingId));

        // 멤버의 즐겨찾기에 소셜링 추가
        member.getFavoriteSocialings().add(socialing);
        memberRepository.save(member);
    }

    @Transactional
    public MemberDto updateMember(UUID userId, UpdateMemberRequest updateMemberRequest) {
        // 기존 회원 정보 조회
        Member member = memberRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        // 회원 정보 업데이트
        member.setEmail(updateMemberRequest.getEmail());
        member.setUsername(updateMemberRequest.getUsername());
        member.setNickname(updateMemberRequest.getNickname());
        member.setGender(updateMemberRequest.getGender());
        member.setAge(updateMemberRequest.getAge());
        member.setPhonenumber(updateMemberRequest.getPhonenumber());

        if (updateMemberRequest.getPassword() != null && !updateMemberRequest.getPassword().isEmpty()) {
            String encodedPassword = passwordEncoder.encode(updateMemberRequest.getPassword());
            member.setPassword(encodedPassword); // 비밀번호 암호화 후 저장
        }

        memberRepository.save(member);
        return new MemberDto(member);
    }
}