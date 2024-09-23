package com.lipy.book_record.controller;

import com.lipy.book_record.dto.BookDto;
import com.lipy.book_record.dto.SearchDto;
import com.lipy.book_record.entity.BookStatus;
import com.lipy.book_record.service.BookService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;


@RestController
@RequestMapping("/book")
@RequiredArgsConstructor
public class BookController {
    private final BookService saveService;

    @PostMapping("/{userId}")
    public ResponseEntity<String> saveBook(@PathVariable("userId") UUID userId, @RequestBody SearchDto info, @RequestParam("page") int page){
        return saveService.saveBook(userId, info, page);
    }
    @GetMapping("/{userId}")
    public List<BookDto> ViewBookList(@PathVariable("userId") UUID userId){
        return saveService.ViewBookList(userId);
    }
    @DeleteMapping("/{userId}/{isbn}")
    @Transactional
    public ResponseEntity<String> deleteBook(@PathVariable("userId") UUID userId, @PathVariable("isbn") String isbn) {
        return saveService.deleteBook(userId, isbn);
    }

    @PatchMapping("/{userId}/{isbn}")
    public ResponseEntity<String> changeStatus(@PathVariable("userId") UUID userId, @PathVariable("isbn") String isbn, @RequestBody Map<String, String> request) {
        String status = request.get("status");
        return saveService.changeStatus(userId, isbn, status);
    }

    @GetMapping("/{userId}/detail")
    public List<BookDto> ViewBookList(@PathVariable("userId") UUID userId, @RequestParam("status") BookStatus status){
        return saveService.ViewBookList(userId, status);
    }


}