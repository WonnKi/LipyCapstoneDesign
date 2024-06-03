package com.lipy.book_record.controller;

import com.lipy.book_record.dto.RecordDto;
import com.lipy.book_record.service.RecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/record")
@RequiredArgsConstructor
public class RecordController {
    private final RecordService recordService;

    @PostMapping("/{userId}/{isbn}")
    public ResponseEntity<String> createRecord(@PathVariable("userId") Long userId, @PathVariable("isbn") String isbn, @RequestBody RecordDto recordDto) {
        return recordService.saveRecord(userId, isbn, recordDto);
    }
    @GetMapping("/{userId}/{isbn}")
    public List<RecordDto> getRecordById(@PathVariable("userId") Long userId, @PathVariable("isbn") String isbn) {
        return recordService.FindRecordList(userId, isbn);
    }
}
