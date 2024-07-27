package com.Healthtech.Backend.service.impl;

import com.Healthtech.Backend.dto.request.AuthLoginRequest;
import com.Healthtech.Backend.dto.response.AuthResponse;
import com.Healthtech.Backend.model.UserEntity;
import com.Healthtech.Backend.repository.UserEntityRepository;
import com.Healthtech.Backend.service.UserEntityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class UserEntityServiceImpl implements UserEntityService {

    private final UserEntityRepository userEntityRepository;

    @Override
    @Transactional
    public AuthResponse loginUser(AuthLoginRequest userRequest) {

        UserEntity user = userEntityRepository.findByEmail(userRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // obtener el id del paciente o medico que se loguea buscando por email en
        // tabla paciente o doctor y retornar el id,luego devolver el id del paciente o medico
        // y el rol

        if (!user.getPassword().equals(userRequest.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return AuthResponse.builder()
                .id(user.getIdUser())
                .role(user.getRole())
                .build();

    }
}
