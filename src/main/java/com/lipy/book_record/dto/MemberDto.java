package com.lipy.book_record.dto;

import com.lipy.book_record.entity.Book;
import com.lipy.book_record.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class MemberDto {
    private Long id;
    private String email;
    private String password;
    private String username;
    private String nickname;
    private List<Book> books;

    public void addBook(Book book){
        if (this.books == null) {
            this.books = new ArrayList<>();
        }
        book.setUser(toEntity()); // Book 객체에 User 정보 설정
        this.books.add(book);
    }


    public Member toEntity() {
        Member user = Member.builder()
                .id(this.id)
                .email(this.email)
                .pwd(this.password)
                .userName(this.username)
                .nickName(this.nickname)
                .books(this.books)
                .build();
        if (this.books != null) {
            for (Book book : this.books) {
                book.setUser(user);
            }
        }
        return user;
    }

    public MemberDto(Member user){
        this.id = user.getId();
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.username = user.getUsername();
        this.nickname = user.getNickname();
        this.books = user.getBooks();
    }
}