package com.lipy.book_record.controller;

import com.lipy.book_record.dto.SocialingListResponse;
import com.lipy.book_record.dto.SocialingRequest;
import com.lipy.book_record.dto.SocialingResponse;
import com.lipy.book_record.dto.UpdateSocialingRequest;
import com.lipy.book_record.entity.Socialing;
import com.lipy.book_record.service.SocialingService;
import com.lipy.book_record.service.UserActivityLogService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.lipy.book_record.entity.Member;
import com.lipy.book_record.service.MemberService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
public class SocialingController {

    private final SocialingService socialingService;
    private final MemberService memberService;
    private final UserActivityLogService userActivityLogService;

    @GetMapping("/socialing/search") // 게시글 검색
    public ResponseEntity<List<SocialingListResponse>> searchSocialingByTitle(@RequestParam String title) {
        List<SocialingListResponse> socialings = socialingService.searchSocialingByTitle(title);
        return ResponseEntity.ok().body(socialings);
    }
    @GetMapping("/socialing/{id}") // 게시글 조회
    public ResponseEntity<SocialingResponse> findSocialing(@PathVariable long id){
        Socialing socialing = socialingService.findById(id);
        return ResponseEntity.ok()
                .body(new SocialingResponse(socialing));
    }
    
    @GetMapping("/socialing") //게시글 목록 조회
    public ResponseEntity<List<SocialingListResponse>> findAllSocialing(){
        List<SocialingListResponse> socialing = socialingService.findAllSocialings()
                .stream().map(SocialingListResponse::new).toList();
        return ResponseEntity.ok().body(socialing);
    }

    @GetMapping("/socialing/hot") // 게시글 목록 인기순(현재 인원 많은 순)
    public ResponseEntity<List<SocialingListResponse>> findAllSortedByParticipants() {
        List<SocialingListResponse> sortedSocialings = socialingService.findAllOrderByCurrentParticipants()
                .stream().map(SocialingListResponse::new).toList();
        return ResponseEntity.ok(sortedSocialings);
    }
    @DeleteMapping("/socialing/{socialingId}") // 게시글 삭제
    public ResponseEntity<Void> deleteForSocialing(@PathVariable Long socialingId, HttpServletRequest request) {
        // 현재 로그인한 사용자의 정보를 가져옴
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String email = userDetails.getUsername();
        Member member = memberService.findByEmail(email);

        socialingService.deleteForSocialing(socialingId);

        // IP 주소 가져오기
        String ipAddress = request.getRemoteAddr();

        // 로그 저장
        userActivityLogService.logActivity(member.getId(), "DELETE_SOCIALING", "User deleted socialing with ID: " + socialingId, ipAddress);

        return ResponseEntity.noContent().build();
    }

    @PutMapping("/socialing/{socialingId}") // 게시글 수정
    public ResponseEntity<Socialing> updateForSocialing(@PathVariable long socialingId, @RequestBody UpdateSocialingRequest updateRequest, HttpServletRequest httpRequest) {
        // 현재 로그인한 사용자의 정보를 가져옴
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String email = userDetails.getUsername();
        Member member = memberService.findByEmail(email);

        Socialing socialing = socialingService.update(socialingId, updateRequest);

        // IP 주소 가져오기
        String ipAddress = httpRequest.getRemoteAddr();

        // 로그 저장
        userActivityLogService.logActivity(member.getId(), "UPDATE_SOCIALING", "User updated socialing with ID: " + socialingId, ipAddress);

        return ResponseEntity.ok().body(socialing);
    }

    @PostMapping("/socialing/post") // 게시글 생성
    public ResponseEntity<Socialing> createSocialingPost(@RequestBody Socialing socialing, HttpServletRequest request) {
        // 현재 로그인한 사용자의 정보를 가져옴
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String email = userDetails.getUsername();
        Member member = memberService.findByEmail(email);

        // 게시글 작성자 설정, 현재 인원 설정
        socialing.setWriter(member.getNickname());
        socialing.setCurrentparticipants(0);

        // 게시글 저장
        Socialing createdPost = socialingService.createSocialingPost(socialing);

        // IP 주소 가져오기
        String ipAddress = request.getRemoteAddr();

        // 로그 저장
        userActivityLogService.logActivity(member.getId(),"POST_SOCIALING", "User created a socialing post with title: " + socialing.getTitle(), ipAddress);

        return ResponseEntity.ok(createdPost);
    }

}