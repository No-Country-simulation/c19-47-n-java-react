package com.Healthtech.Backend.controller;


import com.Healthtech.Backend.dto.request.WorkScheduleRequest;
import com.Healthtech.Backend.model.WorkSchedule;
import com.Healthtech.Backend.service.WorkScheduleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/work-schedules")
@RequiredArgsConstructor
public class WorkScheduleController {

    private final WorkScheduleService workScheduleService;

    @GetMapping()
    public ResponseEntity<List<WorkSchedule>> getAllWorkSchedules() {
        return ResponseEntity.status(HttpStatus.OK).body(workScheduleService.findAll());
    }

    @PostMapping()
    public ResponseEntity<?> save(@RequestBody @Valid WorkScheduleRequest workScheduleRequestDTO) {

        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(workScheduleService.save(workScheduleRequestDTO));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}
