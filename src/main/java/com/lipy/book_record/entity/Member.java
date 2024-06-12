package com.lipy.book_record.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "Member")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false ,unique = true)
    private String username;

    @Column(nullable = false)
    private String nickname;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Book> books = new ArrayList<>();

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

    @Builder
    public Member(Long id, String email, String password, String username, String nickname, List<Book> books) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.username = username;
        this.nickname = nickname;
        this.books = books;
    }

    public Member(String username, String password, String email, String nickname) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.nickname = nickname;
    }
}
