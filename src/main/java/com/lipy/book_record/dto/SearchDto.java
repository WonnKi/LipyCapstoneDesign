package com.lipy.book_record.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class SearchDto {
//    @JsonProperty("title")
//    public String title;
//    @JsonProperty("image")
//    public String image;
//    @JsonProperty("author")
//    public String author;
//    @JsonProperty("isbn")
//    public String isbn;
//    @JsonProperty("description")
//    public String description;
//    public String lastBuildDate;
//    public String total;
//    public String start;
//    public String display;
//    private List<SearchItemDto> items;

    public Integer total;
    List<Items> items = new ArrayList<>();

    static class Items{
        public String title;
        public String image;
        public String author;
        public String isbn;
        public String description;
    }
}

