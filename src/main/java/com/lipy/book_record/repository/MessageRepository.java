package com.lipy.book_record.repository;

import com.lipy.book_record.entity.Member;
import com.lipy.book_record.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface MessageRepository extends JpaRepository<Message, Integer> {
    List<Message> findAllByReceiver(Member member);
    List<Message> findAllBySender(Member member);

}
