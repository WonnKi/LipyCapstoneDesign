package com.lipy.book_record.dto;

import com.lipy.book_record.entity.Book;
import com.lipy.book_record.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class UserDto {
    private Long id;
    private String email;
    private String password;
    private String nickname;
    private List<Book> books;

    public void addBook(Book book){
        if (this.books == null) {
            this.books = new ArrayList<>();
        }
        book.setUser(toEntity()); // Book 객체에 User 정보 설정
        this.books.add(book);
    }

    public User toEntity() {
        User user = User.builder()
                .id(this.id)
                .email(this.email)
                .pwd(this.password)
                .nick(this.nickname)
                .books(this.books)
                .build();
        if (this.books != null) {
            for (Book book : this.books) {
                book.setUser(user);
            }
        }
        return user;
    }
}