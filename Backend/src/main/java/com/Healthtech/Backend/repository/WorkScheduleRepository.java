package com.Healthtech.Backend.repository;

import com.Healthtech.Backend.model.WorkSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkScheduleRepository extends JpaRepository<WorkSchedule, Long> {
    WorkSchedule findByDoctor_IdDoctorAndDay(Long id_doctor, String day);
}
