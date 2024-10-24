package com.lipy.book_record.dto;

import com.lipy.book_record.entity.Book;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookCountDto {

    private String isbn;
    private String title;
    private String author;
    private String publisher;
    private String image;
    private Long saveCount;  // 저장 횟수

    public BookCountDto(String isbn, String title, String author, String publisher, String image, Long saveCount) {
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.image = image;
        this.saveCount = saveCount;
    }
}

