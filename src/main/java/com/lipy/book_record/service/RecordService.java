package com.lipy.book_record.service;

import com.lipy.book_record.dto.RecordDto;
import com.lipy.book_record.dto.RecordsDto;
import com.lipy.book_record.repository.RecordRepository;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

@Service
@NoArgsConstructor
public class RecordService {

    @Autowired
    private RecordRepository rep;

    public void create(){
        RecordDto recordDto = new RecordDto();
        RecordsDto recordsDto = new RecordsDto();

        recordDto.setUid("id@naver.com");
        recordDto.setIsbn("123456");

        recordsDto.setNum(1);
        recordsDto.setTitle("첫번째 기록");
        recordsDto.setContent("첫번째 기록 내용입니다.");

        recordDto.records.add(recordsDto);

        RecordDto rec = recordDto;

        rec = rep.save(rec);


    }
}
