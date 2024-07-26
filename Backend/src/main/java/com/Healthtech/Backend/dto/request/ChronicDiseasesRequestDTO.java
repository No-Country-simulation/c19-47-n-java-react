package com.Healthtech.Backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ChronicDiseasesRequestDTO {


    private String name;

    private LocalDate startDate;

    private String diagnosingDoctor;

}
