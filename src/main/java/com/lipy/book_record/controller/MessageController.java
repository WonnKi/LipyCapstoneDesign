package com.lipy.book_record.controller;

import com.lipy.book_record.dto.MessageDto;
import com.lipy.book_record.entity.Member;
import com.lipy.book_record.repository.MemberRepository;
import com.lipy.book_record.repository.MessageRepository;
import com.lipy.book_record.service.MemberService;
import com.lipy.book_record.service.MessageService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@RequestMapping("/messages")
public class MessageController {
    private final MessageService messageService;
    private final MemberRepository memberRepository;
    private final MemberService memberService;

    @PostMapping("/send")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<String> sendMessage(@RequestBody MessageRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String email = userDetails.getUsername();

        Member member = Optional.ofNullable(memberService.findByEmail(email))
                .orElseThrow(() -> new IllegalArgumentException(email + " 발신자를 찾을 수 없습니다."));

        // 발신자의 닉네임을 메시지 DTO에 설정
        request.getMessageDto().setSenderName(member.getNickname());

        // 수신자 검증
        for (String receiver : request.getReceiverList()) {
            memberRepository.findByNickname(receiver).orElseThrow(() ->
                    new IllegalArgumentException(receiver + " 유저를 찾을 수 없습니다."));
        }

        // 메시지 전송
        for (String receiver : request.getReceiverList()) {
            request.getMessageDto().setReceiverName(receiver);
            messageService.write(request.getMessageDto());
        }

        return ResponseEntity.ok("쪽지를 보냈습니다.");
    }

    @GetMapping("/received")
    public List<MessageDto> getReceivedMessage() {
        // JWT 토큰에서 이메일 가져오기
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String email = userDetails.getUsername();

        // 이메일로 발신자 조회
        Member member = Optional.ofNullable(memberService.findByEmail(email))
                .orElseThrow(() -> new IllegalArgumentException(email + " 유저를 찾을 수 없습니다."));

        // 받은 메시지 반환
        return messageService.receivedMessage(member);
    }

    @GetMapping("/sent")
    public List<MessageDto> getSentMessage() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String email = userDetails.getUsername();

        Member member = Optional.ofNullable(memberService.findByEmail(email))
                .orElseThrow(() -> new IllegalArgumentException(email + " 유저를 찾을 수 없습니다."));

        return messageService.sentMessage(member);
    }

    @DeleteMapping("received/{messageId}")
    public ResponseEntity<String> deleteReceivedMessage(@PathVariable("messageId") int mId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String email = userDetails.getUsername();

        Member member = Optional.ofNullable(memberService.findByEmail(email))
                .orElseThrow(() -> new IllegalArgumentException(email + " 유저를 찾을 수 없습니다."));

        try {
            return messageService.deleteMessageByReceiver(mId, member);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("메시지를 삭제하는 중 오류가 발생했습니다.");
        }
    }

    @DeleteMapping("/sent/{messageId}")
    public ResponseEntity<String> deleteSentMessage(@PathVariable("messageId") int mId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String email = userDetails.getUsername();

        Member member = Optional.ofNullable(memberService.findByEmail(email))
                .orElseThrow(() -> new IllegalArgumentException(email + " 유저를 찾을 수 없습니다."));

        try {
            return messageService.deleteMessageBySender(mId, member);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("메시지를 삭제하는 중 오류가 발생했습니다.");
        }
    }

    @Getter
    @Setter
    public static class MessageRequest {
        private MessageDto messageDto;
        private List<String> receiverList;
    }
}