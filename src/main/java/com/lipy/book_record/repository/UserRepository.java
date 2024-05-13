package com.lipy.book_record.repository;

import com.lipy.book_record.entity.User;
import org.antlr.v4.runtime.misc.LogManager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

}
