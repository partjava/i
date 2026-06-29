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
@TableName("note_images")
public class NoteImage {
    @TableId(type = IdType.AUTO)
    private Integer id;

    private Integer userId;
    private String filename;
    private String mimeType;
    private byte[] data; // 二进制字节流
    private Integer size;
    private LocalDateTime createdAt;
}
