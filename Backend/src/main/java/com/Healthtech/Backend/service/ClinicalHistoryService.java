package com.Healthtech.Backend.service;

import com.Healthtech.Backend.dto.request.ClinicalHistoryRequestDTO;
import com.Healthtech.Backend.model.ChronicDiseasesEntity;
import com.Healthtech.Backend.model.ClinicalHistoryEntity;

import java.util.List;

public interface ClinicalHistoryService {
    List<ClinicalHistoryEntity> findAll();

    ClinicalHistoryEntity save(ClinicalHistoryRequestDTO clinicalHistoryRequestDTO);
}
