package com.lipy.book_record.dto;


import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class RecordsDto {
    public Integer num;
    public String title;
    public String content;
}
