package com.lipy.book_record.dto;

import com.lipy.book_record.entity.Socialing;
import lombok.Getter;
import java.util.Date;
@Getter
public class SocialingResponse {
    private String title;
    private String description;
    private String writer;
    private String content;
    private int currentparticipants;
    private int maxparticipants;
    private Date date;

    public SocialingResponse(Socialing socialing){
        this.title = socialing.getTitle();
        this.description = socialing.getDescription();
        this.writer = socialing.getWriter();
        this.content = socialing.getContent();
        this.currentparticipants = socialing.getCurrentparticipants();
        this.maxparticipants = socialing.getMaxparticipants();
        this.date = socialing.getDate();
    }
}
