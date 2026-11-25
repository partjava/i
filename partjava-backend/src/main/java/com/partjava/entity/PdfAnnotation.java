package com.partjava.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName("pdf_annotations")
public class PdfAnnotation {
    @TableId(type = IdType.AUTO)
    private Long id;

    private Long bookId;
    private Integer userId;
    private Integer pageNumber;
    private String type;
    @JsonProperty("xPct")
    private BigDecimal xPct;
    @JsonProperty("yPct")
    private BigDecimal yPct;
    private String color;
    private String noteContent;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
