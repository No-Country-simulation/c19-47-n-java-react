package com.Healthtech.Backend.repository;

import com.Healthtech.Backend.model.ConsultationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConsultationRepository extends JpaRepository<ConsultationEntity, Long> {
}
