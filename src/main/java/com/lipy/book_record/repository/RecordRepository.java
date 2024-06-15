package com.lipy.book_record.repository;

import com.lipy.book_record.entity.Record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RecordRepository extends JpaRepository<Record, String> {
}