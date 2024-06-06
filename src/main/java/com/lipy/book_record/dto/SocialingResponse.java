package com.lipy.book_record.dto;

import com.lipy.book_record.entity.Socialing;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;
@Getter
@Setter
public class SocialingResponse {
    private String title;
    private String description;
    private String writer;
    private String content;
    private int currentparticipants;
    private int maxparticipants;
    private LocalDateTime createdAt;
    private Date date;

    public SocialingResponse(Socialing socialing){
        this.title = socialing.getTitle();
        this.description = socialing.getDescription();
        this.writer = socialing.getWriter();
        this.content = socialing.getContent();
        this.currentparticipants = socialing.getCurrentparticipants();
        this.maxparticipants = socialing.getMaxparticipants();
        this.createdAt = socialing.getCreatedAt();
        this.date = socialing.getDate();
    }
}
