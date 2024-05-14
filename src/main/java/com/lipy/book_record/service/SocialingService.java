package com.lipy.book_record.service;

import com.lipy.book_record.dto.SocialingListResponse;
import com.lipy.book_record.dto.UpdateSocialingRequest;
import com.lipy.book_record.entity.Socialing;
import com.lipy.book_record.repository.SocialingRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SocialingService {
    private final SocialingRepository socialingRepository;

    @Transactional
    public Socialing update(long id, UpdateSocialingRequest request){
        Socialing socialing = socialingRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("not found:" + id));

        if(request.getTitle() != null){
            socialing.setTitle(request.getTitle());
        }
        if(request.getDescription() != null){
            socialing.setDescription(request.getDescription());
        }
        if(request.getContent() != null){
            socialing.setContent(request.getContent());
        }

        int maxParticipants = request.getMaxparticipants();
        socialing.setMaxparticipants(maxParticipants);

        if(request.getDate() != null){
            socialing.setDate(request.getDate());
        }

        return socialingRepository.save(socialing);
    }

    public List<SocialingListResponse> searchSocialingByTitle(String title) { // title로 검색
        List<Socialing> socialings = socialingRepository.findByTitleContaining(title);
        return socialings.stream()
                .map(SocialingListResponse::new)
                .collect(Collectors.toList());
    }

    public Socialing findById(long id){
        return socialingRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException(("not found:" + id)));
    }

    public Socialing createSocialingPost(Socialing socialing) { // 게시글 생성
        return socialingRepository.save(socialing);
    }

    public List<Socialing> findAllOrderByCurrentParticipants() {
        return socialingRepository.findAllByOrderByCurrentparticipantsDesc();
    }
    public List<Socialing> findAllSocialings() { // 게시글 목록 조회
        return socialingRepository.findAll();
    }
    public void deleteForSocialing(Long socialingId) { // 게시글 삭제
        socialingRepository.deleteById(socialingId);
    }
}


