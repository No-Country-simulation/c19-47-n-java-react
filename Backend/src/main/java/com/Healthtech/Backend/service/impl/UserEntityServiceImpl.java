package com.Healthtech.Backend.service.impl;

import com.Healthtech.Backend.dto.request.AuthLoginRequest;
import com.Healthtech.Backend.dto.request.ChangePasswordRequest;
import com.Healthtech.Backend.dto.response.AuthResponse;
import com.Healthtech.Backend.model.PatientEntity;
import com.Healthtech.Backend.model.UserEntity;
import com.Healthtech.Backend.repository.DoctorRepository;
import com.Healthtech.Backend.repository.PatientRepository;
import com.Healthtech.Backend.repository.UserEntityRepository;
import com.Healthtech.Backend.service.IEmailService;
import com.Healthtech.Backend.service.UserEntityService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class UserEntityServiceImpl implements UserEntityService {

    private final UserEntityRepository userEntityRepository;
    private final PatientRepository patientRepository;
    private final DoctorRepository doctorRepository;
    private final IEmailService iEmailService;

    @Override
    @Transactional
    public AuthResponse loginUser(AuthLoginRequest userRequest) {

        UserEntity user = userEntityRepository.findByEmail(userRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Long id;
        if (user.getRole().equals("PATIENT")) {
            PatientEntity patient = patientRepository.findByEmail(userRequest.getEmail())
                    .orElseThrow(() -> new RuntimeException("Patient not found"));
            id = patient.getIdPaciente();
        } else if (user.getRole().equals("DOCTOR")) {
            id = doctorRepository.findByEmail(userRequest.getEmail())
                    .orElseThrow(() -> new RuntimeException("Doctor not found"))
                    .getIdDoctor();
        }else {
            id = user.getIdUser();
        }
        if (!user.getPassword().equals(userRequest.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return AuthResponse.builder()
                .id(id)
                .role(user.getRole())
                .build();

    }

    @Override
    @Transactional
    public String  changePassword(ChangePasswordRequest changePasswordRequest) {

        UserEntity user = userEntityRepository.findByEmail(changePasswordRequest.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(changePasswordRequest.getOldPassword())) {
            throw new RuntimeException("Invalid password");
        }

        iEmailService.sendEmail(changePasswordRequest.getEmail(), "Health Tech - Actualización de Contraseña",
                "Su contraseña ha sido actualizada exitosamente");


        user.setPassword(changePasswordRequest.getNewPassword());
        userEntityRepository.save(user);

        return "Password changed successfully";
    }


}
