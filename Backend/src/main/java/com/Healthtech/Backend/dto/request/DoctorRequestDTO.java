package com.Healthtech.Backend.dto.request;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Getter
@Setter
public class DoctorRequestDTO {
    private Long idDoctor;
    //@Column(nullable = false)
    private boolean state = true;
    @NotBlank(message = "First name can not be blank")
    @NotNull
    private String firstName;
    @NotBlank(message = "Last name can not be blank")
    private String lastName;
    @Past
    @DateTimeFormat(pattern = "yyyy-mm-dd")
    private Date birthDate;
    @NotBlank(message = "Documentation can not be blank")
    private String documentation;
    @NotBlank(message = "Gender can not be null")
    private String gender;
    @NotBlank(message = "Specialty can not be null")
    private String specialty;
    @NotNull(message = "License can not be blank")
    //@Pattern(regexp = "^[0-9]", message = "License must be numeric")
    private Integer license;
    @NotBlank(message = "email can not be blank")
    @Email(message = "Not a valid email address")
    private String email;
}
