package com.lipy.book_record.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Record {
    @Id
    private Integer num;
    @Column
    private String title;
    @Column
    private String content;
}
