package com.partjava.service.impl;

import com.partjava.service.MailService;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class MailServiceImpl implements MailService {

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @Value("${spring.mail.username:noreply@partjava.com}")
    private String fromEmail;

    @Override
    public void sendResetPasswordMail(String toEmail, String resetUrl) {
        log.info("准备发送重置密码邮件至邮箱：{}", toEmail);
        
        String htmlContent = "<div style='font-family: sans-serif; padding: 20px;'>" +
                "<h2>PartJava 密码重置请求</h2>" +
                "<p>您好，系统收到了重置您 PartJava 学员账号密码的申请。</p>" +
                "<p>请在 15 分钟内点击以下链接重置您的密码：</p>" +
                "<p><a href='" + resetUrl + "' style='display: inline-block; padding: 10px 20px; background-color: #722ed1; color: #fff; text-decoration: none; border-radius: 4px;'>一键重置密码</a></p>" +
                "<p>若按钮无法点击，请复制以下链接到浏览器访问：</p>" +
                "<p>" + resetUrl + "</p>" +
                "<br><p>如果您没有申请重置密码，请忽略此邮件。</p>" +
                "</div>";

        if (mailSender == null) {
            log.warn("🚨 [MOCK降级运行] 当前未配置 JavaMailSender，无法向外部发信！");
            log.warn("👉 [找回密码链接]：{}", resetUrl);
            return;
        }

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            helper.setSubject("【PartJava 智能学习平台】重置您的账户密码");
            helper.setText(htmlContent, true);
            
            mailSender.send(message);
            log.info("邮件已成功发送至：{}", toEmail);
        } catch (Exception e) {
            log.error("❌ 邮件发送失败（通常由于未连接真实的邮件服务器），执行 Mock 降级！", e);
            log.warn("👉 [降级密码重置链接]：{}", resetUrl);
        }
    }
}
