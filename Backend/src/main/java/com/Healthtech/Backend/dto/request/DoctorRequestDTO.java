package com.Healthtech.Backend.dto.request;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Getter
@Setter
public class DoctorRequestDTO {


    @NotBlank(message = "First name can not be blank")
    private String firstName;
    @NotBlank(message = "Last name can not be blank")
    private String lastName;
    @DateTimeFormat(pattern = "yyyy-mm-dd")
    private LocalDate birthDate;
    @NotBlank(message = "Documentation can not be blank")
    private String documentation;
    @NotBlank(message = "Gender can not be null")
    private String gender;
    @NotBlank(message = "Specialty can not be null")
    private String specialty;
    @NotNull(message = "License can not be blank")
    private Integer license;
    @NotBlank(message = "email can not be blank")
    @Email(message = "Not a valid email address")
    private String email;
}
