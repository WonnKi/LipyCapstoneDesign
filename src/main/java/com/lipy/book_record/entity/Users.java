package com.lipy.book_record.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Users")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "email", unique = true)
    private String email;

    @Column(name = "pwd", nullable = false)
    private String password;

    @Column(name = "nickname", nullable = false)
    private String nickname;

    @Column(name = "books")
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Book> books = new ArrayList<>();

    @Column(name = "records")
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Record> records = new ArrayList<>();

    @Builder
    public Users(Long id, String email, String pwd, String nick, List<Book> books, List<Record> records) {
        this.id=id;
        this.email = email;
        this.password = pwd;
        this.nickname = nick;
        this.books = books;
        this.records = records;
    }


}

