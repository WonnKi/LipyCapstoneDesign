package com.lipy.book_record.controller;

import com.lipy.book_record.dto.MessageDto;
import com.lipy.book_record.entity.Member;
import com.lipy.book_record.repository.MemberRepository;
import com.lipy.book_record.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class MessageController {
    private final MessageService messageService;
    private final MemberRepository memberRepository;

    public ResponseEntity<String> sendMessage(@RequestBody MessageDto messageDto){
        Member member = memberRepository.findById(null).orElseThrow(()->{
            return new IllegalArgumentException("유저를 찾을 수 없습니다.");
        });
        messageDto.setSenderName(member.getUsername());

        return null;
    }
}
