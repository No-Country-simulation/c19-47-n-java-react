package com.Healthtech.Backend.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class ClinicalHistoryRequestDTO {


    private String medications;

    private String allergies;

    private Set<ChronicDiseasesRequestDTO> chronicDiseases;

    private long id;

}
