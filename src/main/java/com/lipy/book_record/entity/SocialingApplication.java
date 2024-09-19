package com.lipy.book_record.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class SocialingApplication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne
    @JoinColumn(name = "socialing_id", nullable = false)
    private Socialing socialing;

    @Builder
    public SocialingApplication(Member member,Socialing socialing){
        this.member = member;
        this.socialing = socialing;
    }

    public SocialingApplication() {

    }
}