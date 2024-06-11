package com.lipy.book_record.dto;

import com.lipy.book_record.entity.Book;
import com.lipy.book_record.entity.Record;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.UUID;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RecordDto {

    @Id
    @Column(name = "id")
    private String id = UUID.randomUUID().toString();

    private String title;

    private String content;

    private LocalDate recordDate;

    @Setter
    @ManyToOne
    private Book book;

    public RecordDto(Record record) {
        this.id = record.getId();
        this.title = record.getTitle();
        this.content = record.getContent();
        this.recordDate = record.getRecordDate();
    }

    public Record toEntity(){
        return Record.builder()
                .title(this.title)
                .content(this.content)
                .recordDate(this.recordDate)
                .build();
    }
}