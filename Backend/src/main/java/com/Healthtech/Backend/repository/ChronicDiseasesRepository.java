package com.Healthtech.Backend.repository;

import com.Healthtech.Backend.model.ChronicDiseasesEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChronicDiseasesRepository extends JpaRepository<ChronicDiseasesEntity, Long> {
}
