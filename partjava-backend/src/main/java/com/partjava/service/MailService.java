package com.partjava.service;

public interface MailService {
    /**
     * 发送重置密码引导邮件至学员邮箱
     *
     * @param toEmail  目标收件人邮箱
     * @param resetUrl 找回密码的重置地址链接
     */
    void sendResetPasswordMail(String toEmail, String resetUrl);
}
