package com.lipy.book_record.service;

import com.lipy.book_record.dto.BookDto;
import com.lipy.book_record.dto.SearchDto;
import com.lipy.book_record.dto.UserDto;
import com.lipy.book_record.entity.Book;
import com.lipy.book_record.entity.BookStatus;
import com.lipy.book_record.entity.User;
import com.lipy.book_record.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
@RequestMapping("/save")
public class SaveService {

    private final UserRepository rep;

    public User saveBook(UserDto user, SearchDto info) {
        Book book = Book.builder()
                .isbn(info.getIsbn())
                .title(info.getTitle())
                .image(info.getImage())
                .author(info.getAuthor())
                .publisher(info.getPublisher())
                .description(info.getDescription())
                .totPage(400)
                .bookStatus(BookStatus.READING)
                .startDate(LocalDate.now())
                .endDate(LocalDate.now())
                .score(0)
                .readPage(0)
                .build();

        user.addBook(book);

        return rep.save(user.toEntity());
    }
}
