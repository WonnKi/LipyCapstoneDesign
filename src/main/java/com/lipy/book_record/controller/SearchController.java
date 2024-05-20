package com.lipy.book_record.controller;

import com.lipy.book_record.dto.SearchDto;
import com.lipy.book_record.service.SearchService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/searchResult")
@RequiredArgsConstructor
public class SearchController {

    private final SearchService searchService; // <- Autowired 에서 바꿔봄

    @GetMapping("/")
    public List<SearchDto> search(@RequestBody SearchRequest searchRequest) throws ParseException {
        return searchService.search(searchRequest.getBookName());
    }

    @Setter
    @Getter
    public static class SearchRequest {
        private String bookName;
    }

}