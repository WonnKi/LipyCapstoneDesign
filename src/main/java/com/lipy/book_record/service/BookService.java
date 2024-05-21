package com.lipy.book_record.service;

import com.lipy.book_record.dto.BookDto;
import com.lipy.book_record.dto.SearchDto;
import com.lipy.book_record.dto.UsersDto;
import com.lipy.book_record.entity.Book;
import com.lipy.book_record.entity.BookStatus;
import com.lipy.book_record.repository.BookRepository;
import com.lipy.book_record.repository.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@RequestMapping("/save")
public class BookService {

    private final BookRepository bookRep;
    private final UsersRepository userRep;

    public void saveBook(UsersDto user, SearchDto info) {
        /*테스트용 코드 입니다.*//*
        char[] codeTable = new char[]{
                'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
                'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
                'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd',
                'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n',
                'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
                'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7',
                '8', '9'
        };
        Random r = new Random();

        for (int i=1; i<=10; i++){
            String code = "";
            int codeLength = 10;
            for(int y = 1; y <= codeLength; y++) {
                int index = r.nextInt(codeTable.length);
                code += codeTable[index];
            }

            UsersDto user = new UsersDto((long) i,code + "@gmail.com","password", "닉네임", new ArrayList<>(), new ArrayList<>());
            for (int y=1; y<=10; y++){


                double min = 100000000;
                double max = 300000000;

                SearchDto info = new SearchDto();
                info.setIsbn(String.valueOf((int) ((Math.random() * (max - min)) + min)));
                info.setTitle("책제목");
                info.setAuthor("저자");
                info.setDescription("책에 대한 정보");
                info.setImage("이미지 경로");
                info.setPublisher("퍼블리셔");

                Book book = Book.builder()
                    .isbn(info.getIsbn())
                    .title(info.getTitle())
                    .image(info.getImage())
                    .author(info.getAuthor())
                    .publisher(info.getPublisher())
                    .description(info.getDescription())
                    .totPage(400)
                    .bookStatus(BookStatus.READING)
                    .startDate(LocalDate.now())
                    .endDate(LocalDate.now())
                    .score(0)
                    .readPage(0)
                    .build();

                user.addBook(book);
                }

            userRep.save(user.toEntity());
        }
        *//*테스트용 코드 입니다.*/



        Book book = Book.builder()
                .isbn(info.getIsbn())
                .title(info.getTitle())
                .image(info.getImage())
                .author(info.getAuthor())
                .publisher(info.getPublisher())
                .description(info.getDescription())
                .totPage(400)
                .bookStatus(BookStatus.READING)
                .startDate(LocalDate.now())
                .endDate(LocalDate.now())
                .score(0)
                .readPage(0)
                .build();

        user.addBook(book);

        userRep.save(user.toEntity());
    }

    public ResponseEntity<String> deleteBook(Long userId, String isbn){
        try {
            if (!bookRep.existsByUserIdAndIsbn(userId, isbn)) {
                return ResponseEntity.badRequest().body("사용자 ID: " + userId + "와 ISBN: " + isbn + "에 해당하는 책을 찾을 수 없습니다.");
            }
            bookRep.deleteByUserIdAndIsbn(userId, isbn);
            return ResponseEntity.ok("사용자 ID: " + userId + "의 ISBN: " + isbn + " 책이 삭제되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("사용자 ID: " + userId + "와 ISBN: " + isbn + "의 책을 삭제하는 중 오류가 발생했습니다.");
        }
    }

    public List<BookDto> ViewBookList(Long id){
        return userRep
                .findById(id)
                .orElseThrow(() -> new RuntimeException("ID : " + id + " 를 찾을 수 없습니다."))
                .getBooks()
                .stream()
                .map(BookDto::new)
                .toList();
    }

    public ResponseEntity<String>  changeStatus(Long userId, String isbn, String status) {
        try {
            if (!bookRep.existsByUserIdAndIsbn(userId, isbn)) {
                return ResponseEntity.badRequest().body("사용자 ID: " + userId + "와 ISBN: " + isbn + "에 해당하는 책을 찾을 수 없습니다.");
            }
            Book book = bookRep.findByUserIdAndIsbn(userId, isbn);
            String bStatus = String.valueOf(book.getBookStatus());
            book.setBookStatus(BookStatus.valueOf(status));
            bookRep.save(book);
            return ResponseEntity.ok("사용자 ID: " + userId + "의 ISBN: " + isbn + " 책이 " +
                    bStatus + " → " + status + "로 변경되었습니다.");
        }catch (Exception e) {
            return ResponseEntity.internalServerError().body("사용자 ID: " + userId + "와 ISBN: " + isbn + "의 책을 삭제하는 중 오류가 발생했습니다.");
        }

    }
}
