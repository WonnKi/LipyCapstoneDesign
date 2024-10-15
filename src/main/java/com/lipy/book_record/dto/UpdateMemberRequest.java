package com.lipy.book_record.dto;

import com.sun.istack.NotNull;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateMemberRequest {
    @NotBlank
    private String email;

    @NotBlank
    private String username;

    @NotBlank
    private String nickname;

    @NotBlank
    private String gender;

    @NotNull
    private int age;

    @NotBlank
    private String phonenumber;

    @NotBlank
    private String password;

}