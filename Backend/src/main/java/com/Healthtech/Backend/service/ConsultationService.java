package com.Healthtech.Backend.service;

import com.Healthtech.Backend.dto.request.ConsultationRequest;
import com.Healthtech.Backend.model.ConsultationEntity;

import java.util.List;

public interface ConsultationService {
    ConsultationEntity save(ConsultationRequest consultationRequest);

    List<ConsultationEntity> getConsultationsByPatientId(Long id);

    List<ConsultationEntity> getConsultationsByDoctorId(Long doctorId);
}

