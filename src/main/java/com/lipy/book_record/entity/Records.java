package com.lipy.book_record.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.List;

@IdClass(RecordId.class)

@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Records {
    @Id
    @Column(name = "uid")
    private String uid;
    @Id
    @Column(name = "isbn")
    private String isbn;
    @OneToMany
    private List<Record> records;
}
