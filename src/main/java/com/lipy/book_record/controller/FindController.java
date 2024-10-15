package com.lipy.book_record.controller;

import com.lipy.book_record.service.FindService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/find")
@RequiredArgsConstructor
public class FindController {
    private final FindService findService;

    @PostMapping("/id/{userName}")
    public ResponseEntity<String> findEmail(@PathVariable("userName") String name){
        return ResponseEntity.ok(findService.findId(name));
    }

    @PostMapping("/pwd/{email}")
    public ResponseEntity<String> findPwd(@PathVariable("email") String email){
        return ResponseEntity.ok(findService.findPwd(email));
    }
}
