package com.lipy.book_record.dto;

import com.lipy.book_record.entity.BookStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookUserStatusDto {
    private String username;
    private String nickname;
    private String email;
    private BookStatus bookStatus;

    public BookUserStatusDto(String username, String nickname, String email, BookStatus bookStatus) {
        this.username = username;
        this.nickname = nickname;
        this.email = email;
        this.bookStatus = bookStatus;
    }
}