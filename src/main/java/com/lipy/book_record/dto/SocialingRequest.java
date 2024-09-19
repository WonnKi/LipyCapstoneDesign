package com.lipy.book_record.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class SocialingRequest {
    private String title;
    private String description;
    private int maxParticipants;
    private Date date;
    private String content;
}
