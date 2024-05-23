package com.lipy.book_record.controller;

import com.lipy.book_record.dto.BookDto;
import com.lipy.book_record.dto.SearchDto;
import com.lipy.book_record.dto.UsersDto;
import com.lipy.book_record.entity.BookStatus;
import com.lipy.book_record.repository.BookRepository;
import com.lipy.book_record.repository.UsersRepository;
import com.lipy.book_record.service.BookService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;


@RestController
@RequestMapping("/book")
@RequiredArgsConstructor
public class BookController {
    private final BookService saveService;

    @PostMapping("/")
    public String SaveBook(UsersDto user, SearchDto info){
        saveService.saveBook(user, info);
        return "저장완료";
    }
    @GetMapping("/{userId}")
    public List<BookDto> ViewBookList(@PathVariable("userId") Long userId){
        return saveService.ViewBookList(userId);
    }
    @DeleteMapping("/{userId}/{isbn}")
    @Transactional
    public ResponseEntity<String> deleteBook(@PathVariable("userId") Long userId, @PathVariable("isbn") String isbn) {
        return saveService.deleteBook(userId, isbn);
    }

    @PatchMapping("/{userId}/{isbn}")
    public ResponseEntity<String> changeStatus(@PathVariable("userId") Long userId, @PathVariable("isbn") String isbn,@RequestBody String status){
        return saveService.changeStatus(userId, isbn, status);
    }

}