package com.lipy.book_record.repository;

import com.lipy.book_record.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersRepository extends JpaRepository<Member, Long> {
    Member findByEmail(String email);
}