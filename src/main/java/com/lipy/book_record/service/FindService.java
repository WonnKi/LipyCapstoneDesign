package com.lipy.book_record.service;

import com.lipy.book_record.entity.Member;
import com.lipy.book_record.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FindService {
    private final MemberRepository memberRep;

    public String findId(String name){
        Member member = memberRep.findByUsername(name).get(0);
        return member.getEmail();
    }

    public String findPwd(String email){
        return "테스트";
    }
}
