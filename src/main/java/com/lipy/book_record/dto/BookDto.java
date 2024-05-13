package com.lipy.book_record.dto;

import com.lipy.book_record.entity.Book;
import com.lipy.book_record.entity.BookStatus;
import com.lipy.book_record.entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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
                .build();
    }

}
