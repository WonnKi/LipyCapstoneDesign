import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import service.SearchService;

@Slf4j
@RestController
@RequestMapping("search")
@RequiredArgsConstructor
public class SearchController {

    private final SearchService searchService;

    /**
     * 책 검색
     * localhost:8080/search
     *
     * @param keyword
     * @param start
     * @return ResponseEntity
     */
    @GetMapping("")
    public ResponseEntity<?> search(
            @RequestParam String keyword,
            @RequestParam int start) {
        log.info("[Request] search");
        return new ResponseEntity<>(searchService.search(keyword, start), HttpStatus.OK);
    }
}