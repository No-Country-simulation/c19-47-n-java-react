package com.Healthtech.Backend.service;

import jakarta.validation.constraints.Email;

import java.io.File;

public interface IEmailService {

    void sendEmail(@Email String toUser, String subject, String message);

}
