package com.lipy.book_record.repository;

import com.lipy.book_record.entity.UserActivityLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface UserActivityLogRepository extends JpaRepository<UserActivityLog, UUID> {
    // 사용자 ID로 로그 조회
    List<UserActivityLog> findByUserId(UUID userId);

    // 특정 활동(Action)으로 로그 조회
    List<UserActivityLog> findByAction(String action);
}
