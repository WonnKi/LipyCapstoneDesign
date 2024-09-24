package com.lipy.book_record.service;

import com.lipy.book_record.dto.BookDto;
import com.lipy.book_record.dto.SearchDto;
import com.lipy.book_record.dto.MemberDto;
import com.lipy.book_record.entity.Book;
import com.lipy.book_record.entity.BookStatus;
import com.lipy.book_record.entity.Member;
import com.lipy.book_record.repository.BookRepository;
import com.lipy.book_record.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@RequestMapping("/save")
public class BookService {

    private final BookRepository bookRep;
    private final MemberRepository userRep;

    public ResponseEntity<String> saveBook(UUID userId, SearchDto info, int page) {
        try{
            Member userInfo = (Member) userRep.findById(userId)
                    .orElseThrow(() -> new RuntimeException("ID : " + userId + " 를 찾을 수 없습니다."));

            MemberDto user = new MemberDto(userInfo);

            Book book = Book.builder()
                    .isbn(info.getIsbn())
                    .title(info.getTitle())
                    .image(info.getImage())
                    .author(info.getAuthor())
                    .publisher(info.getPublisher())
                    .description(info.getDescription())
                    .totPage(page)
                    .bookStatus(BookStatus.WISH)
                    .startDate(LocalDate.now())
                    .endDate(LocalDate.now())
                    .score(0)
                    .readPage(0)
                    .build();

            user.addBook(book);

            userRep.save(user.toEntity());
            return ResponseEntity.ok("\""+ book.getTitle() + "\" 저장이 완료되었습니다.");
        } catch (Exception e){
            return ResponseEntity.ok("책 저장에 실패하였습니다.");
        }



    }

    public ResponseEntity<String> deleteBook(UUID userId, String isbn){
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

    public List<BookDto> ViewBookList(UUID userId){
        return userRep
                .findById(userId)
                .orElseThrow(() -> new RuntimeException("ID : " + userId + " 를 찾을 수 없습니다."))
                .getBooks()
                .stream()
                .map(BookDto::new)
                .toList();
    }

    public ResponseEntity<String>  changeStatus(UUID userId, String isbn, String status) {
        try {
            if (!bookRep.existsByUserIdAndIsbn(userId, isbn)) {
                return ResponseEntity.badRequest().body("사용자 ID: " + userId + "와 ISBN: " + isbn + "에 해당하는 책을 찾을 수 없습니다.");
            }
            Book book = bookRep.findByUserIdAndIsbn(userId, isbn);
            String bStatus = String.valueOf(book.getBookStatus());
            book.setBookStatus(BookStatus.valueOf(status));
            bookRep.save(book);
            return ResponseEntity.ok("사용자 ID: " + userId + "의 ISBN: " + isbn + " 책이 " +
                    bStatus + " → " + status + "로 변경되었습니다.");
        }catch (Exception e) {
            return ResponseEntity.internalServerError().body("사용자 ID: " + userId + "와 ISBN: " + isbn + "의 책을 삭제하는 중 오류가 발생했습니다.");
        }
    }

    public List<BookDto> ViewBookList(UUID userId, BookStatus status) {
        return userRep
                .findById(userId)
                .orElseThrow(() -> new RuntimeException("ID : " + userId + " 를 찾을 수 없습니다."))
                .getBooks()
                .stream()
                .filter(book -> book.getBookStatus().equals(status))
                .map(BookDto::new)
                .toList();
    }


}