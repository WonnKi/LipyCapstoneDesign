package com.lipy.book_record.controller;

import com.lipy.book_record.dto.MemberDto;
import com.lipy.book_record.service.Manager_SearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/manager")
@RequiredArgsConstructor

public class ManagerController {
    private final Manager_SearchService Manager_SearchService;

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
}
