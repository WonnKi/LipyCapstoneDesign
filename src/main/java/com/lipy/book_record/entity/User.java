package com.lipy.book_record.entity;

import com.lipy.book_record.dto.BookDto;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
//@Builder
public class User {

    @Id
    @NotNull
    @Column(name = "id")
    private String email;

    @Column(name = "pwd", nullable = false)
    private String password;

    @Column(name = "nickname", nullable = false)
    private String nickname;

    @Column(name = "books")
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Book> books;

    @Builder
    public User(String id, String pwd, String nick, List<Book> books){
        this.email = id;
        this.password = pwd;
        this.nickname = nick;
        this.books = books;
    }


}

