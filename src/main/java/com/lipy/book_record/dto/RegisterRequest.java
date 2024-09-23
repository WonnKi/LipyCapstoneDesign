package com.lipy.book_record.dto;

import com.lipy.book_record.entity.Member;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {
    private String username;
    private String password;
    private String nickname;
    private String email;
    private String gender; // 성별
    private String region; // 지역
    private int age;       // 나이

    public RegisterRequest(Member member) {
        email = member.getEmail();
        password = member.getPassword();
        username = member.getUsername();
        nickname = member.getNickname();
        gender = member.getGender();
        region = member.getRegion();
        age = member.getAge();
    }

    public RegisterRequest( String email,String password,String nickname, String username , String gender, String region, int age) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.nickname = nickname;
        this.gender = gender;
        this.region = region;
        this.age = age;
    }
}