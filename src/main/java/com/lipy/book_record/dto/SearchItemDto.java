package com.lipy.book_record.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class SearchItemDto {
    @JsonProperty("title")
    public String title;

    @JsonProperty("author")
    public String author;

    @JsonProperty("image")
    public String image;

    @JsonProperty("isbn")
    public String isbn;

    @JsonProperty("description")
    public String description;
}
