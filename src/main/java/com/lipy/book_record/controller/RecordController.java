package com.lipy.book_record.controller;

import com.lipy.book_record.service.RecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/record")

public class RecordController {

    @Autowired
    RecordService recordService;
    // 생성
    @PostMapping("/create")
    public String create(){
        recordService.create();
        return "기록 생성 성공";
    }
    // 수정
    // 삭제
    // 조회
    @GetMapping("/view")
    public String view(){
        return "0";
    }
}
