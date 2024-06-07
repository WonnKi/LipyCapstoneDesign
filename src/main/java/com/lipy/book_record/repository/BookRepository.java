package com.lipy.book_record.repository;

import com.lipy.book_record.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Long> {

    void deleteByUserIdAndIsbn(String userId, String isbn);
    boolean existsByUserIdAndIsbn(String userId, String isbn);

    Book findByUserIdAndIsbn(String userId, String isbn);

    Optional<Book> findByUserId(String id);
}

