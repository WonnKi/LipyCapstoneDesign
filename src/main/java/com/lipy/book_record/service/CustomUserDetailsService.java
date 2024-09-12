package com.lipy.book_record.service;

import com.lipy.book_record.entity.Member;
import com.lipy.book_record.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Find the member by username
        Member member = memberRepository.findByUsername(username);
        if (member == null) {
            throw new UsernameNotFoundException("User not found");
        }

        return new org.springframework.security.core.userdetails.User(
                member.getUsername(),  // Use username instead of email
                member.getPassword(),
                getAuthorities(member)
        );
    }

    private Collection<? extends GrantedAuthority> getAuthorities(Member member) {
        return List.of(new SimpleGrantedAuthority("ROLE_" + member.getRole()));
    }
}