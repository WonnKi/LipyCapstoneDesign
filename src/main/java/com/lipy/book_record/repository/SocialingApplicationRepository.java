package com.lipy.book_record.repository;

import com.lipy.book_record.entity.SocialingApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SocialingApplicationRepository extends JpaRepository<SocialingApplication, Long> {
}
