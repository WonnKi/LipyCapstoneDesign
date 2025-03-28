
package com.lipy.book_record.dto;

import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class SearchDto {
    public String title;
    public String image;
    public String author;
    public String isbn;
    public String description;
    public String publisher;
}
