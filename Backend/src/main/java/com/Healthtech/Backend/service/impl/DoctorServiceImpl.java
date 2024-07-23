package com.Healthtech.Backend.service.impl;

import com.Healthtech.Backend.dto.request.DoctorRequestDTO;
import com.Healthtech.Backend.model.DoctorEntity;
import com.Healthtech.Backend.repository.DoctorRepository;
import com.Healthtech.Backend.service.DoctorService;
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

    @Override
    public List<DoctorEntity> findAll() {
        return doctorRepository.findAll();
        //return doctorRepository.findAll();
    }

    @Override
    @Transactional
    public DoctorEntity save(DoctorRequestDTO doctorRequestDTO) {

        // Mapeo de ClinicalHistoryRequestDTO a ClinicalHistoryEntity
        DoctorEntity doctor = DoctorEntity.builder()
                //.state(true) // Por defecto se crea activo
                .firstName(doctorRequestDTO.getFirstName())
                .lastName(doctorRequestDTO.getLastName())
                .documentation(doctorRequestDTO.getDocumentation())
                .birthDate(doctorRequestDTO.getBirthDate())
                .gender(doctorRequestDTO.getGender())
                .specialty((doctorRequestDTO.getSpecialty()))
                .license(doctorRequestDTO.getLicense())
                .email(doctorRequestDTO.getEmail())
                .state(true )
                //.state(doctorRequestDTO.ge)

                .build();
        log.info("DoctorEntity: {}", doctor.toString());
        // Guardar en la base de datos
        return doctorRepository.save(doctor);

    }

}