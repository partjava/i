package com.partjava.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.partjava.entity.PdfAnnotation;
import com.partjava.entity.PdfBook;
import com.partjava.entity.PdfBookmark;
import com.partjava.repository.PdfAnnotationMapper;
import com.partjava.repository.PdfBookMapper;
import com.partjava.repository.PdfBookmarkMapper;
import com.partjava.service.PdfBookService;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.security.MessageDigest;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class PdfBookServiceImpl implements PdfBookService {

    private final PdfBookMapper pdfBookMapper;
    private final PdfAnnotationMapper pdfAnnotationMapper;
    private final PdfBookmarkMapper pdfBookmarkMapper;

    @Value("${partjava.pdf.storage-dir:../partjavadata/pdfs}")
    private String storageDir;

    @Value("${jwt.secret:}")
    private String jwtSecret;

    private byte[] streamHmacKey;

    @PostConstruct
    void initStreamKey() {
        String source = (jwtSecret != null && !jwtSecret.isBlank())
                ? jwtSecret + ":pdf-stream-v1"
                : UUID.randomUUID() + ":pdf-stream-v1";
        this.streamHmacKey = source.getBytes(StandardCharsets.UTF_8);
    }

    private Path baseStoragePath() {
        return Paths.get(storageDir).toAbsolutePath().normalize();
    }

    @Override
    public List<PdfBook> listBooks(Integer userId, String category, String query) {
        LambdaQueryWrapper<PdfBook> wrapper = new LambdaQueryWrapper<>();
        if (userId != null) {
            wrapper.and(w -> w.eq(PdfBook::getUserId, userId).or().eq(PdfBook::getIsDemo, true));
        } else {
            wrapper.eq(PdfBook::getIsDemo, true);
        }

        if (category != null && !category.isBlank() && !"全部".equals(category)) {
            wrapper.eq(PdfBook::getCategory, category.trim());
        }
        if (query != null && !query.isBlank()) {
            String kw = query.trim();
            wrapper.and(w -> w.like(PdfBook::getTitle, kw)
                    .or().like(PdfBook::getOriginalFilename, kw)
                    .or().like(PdfBook::getAuthor, kw));
        }
        wrapper.last("ORDER BY is_demo ASC, COALESCE(last_read_at, updated_at) DESC, id ASC");

        List<PdfBook> books = pdfBookMapper.selectList(wrapper);
        for (PdfBook book : books) {
            if (userId != null) {
                Long annCount = pdfAnnotationMapper.selectCount(
                        new LambdaQueryWrapper<PdfAnnotation>()
                                .eq(PdfAnnotation::getBookId, book.getId())
                                .eq(PdfAnnotation::getUserId, userId)
                );
                Long bmCount = pdfBookmarkMapper.selectCount(
                        new LambdaQueryWrapper<PdfBookmark>()
                                .eq(PdfBookmark::getBookId, book.getId())
                                .eq(PdfBookmark::getUserId, userId)
                );
                book.setAnnotationCount(annCount != null ? annCount.intValue() : 0);
                book.setBookmarkCount(bmCount != null ? bmCount.intValue() : 0);
            } else {
                book.setAnnotationCount(0);
                book.setBookmarkCount(0);
            }
        }
        return books;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public PdfBook uploadBook(Integer userId, MultipartFile file, String title, String category, Integer pageCount, String coverData) {
        if (file == null || file.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "上传的 PDF 文件不能为空");
        }

        byte[] header = new byte[5];
        try (InputStream in = file.getInputStream()) {
            int read = in.readNBytes(header, 0, 5);
            String sig = new String(header, 0, Math.max(0, read), StandardCharsets.US_ASCII);
            if (!sig.startsWith("%PDF-")) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "仅支持有效的 PDF 格式文件");
            }
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "读取上传文件失败");
        }

        String originalName = file.getOriginalFilename() != null ? Paths.get(file.getOriginalFilename()).getFileName().toString() : "document.pdf";
        String cleanTitle = (title != null && !title.isBlank())
                ? title.trim()
                : originalName.replaceFirst("(?i)\\.pdf$", "");
        if (cleanTitle.length() > 255) {
            cleanTitle = cleanTitle.substring(0, 255);
        }
        String cleanCategory = (category != null && !category.isBlank()) ? category.trim() : "未分类";
        int safePageCount = (pageCount != null && pageCount > 0) ? pageCount : 1;

        String storedFilename = UUID.randomUUID() + ".pdf";
        Path userDir = baseStoragePath().resolve(String.valueOf(userId)).normalize();
        Path targetPath = userDir.resolve(storedFilename).normalize();
        if (!targetPath.startsWith(baseStoragePath())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "非法存储路径");
        }

        try {
            Files.createDirectories(userDir);
            try (InputStream in = file.getInputStream()) {
                Files.copy(in, targetPath, StandardCopyOption.REPLACE_EXISTING);
            }
        } catch (IOException e) {
            log.error("保存 PDF 文件失败: {}", targetPath, e);
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "保存 PDF 文件失败");
        }

        LocalDateTime now = LocalDateTime.now();
        PdfBook book = PdfBook.builder()
                .userId(userId)
                .title(cleanTitle)
                .originalFilename(originalName)
                .storedFilename(storedFilename)
                .fileSize(file.getSize())
                .pageCount(safePageCount)
                .lastPage(1)
                .category(cleanCategory)
                .coverData(coverData)
                .readingSeconds(0)
                .isDemo(false)
                .author("")
                .licenseNote("")
                .lastReadAt(now)
                .createdAt(now)
                .updatedAt(now)
                .build();

        pdfBookMapper.insert(book);
        book.setAnnotationCount(0);
        book.setBookmarkCount(0);
        return book;
    }

    @Override
    public PdfBook getReadableBook(Integer userId, Long bookId) {
        PdfBook book = pdfBookMapper.selectById(bookId);
        if (book == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "未找到该书籍");
        }
        if (Boolean.TRUE.equals(book.getIsDemo())) {
            return book;
        }
        if (userId == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "请先登录后查看个人书籍");
        }
        if (!Objects.equals(book.getUserId(), userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "无权访问该书籍");
        }
        return book;
    }

    @Override
    public PdfBook getOwnedBook(Integer userId, Long bookId) {
        PdfBook book = pdfBookMapper.selectById(bookId);
        if (book == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "未找到该书籍");
        }
        if (Boolean.TRUE.equals(book.getIsDemo()) || !Objects.equals(book.getUserId(), userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "无权修改或删除该书籍");
        }
        return book;
    }

    @Override
    public Map<String, Object> getBookDetail(Integer userId, Long bookId) {
        PdfBook book = getReadableBook(userId, bookId);
        List<PdfAnnotation> annotations = userId != null
                ? pdfAnnotationMapper.selectList(
                    new LambdaQueryWrapper<PdfAnnotation>()
                            .eq(PdfAnnotation::getBookId, bookId)
                            .eq(PdfAnnotation::getUserId, userId)
                            .orderByAsc(PdfAnnotation::getPageNumber)
                            .orderByAsc(PdfAnnotation::getId))
                : Collections.emptyList();
        List<PdfBookmark> bookmarks = userId != null
                ? pdfBookmarkMapper.selectList(
                    new LambdaQueryWrapper<PdfBookmark>()
                            .eq(PdfBookmark::getBookId, bookId)
                            .eq(PdfBookmark::getUserId, userId)
                            .orderByAsc(PdfBookmark::getPageNumber))
                : Collections.emptyList();
        book.setAnnotationCount(annotations.size());
        book.setBookmarkCount(bookmarks.size());

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("book", book);
        result.put("annotations", annotations);
        result.put("bookmarks", bookmarks);
        return result;
    }

    @Override
    public Path resolveBookFile(PdfBook book) {
        Path base = baseStoragePath();
        Path subDir = Boolean.TRUE.equals(book.getIsDemo())
                ? base.resolve("demo")
                : base.resolve(String.valueOf(book.getUserId()));
        Path filePath = subDir.resolve(book.getStoredFilename()).normalize();
        if (!filePath.startsWith(base) || !Files.exists(filePath)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "PDF 原文件不存在");
        }
        return filePath;
    }

    @Override
    public String issueStreamToken(Integer userId, Long bookId) {
        getReadableBook(userId, bookId);
        long exp = Instant.now().getEpochSecond() + 7200L;
        String payload = userId + ":" + bookId + ":" + exp;
        String payloadB64 = Base64.getUrlEncoder().withoutPadding()
                .encodeToString(payload.getBytes(StandardCharsets.UTF_8));
        String sigB64 = signPayload(payloadB64);
        return payloadB64 + "." + sigB64;
    }

    @Override
    public Integer verifyStreamToken(String token, Long bookId) {
        if (token == null || !token.contains(".")) return null;
        try {
            String[] parts = token.split("\\.", 2);
            String payloadB64 = parts[0];
            String sigB64 = parts[1];
            String expectedSig = signPayload(payloadB64);
            if (!MessageDigest.isEqual(sigB64.getBytes(StandardCharsets.UTF_8), expectedSig.getBytes(StandardCharsets.UTF_8))) {
                return null;
            }
            String payload = new String(Base64.getUrlDecoder().decode(payloadB64), StandardCharsets.UTF_8);
            String[] fields = payload.split(":", 3);
            if (fields.length != 3) return null;
            int uid = Integer.parseInt(fields[0]);
            long bid = Long.parseLong(fields[1]);
            long exp = Long.parseLong(fields[2]);
            if (!Objects.equals(bid, bookId) || exp < Instant.now().getEpochSecond()) {
                return null;
            }
            return uid;
        } catch (Exception e) {
            return null;
        }
    }

    private String signPayload(String payloadB64) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(streamHmacKey, "HmacSHA256"));
            byte[] sig = mac.doFinal(payloadB64.getBytes(StandardCharsets.UTF_8));
            return Base64.getUrlEncoder().withoutPadding().encodeToString(sig);
        } catch (Exception e) {
            throw new IllegalStateException("HMAC sign error", e);
        }
    }

    @Override
    public PdfBook updateBook(Integer userId, Long bookId, String title, String category, Integer lastPage, Integer pageCount, String coverData, Integer readingSecondsIncrement) {
        PdfBook existing = getReadableBook(userId, bookId);
        // 共享演示书籍不修改共享进度与标题（由用户浏览器端记录试阅页码），但允许校验真实页数
        if (Boolean.TRUE.equals(existing.getIsDemo())) {
            return existing;
        }
        PdfBook book = getOwnedBook(userId, bookId);
        boolean readingTouched = false;

        if (title != null && !title.isBlank()) {
            String trimmed = title.trim();
            book.setTitle(trimmed.length() > 255 ? trimmed.substring(0, 255) : trimmed);
        }
        if (category != null && !category.isBlank()) {
            book.setCategory(category.trim());
        }
        if (pageCount != null && pageCount > 0) {
            book.setPageCount(pageCount);
        }
        if (lastPage != null) {
            int maxPage = Math.max(1, book.getPageCount() != null ? book.getPageCount() : 1);
            int clamped = Math.max(1, Math.min(lastPage, maxPage));
            book.setLastPage(clamped);
            readingTouched = true;
        }
        if (coverData != null && !coverData.isBlank()) {
            book.setCoverData(coverData);
        }
        if (readingSecondsIncrement != null && readingSecondsIncrement > 0) {
            int inc = Math.min(readingSecondsIncrement, 86400);
            int current = book.getReadingSeconds() != null ? book.getReadingSeconds() : 0;
            book.setReadingSeconds(current + inc);
            readingTouched = true;
        }

        LocalDateTime now = LocalDateTime.now();
        if (readingTouched) {
            book.setLastReadAt(now);
        }
        book.setUpdatedAt(now);
        pdfBookMapper.updateById(book);
        return book;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteBook(Integer userId, Long bookId) {
        PdfBook book = getOwnedBook(userId, bookId);
        pdfAnnotationMapper.delete(
                new LambdaQueryWrapper<PdfAnnotation>()
                        .eq(PdfAnnotation::getBookId, bookId)
                        .eq(PdfAnnotation::getUserId, userId)
        );
        pdfBookmarkMapper.delete(
                new LambdaQueryWrapper<PdfBookmark>()
                        .eq(PdfBookmark::getBookId, bookId)
                        .eq(PdfBookmark::getUserId, userId)
        );
        pdfBookMapper.deleteById(bookId);

        Path base = baseStoragePath();
        Path filePath = base.resolve(String.valueOf(userId)).resolve(book.getStoredFilename()).normalize();
        if (filePath.startsWith(base)) {
            try {
                Files.deleteIfExists(filePath);
            } catch (IOException e) {
                log.warn("删除磁盘 PDF 文件失败: {}", filePath, e);
            }
        }
    }

    @Override
    public PdfAnnotation addAnnotation(Integer userId, Long bookId, PdfAnnotation req) {
        PdfBook book = getReadableBook(userId, bookId);
        if (req.getNoteContent() == null || req.getNoteContent().isBlank()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "批注内容不能为空");
        }
        int maxPage = Math.max(1, book.getPageCount() != null ? book.getPageCount() : Integer.MAX_VALUE);
        int page = req.getPageNumber() != null ? Math.max(1, Math.min(req.getPageNumber(), maxPage)) : 1;
        String type = "page_note".equalsIgnoreCase(req.getType()) ? "page_note" : "pin";
        String color = sanitizeColor(req.getColor());

        LocalDateTime now = LocalDateTime.now();
        PdfAnnotation ann = PdfAnnotation.builder()
                .bookId(bookId)
                .userId(userId)
                .pageNumber(page)
                .type(type)
                .xPct(clampPct(req.getXPct()))
                .yPct(clampPct(req.getYPct()))
                .color(color)
                .noteContent(req.getNoteContent().trim())
                .createdAt(now)
                .updatedAt(now)
                .build();
        pdfAnnotationMapper.insert(ann);
        return ann;
    }

    @Override
    public PdfAnnotation updateAnnotation(Integer userId, Long bookId, Long annId, PdfAnnotation req) {
        getReadableBook(userId, bookId);
        PdfAnnotation existing = pdfAnnotationMapper.selectById(annId);
        if (existing == null || !Objects.equals(existing.getBookId(), bookId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "未找到该批注");
        }
        if (!Objects.equals(existing.getUserId(), userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "无权修改该批注");
        }

        if (req.getNoteContent() != null && !req.getNoteContent().isBlank()) {
            existing.setNoteContent(req.getNoteContent().trim());
        }
        if (req.getColor() != null && !req.getColor().isBlank()) {
            existing.setColor(sanitizeColor(req.getColor()));
        }
        if (req.getXPct() != null) {
            existing.setXPct(clampPct(req.getXPct()));
        }
        if (req.getYPct() != null) {
            existing.setYPct(clampPct(req.getYPct()));
        }
        existing.setUpdatedAt(LocalDateTime.now());
        pdfAnnotationMapper.updateById(existing);
        return existing;
    }

    @Override
    public void deleteAnnotation(Integer userId, Long bookId, Long annId) {
        getReadableBook(userId, bookId);
        PdfAnnotation existing = pdfAnnotationMapper.selectById(annId);
        if (existing == null || !Objects.equals(existing.getBookId(), bookId)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "未找到该批注");
        }
        if (!Objects.equals(existing.getUserId(), userId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "无权删除该批注");
        }
        pdfAnnotationMapper.deleteById(annId);
    }

    @Override
    public PdfBookmark addOrUpdateBookmark(Integer userId, Long bookId, Integer pageNumber, String label) {
        PdfBook book = getReadableBook(userId, bookId);
        int maxPage = Math.max(1, book.getPageCount() != null ? book.getPageCount() : Integer.MAX_VALUE);
        int page = pageNumber != null ? Math.max(1, Math.min(pageNumber, maxPage)) : 1;
        String safeLabel = (label != null && !label.isBlank()) ? label.trim() : ("第 " + page + " 页");
        if (safeLabel.length() > 120) safeLabel = safeLabel.substring(0, 120);

        PdfBookmark existing = pdfBookmarkMapper.selectOne(
                new LambdaQueryWrapper<PdfBookmark>()
                        .eq(PdfBookmark::getBookId, bookId)
                        .eq(PdfBookmark::getUserId, userId)
                        .eq(PdfBookmark::getPageNumber, page)
        );
        if (existing != null) {
            existing.setLabel(safeLabel);
            pdfBookmarkMapper.updateById(existing);
            return existing;
        }

        PdfBookmark bm = PdfBookmark.builder()
                .bookId(bookId)
                .userId(userId)
                .pageNumber(page)
                .label(safeLabel)
                .createdAt(LocalDateTime.now())
                .build();
        pdfBookmarkMapper.insert(bm);
        return bm;
    }

    @Override
    public void deleteBookmark(Integer userId, Long bookId, Integer pageNumber) {
        getReadableBook(userId, bookId);
        pdfBookmarkMapper.delete(
                new LambdaQueryWrapper<PdfBookmark>()
                        .eq(PdfBookmark::getBookId, bookId)
                        .eq(PdfBookmark::getUserId, userId)
                        .eq(PdfBookmark::getPageNumber, pageNumber)
        );
    }

    private BigDecimal clampPct(BigDecimal v) {
        if (v == null) return null;
        BigDecimal min = BigDecimal.ZERO;
        BigDecimal max = new BigDecimal("100.000");
        BigDecimal clamped = v.max(min).min(max);
        return clamped.setScale(3, RoundingMode.HALF_UP);
    }

    private String sanitizeColor(String color) {
        if (color == null) return "amber";
        return switch (color.trim().toLowerCase()) {
            case "blue", "emerald", "rose", "violet", "amber" -> color.trim().toLowerCase();
            default -> "amber";
        };
    }
}
