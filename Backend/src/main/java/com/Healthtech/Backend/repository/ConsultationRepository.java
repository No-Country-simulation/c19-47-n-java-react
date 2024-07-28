package com.Healthtech.Backend.repository;

import com.Healthtech.Backend.model.ConsultationEntity;
import com.Healthtech.Backend.model.PatientEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConsultationRepository extends JpaRepository<ConsultationEntity, Long> {
    List<ConsultationEntity> findByPaciente(PatientEntity patient);
}
