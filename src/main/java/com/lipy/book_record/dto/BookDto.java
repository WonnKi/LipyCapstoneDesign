package com.lipy.book_record.dto;

import com.lipy.book_record.entity.Book;
import com.lipy.book_record.entity.BookStatus;
import com.lipy.book_record.entity.Member;
import com.lipy.book_record.entity.Record;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookDto {
    @Id
    private String id;

    private String isbn;

    private String title;

    private String image;

    private String author;

    private String publisher;

    private String description;
    private Integer totPage;

    @Enumerated(EnumType.STRING)
    private BookStatus bookStatus;

    private LocalDate startDate;

    private LocalDate endDate;

    private Integer score;

    private Integer readPage;

    private Member user;

    private List<Record> records;

    public Book toEntity() {
        return Book.builder()
                .isbn(this.isbn)
                .title(this.title)
                .image(this.image)
                .author(this.author)
                .publisher(this.publisher)
                .description(this.description)
                .totPage(this.totPage)
                .bookStatus(this.bookStatus)
                .startDate(this.startDate)
                .endDate(this.endDate)
                .score(this.score)
                .readPage(this.readPage)
                .user(this.user)
                .records(this.records)
                .build();
    }
    public BookDto(Book book){
        this.id = book.getId();
        this.isbn = book.getIsbn();
        this.title = book.getTitle();
        this.image = book.getImage();
        this.author = book.getAuthor();
        this.publisher = book.getPublisher();
        this.description = book.getDescription();
        this.totPage = book.getTotPage();
        this.bookStatus = book.getBookStatus();
        this.startDate = book.getStartDate();
        this.endDate = book.getEndDate();
        this.score = book.getScore();
        this.readPage = book.getReadPage();
        this.user = book.getUser();
        this.records = book.getRecords();
    }
}