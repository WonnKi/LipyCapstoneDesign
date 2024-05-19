package com.lipy.book_record.dto;

import com.lipy.book_record.entity.Book;
import com.lipy.book_record.entity.Record;
import com.lipy.book_record.entity.Users;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class UsersDto {
    private Long id;
    private String email;
    private String password;
    private String nickname;
    private List<Book> books;
    private List<Record> records;

    public void addBook(Book book){
        if (this.books == null) {
            this.books = new ArrayList<>();
        }
        book.setUser(toEntity()); // Book 객체에 User 정보 설정
        this.books.add(book);
    }
    public void addRecord(Record record){
        if (this.records == null) {
            this.records = new ArrayList<>();
        }
        record.setUser(toEntity()); // Record 객체에 User 정보 설정
        this.records.add(record);
    }

    public Users toEntity() {
        Users user = Users.builder()
                .id(this.id)
                .email(this.email)
                .pwd(this.password)
                .nick(this.nickname)
                .books(this.books)
                .records(this.records)
                .build();
        if (this.books != null) {
            for (Book book : this.books) {
                book.setUser(user);
            }
        }
        if (this.records != null) {
            for (Record record : this.records) {
                record.setUser(user);
            }
        }
        return user;
    }
}