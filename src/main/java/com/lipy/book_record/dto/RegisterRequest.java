package com.lipy.book_record.dto;

import com.lipy.book_record.entity.Member;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {
    private String email;
    private String password;
    private String username;
    private String nickname;

    public RegisterRequest(Member member) {
        email = member.getEmail();
        password = member.getPassword();
        username = member.getUsername();
        nickname = member.getNickname();
    }

    public RegisterRequest( String email,String password,String nickname, String username) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.nickname = nickname;
    }
}
