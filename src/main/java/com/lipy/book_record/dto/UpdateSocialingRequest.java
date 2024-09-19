package com.lipy.book_record.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class UpdateSocialingRequest {
    private String title;
    private String description;
    private String content;
    private int maxparticipants;
    private Date date;
}
