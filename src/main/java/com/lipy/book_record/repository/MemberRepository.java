package com.lipy.book_record.repository;

import com.lipy.book_record.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface MemberRepository extends JpaRepository<Member, UUID> {
    List<Member> findByEmail(String email);

    List<Member> findByUsername(String name);

    List<Member> findByNickname(String nickname);

    Optional<Member> findById(UUID memberId);
}