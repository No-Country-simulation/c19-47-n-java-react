package com.Healthtech.Backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Table(name = "WorkSchedule")
public class WorkSchedule {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int shiftsPerDay;
    private String day;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "idDoctor", nullable = false)
    private DoctorEntity doctor;

}
