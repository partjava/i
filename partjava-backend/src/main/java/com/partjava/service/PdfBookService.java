package com.partjava.service;

import com.partjava.entity.PdfAnnotation;
import com.partjava.entity.PdfBook;
import com.partjava.entity.PdfBookmark;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.List;
import java.util.Map;

public interface PdfBookService {
    List<PdfBook> listBooks(Integer userId, String category, String query);

    PdfBook uploadBook(Integer userId, MultipartFile file, String title, String category, Integer pageCount, String coverData);

    Map<String, Object> getBookDetail(Integer userId, Long bookId);

    PdfBook getOwnedBook(Integer userId, Long bookId);

    Path resolveBookFile(PdfBook book);

    PdfBook updateBook(Integer userId, Long bookId, String title, String category, Integer lastPage, Integer pageCount, String coverData, Integer readingSecondsIncrement);

    void deleteBook(Integer userId, Long bookId);

    PdfAnnotation addAnnotation(Integer userId, Long bookId, PdfAnnotation req);

    PdfAnnotation updateAnnotation(Integer userId, Long bookId, Long annId, PdfAnnotation req);

    void deleteAnnotation(Integer userId, Long bookId, Long annId);

    PdfBookmark addOrUpdateBookmark(Integer userId, Long bookId, Integer pageNumber, String label);

    void deleteBookmark(Integer userId, Long bookId, Integer pageNumber);
}
