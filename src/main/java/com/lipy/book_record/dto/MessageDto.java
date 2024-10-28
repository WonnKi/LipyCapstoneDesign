package com.lipy.book_record.dto;

import com.lipy.book_record.entity.Message;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageDto {
    private String title;
    private String content;
    private String senderName;
    private String receiverName;

    public static MessageDto toDto(Message message){
        return new MessageDto(
                message.getTitle(),
                message.getContent(),
                message.getSender().getUsername(),
                message.getReceiver().getUsername()
        );
    }
}
