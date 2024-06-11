package com.lipy.book_record.service;

import com.lipy.book_record.dto.RecordDto;
import com.lipy.book_record.entity.Book;
import com.lipy.book_record.entity.Record;
import com.lipy.book_record.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RecordService {
    private final BookRepository bookRep;

    public ResponseEntity<String> saveRecord(Long userId, String isbn,@RequestBody RecordDto recordDto) {
        try {
            if (!bookRep.existsByUserIdAndIsbn(userId, isbn)) {
                return ResponseEntity.badRequest().body("사용자 ID: " + userId + "와 ISBN: " + isbn + "에 해당하는 책을 찾을 수 없습니다.");
            }
            Record record = Record.builder()
                    .title(recordDto.getTitle())
                    .content(recordDto.getContent())
                    .recordDate(LocalDate.now())
                    .build();

            Book book = bookRep.findByUserIdAndIsbn(userId,isbn);

            record.setBooks(book);
            book.addRecord(record);
            bookRep.save(book);

            return ResponseEntity.ok("기록 저장이 완료되었습니다.");

        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("사용자 ID: " + userId + "와 ISBN: " + isbn + "의 책을 삭제하는 중 오류가 발생했습니다.");
        }
    }

    public List<RecordDto> FindRecordList(Long userId, String isbn){
        if (!bookRep.existsByUserIdAndIsbn(userId, isbn)) {
            return null;
        }
        return bookRep
                .findByUserIdAndIsbn(userId,isbn)
                .getRecords()
                .stream()
                .map(RecordDto::new)
                .toList();
    }

    public ResponseEntity<String> DeleteRecord(Long userId, String rId) {
        return null;
    }

    public ResponseEntity<String> PutRecord(Long userId, String rId){
        return null;
    }
}