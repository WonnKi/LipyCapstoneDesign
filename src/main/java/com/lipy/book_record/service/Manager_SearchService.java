package com.lipy.book_record.service;

import com.lipy.book_record.dto.MemberDto;
import com.lipy.book_record.entity.Member;
import com.lipy.book_record.repository.MemberRepository;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class Manager_SearchService {
    private final MemberRepository MemberRep;

    public List<MemberDto> searchAll(){
        return MemberRep
                .findAll()
                .stream()
                .map(MemberDto::new)
                .toList();
    }

    public List<MemberDto> searchDetail(String email, String name, String nickname) {
        if (email != null) {
            return searchByEmail(email);
        } else if (name != null) {
            return searchByName(name);
        } else if (nickname != null) {
            return searchByNickname(nickname);
        } else {
            throw new IllegalArgumentException("검색 조건이 제공되지 않았습니다.");
        }
    }

    private List<MemberDto> searchByEmail(String email) {
        Member member = MemberRep.findByEmail(email);  // 단일 Member 객체 반환
        if (member != null) {
            return List.of(new MemberDto(member));  // 단일 MemberDto를 리스트로 감싸서 반환
        } else {
            return List.of();  // 멤버가 없을 경우 빈 리스트 반환
        }
    }

    private List<MemberDto> searchByName(String name) {
        List<Member> members = MemberRep.findByUsername(name);
        return members.stream().map(MemberDto::new).toList();
    }

    private List<MemberDto> searchByNickname(String nickname) {
        List<Member> members = MemberRep.findByNickname(nickname);
        return members.stream().map(MemberDto::new).toList();
    }

}