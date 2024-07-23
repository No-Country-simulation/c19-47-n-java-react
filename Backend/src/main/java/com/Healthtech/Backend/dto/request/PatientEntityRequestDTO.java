package com.Healthtech.Backend.dto.request;

import jakarta.persistence.Column;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
public class PatientEntityRequestDTO {

    @NotBlank(message = "First name cannot be blank")
    private String firstName;
    @NotBlank(message = "Last name cannot be blank")
    private String lastName;
    @Past(message = "Birth date must be in the past")
    private LocalDate birthDate;
    @NotBlank(message = "Documentation cannot be blank")
    private String documentation;
    @Email(message = "Email should be valid")
    private String email;
    @NotBlank
    private String gender;

    private String medicalInsurance;


}
