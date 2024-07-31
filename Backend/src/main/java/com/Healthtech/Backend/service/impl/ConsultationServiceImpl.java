package com.Healthtech.Backend.service.impl;

import com.Healthtech.Backend.dto.request.ConsultationRequest;
import com.Healthtech.Backend.model.ConsultationEntity;
import com.Healthtech.Backend.model.DoctorEntity;
import com.Healthtech.Backend.model.PatientEntity;
import com.Healthtech.Backend.model.WorkSchedule;
import com.Healthtech.Backend.repository.ConsultationRepository;
import com.Healthtech.Backend.repository.PatientRepository;
import com.Healthtech.Backend.repository.WorkScheduleRepository;
import com.Healthtech.Backend.service.ConsultationService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ConsultationServiceImpl implements ConsultationService {

    private final ConsultationRepository consultationRepository;
    private final WorkScheduleRepository workScheduleRepository;
    private final PatientRepository patientRepository;
    @Override
    public ConsultationEntity save(ConsultationRequest consultationRequest) {

        WorkSchedule workSchedule = workScheduleRepository.findByDoctor_IdDoctorAndDay(consultationRequest.getDoctorId(), consultationRequest.getDay());

        DoctorEntity doctorEntity = workSchedule.getDoctor();

        PatientEntity patientEntity = patientRepository.findById(consultationRequest.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        workSchedule.setShiftsPerDay(workSchedule.getShiftsPerDay() - 1);
        workScheduleRepository.save(workSchedule);

        ConsultationEntity consultationEntity = ConsultationEntity.builder()
                .doctor(doctorEntity)
                .paciente(patientEntity)
                .dia(consultationRequest.getDay())
                .motivo(consultationRequest.getMotive())
                .build();

        return consultationRepository.save(consultationEntity);
    }

    @Override
    public List<ConsultationEntity> getConsultationsByPatientId(Long patientId) {

        PatientEntity patient = PatientEntity.builder()
                .idPaciente(patientId)
                .build();

        return consultationRepository.findByPaciente(patient);
    }

    @Override
    public List<ConsultationEntity> getConsultationsByDoctorId(Long doctorId) {

        DoctorEntity doctor = DoctorEntity.builder()
                .idDoctor(doctorId)
                .build();

        return consultationRepository.findByDoctor(doctor);
    }
}
