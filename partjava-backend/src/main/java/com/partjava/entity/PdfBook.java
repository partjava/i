package com.partjava.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName("pdf_books")
public class PdfBook {
    @TableId(type = IdType.AUTO)
    private Long id;

    private Integer userId;
    private String title;
    private String originalFilename;
    private String storedFilename;
    private Long fileSize;
    private Integer pageCount;
    private Integer lastPage;
    private String category;
    private String coverData;
    private Integer readingSeconds;
    private LocalDateTime lastReadAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @TableField(exist = false)
    private Integer annotationCount;

    @TableField(exist = false)
    private Integer bookmarkCount;
}
