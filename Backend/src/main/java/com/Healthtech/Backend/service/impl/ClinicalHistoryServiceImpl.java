package com.Healthtech.Backend.service.impl;

import com.Healthtech.Backend.dto.request.ChronicDiseasesRequestDTO;
import com.Healthtech.Backend.dto.request.ClinicalHistoryRequestDTO;
import com.Healthtech.Backend.model.ChronicDiseasesEntity;
import com.Healthtech.Backend.model.ClinicalHistoryEntity;
import com.Healthtech.Backend.repository.ClinicalHistoryRepository;
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

    @Override
    public List<ClinicalHistoryEntity> findAll() {
        return clinicalHistoryRepository.findAll();
    }

    @Override
    @Transactional
    public ClinicalHistoryEntity save(ClinicalHistoryRequestDTO clinicalHistoryRequestDTO) {

        // Mapeo de ChronicDiseasesRequestDTO a ChronicDiseasesEntity
        Set<ChronicDiseasesEntity> chronicDiseases = clinicalHistoryRequestDTO.getChronicDiseases().stream()
                .map(this::mapToChronicDiseasesEntity)
                .collect(Collectors.toSet());

        // Mapeo de ClinicalHistoryRequestDTO a ClinicalHistoryEntity
        ClinicalHistoryEntity clinicalHistory = ClinicalHistoryEntity.builder()
                .medications(clinicalHistoryRequestDTO.getMedications())
                .allergies(clinicalHistoryRequestDTO.getAllergies())
                .state(true) // Por defecto se crea activo
                .chronicDiseases(chronicDiseases)
                .build();

        log.info("ClinicalHistoryEntity: {}", clinicalHistory.toString());
        // Guardar en la base de datos
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
