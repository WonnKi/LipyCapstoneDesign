package com.lipy.book_record.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/changePwd")
@RequiredArgsConstructor
public class ChangePwdController {
    @PostMapping("")
    public ResponseEntity<String> changePwd(){
        return null;
    }
}
