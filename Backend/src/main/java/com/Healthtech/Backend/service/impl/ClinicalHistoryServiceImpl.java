package com.Healthtech.Backend.service.impl;

import com.Healthtech.Backend.dto.request.ChronicDiseasesRequestDTO;
import com.Healthtech.Backend.dto.request.ClinicalHistoryRequestDTO;
import com.Healthtech.Backend.model.ChronicDiseasesEntity;
import com.Healthtech.Backend.model.ClinicalHistoryEntity;
import com.Healthtech.Backend.model.PatientEntity;
import com.Healthtech.Backend.repository.ClinicalHistoryRepository;
import com.Healthtech.Backend.repository.PatientRepository;
import com.Healthtech.Backend.repository.UserEntityRepository;
import com.Healthtech.Backend.service.ClinicalHistoryService;
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
public class ClinicalHistoryServiceImpl implements ClinicalHistoryService {

    private final ClinicalHistoryRepository clinicalHistoryRepository;

    private final PatientRepository patientRepository;


    @Override
    public List<ClinicalHistoryEntity> findAll() {
        return clinicalHistoryRepository.findAll();
    }

    @Override
    @Transactional
    public ClinicalHistoryEntity save(ClinicalHistoryRequestDTO clinicalHistoryRequestDTO) {

        if (clinicalHistoryRequestDTO.getId() == 0 ) {
            log.info("No se proporcionó información para crear un historial clínico.");
            return null; // O retornar un valor predeterminado
        }

        PatientEntity patientEntity = patientRepository.findById(clinicalHistoryRequestDTO.getId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        Set<ChronicDiseasesEntity> chronicDiseases = clinicalHistoryRequestDTO.getChronicDiseases().stream()
                .map(this::mapToChronicDiseasesEntity)
                .collect(Collectors.toSet());

        ClinicalHistoryEntity clinicalHistory = ClinicalHistoryEntity.builder()
                .medications(clinicalHistoryRequestDTO.getMedications())
                .allergies(clinicalHistoryRequestDTO.getAllergies())
                .patient(patientEntity)
                .state(true)
                .chronicDiseases(chronicDiseases)
                .build();

        log.info("ClinicalHistoryEntity: {}", clinicalHistory.toString());
        return clinicalHistoryRepository.save(clinicalHistory);

    }

    private ChronicDiseasesEntity mapToChronicDiseasesEntity(ChronicDiseasesRequestDTO chronicDisease) {
        return ChronicDiseasesEntity.builder()
                .name(chronicDisease.getName())
                .startDate(chronicDisease.getStartDate())
                .diagnosingDoctor(chronicDisease.getDiagnosingDoctor())
                .build();
    }



}
