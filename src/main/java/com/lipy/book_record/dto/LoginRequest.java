package com.lipy.book_record.dto;

import com.lipy.book_record.entity.Member;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {
    private String email;
    private String password;

    public LoginRequest() {}

    public LoginRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public LoginRequest(Member member){
        this.email = member.getEmail();
        this.password = member.getPassword();
    }
}