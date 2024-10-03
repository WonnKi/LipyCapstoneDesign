package com.lipy.book_record.controller;

import com.lipy.book_record.entity.UserActivityLog;
import com.lipy.book_record.service.UserActivityLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/admin/logs")
public class AdminLogController {

    @Autowired
    private UserActivityLogService logService;

    @GetMapping("/user/{userId}")
    public List<UserActivityLog> getUserLogs(@PathVariable UUID userId) {
        return logService.getLogsByUserId(userId);
    }

    @GetMapping
    public List<UserActivityLog> getAllLogs() {
        return logService.getAllLogs();
    }
}