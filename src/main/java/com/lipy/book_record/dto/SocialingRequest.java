package com.lipy.book_record.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SocialingRequest {
    private String title;
    private String description;
    private int maxParticipants;
    private String date;
    private String content;
}
