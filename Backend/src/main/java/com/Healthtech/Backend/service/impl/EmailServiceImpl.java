package com.Healthtech.Backend.service.impl;

import com.Healthtech.Backend.service.IEmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.validation.constraints.Email;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.File;
import java.nio.charset.StandardCharsets;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements IEmailService {

    @Value("${spring.mail.username}")
    private String emailUser;

    private final JavaMailSender mailSender;
    @Override
    @Async
    public void sendEmail(@Email String toUser, String subject, String message) {
        SimpleMailMessage mailMessage = new SimpleMailMessage();

        mailMessage.setFrom("slion641@gmail.com");
        mailMessage.setTo(toUser);
        mailMessage.setSubject(subject);
        mailMessage.setText(message);
        mailSender.send(mailMessage);
    }

//    @Override
//    public void sendEmailWithFile(String[] toUser, String subject, String message, File file) {
//        MimeMessage mimeMessage = mailSender.createMimeMessage();
//        try {
//            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true, StandardCharsets.UTF_8.name());
//
//            mimeMessageHelper.setFrom(emailUser);
//            mimeMessageHelper.setTo(toUser);
//            mimeMessageHelper.setSubject(subject);
//            mimeMessageHelper.setText(message);
//            mimeMessageHelper.addAttachment(file.getName(), file);
//
//            mailSender.send(mimeMessage);
//
//        } catch (MessagingException e) {
//            throw new RuntimeException(e);
//        }
//    }
}
