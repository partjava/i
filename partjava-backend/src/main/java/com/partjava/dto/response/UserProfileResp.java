package com.partjava.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserProfileResp {
    private Long id;
    private String name;
    private String email;
    private String image;
    private String jobTitle;
    private String company;
    private String bio;
    private String location;
    private String github;
    private String website;
    private String role;
    private String username;
    private List<String> skills;
    private Map<String, String> socialLinks;

    // VIP 会员属性
    private Boolean vip;
    private Integer vipLevel;
    private LocalDateTime vipExpireTime;
    private Integer draftCount;
    private Integer draftLimit; // 默认出题限额，例如 5 题
}
