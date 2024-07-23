package com.Healthtech.Backend.repository;

import com.Healthtech.Backend.model.ClinicalHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClinicalHistoryRepository extends JpaRepository<ClinicalHistoryEntity, Long> {
}
