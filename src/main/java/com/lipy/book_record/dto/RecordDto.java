package com.lipy.book_record.dto;


import lombok.*;

import java.net.InterfaceAddress;
import java.sql.Date;
import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class RecordDto {
    public String uid;
    public String isbn;
    public List<RecordsDto> records;
}
