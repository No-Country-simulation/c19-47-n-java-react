package com.Healthtech.Backend.repository;

import com.Healthtech.Backend.model.DoctorEntity;
import com.Healthtech.Backend.model.PatientEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DoctorRepository extends JpaRepository<DoctorEntity, Long> {

    Optional<DoctorEntity> findByEmail(String email);

}
