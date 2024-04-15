package service;

import dto.SearchDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
@Service
public class SearchService {

    @Value("${qkNKxrsF41B3NvzTuSbA}")
    private String id;

    @Value("${BgGjv1jmJQ}")
    private String secret;

    private final String SEARCH_URL = "https://openapi.naver.com/v1/search/book.json?display=20";

    public SearchDto search(){
        // 구현해야 함
        return null;
    }

    private HttpEntity<String> getHttpEntity() { //헤더에 인증 정보 추가
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("X-Naver-Client-Id", id);
        httpHeaders.set("X-Naver-Client-Secret", secret);
        return new HttpEntity<>(httpHeaders);
    }


}
