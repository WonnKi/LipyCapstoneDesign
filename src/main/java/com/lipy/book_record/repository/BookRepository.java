package com.lipy.book_record.repository;

import com.lipy.book_record.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface BookRepository extends JpaRepository<Book, UUID> {

    void deleteByUserIdAndIsbn(UUID userId, String isbn);
    boolean existsByUserIdAndIsbn(UUID userId, String isbn);

    Book findByUserIdAndIsbn(UUID userId, String isbn);

    Optional<Book> findByUserId(UUID id);
}