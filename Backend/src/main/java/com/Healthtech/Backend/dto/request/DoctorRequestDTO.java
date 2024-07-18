package com.Healthtech.Backend.dto.request;

import jakarta.persistence.Column;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
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
    @NotBlank(message = "First name can not be blank")
    @NotNull
    private String firstName;
    @NotBlank(message = "Last name can not be blank")
    private String lastName;
    @Past
    private Date birthDate;
    @NotBlank(message = "Documentation can not be blank")
    private String documentation;
//    @Valid
//    private Set<DoctorRequestDTO> doctor;
    @NotBlank(message = "Gender can not be null")
    private String gender;
    @NotBlank(message = "Specialty can not be null")
    private String specialty;
    @NotNull(message = "License can not be blank")
    //@Pattern(regexp = "^[0-9]", message = "License must be numeric")
    private Integer license;
    @Email(message = "Not a valid email address")
    private String email;


}
