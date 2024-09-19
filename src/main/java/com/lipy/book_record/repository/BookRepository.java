package com.lipy.book_record.repository;

import com.lipy.book_record.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BookRepository extends JpaRepository<Book, Long> {

    void deleteByUserIdAndIsbn(Long userId, String isbn);
    boolean existsByUserIdAndIsbn(Long userId, String isbn);

    Book findByUserIdAndIsbn(Long userId, String isbn);

    Optional<Book> findByUserId(Long id);
}