package com.partjava.controller;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.partjava.common.api.ApiResponse;
import com.partjava.entity.NoteImage;
import com.partjava.repository.NoteImageMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@Slf4j
@RestController
public class ImageUploadController {

    private final NoteImageMapper noteImageMapper;

    @Autowired
    public ImageUploadController(NoteImageMapper noteImageMapper) {
        this.noteImageMapper = noteImageMapper;
    }

    private Integer getUserIdOrFallback(Integer userId) {
        if (userId == null) {
            return 1;
        }
        return userId;
    }

    /**
     * 上传笔记插图或用户头像，并以 LONGBLOB 持久化存储于 MySQL 数据库中
     */
    @PostMapping("/api/upload/image")
    public ApiResponse<Map<String, String>> uploadImage(
            @RequestAttribute(value = "userId", required = false) Integer userId,
            @RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("上传文件不能为空");
        }

        Integer activeUserId = getUserIdOrFallback(userId);
        
        try {
            // 1. 生成唯一文件名，防止重名覆盖
            String originalName = file.getOriginalFilename();
            String extension = "";
            if (originalName != null && originalName.contains(".")) {
                extension = originalName.substring(originalName.lastIndexOf("."));
            }
            String newFilename = UUID.randomUUID().toString() + extension;

            // 2. 构造实体并落库
            NoteImage noteImage = NoteImage.builder()
                    .userId(activeUserId)
                    .filename(newFilename)
                    .mimeType(file.getContentType() != null ? file.getContentType() : "image/octet-stream")
                    .data(file.getBytes())
                    .size((int) file.getSize())
                    .createdAt(LocalDateTime.now())
                    .build();

            noteImageMapper.insert(noteImage);
            log.info("用户 {} 成功上传了插画图片：{} (大小：{} bytes)", activeUserId, newFilename, file.getSize());

            // 3. 组装图片的加载相对路径 URL
            String imageUrl = "/api/images/" + newFilename;

            return ApiResponse.success(Map.of("url", imageUrl));
        } catch (Exception e) {
            log.error("图片上传失败", e);
            return ApiResponse.error("图片上传失败，错误：" + e.getMessage());
        }
    }

    /**
     * 直接渲染并以图片文件流输出存储在数据库中的二进制大对象图片
     */
    @GetMapping("/api/images/{filename:.+}")
    public ResponseEntity<byte[]> getNoteImage(@PathVariable("filename") String filename) {
        NoteImage image = noteImageMapper.selectOne(
                new LambdaQueryWrapper<NoteImage>().eq(NoteImage::getFilename, filename)
        );
        if (image == null || image.getData() == null) {
            log.warn("请求的图片资源未找到：{}", filename);
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(image.getMimeType()))
                .body(image.getData());
    }
}
