package com.partjava.controller;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.partjava.common.api.ApiResponse;
import com.partjava.entity.PdfAnnotation;
import com.partjava.entity.PdfBook;
import com.partjava.entity.PdfBookmark;
import com.partjava.service.PdfBookService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.UrlResource;
import org.springframework.core.io.support.ResourceRegion;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pdf-books")
@RequiredArgsConstructor
public class PdfBookController {

    private final PdfBookService pdfBookService;

    private Integer requireUserId(Integer userId) {
        if (userId == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "请先登录后使用我的书架");
        }
        return userId;
    }

    @GetMapping
    public ApiResponse<List<PdfBook>> listBooks(
            @RequestAttribute(value = "userId", required = false) Integer userId,
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "q", required = false) String query) {
        return ApiResponse.success(pdfBookService.listBooks(requireUserId(userId), category, query));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<PdfBook> uploadBook(
            @RequestAttribute(value = "userId", required = false) Integer userId,
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "pageCount", required = false) Integer pageCount,
            @RequestParam(value = "coverData", required = false) String coverData) {
        PdfBook saved = pdfBookService.uploadBook(requireUserId(userId), file, title, category, pageCount, coverData);
        return ApiResponse.success("导入成功", saved);
    }

    @GetMapping("/{id}")
    public ApiResponse<Map<String, Object>> getBookDetail(
            @RequestAttribute(value = "userId", required = false) Integer userId,
            @PathVariable("id") Long bookId) {
        return ApiResponse.success(pdfBookService.getBookDetail(requireUserId(userId), bookId));
    }

    @GetMapping("/{id}/file")
    public ResponseEntity<?> streamBookFile(
            @RequestAttribute(value = "userId", required = false) Integer userId,
            @PathVariable("id") Long bookId,
            @RequestHeader HttpHeaders headers) throws IOException {
        PdfBook book = pdfBookService.getOwnedBook(requireUserId(userId), bookId);
        Path filePath = pdfBookService.resolveBookFile(book);
        UrlResource resource = new UrlResource(filePath.toUri());
        long contentLength = resource.contentLength();

        List<HttpRange> ranges = headers.getRange();
        if (!ranges.isEmpty()) {
            HttpRange range = ranges.get(0);
            long start = range.getRangeStart(contentLength);
            long end = range.getRangeEnd(contentLength);
            long chunkSize = Math.min(1024L * 1024L * 4L, end - start + 1);
            ResourceRegion region = new ResourceRegion(resource, start, chunkSize);
            return ResponseEntity.status(HttpStatus.PARTIAL_CONTENT)
                    .contentType(MediaType.APPLICATION_PDF)
                    .header(HttpHeaders.ACCEPT_RANGES, "bytes")
                    .body(region);
        }

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .contentLength(contentLength)
                .header(HttpHeaders.ACCEPT_RANGES, "bytes")
                .body(resource);
    }

    @RequestMapping(value = "/{id}", method = {RequestMethod.PUT, RequestMethod.PATCH})
    public ApiResponse<PdfBook> updateBook(
            @RequestAttribute(value = "userId", required = false) Integer userId,
            @PathVariable("id") Long bookId,
            @RequestBody BookUpdateReq req) {
        PdfBook updated = pdfBookService.updateBook(
                requireUserId(userId),
                bookId,
                req.getTitle(),
                req.getCategory(),
                req.getLastPage(),
                req.getPageCount(),
                req.getCoverData(),
                req.getReadingSecondsIncrement()
        );
        return ApiResponse.success(updated);
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> deleteBook(
            @RequestAttribute(value = "userId", required = false) Integer userId,
            @PathVariable("id") Long bookId) {
        pdfBookService.deleteBook(requireUserId(userId), bookId);
        return ApiResponse.success("已从书架移除", null);
    }

    @PostMapping("/{id}/annotations")
    public ApiResponse<PdfAnnotation> addAnnotation(
            @RequestAttribute(value = "userId", required = false) Integer userId,
            @PathVariable("id") Long bookId,
            @RequestBody AnnotationReq req) {
        PdfAnnotation ann = PdfAnnotation.builder()
                .pageNumber(req.getPageNumber())
                .type(req.getType())
                .xPct(req.getXPct())
                .yPct(req.getYPct())
                .color(req.getColor())
                .noteContent(req.getNoteContent())
                .build();
        return ApiResponse.success(pdfBookService.addAnnotation(requireUserId(userId), bookId, ann));
    }

    @PutMapping("/{id}/annotations/{annId}")
    public ApiResponse<PdfAnnotation> updateAnnotation(
            @RequestAttribute(value = "userId", required = false) Integer userId,
            @PathVariable("id") Long bookId,
            @PathVariable("annId") Long annId,
            @RequestBody AnnotationReq req) {
        PdfAnnotation ann = PdfAnnotation.builder()
                .xPct(req.getXPct())
                .yPct(req.getYPct())
                .color(req.getColor())
                .noteContent(req.getNoteContent())
                .build();
        return ApiResponse.success(pdfBookService.updateAnnotation(requireUserId(userId), bookId, annId, ann));
    }

    @DeleteMapping("/{id}/annotations/{annId}")
    public ApiResponse<Void> deleteAnnotation(
            @RequestAttribute(value = "userId", required = false) Integer userId,
            @PathVariable("id") Long bookId,
            @PathVariable("annId") Long annId) {
        pdfBookService.deleteAnnotation(requireUserId(userId), bookId, annId);
        return ApiResponse.success(null);
    }

    @PostMapping("/{id}/bookmarks")
    public ApiResponse<PdfBookmark> addOrUpdateBookmark(
            @RequestAttribute(value = "userId", required = false) Integer userId,
            @PathVariable("id") Long bookId,
            @RequestBody BookmarkReq req) {
        return ApiResponse.success(pdfBookService.addOrUpdateBookmark(
                requireUserId(userId), bookId, req.getPageNumber(), req.getLabel()));
    }

    @DeleteMapping("/{id}/bookmarks/{pageNumber}")
    public ApiResponse<Void> deleteBookmark(
            @RequestAttribute(value = "userId", required = false) Integer userId,
            @PathVariable("id") Long bookId,
            @PathVariable("pageNumber") Integer pageNumber) {
        pdfBookService.deleteBookmark(requireUserId(userId), bookId, pageNumber);
        return ApiResponse.success(null);
    }

    @Data
    public static class BookUpdateReq {
        private String title;
        private String category;
        private Integer lastPage;
        private Integer pageCount;
        private String coverData;
        private Integer readingSecondsIncrement;
    }

    @Data
    public static class AnnotationReq {
        private Integer pageNumber;
        private String type;
        @JsonProperty("xPct")
        private BigDecimal xPct;
        @JsonProperty("yPct")
        private BigDecimal yPct;
        private String color;
        private String noteContent;
    }

    @Data
    public static class BookmarkReq {
        private Integer pageNumber;
        private String label;
    }
}
