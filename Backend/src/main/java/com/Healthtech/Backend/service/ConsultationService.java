package com.Healthtech.Backend.service;

import com.Healthtech.Backend.dto.request.ConsultationRequest;
import com.Healthtech.Backend.model.ConsultationEntity;

public interface ConsultationService {
    ConsultationEntity save(ConsultationRequest consultationRequest);
}

