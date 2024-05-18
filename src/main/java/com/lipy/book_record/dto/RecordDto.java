package com.lipy.book_record.dto;

import com.lipy.book_record.entity.Users;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RecordDto {

    @Id
    @Column(name = "id")
    private String id = UUID.randomUUID().toString();

    private String title;

    private String content;

    private LocalDate recordDate;

    @Setter
    @ManyToOne
    private Users user;

}
