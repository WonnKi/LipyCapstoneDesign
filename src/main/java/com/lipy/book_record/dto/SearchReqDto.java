package com.lipy.book_record.dto;

import com.lipy.book_record.entity.BookStatus;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchReqDto {

//    @NotNull
//    private String title;
//
//    @NotNull
//    private String image;
//    private String author;
//    private String publisher;
//
//    @NotNull
////    @Pattern(regexp = "^.{10}\\s.{13}$")
//    private String isbn;
//    private String description;
    private SearchDto info;

    private Integer totPage;

    @NotNull
    private BookStatus bookStatus;

    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @PastOrPresent
    private LocalDate startDate;

    @NotNull
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @PastOrPresent
    private LocalDate endDate;

    @NotNull
    @Min(value = 0)
    @Max(value = 10)
    private Integer score;

    @NotNull
    @PositiveOrZero
    private Integer readPage;
}