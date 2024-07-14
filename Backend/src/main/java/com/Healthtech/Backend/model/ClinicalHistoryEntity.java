package com.Healthtech.Backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Table(name = "ClinicalHistory")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClinicalHistoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idClinicalHistory;

    private String medications;
    private String allergies;

    @ManyToMany(fetch = FetchType.EAGER,targetEntity = ChronicDiseasesEntity.class,cascade = CascadeType.PERSIST)
    @JoinTable(
            name = "DiseaseDetails",
            joinColumns = @JoinColumn(name = "idClinicalHistory"),
            inverseJoinColumns = @JoinColumn(name = "idChronicDiseases")
    )
    private Set<ChronicDiseasesEntity> chronicDiseases;

}
