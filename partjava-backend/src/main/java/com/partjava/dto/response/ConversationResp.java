package com.partjava.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConversationResp {
    private Long id;
    private String title;
    private LocalDateTime updatedAt;
    private String firstMsg;
}
