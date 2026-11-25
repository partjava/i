package com.partjava.controller;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.partjava.common.api.ApiResponse;
import com.partjava.entity.PdfAnnotation;
import com.partjava.entity.PdfBook;
import com.partjava.entity.PdfBookmark;
import com.partjava.service.PdfBookService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardOpenOption;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pdf-books")
@RequiredArgsConstructor
public class PdfBookController {

    private final PdfBookService pdfBookService;

    private Integer requireUserId(Integer userId) {
        if (userId == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "请先登录后使用该操作");
        }
        return userId;
    }

    @GetMapping
    public ApiResponse<List<PdfBook>> listBooks(
            @RequestAttribute(value = "userId", required = false) Integer userId,
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "q", required = false) String query) {
        return ApiResponse.success(pdfBookService.listBooks(userId, category, query));
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
        return ApiResponse.success(pdfBookService.getBookDetail(userId, bookId));
    }

    @PostMapping("/{id}/stream-token")
    public ApiResponse<Map<String, String>> issueStreamToken(
            @RequestAttribute(value = "userId", required = false) Integer userId,
            @PathVariable("id") Long bookId) {
        String token = pdfBookService.issueStreamToken(requireUserId(userId), bookId);
        return ApiResponse.success(Map.of("token", token));
    }

    @RequestMapping(value = "/{id}/file", method = {RequestMethod.GET, RequestMethod.HEAD})
    public void streamBookFile(
            @RequestAttribute(value = "userId", required = false) Integer userId,
            @RequestParam(value = "st", required = false) String streamToken,
            @PathVariable("id") Long bookId,
            @RequestHeader HttpHeaders headers,
            HttpServletRequest request,
            HttpServletResponse response) throws IOException {
        Integer effectiveUserId = userId;
        if (effectiveUserId == null && streamToken != null && !streamToken.isBlank()) {
            effectiveUserId = pdfBookService.verifyStreamToken(streamToken, bookId);
        }

        PdfBook book = pdfBookService.getReadableBook(effectiveUserId, bookId);
        Path filePath = pdfBookService.resolveBookFile(book);
        long contentLength = Files.size(filePath);

        response.setContentType(MediaType.APPLICATION_PDF_VALUE);
        response.setHeader(HttpHeaders.ACCEPT_RANGES, "bytes");

        if (HttpMethod.HEAD.matches(request.getMethod())) {
            response.setStatus(HttpServletResponse.SC_OK);
            response.setContentLengthLong(contentLength);
            return;
        }

        List<HttpRange> ranges = headers.getRange();
        long start = 0L;
        long chunkSize = contentLength;

        if (!ranges.isEmpty() && contentLength > 0) {
            HttpRange range = ranges.get(0);
            start = range.getRangeStart(contentLength);
            long requestedEnd = range.getRangeEnd(contentLength);
            long actualEnd = Math.min(requestedEnd, start + 8L * 1024L * 1024L - 1L);
            actualEnd = Math.min(actualEnd, contentLength - 1L);
            if (start > actualEnd || start >= contentLength) {
                response.setStatus(HttpServletResponse.SC_REQUESTED_RANGE_NOT_SATISFIABLE);
                response.setHeader(HttpHeaders.CONTENT_RANGE, "bytes */" + contentLength);
                return;
            }
            chunkSize = actualEnd - start + 1L;
            response.setStatus(HttpServletResponse.SC_PARTIAL_CONTENT);
            response.setHeader(HttpHeaders.CONTENT_RANGE, "bytes " + start + "-" + actualEnd + "/" + contentLength);
        } else {
            response.setStatus(HttpServletResponse.SC_OK);
        }

        response.setContentLengthLong(chunkSize);
        OutputStream outputStream = response.getOutputStream();
        try (FileChannel channel = FileChannel.open(filePath, StandardOpenOption.READ)) {
            channel.position(start);
            byte[] buffer = new byte[65536];
            ByteBuffer bb = ByteBuffer.wrap(buffer);
            long remaining = chunkSize;
            while (remaining > 0) {
                bb.clear();
                if (remaining < bb.limit()) {
                    bb.limit((int) remaining);
                }
                int read = channel.read(bb);
                if (read == -1) break;
                outputStream.write(buffer, 0, read);
                remaining -= read;
            }
            outputStream.flush();
        }
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
