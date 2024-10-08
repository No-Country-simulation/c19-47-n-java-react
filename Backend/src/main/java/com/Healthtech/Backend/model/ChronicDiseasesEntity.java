package com.Healthtech.Backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;

@Entity
@Table(name = "ChronicDiseases")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChronicDiseasesEntity  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idChronicDiseases;


    @Column(length = 50)
    private String name;
    private LocalDate startDate;
    @Column(length = 100)
    private String diagnosingDoctor;

}
