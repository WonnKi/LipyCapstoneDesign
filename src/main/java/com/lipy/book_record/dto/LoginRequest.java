package com.lipy.book_record.dto;

import com.lipy.book_record.entity.Member;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {
    private String username;
    private String password;

    public LoginRequest() {}

    public LoginRequest(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public LoginRequest(Member member){
        this.username = member.getUsername();
        this.password = member.getPassword();
    }
}

