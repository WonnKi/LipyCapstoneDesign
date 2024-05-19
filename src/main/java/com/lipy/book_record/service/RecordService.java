package com.lipy.book_record.service;

import com.lipy.book_record.dto.BookDto;
import com.lipy.book_record.dto.RecordDto;
import com.lipy.book_record.dto.UsersDto;
import com.lipy.book_record.entity.Record;
import com.lipy.book_record.entity.Users;
import com.lipy.book_record.repository.RecordRepository;
import com.lipy.book_record.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RecordService {
    private final RecordRepository recordRep;
    private final UsersRepository userRep;


    public ResponseEntity<String> saveRecord(Long id, @RequestBody RecordDto recordDto) {

        recordDto.setRecordDate(LocalDate.now());
        Record record = Record.builder()
                .title(recordDto.getTitle())
                .content(recordDto.getContent())
                .recordDate(LocalDate.now())
                .build();

        UsersDto user = userRep.findById(id)
                .map(this::convertToDto)
                .orElseThrow(() -> new RuntimeException("유저 정보를 찾을 수 없습니다. : " + id));

        user.addRecord(record);

        userRep.save(user.toEntity());

        return ResponseEntity.ok("기록 저장이 완료되었습니다.");
    }


    private UsersDto convertToDto(Users user) {
        return new UsersDto(user.getId(), user.getEmail(), user.getPassword(), user.getNickname(), user.getBooks(), user.getRecords());
    }

    public List<RecordDto> ViewRecordList(Long id) {
        return userRep
                .findById(id)
                .orElseThrow(() -> new RuntimeException("ID : " + id + " 를 찾을 수 없습니다."))
                .getRecords()
                .stream()
                .map(RecordDto::new)
                .toList();
    }
}
