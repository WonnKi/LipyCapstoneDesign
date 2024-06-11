package com.lipy.book_record.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class Record {
    @Id
    @Column(name = "id")
    private String id = UUID.randomUUID().toString();

    private String title;

    @Lob
    private String content;

    private LocalDate recordDate;

    @Setter
    @ManyToOne
    @JoinColumn(name = "book_Id")
    private Book books;

    @Builder
    public Record(String title, String content, LocalDate recordDate, Book book){
        this.title = title;
        this.content = content;
        this.recordDate = recordDate;
        this.books = book;
    }
}