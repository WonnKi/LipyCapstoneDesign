package com.lipy.book_record.service;

import com.lipy.book_record.dto.MessageDto;
import com.lipy.book_record.entity.Member;
import com.lipy.book_record.entity.Message;
import com.lipy.book_record.repository.MemberRepository;
import com.lipy.book_record.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
public class MessageService {
    private final MessageRepository messageRepository;
    private final MemberRepository memberRepository;

    // 편지 작성
    @Transactional
    public MessageDto write(MessageDto messageDto){
        Member receiver = (memberRepository.findByNickname(messageDto.getReceiverName())
                .orElseThrow(() -> new IllegalArgumentException(messageDto.getReceiverName() + "수신자를 찾을 수 없습니다.")));
        Member sender = (memberRepository.findByNickname(messageDto.getSenderName())
                .orElseThrow(() -> new IllegalArgumentException(messageDto.getSenderName() + "발신자를 찾을 수 없습니다.")));

        Message message = new Message();
        message.setReceiver(receiver);
        message.setSender(sender);

        message.setTitle(messageDto.getTitle());
        message.setContent(messageDto.getContent());
        message.setDeletedByReceiver(false);
        message.setDeletedBySender(false);
        messageRepository.save(message);

        return MessageDto.toDto(message);
    }

    // 받은 편지함 불러오기
    @Transactional(readOnly = true)
    public List<MessageDto> receivedMessage(Member member) {
        List<Message> messages = messageRepository.findAllByReceiver(member);
        List<MessageDto> messageDtos = new ArrayList<>();

        for (Message message : messages) {
            if (!message.isDeletedByReceiver()) {
                messageDtos.add(MessageDto.toDto(message));
            }
        }
        return messageDtos;
    }

    // 보낸 편지함 불러오기
    @Transactional(readOnly = true)
    public List<MessageDto> sentMessage(Member member){
        List<Message> messages = messageRepository.findAllBySender(member);
        List<MessageDto> messageDtos = new ArrayList<>();

        for (Message message : messages){
            if (!message.isDeletedBySender()){
                messageDtos.add(MessageDto.toDto(message));
            }
        }
        return messageDtos;
    }



    // 받은 편지 삭제
    @Transactional
    public Object deleteMessageByReceiver(int mId, Member member){
        Message message = messageRepository.findById(mId).orElseThrow(()->
                new IllegalArgumentException("메시지를 찾을 수 없습니다."));

        if(member == message.getReceiver()) {
            message.deleteByReceiver();
            if (message.isDeleted()) {
                messageRepository.delete(message);
            }
            return ResponseEntity.ok();
        }else {
            return new IllegalArgumentException("유저 정보가 일치하지 않습니다.");
        }
    }

    // 보낸 편지 삭제
    @Transactional
    public Object deleteMessageBySender(int mId, Member member){
        Message message = messageRepository.findById(mId).orElseThrow(()->
                new IllegalArgumentException("메시지를 찾을 수 없습니다."));

        if(member == message.getSender()) {
            message.deleteBySender();
            if (message.isDeleted()) {
                messageRepository.delete(message);
            }
            return ResponseEntity.ok();
        }else {
            return new IllegalArgumentException("유저 정보가 일치하지 않습니다.");
        }
    }

}
