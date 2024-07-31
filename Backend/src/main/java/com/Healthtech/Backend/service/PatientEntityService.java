package com.Healthtech.Backend.service;

import com.Healthtech.Backend.dto.request.ClinicalHistoryRequestDTO;
import com.Healthtech.Backend.dto.request.PatientEntityRequestDTO;
import com.Healthtech.Backend.model.ClinicalHistoryEntity;
import com.Healthtech.Backend.model.PatientEntity;

import java.util.List;

public interface PatientEntityService {
    List<PatientEntity> findAll();

    PatientEntity save(PatientEntityRequestDTO patientEntityRequestDTO);
}
