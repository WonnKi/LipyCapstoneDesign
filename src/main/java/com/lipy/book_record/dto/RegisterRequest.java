package com.lipy.book_record.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {
    private String username;
    private String password;
    private String nickname;
    private String email;

    // 기본 생성자
    public RegisterRequest() {}

    // 매개변수가 있는 생성자
    public RegisterRequest(String username, String password, String nickname, String email) {
        this.username = username;
        this.password = password;
        this.nickname = nickname;
        this.email = email;
    }
}