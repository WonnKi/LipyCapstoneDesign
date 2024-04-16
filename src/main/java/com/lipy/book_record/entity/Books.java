package com.lipy.book_record.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Books {
    @Id
    private String isbn;

    @Column
    private String title;
    @Column
    private String image;
    @Column
    private String author;
    @Column
    private String description;
}
