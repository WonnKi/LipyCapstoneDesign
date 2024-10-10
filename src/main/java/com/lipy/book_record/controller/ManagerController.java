package com.lipy.book_record.controller;

import com.lipy.book_record.dto.MemberDto;
import com.lipy.book_record.dto.RecordDto;
import com.lipy.book_record.entity.Record;
import com.lipy.book_record.service.Manager_SearchService;
import com.lipy.book_record.service.RecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/manager")
@RequiredArgsConstructor

public class ManagerController {
    private final Manager_SearchService Manager_SearchService;
    private final RecordService RecordService;

    @GetMapping("/")
    public List<MemberDto> getAllMembers(){
        return Manager_SearchService.searchAll();
    }

    @GetMapping("/detail")
    public List<MemberDto> getMember(
            @RequestParam(required = false) String email,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String nickname) {
            return Manager_SearchService.searchDetail(email, name, nickname);
    }

    @GetMapping("/record/{userId}")
    public ResponseEntity<List<RecordDto>> getRecordsByUserId(@PathVariable UUID userId) {
        List<RecordDto> records = RecordService.getRecordsByUserId(userId);
        if (records.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(records);
    }
}
