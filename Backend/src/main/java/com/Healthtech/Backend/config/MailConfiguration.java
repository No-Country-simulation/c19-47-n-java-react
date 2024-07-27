//package com.Healthtech.Backend.config;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.mail.javamail.JavaMailSenderImpl;
//
//import java.util.Properties;
//
//@Configuration
//public class MailConfiguration {
//
//    @Value("${email.sender}")
//    private String emailUser;
//
//    @Value("${email.password}")
//    private String password;
//
//    @Bean
//    public JavaMailSender getJavaMailSender(){
//        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
//
//        mailSender.setHost("smtp.gmail.com");
//        mailSender.setPort(587);
//        mailSender.setUsername(emailUser);
//        mailSender.setPassword(password);
//
//        Properties props = mailSender.getJavaMailProperties();
//        props.put("mail.transport.protocol", "smtp");
//        props.put("mail.smtp.auth", "true");
//        props.put("mail.smtp.starttls.enable", "true");
//        props.put("mail.debug", "true");
//        props.put("mail.smtp.connectiontimeout", 5000);
//        props.put("mail.smtp.timeout", 5000);
//        props.put("mail.smtp.writetimeout", 5000);
//
//        return mailSender;
//    }
//}
