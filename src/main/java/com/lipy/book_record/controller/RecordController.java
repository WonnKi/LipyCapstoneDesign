package com.lipy.book_record.controller;

import com.lipy.book_record.dto.RecordDto;
import com.lipy.book_record.service.RecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/record")
@RequiredArgsConstructor
public class RecordController {
    private final RecordService recordService;

    @PostMapping("/{userId}/{isbn}")
    public ResponseEntity<String> CreateRecord(@PathVariable("userId") Long userId, @PathVariable("isbn") String isbn, @RequestBody RecordDto recordDto) {
        return recordService.saveRecord(userId, isbn, recordDto);
    }
    @GetMapping("/{userId}/{isbn}")
    public List<RecordDto> GetRecord(@PathVariable("userId") Long userId, @PathVariable("isbn") String isbn) {
        return recordService.FindRecordList(userId, isbn);
    }

    @DeleteMapping("/{userId}/{isbn}/{rId}")
    @Transactional
    public ResponseEntity<String> DeleteRecord(@PathVariable("userId") Long userId, @PathVariable("isbn") String isbn, @PathVariable("rId") String rId){
        return recordService.DeleteRecord(userId, isbn, rId);
    }

    @PutMapping("/{userId}/{isbn}/{rId}")
    public ResponseEntity<String> PutRecord(@PathVariable("userId") Long userId, @PathVariable("isbn") String isbn, @PathVariable("rId") String rId, @RequestBody RecordDto recordDto){
        return recordService.PutRecord(userId, isbn, rId, recordDto);
    }
}