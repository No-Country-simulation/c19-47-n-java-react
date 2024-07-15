package com.Healthtech.Backend.dto.request;

import jakarta.persistence.Column;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
public class ClinicalHistoryRequestDTO {

    private Long idClinicalHistory;

    @Column(nullable = false)
    private boolean state = true;

    @NotBlank(message = "Medications cannot be blank")
    private String medications;

    @NotBlank(message = "Allergies cannot be blank")
    private String allergies;

    @NotNull(message = "Chronic diseases cannot be null")
    @Valid
    private Set<ChronicDiseasesRequestDTO> chronicDiseases;


}
