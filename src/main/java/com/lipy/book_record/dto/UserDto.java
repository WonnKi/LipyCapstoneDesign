package com.lipy.book_record.dto;

import com.lipy.book_record.entity.Book;
import com.lipy.book_record.entity.User;
import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class UserDto {
    private String email;
    private String password;
    private String nickname;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Book> books;

    public void addBook(Book book){
        this.books.add(book);
    }

    public User toEntity() {
        return User.builder().id(email).pwd(password).nick(nickname).books(books).build();
    }
}
