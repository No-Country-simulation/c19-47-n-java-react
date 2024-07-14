package com.Healthtech.Backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "ChronicDiseases")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChronicDiseasesEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idChronicDiseases;

    @Column(nullable = false)
    private boolean state = true;
    @Column(length = 50)
    private String name;
    private LocalDate startDate;
    @Column(length = 100)
    private String diagnosingDoctor;

}
