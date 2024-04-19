package com.lipy.book_record.service;

import com.lipy.book_record.dto.SearchDto;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Service
@NoArgsConstructor
@RequestMapping("test")
public class SearchService {


    @Value("${naver.id}")
    private String id;

    @Value("${naver.secret}")
    private String secret;

    private static List<SearchDto> searchResults = new ArrayList<>();

    public void search(String keyword){
        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<String> httpEntity = getHttpEntity();
        String SEARCH_URL = "https://openapi.naver.com/v1/search/book.json";
        URI targetUrl = UriComponentsBuilder
                .fromUriString(SEARCH_URL)
                .queryParam("query", keyword)
                .build()
                .encode(StandardCharsets.UTF_8)
                .toUri();

        SearchDto response = restTemplate.exchange(
                targetUrl,
                HttpMethod.GET,
                httpEntity,
                SearchDto.class
        ).getBody();

        searchResults.add(response);

    }
    private HttpEntity<String> getHttpEntity() { //헤더에 인증 정보 추가
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("X-Naver-Client-Id", id);
        httpHeaders.set("X-Naver-Client-Secret", secret);
        return new HttpEntity<>(httpHeaders);
    }

    public static List<SearchDto> result() {
        return searchResults;
    }

}
