package com.lipy.book_record.controller;

import com.lipy.book_record.dto.SearchDto;
import com.lipy.book_record.entity.Book;
import com.lipy.book_record.entity.User;
import com.lipy.book_record.service.SaveService;
import com.lipy.book_record.service.SearchService;
import jakarta.validation.constraints.Null;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/save")
public class SaveController {
    SaveService saveService;
    
    public String SaveBook(/*SearchDto info*/){
        // 테스트 코드
        SearchDto info = new SearchDto();
        info.setIsbn("1234567");
        info.setTitle("책제목");
        info.setAuthor("저자");
        info.setDescription("책에 대한 정보");
        info.setImage("이미지 경로");

        List<Book> list;
        User user = new User("email@com","password", "닉네임", new ArrayList<>());
        //
        saveService.SaveBook(/*user.getEmail(),*/info);
        return "저장 성공";
    }

}
