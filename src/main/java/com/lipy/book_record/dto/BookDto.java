package com.lipy.book_record.dto;

import com.lipy.book_record.entity.BookStatus;
import com.lipy.book_record.entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;


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


}
