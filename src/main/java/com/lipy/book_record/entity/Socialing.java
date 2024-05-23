package com.lipy.book_record.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
public class Socialing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    private String writer;
    private String content;
    private int maxparticipants; // 최대 참여자 수
    private int currentparticipants; // 현재 참여자 수
    private Date date;

    //private String status; // "Pending", "Accepted", "Rejected"

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }



    // 다대다 관계로 멤버와 연결
    @JsonIgnore
    @ManyToMany(mappedBy = "favoriteSocialings")
    private Set<Member> favoritedByMembers = new HashSet<>();

    @OneToMany(mappedBy = "socialing")
    private Set<SocialingApplication> applications = new HashSet<>();

    //== 소셜링 인원 확인 ==//
    public boolean isFull() {
        return currentparticipants >= maxparticipants;
    }

    //== 소셜링 인원 증가 ==
    public void increaseParticipants() {
        currentparticipants++;
    }

    public void addApplication(SocialingApplication application) {
        this.applications.add(application);
        application.setSocialing(this);
    }

    public void decreaseParticipants() {
        if (this.currentparticipants > 0) {
            this.currentparticipants--;
        }
    }

    public void removeInterestedMember(Member member) {
        this.favoritedByMembers.remove(member);
        member.getFavoriteSocialings().remove(this);
    }
}
