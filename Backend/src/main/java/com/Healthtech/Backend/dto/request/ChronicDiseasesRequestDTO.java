package com.Healthtech.Backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ChronicDiseasesRequestDTO {


    @NotBlank(message = "Name cannot be blank")
    private String name;

    private LocalDate startDate;

    @NotBlank(message = "Diagnosing doctor cannot be blank")
    private String diagnosingDoctor;

}
