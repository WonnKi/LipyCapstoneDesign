package com.lipy.book_record.controller;

import com.lipy.book_record.dto.RecordDto;
import com.lipy.book_record.service.BookService;
import com.lipy.book_record.service.RecordService;
import com.lipy.book_record.service.UserActivityLogService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/record")
@RequiredArgsConstructor
public class RecordController {
    private final RecordService recordService;
    private final UserActivityLogService userActivityLogService;

    @PostMapping("/{userId}/{isbn}")
    public ResponseEntity<String> CreateRecord(@PathVariable("userId") UUID userId, @PathVariable("isbn") String isbn, @RequestBody RecordDto recordDto, HttpServletRequest request) {
        // 기록 생성 로직 실행
        ResponseEntity<String> response = recordService.saveRecord(userId, isbn, recordDto);

        // IP 주소 가져오기
        String ipAddress = request.getRemoteAddr();

        // 로그 저장
        userActivityLogService.logActivity(userId, "CREATE_RECORD", "User created a record for book ISBN: " + isbn + ", Record Title: " + recordDto.getTitle(), ipAddress);

        return response;
    }

    @DeleteMapping("/{userId}/{isbn}/{rId}")
    @Transactional
    public ResponseEntity<String> DeleteRecord(@PathVariable("userId") UUID userId, @PathVariable("isbn") String isbn, @PathVariable("rId") String rId, HttpServletRequest request) {
        // 기록 삭제 로직 실행
        ResponseEntity<String> response = recordService.DeleteRecord(userId, isbn, rId);

        // IP 주소 가져오기
        String ipAddress = request.getRemoteAddr();

        // 로그 저장
        userActivityLogService.logActivity(userId, "DELETE_RECORD", "User deleted a record with ID: " + rId + " for book ISBN: " + isbn, ipAddress);

        return response;
    }

    @PutMapping("/{userId}/{isbn}/{rId}")
    public ResponseEntity<String> PutRecord(@PathVariable("userId") UUID userId, @PathVariable("isbn") String isbn, @PathVariable("rId") String rId, @RequestBody RecordDto recordDto, HttpServletRequest request) {
        // 기록 수정 로직 실행
        ResponseEntity<String> response = recordService.PutRecord(userId, isbn, rId, recordDto);

        // IP 주소 가져오기
        String ipAddress = request.getRemoteAddr();

        // 로그 저장
        userActivityLogService.logActivity(userId, "UPDATE_RECORD", "User updated a record with ID: " + rId + " for book ISBN: " + isbn + ", New Title: " + recordDto.getTitle(), ipAddress);

        return response;
    }

    @GetMapping("/{userId}/{isbn}")
    public List<RecordDto> GetRecord(@PathVariable("userId") UUID userId, @PathVariable("isbn") String isbn) {
        return recordService.FindRecordList(userId, isbn);
    }
}