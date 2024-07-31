package com.Healthtech.Backend.utils;

import com.Healthtech.Backend.model.UserEntity;

public class UserEntityUtil {

    private UserEntityUtil() {
        throw new IllegalStateException("Utility class");
    }

    public static UserEntity createUserEntity(String email,String password,String role) {

        return UserEntity.builder()
                .email(email)
                .password(password)
                .role(role)
                .build();
    }
}
