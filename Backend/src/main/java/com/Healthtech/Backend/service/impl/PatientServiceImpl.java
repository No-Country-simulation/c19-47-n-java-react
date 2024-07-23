package com.Healthtech.Backend.service.impl;

import com.Healthtech.Backend.dto.request.ChronicDiseasesRequestDTO;
import com.Healthtech.Backend.dto.request.ClinicalHistoryRequestDTO;
import com.Healthtech.Backend.dto.request.PatientEntityRequestDTO;
import com.Healthtech.Backend.model.ChronicDiseasesEntity;
import com.Healthtech.Backend.model.ClinicalHistoryEntity;
import com.Healthtech.Backend.model.PatientEntity;
import com.Healthtech.Backend.model.UserEntity;
import com.Healthtech.Backend.repository.ClinicalHistoryRepository;
import com.Healthtech.Backend.repository.PatientRepository;
import com.Healthtech.Backend.repository.UserEntityRepository;
import com.Healthtech.Backend.service.ClinicalHistoryService;
import com.Healthtech.Backend.service.PatientEntityService;
import com.Healthtech.Backend.utils.UserEntityUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class PatientServiceImpl implements PatientEntityService {

    private final PatientRepository patientRepository;

    private final UserEntityRepository userRepository;

    @Override
    public List<PatientEntity> findAll() {
        return patientRepository.findAll();
    }

    @Override
    @Transactional
    public PatientEntity save(PatientEntityRequestDTO patientEntityRequestDTO) {

        boolean existsByEmail = patientRepository.findByEmail(patientEntityRequestDTO.getEmail()).isPresent();
        if (existsByEmail) {
            throw new RuntimeException("Correo ya registrado");
        }

        PatientEntity patientEntity = PatientEntity.builder()
                .firstName(patientEntityRequestDTO.getFirstName())
                .lastName(patientEntityRequestDTO.getLastName())
                .birthDate(patientEntityRequestDTO.getBirthDate())
                .documentation(patientEntityRequestDTO.getDocumentation())
                .state(true)
                .email(patientEntityRequestDTO.getEmail())
                .gender(patientEntityRequestDTO.getGender())
                .medicalInsurance(patientEntityRequestDTO.getMedicalInsurance())
                .build();

        UserEntity userEntity = UserEntityUtil.createUserEntity(
                patientEntityRequestDTO.getEmail(), patientEntityRequestDTO.getDocumentation(), "PATIENT");

        userRepository.save(userEntity);

        log.info("PatientEntity: {}", patientEntity.toString());

        return patientRepository.save(patientEntity);

    }
}
