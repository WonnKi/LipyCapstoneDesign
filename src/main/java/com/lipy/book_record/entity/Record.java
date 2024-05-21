package com.lipy.book_record.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class Record {
    @Id
    @Column(name = "id")
    private String id = UUID.randomUUID().toString();

    private String title;

    @Lob
    private String content;

    private LocalDate recordDate;

    @Setter
    @ManyToOne
    private Users user;

    @Builder
    public Record(String title, String content, LocalDate recordDate, Users user){
        this.title = title;
        this.content = content;
        this.recordDate = recordDate;
        this.user = user;
    }
}
