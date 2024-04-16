package com.lipy.book_record.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class SearchDto {
    @JsonProperty("title")
    public String title;
    @JsonProperty("image")
    public String image;
    @JsonProperty("author")
    public String author;
    @JsonProperty("isbn")
    public String isbn;
    @JsonProperty("description")
    public String description;
}
