package com.lipy.book_record.controller;

import com.lipy.book_record.dto.BookCountDto;
import com.lipy.book_record.dto.BookDto;
import com.lipy.book_record.dto.SearchDto;
import com.lipy.book_record.entity.BookStatus;
import com.lipy.book_record.service.BookService;
import com.lipy.book_record.service.UserActivityLogService;
import jakarta.servlet.http.HttpServletRequest;
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
    private final UserActivityLogService userActivityLogService;;

    @PostMapping("/{userId}")
    public ResponseEntity<String> saveBook(@PathVariable("userId") UUID userId, @RequestBody SearchDto info, @RequestParam("page") int page, HttpServletRequest request) {
        // 책 저장 로직 실행
        ResponseEntity<String> response = saveService.saveBook(userId, info, page);

        // IP 주소 가져오기
        String ipAddress = request.getRemoteAddr();

        // 로그 저장
        userActivityLogService.logActivity(userId, "SAVE_BOOK","User saved a book with title: " + info.getTitle() + ", on page: " + page, ipAddress);
        return response;
    }

    @GetMapping("/{userId}")
    public List<BookDto> ViewBookList(@PathVariable("userId") UUID userId){
        return saveService.ViewBookList(userId);
    }

    @DeleteMapping("/{userId}/{isbn}")
    @Transactional
    public ResponseEntity<String> deleteBook(@PathVariable("userId") UUID userId, @PathVariable("isbn") String isbn, HttpServletRequest request) {
        // 책 삭제 로직 실행
        ResponseEntity<String> response = saveService.deleteBook(userId, isbn);

        // IP 주소 가져오기
        String ipAddress = request.getRemoteAddr();

        // 로그 저장
        if (response.getStatusCode().is2xxSuccessful()) {
            userActivityLogService.logActivity(userId, "DELETE_BOOK", "User deleted a book with ISBN: " + isbn, ipAddress);
        }

        return response;
    }

    @PatchMapping("/{userId}/{isbn}")
    public ResponseEntity<String> changeStatus(@PathVariable("userId") UUID userId, @PathVariable("isbn") String isbn, @RequestBody Map<String, String> request, HttpServletRequest httpRequest) {
        // 책 상태 변경 로직 실행
        String status = request.get("status");
        ResponseEntity<String> response = saveService.changeStatus(userId, isbn, status);

        // IP 주소 가져오기
        String ipAddress = httpRequest.getRemoteAddr();

        // 로그 저장
        if (response.getStatusCode().is2xxSuccessful()) {
            userActivityLogService.logActivity(userId, "CHANGE_BOOK_STATUS", "User changed status of book with ISBN: " + isbn + " to " + status, ipAddress);
        }

        return response;
    }

    @GetMapping("/{userId}/detail")
    public List<BookDto> ViewBookList(@PathVariable("userId") UUID userId, @RequestParam("status") BookStatus status){
        return saveService.ViewBookList(userId, status);
    }

    @GetMapping("/all")
    public ResponseEntity<List<BookCountDto>> getAllBooksAndCount() {
        List<BookCountDto> books = saveService.getAllBooksAndCount();
        if (books.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(books);
    }
}