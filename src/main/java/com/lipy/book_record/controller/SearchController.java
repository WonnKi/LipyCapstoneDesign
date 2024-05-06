package com.lipy.book_record.controller;

import com.lipy.book_record.dto.SearchDto;
import com.lipy.book_record.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Method;
import java.util.List;

@RestController
@RequestMapping("/search")
public class SearchController {

    @Autowired
    SearchService searchService;

    @PostMapping("/basic_search")
    public String search(@RequestBody String keyword) {
        return searchService.search(keyword);
    }

    @GetMapping("/result")
    public List<SearchDto> result(){
        return SearchService.result();
    }

}