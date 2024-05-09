package com.lipy.book_record.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@ToString
public class Book {

    @Id
    @Column(name = "book_sn")
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "uid")
    @NotNull
    private User user;

    @NotNull
    private String title;

    private String image;

    private String author;

    private String publisher;

    @Lob
    private String description;

    @NotNull
    private Integer isbn;

    private Integer totPage;

    @Enumerated(EnumType.STRING)
    private BookStatus bookStatus;

    private LocalDate startDate;

    private LocalDate endDate;

    private Integer score;

    private Integer readPage;
}
