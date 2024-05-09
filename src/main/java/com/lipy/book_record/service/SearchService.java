package com.lipy.book_record.service;

import com.lipy.book_record.dto.SearchDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
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
    @Value("${naver.id}")   // API 요청 ID 값
    private String id;

    @Value("${naver.secret}")   // API 요청 SECRET 값
    private String secret;

    List<SearchDto> result = new ArrayList<>();
    JSONParser parser = new JSONParser();

    public List<SearchDto> search(String keyword) throws ParseException {
        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<String> httpEntity = getHttpEntity();
        String SEARCH_URL = "https://openapi.naver.com/v1/search/book.json";
        URI targetUrl = UriComponentsBuilder
                .fromUriString(SEARCH_URL)
                .queryParam("query", keyword)
                .build()
                .encode(StandardCharsets.UTF_8)
                .toUri();

        ResponseEntity<String> response = restTemplate.exchange(
                targetUrl,
                HttpMethod.GET,
                httpEntity,
                String.class
        );

        JSONObject obj = (JSONObject) parser.parse(response.getBody());
        JSONArray items = (JSONArray) obj.get("items");

        if (!items.isEmpty()){
            if (result.isEmpty()){
                goSearch(obj, items);
            }else {
                result.clear();
                goSearch(obj, items);
            }
            return result;
        }else {
            throw new NullPointerException();
        }
    }

    private void goSearch(JSONObject obj, JSONArray items){ // result에 저장 하는 로직
        for (Object item : items) {
            SearchDto dto = new SearchDto();
            obj = (JSONObject) item;

            dto.setTitle((String) obj.get("title"));
            dto.setImage((String) obj.get("image"));
            dto.setAuthor((String) obj.get("author"));
            dto.setIsbn((String) obj.get("isbn"));
            dto.setDescription((String) obj.get("description"));
            dto.setPublisher((String) obj.get("publisher"));

            result.add(dto);
        }
    }
    private HttpEntity<String> getHttpEntity() { //헤더에 인증 정보 추가
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("X-Naver-Client-Id", id);
        httpHeaders.set("X-Naver-Client-Secret", secret);
        return new HttpEntity<>(httpHeaders);
    }
}
