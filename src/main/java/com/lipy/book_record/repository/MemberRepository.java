package com.lipy.book_record.repository;

import com.lipy.book_record.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface MemberRepository extends JpaRepository<Member, UUID> {
    Member findByEmail(String email);

    List<Member> findByUsername(String name);

    Optional<Member> findByNickname(String nickname);

    Optional<Member> findById(UUID memberId);

    boolean existsByEmail(String email);

    boolean existsByNickname(String nickname);

    @Query("SELECT m FROM Member m WHERE " +
            "(:email IS NULL OR m.email LIKE %:email%) AND " +
            "(:name IS NULL OR m.username LIKE %:name%) AND " +
            "(:nickname IS NULL OR m.nickname LIKE %:nickname%)")
    List<Member> searchMembers(@Param("email") String email,
                               @Param("name") String name,
                               @Param("nickname") String nickname);
}