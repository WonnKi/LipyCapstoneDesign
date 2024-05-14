package com.lipy.book_record.controller;

import com.lipy.book_record.dto.BookDto;
import com.lipy.book_record.dto.SearchDto;
import com.lipy.book_record.dto.UsersDto;
import com.lipy.book_record.entity.Book;
import com.lipy.book_record.entity.BookStatus;
import com.lipy.book_record.entity.Users;
import com.lipy.book_record.repository.BookRepository;
import com.lipy.book_record.repository.UsersRepository;
import com.lipy.book_record.service.SaveService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/book")
@RequiredArgsConstructor
public class BookController {
    private final SaveService saveService;
    private final BookRepository bookRep;
    private final UsersRepository userRep;

    @PostMapping("/save")
    public String SaveBook(UsersDto user, SearchDto info){
        saveService.saveBook(/*user, info*/);
        return "저장완료";
    }

    @DeleteMapping("/delete/{userId}/{isbn}")
    @Transactional
    public ResponseEntity<String> deleteBook(@PathVariable("userId") Long userId, @PathVariable("isbn") String isbn) {
        try {
            if (!bookRep.existsByUserIdAndIsbn(userId, isbn)) {
                return ResponseEntity.badRequest().body("사용자 ID: " + userId + "와 ISBN: " + isbn + "에 해당하는 책을 찾을 수 없습니다.");
            }
            bookRep.deleteByUserIdAndIsbn(userId, isbn);
            return ResponseEntity.ok("사용자 ID: " + userId + "의 ISBN: " + isbn + " 책이 삭제되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("사용자 ID: " + userId + "와 ISBN: " + isbn + "의 책을 삭제하는 중 오류가 발생했습니다.");
        }
    }

    @PostMapping("/view")
    public List<BookDto> ViewBook(@RequestBody String id){
        return userRep
                .findById(Long.valueOf(id))
                .orElseThrow(() -> new RuntimeException("ID : " + id + " 를 찾을 수 없습니다."))
                .getBooks()
                .stream()
                .map(BookDto::new)
                .toList();
    }


}
