package com.lipy.book_record.controller;

import com.lipy.book_record.dto.SearchDto;
import com.lipy.book_record.dto.UserDto;
import com.lipy.book_record.service.SaveService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/save")
@RequiredArgsConstructor
public class SaveBookController {
    private final SaveService saveService;

    @PostMapping
    public String SaveBook(UserDto user, SearchDto info){

        saveService.saveBook(user, info);

        return "저장완료";
    }

}
