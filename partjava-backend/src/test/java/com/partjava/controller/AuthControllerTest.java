package com.partjava.controller;

import com.partjava.common.api.ApiResponse;
import com.partjava.dto.request.LoginReq;
import com.partjava.dto.request.RegisterReq;
import com.partjava.dto.response.LoginResp;
import com.partjava.entity.User;
import com.partjava.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/**
 * AuthController 单元测试（Mockito 模拟 Service 层）：
 * 注册响应必须擦除密码哈希；登录透传 token 与用户信息。
 */
@ExtendWith(MockitoExtension.class)
class AuthControllerTest {

    @Mock
    private UserService userService;

    private AuthController controller;

    @BeforeEach
    void setUp() {
        controller = new AuthController(userService);
    }

    @Test
    @DisplayName("注册成功：返回体中不得携带密码哈希（安全要求）")
    void registerErasesPasswordHash() {
        User user = new User();
        user.setId(7L);
        user.setUsername("alice");
        user.setPasswordHash("$2a$10$secretHashValueShouldNeverLeak");
        when(userService.register(any(RegisterReq.class))).thenReturn(user);

        ApiResponse<User> resp = controller.register(new RegisterReq());

        assertTrue(resp.isSuccess());
        assertNotNull(resp.getData());
        assertEquals("alice", resp.getData().getUsername());
        assertNull(resp.getData().getPasswordHash(), "注册响应不得泄漏密码哈希");
    }

    @Test
    @DisplayName("登录成功：透传签发的 token 与用户信息")
    void loginReturnsTokenAndProfile() {
        LoginResp loginResp = new LoginResp();
        loginResp.setToken("jwt-token-abc");
        loginResp.setExpiresIn(86400000L);
        loginResp.setId(7L);
        loginResp.setUsername("alice");
        loginResp.setRole("USER");
        when(userService.login(any(LoginReq.class))).thenReturn(loginResp);

        ApiResponse<LoginResp> resp = controller.login(new LoginReq());

        assertTrue(resp.isSuccess());
        assertEquals("jwt-token-abc", resp.getData().getToken());
        assertEquals("alice", resp.getData().getUsername());
        assertEquals("USER", resp.getData().getRole());
        verify(userService, times(1)).login(any(LoginReq.class));
    }

    @Test
    @DisplayName("注册异常：Service 抛出的业务异常不被吞掉")
    void registerPropagatesServiceException() {
        when(userService.register(any(RegisterReq.class)))
                .thenThrow(new IllegalArgumentException("邮箱已被注册"));

        assertThrows(IllegalArgumentException.class,
                () -> controller.register(new RegisterReq()));
    }
}
