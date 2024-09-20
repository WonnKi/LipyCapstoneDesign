package com.lipy.book_record.repository;

import com.lipy.book_record.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface MemberRepository extends JpaRepository<Member, UUID> {
    Member findByEmail(String email);

    Optional<Member> findById(UUID memberId);
}