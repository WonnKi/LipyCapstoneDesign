package com.lipy.book_record.repository;

import com.lipy.book_record.entity.Socialing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SocialingRepository extends JpaRepository<Socialing, Long> {
    List<Socialing> findAllByOrderByCurrentparticipantsDesc();
    List<Socialing> findByTitleContaining(String title);
}
