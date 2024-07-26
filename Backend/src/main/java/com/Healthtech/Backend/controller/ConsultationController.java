package com.Healthtech.Backend.controller;


import com.Healthtech.Backend.dto.request.ConsultationRequest;
import com.Healthtech.Backend.dto.request.WorkScheduleRequest;
import com.Healthtech.Backend.model.WorkSchedule;
import com.Healthtech.Backend.service.ConsultationService;
import com.Healthtech.Backend.service.WorkScheduleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/schedule-consultation")
public class ConsultationController {

    private final ConsultationService consultationService;

//    @GetMapping()
//    public ResponseEntity<List<WorkSchedule>> getAllWorkSchedules() {
//        return ResponseEntity.status(HttpStatus.OK).body(consultationService.findAll());
//    }

    @PostMapping()
    public ResponseEntity<?> save(@RequestBody @Valid ConsultationRequest consultationRequest) {

        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(consultationService.save(consultationRequest));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}