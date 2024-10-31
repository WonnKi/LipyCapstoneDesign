package com.lipy.book_record.controller;

import com.lipy.book_record.dto.MessageDto;
import com.lipy.book_record.entity.Member;
import com.lipy.book_record.repository.MemberRepository;
import com.lipy.book_record.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@RestController("/messages")
public class MessageController {
    private final MessageService messageService;
    private final MemberRepository memberRepository;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/send/{id}")
    public ResponseEntity<String> sendMessage(@RequestBody MessageDto messageDto, @PathVariable("id")UUID id){
        Member member = memberRepository.findById(id).orElseThrow(()->{
            return new IllegalArgumentException("유저를 찾을 수 없습니다.");
        });
        messageDto.setSenderName(member.getUsername());
        messageService.write(messageDto);

        return ResponseEntity.ok("쪽지를 보냈습니다.");
    }

    @GetMapping("/received/{id}")
    public List<MessageDto> getReceivedMessage(@PathVariable("id") UUID id){
        Member member = memberRepository.findById(id).orElseThrow(()->{
            return new IllegalArgumentException("유저를 찾을 수 없습니다.");
        });
        return messageService.receivedMessage(member);
    }

    @DeleteMapping("received/{userId}/{messageId}")
    public ResponseEntity<String> deleteReceivedMessage(@PathVariable("userId") UUID uId, @PathVariable("messageId") int mId){
        Member member = memberRepository.findById(uId).orElseThrow(()->{
            return new IllegalArgumentException("유저를 찾을 수 없습니다.");
        });
        messageService.deleteMessageByReceiver(mId,member);

        return ResponseEntity.ok("Message Id : " + mId + " 쪽지를 삭제했습니다.");
    }
    @DeleteMapping("/sent/{userId}/{messageId}")
    public ResponseEntity<String> deleteSentMessage(@PathVariable("userId") UUID uId, @PathVariable("messageId") int mId){
        Member member = memberRepository.findById(uId).orElseThrow(()->{
            return new IllegalArgumentException("유저를 찾을 수 없습니다.");
        });
        messageService.deleteMessageBySender(mId,member);

        return ResponseEntity.ok("Message Id : " + mId + " 쪽지를 삭제했습니다.");
    }
}
