package com.Healthtech.Backend.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ClinicalHistory")
public class ClinicalHistoryEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idClinicalHistory;

    private String medications;

    private String allergies;

    @Column(nullable = false)
    private boolean state = true;

    @ManyToMany(fetch = FetchType.EAGER,targetEntity = ChronicDiseasesEntity.class,cascade = CascadeType.PERSIST)
    @JoinTable(
            name = "DiseaseDetails",
            joinColumns = @JoinColumn(name = "idClinicalHistory"),
            inverseJoinColumns = @JoinColumn(name = "idChronicDiseases")
    )
    private Set<ChronicDiseasesEntity> chronicDiseases;

    @Override
    public String toString() {
        return "ClinicalHistoryEntity{" +
                ", medications='" + medications + '\'' +
                ", allergies='" + allergies + '\'' +
                ", state=" + state +
                '}';
    }
}
