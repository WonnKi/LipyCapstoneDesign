package com.lipy.book_record.service;

import com.lipy.book_record.dto.RecordDto;
import com.lipy.book_record.entity.Book;
import com.lipy.book_record.entity.Record;
import com.lipy.book_record.repository.BookRepository;
import com.lipy.book_record.repository.RecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecordService {
    private final BookRepository bookRep;
    private final RecordRepository recordRep;

    public ResponseEntity<String> saveRecord(UUID userId, String isbn, @RequestBody RecordDto recordDto) {
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
            return ResponseEntity.internalServerError().body("오류");
        }
    }

    public List<RecordDto> FindRecordList(UUID userId, String isbn){
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

    public ResponseEntity<String> DeleteRecord(UUID userId,String isbn, String rId) {
        if (bookRep.existsByUserIdAndIsbn(userId, isbn)) {
            Optional<Record> record = recordRep.findById(rId);
            if(record.isPresent()){
                if(record.get().getBooks().getIsbn().equals(isbn)){
                    recordRep.deleteById(rId);
                    return ResponseEntity.ok("기록 삭제가 완료되었습니다.");
                };
            }else return ResponseEntity.badRequest().body(rId + "값의 기록이 없습니다.");
        }else return ResponseEntity.badRequest().body(userId + "유저에" + isbn + "책이 없습니다.");

        return ResponseEntity.badRequest().body("심각한 오류입니다. 개발자에게 문의하세요");
    }

    public ResponseEntity<String> PutRecord(UUID userId, String isbn, String rId, RecordDto changeRecord){
        if (bookRep.existsByUserIdAndIsbn(userId, isbn)) {
            Optional<Record> record = recordRep.findById(rId);
            if(record.isPresent()){
                if(record.get().getBooks().getIsbn().equals(isbn)){
                    RecordDto targetRecord = new RecordDto(record.get());
                    targetRecord.setTitle(changeRecord.getTitle());
                    targetRecord.setContent(changeRecord.getContent());
                    recordRep.save(targetRecord.toEntity());
                    return ResponseEntity.ok("기록 변경이 완료되었습니다.");
                };
            }else return ResponseEntity.badRequest().body(rId + "값의 기록이 없습니다.");
        }else return ResponseEntity.badRequest().body(userId + "유저에" + isbn + "책이 없습니다.");

        return ResponseEntity.badRequest().body("심각한 오류입니다. 개발자에게 문의하세요");
    }

    public List<RecordDto> getRecordsByUserId(UUID userId) {
        List<Record> records = recordRep.findByBooksUserId(userId);
        return records.stream().map(RecordDto::new).collect(Collectors.toList());
    }
}