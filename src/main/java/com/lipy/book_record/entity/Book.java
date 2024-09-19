package com.lipy.book_record.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class Book {


    @Id
    @Column(name = "id")
    private String id = UUID.randomUUID().toString();

    @NotNull
    private String isbn;

    @NotNull
    private String title;

    private String image;

    private String author;

    private String publisher;

    @Lob
    private String description;

    private Integer totPage;

    @Enumerated(EnumType.STRING)
    @Setter
    private BookStatus bookStatus;

    private LocalDate startDate;

    private LocalDate endDate;

    private Integer score;

    private Integer readPage;

    @Setter
    @ManyToOne
    @JoinColumn(name = "user_id")
    private Member user;

    @Column(name = "records")
    @OneToMany(mappedBy = "books", cascade = CascadeType.ALL)
    private List<Record> records = new ArrayList<>();

    @Builder
    public Book(String isbn, String title, String image, String author, String publisher, String description, Integer totPage, BookStatus bookStatus, LocalDate startDate, LocalDate endDate, Integer score, Integer readPage, Member user, List<Record> records){
        this.isbn = isbn;
        this.title = title;
        this.image = image;
        this.author = author;
        this.publisher = publisher;
        this.description = description;
        this.totPage = totPage;
        this.bookStatus = bookStatus;
        this.startDate = startDate;
        this.endDate = endDate;
        this.score = score;
        this.readPage = readPage;
        this.records = records;
        this.user = user;
    }

    public void addRecord(Record record) {
        record.setBooks(this);
        this.records.add(record);
    }
}