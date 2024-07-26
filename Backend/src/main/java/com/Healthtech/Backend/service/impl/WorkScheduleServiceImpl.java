package com.Healthtech.Backend.service.impl;

import com.Healthtech.Backend.dto.request.WorkScheduleRequest;
import com.Healthtech.Backend.model.DoctorEntity;
import com.Healthtech.Backend.model.WorkSchedule;
import com.Healthtech.Backend.repository.DoctorRepository;
import com.Healthtech.Backend.repository.WorkScheduleRepository;
import com.Healthtech.Backend.service.WorkScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkScheduleServiceImpl implements WorkScheduleService {


    private final WorkScheduleRepository workScheduleRepository;
    private final DoctorRepository doctorRepository;
    @Override
    public List<WorkSchedule> findAll() {
        return workScheduleRepository.findAll();
    }

    @Override
    public List<WorkSchedule> save(WorkScheduleRequest workScheduleRequestDTO) {

        DoctorEntity doctor = doctorRepository.findById(workScheduleRequestDTO.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        List<WorkSchedule> workSchedules = new ArrayList<>();

        workScheduleRequestDTO.getDays().forEach(day -> {
            WorkSchedule workSchedule = WorkSchedule.builder()
                    .shiftsPerDay(workScheduleRequestDTO.getShiftsPerDay())
                    .day(day)
                    .doctor(doctor)
                    .build();
            workSchedules.add(workScheduleRepository.save(workSchedule));

        });


        return workSchedules;
    }


}
