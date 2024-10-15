package com.lipy.book_record.service;

import com.lipy.book_record.entity.UserActivityLog;
import com.lipy.book_record.repository.UserActivityLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UserActivityLogService {
    @Autowired
    private UserActivityLogRepository logRepository;

    public void logActivity(UUID userId, String action, String details, String ipAddress) {
        UserActivityLog log = new UserActivityLog(userId, action, details, ipAddress);
        logRepository.save(log);  // 로그 저장
    }

    public List<UserActivityLog> getLogsByUserId(UUID userId) {
        return logRepository.findByUserId(userId);  // 특정 유저의 로그 조회
    }

    public List<UserActivityLog> getAllLogs() {
        return logRepository.findAll();  // 모든 로그 조회
    }
}