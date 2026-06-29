package com.partjava.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResp {
    private String token;
    private long expiresIn;
    private Long id;
    private String username;
    private String role;
}
