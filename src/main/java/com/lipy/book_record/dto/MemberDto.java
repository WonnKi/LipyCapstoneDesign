package com.lipy.book_record.dto;

import com.lipy.book_record.entity.Book;
import com.lipy.book_record.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class MemberDto {
    private UUID id;
    private String email;
    private String password;
    private String username;
    private String nickname;
    private String gender;
    private int age;
    private String phonenumber;
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
                .password(this.password)
                .userName(this.username)
                .nickName(this.nickname)
                .gender(this.gender)
                .age(this.age)
                .phonenumber(this.phonenumber)
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
        this.gender = user.getGender();
        this.age = user.getAge();
        this.phonenumber = user.getPhonenumber();
        this.books = user.getBooks();
    }
}