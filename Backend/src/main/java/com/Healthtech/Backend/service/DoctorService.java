package com.Healthtech.Backend.service;

import com.Healthtech.Backend.dto.request.DoctorRequestDTO;
import com.Healthtech.Backend.model.ClinicalHistoryEntity;
import com.Healthtech.Backend.model.DoctorEntity;

import java.util.List;

public interface DoctorService {
    List<DoctorEntity> findAll();
    DoctorEntity save(DoctorRequestDTO doctorRequestDTO);
}
