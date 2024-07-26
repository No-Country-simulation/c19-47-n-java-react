package com.Healthtech.Backend.dto.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class WorkScheduleRequest {

    private int shiftsPerDay;
    private List<String> days;
    private Long doctorId;

}
