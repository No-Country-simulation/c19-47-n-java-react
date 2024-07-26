package com.Healthtech.Backend.service.impl;

import com.Healthtech.Backend.dto.request.DoctorRequestDTO;
import com.Healthtech.Backend.model.DoctorEntity;
import com.Healthtech.Backend.model.UserEntity;
import com.Healthtech.Backend.repository.DoctorRepository;
import com.Healthtech.Backend.repository.UserEntityRepository;
import com.Healthtech.Backend.service.DoctorService;
import com.Healthtech.Backend.utils.UserEntityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.type.descriptor.DateTimeUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class DoctorServiceImpl implements DoctorService {

    private final DoctorRepository doctorRepository;

    private final UserEntityRepository userRepository;

    @Override
    public List<DoctorEntity> findAll() {
        return doctorRepository.findAll();
    }

    @Override
    @Transactional
    public DoctorEntity save(DoctorRequestDTO doctorRequestDTO) {


        boolean existsByEmail = doctorRepository.findByEmail(doctorRequestDTO.getEmail()).isPresent();
        if (existsByEmail) {
            throw new RuntimeException("Correo ya registrado");
        }

        // Mapeo de ClinicalHistoryRequestDTO a ClinicalHistoryEntity
        DoctorEntity doctor = DoctorEntity.builder()
                .firstName(doctorRequestDTO.getFirstName())
                .lastName(doctorRequestDTO.getLastName())
                .documentation(doctorRequestDTO.getDocumentation())
                .birthDate(doctorRequestDTO.getBirthDate())
                .gender(doctorRequestDTO.getGender())
                .specialty((doctorRequestDTO.getSpecialty()))
                .license(doctorRequestDTO.getLicense())
                .email(doctorRequestDTO.getEmail())
                .state(true )
                .build();

        UserEntity userEntity = UserEntityUtil.createUserEntity(
                doctorRequestDTO.getEmail(), doctorRequestDTO.getDocumentation(), "DOCTOR");

        userRepository.save(userEntity);

        log.info("DoctorEntity: {}", doctor.toString());
        // Guardar en la base de datos
        return doctorRepository.save(doctor);

    }

}
