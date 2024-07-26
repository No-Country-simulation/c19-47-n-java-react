package com.Healthtech.Backend.service;

import com.Healthtech.Backend.dto.request.WorkScheduleRequest;
import com.Healthtech.Backend.model.WorkSchedule;

import java.util.List;

public interface WorkScheduleService {
    List<WorkSchedule> findAll();
    List<WorkSchedule> save(WorkScheduleRequest workScheduleRequestDTO);
}
