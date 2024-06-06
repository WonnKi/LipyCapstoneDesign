package com.lipy.book_record.dto;

import com.lipy.book_record.entity.Users;
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

    public LoginRequest(Users users){
        this.email = users.getEmail();
        this.password = users.getPassword();
    }
}

