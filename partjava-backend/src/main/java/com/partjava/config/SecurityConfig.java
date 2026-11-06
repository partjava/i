package com.partjava.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // 禁用 CSRF，因为使用无状态的 JWT token
            .csrf(AbstractHttpConfigurer::disable)
            // 配置跨域
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            // 设定会话创建策略为无状态 (Stateless)
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            // 路由策略配置：显式放行公开只读与匿名可用功能，其余一律要求认证（默认拒绝）
            .authorizeHttpRequests(auth -> auth
                // 认证与找回密码流程
                .requestMatchers("/api/auth/**", "/api/forgot-password/**").permitAll()
                // 公开只读内容：笔记广场、评论、图片、统计、搜索、课程中心、题库与公开用户主页
                .requestMatchers(HttpMethod.GET,
                    "/api/notes/**", "/api/comments/**", "/api/images/**", "/api/stats/**",
                    "/api/search/**", "/api/study/**", "/api/challenges/**", "/api/star-challenges/**",
                    "/api/user/profile-by-id").permitAll()
                // 极客小游戏接口允许游客体验（含开局与操作 POST）
                .requestMatchers("/api/game/**").permitAll()
                // AI 账号会话历史要求登录认证
                .requestMatchers("/api/ai/conversations/**").authenticated()
                // AI 对话（前端悬浮助手匿名可用，Next.js middleware 已做 IP 限流）
                .requestMatchers("/api/ai/**").permitAll()
                // 管理后台仅管理员
                .requestMatchers("/api/admin/**").hasAnyRole("ADMIN", "OWNER")
                // 其余写操作与个人数据接口要求登录
                .requestMatchers("/api/challenges/**", "/api/notes/**", "/api/comments/**",
                    "/api/user/**", "/api/challenge-drafts/**", "/api/execute-code/**").authenticated()
                // 默认拒绝：未显式放行的路径一律需要认证（替换原 anyRequest().permitAll()）
                .anyRequest().authenticated()
            )
            // 未登录或 Token 过期访问受保护资源时统一返回 401，便于前端拦截器识别并清理失效会话
            .exceptionHandling(ex -> ex.authenticationEntryPoint(
                (request, response, authException) ->
                    response.sendError(jakarta.servlet.http.HttpServletResponse.SC_UNAUTHORIZED, "未登录或登录状态已过期")
            ))
            // 注册 JWT 过滤器在密码校验过滤器之前
            .addFilterBefore(jwtAuthenticationFilter, org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // 允许的来源，例如 Next.js 开发端口和正式域名
        configuration.setAllowedOrigins(List.of("http://localhost:3000", "https://www.partjava.com"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "X-Requested-With"));
        configuration.setExposedHeaders(List.of("Authorization"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
