package com.lipy.book_record.controller;

import com.lipy.book_record.dto.MessageDto;
import com.lipy.book_record.entity.Member;
import com.lipy.book_record.repository.MemberRepository;
import com.lipy.book_record.service.MessageService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/messages")
public class MessageController {
    private final MessageService messageService;
    private final MemberRepository memberRepository;

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/send/{nickName}")
    public ResponseEntity<String> sendMessage(@RequestBody MessageRequest request, @PathVariable("nickName")String sender) {
        request.getMessageDto().setSenderName(sender);

        for (String receiver : request.getReceiverList()) {
            memberRepository.findByNickname(receiver).orElseThrow(() ->
                    new IllegalArgumentException(receiver + " 유저를 찾을 수 없습니다."));
        }
        for (String receiver : request.getReceiverList()) {
            request.getMessageDto().setReceiverName(receiver);
            messageService.write(request.getMessageDto());
        }

        return ResponseEntity.ok("쪽지를 보냈습니다.");
    }

    @GetMapping("/received/{userName}")
    public List<MessageDto> getReceivedMessage(@PathVariable("userName") String nickName){
        Member member = memberRepository.findByNickname(nickName).orElseThrow(()->
                new IllegalArgumentException("유저를 찾을 수 없습니다."));
        return messageService.receivedMessage(member);
    }

    @GetMapping("/sent/{id}")
    public List<MessageDto> getSentMessage(@PathVariable("id") String nickName){
        Member member = memberRepository.findByNickname(nickName).orElseThrow(()->
                new IllegalArgumentException("유저를 찾을 수 없습니다."));
        return messageService.sentMessage(member);
    }

    @DeleteMapping("received/{userName}/{messageId}")
    public ResponseEntity<String> deleteReceivedMessage(@PathVariable("userName") String nickName, @PathVariable("messageId") int mId){
        Member member = memberRepository.findByNickname(nickName)
                .orElseThrow(() -> new IllegalArgumentException("유저를 찾을 수 없습니다."));

        try {
            return messageService.deleteMessageByReceiver(mId, member);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("메시지를 삭제하는 중 오류가 발생했습니다.");
        }
    }

    @DeleteMapping("/sent/{userName}/{messageId}")
    public ResponseEntity<String> deleteSentMessage(@PathVariable("userName") String nickName, @PathVariable("messageId") int mId) {
        Member member = memberRepository.findByNickname(nickName)
                .orElseThrow(() -> new IllegalArgumentException("유저를 찾을 수 없습니다."));

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
