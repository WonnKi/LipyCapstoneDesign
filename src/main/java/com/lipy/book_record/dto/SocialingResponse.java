package com.lipy.book_record.dto;

import com.lipy.book_record.entity.Member;
import com.lipy.book_record.entity.Socialing;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;
@Getter
@Setter
public class SocialingResponse {
    private Long id;
    private String title;
    private String description;
    private String writer;
    private String content;
    private int currentparticipants;
    private int maxparticipants;
    private Date date;
    private LocalDateTime createdAt;

    public SocialingResponse(Socialing socialing){
        this.id = socialing.getId();
        this.title = socialing.getTitle();
        this.description = socialing.getDescription();
        this.writer = socialing.getWriter();
        this.content = socialing.getContent();
        this.currentparticipants = socialing.getCurrentparticipants();
        this.maxparticipants = socialing.getMaxparticipants();
        this.date = socialing.getDate();
        this.createdAt = socialing.getCreatedAt();
    }
}
