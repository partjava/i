package com.partjava.entity;

import com.baomidou.mybatisplus.annotation.IdType;
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
@TableName("pdf_bookmarks")
public class PdfBookmark {
    @TableId(type = IdType.AUTO)
    private Long id;

    private Long bookId;
    private Integer userId;
    private Integer pageNumber;
    private String label;
    private LocalDateTime createdAt;
}
