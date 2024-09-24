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
        List<Member> members = MemberRep.findByEmail(email);
        return members.stream().map(MemberDto::new).toList();
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
