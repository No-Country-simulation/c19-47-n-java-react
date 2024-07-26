package com.Healthtech.Backend.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ConsultationRequest {


    private String day;
    private String motive;
    private Long doctorId;
    private Long patientId;

}
