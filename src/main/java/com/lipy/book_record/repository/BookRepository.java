package com.lipy.book_record.repository;

import com.lipy.book_record.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface BookRepository extends JpaRepository<Book, UUID> {

    void deleteByUserIdAndIsbn(UUID userId, String isbn);

    boolean existsByUserIdAndIsbn(UUID userId, String isbn);

    @Query(value = "SELECT b.isbn, b.title, b.author, b.publisher, b.image, COUNT(b.isbn) as saveCount " +
            "FROM book b " +
            "GROUP BY b.isbn, b.title, b.author, b.publisher, b.image", nativeQuery = true)
    List<Object[]> findAllBooksWithCount();

    @Query("SELECT m.username, m.nickname, m.email, b.bookStatus FROM Book b JOIN b.user m WHERE b.isbn = :isbn")
    List<Object[]> findBookStatusByUsers(@Param("isbn") String isbn);

    Book findByUserIdAndIsbn(UUID userId, String isbn);

    Optional<Book> findByUserId(UUID id);
}