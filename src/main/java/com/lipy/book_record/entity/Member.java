package com.lipy.book_record.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false ,unique = true)
    private String name;

    @Column(nullable = false)
    private String nickname;

 /*   @Column(name = "books")
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Book> books = new ArrayList<>();*/
// 주석풀면 오류 걸림
    // 즐겨찾기한 소셜링 정보를 저장하기 위한 필드
    @ManyToMany
    @JoinTable(
            name = "favorite_socialings",
            joinColumns = @JoinColumn(name = "member_id"),
            inverseJoinColumns = @JoinColumn(name = "socialing_id")
    )
    private Set<Socialing> favoriteSocialings = new HashSet<>();

    public void removeFavoriteSocialing(Socialing socialing) {
        favoriteSocialings.remove(socialing);
        socialing.getFavoritedByMembers().remove(this);
    }
}
