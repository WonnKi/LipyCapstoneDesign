package com.lipy.book_record.dto;

import com.lipy.book_record.entity.Member;
import com.lipy.book_record.entity.Socialing;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
@Getter
@Setter
public class SocialingListResponse {
    private Long id;
    private String title;
    private String description;
    private String writer;
    private int currentparticipants;
    private int maxparticipants;
    private Date date;

    public SocialingListResponse(Socialing socialing){
        this.id = socialing.getId();
        this.title = socialing.getTitle();
        this.description = socialing.getDescription();
        this.writer = socialing.getWriter();
        this.currentparticipants = socialing.getCurrentparticipants();
        this.maxparticipants = socialing.getMaxparticipants();
        this.date = socialing.getDate();
    }

    public SocialingListResponse(Long id, String title, String description, String writer, int currentparticipants, int maxparticipants, Date date) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.writer = writer;
        this.currentparticipants = currentparticipants;
        this.maxparticipants = maxparticipants;
        this.date = date;
    }

    public SocialingListResponse(String title, String description, String writer, int currentparticipants, int maxparticipants, Date date) {
        this.title = title;
        this.description = description;
        this.writer = writer;
        this.currentparticipants = currentparticipants;
        this.maxparticipants = maxparticipants;
        this.date = date;
    }
}