package com.Healthtech.Backend.dto.request;

import jakarta.persistence.Column;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.Set;

@Getter
@Setter
public class DoctorRequestDTO {
    private Long idDoctor;
    @Column(nullable = false)
    private boolean state = true;
    @NotBlank(message = "First name cannot be blank")
    private String firstName;
    @NotBlank(message = "Last name cannot be blank")
    private String lastName;
    @Past
    private Date birthDate;
    @NotBlank(message = "Documentation cannot be blank")
    private String documentation;
    @NotBlank(message = "License name cannot be blank")
    private String license;
    @Valid
    private Set<DoctorRequestDTO> doctor;

}
