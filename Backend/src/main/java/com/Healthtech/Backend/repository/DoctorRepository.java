package com.Healthtech.Backend.repository;

import com.Healthtech.Backend.model.DoctorEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<DoctorEntity, Long> {
}
