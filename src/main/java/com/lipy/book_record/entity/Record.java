package com.lipy.book_record.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

    @JsonIgnore
    @Setter
    @ManyToOne
    @JoinColumn(name = "book_Id")
    private Book books;

    private String bookTitle;
    @Builder
    public Record(String id, String title, String content, LocalDate recordDate, Book book, String bookTitle){
        this.id = id;
        this.title = title;
        this.content = content;
        this.recordDate = recordDate;
        this.books = book;
        this.bookTitle = bookTitle;
    }
}