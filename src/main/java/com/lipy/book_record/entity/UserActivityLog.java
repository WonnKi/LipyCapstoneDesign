package com.lipy.book_record.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "user_activity_log")
public class UserActivityLog {
    @jakarta.persistence.Id
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private UUID userId;  // 회원 ID

    @Column(nullable = false)
    private String action;  // 활동 유형 (예: LOGIN, BOOK_ADDED 등)

    @Column(columnDefinition = "TEXT")
    private String details;  // 활동에 대한 상세 정보

    @Column(nullable = false)
    private LocalDateTime timestamp;  // 활동 시간

    @Column(nullable = true)
    private String ipAddress;  // 사용자 IP 주소


    public UserActivityLog() {}

    public UserActivityLog(UUID userId, String action, String details, String ipAddress) {
        this.userId = userId;
        this.action = action;
        this.details = details;
        this.timestamp = LocalDateTime.now();  // 로그 생성 시점의 시간 자동 설정
        this.ipAddress = ipAddress;
    }
}