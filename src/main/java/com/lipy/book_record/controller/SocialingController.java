package com.lipy.book_record.controller;

import com.lipy.book_record.dto.SocialingListResponse;
import com.lipy.book_record.dto.SocialingResponse;
import com.lipy.book_record.dto.UpdateSocialingRequest;
import com.lipy.book_record.entity.Socialing;
import com.lipy.book_record.service.SocialingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.lipy.book_record.entity.Member;
import com.lipy.book_record.service.MemberService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

@RestController
public class SocialingController {

    private final SocialingService socialingService;

    private final MemberService memberService;

    @Autowired
    public SocialingController(SocialingService socialingService, MemberService memberService) {
        this.socialingService = socialingService;
        this.memberService = memberService;
    }

    @GetMapping("/socialing/search") // 게시글 검색
    public ResponseEntity<List<SocialingListResponse>> searchSocialingByTitle(@RequestParam("title") String title) {
        List<SocialingListResponse> socialings = socialingService.searchSocialingByTitle(title);
        return ResponseEntity.ok().body(socialings);
    }
    @GetMapping("/socialing/{socialingId}") // 게시글 조회
    public ResponseEntity<SocialingResponse> findSocialing(@PathVariable("socialingId") Long socialingId){
        Socialing socialing = socialingService.findById(socialingId);
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
    public ResponseEntity<Void> deleteForSocialing(@PathVariable("socialingId") Long socialingId){
        socialingService.deleteForSocialing(socialingId);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/socialing/{socialingId}") // 게시글 수정
    public ResponseEntity<Socialing> updateForSocialing(@PathVariable("socialingId") Long socialingId,
                                                        @RequestBody UpdateSocialingRequest request){
        Socialing socialing = socialingService.update(socialingId, request);
        return ResponseEntity.ok().body(socialing);
    }
    @PostMapping("/socialing/post") // 게시글 생성
    public ResponseEntity<Socialing> createSocialingPost(@RequestBody Socialing socialing) {
        // 현재 로그인한 사용자의 정보를 가져옴
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String username = userDetails.getUsername();
        Member member = memberService.findByUsername(username);

        // 게시글 작성자 설정, 현재 인원 설정
        socialing.setWriter(member.getName());
        socialing.setCurrentparticipants(0);

        // 게시글 저장
        Socialing createdPost = socialingService.createSocialingPost(socialing);
        return ResponseEntity.ok(createdPost);
    }



}