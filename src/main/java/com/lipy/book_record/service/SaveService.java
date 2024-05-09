package com.lipy.book_record.service;

import com.lipy.book_record.dto.SearchDto;
import com.lipy.book_record.entity.Book;
import com.lipy.book_record.entity.BookStatus;
import com.lipy.book_record.entity.User;
import com.lipy.book_record.repository.BookRepository;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDate;

@Service
@NoArgsConstructor
@RequestMapping("/save")
public class SaveService {

    BookRepository rep;

    public String saveBook(User user, SearchDto searchDto) {
        Book book = Book.builder()
                .id(1)
                .user(user)
                .title(searchDto.getTitle())
                .image(searchDto.getImage())
                .author(searchDto.getAuthor())
                .isbn(Integer.parseInt(searchDto.getIsbn()))
                .description(searchDto.getDescription())
                .publisher(searchDto.getPublisher())
                .totPage(500)
                .bookStatus(BookStatus.WISH)
                .startDate(LocalDate.now())
                .endDate(LocalDate.now())
                .score(0)
                .readPage(0)
                .build();
        rep.save(book);
        return "저장 완료";
    }
}
