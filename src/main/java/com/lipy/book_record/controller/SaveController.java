package com.lipy.book_record.controller;

import com.lipy.book_record.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/save")
public class SaveController {
    @Autowired
    SearchService searchService;


}
