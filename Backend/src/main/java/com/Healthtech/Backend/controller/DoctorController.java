package com.Healthtech.Backend.controller;


import com.Healthtech.Backend.dto.request.ClinicalHistoryRequestDTO;
import com.Healthtech.Backend.dto.request.DoctorRequestDTO;
import com.Healthtech.Backend.model.ClinicalHistoryEntity;
import com.Healthtech.Backend.model.DoctorEntity;
import com.Healthtech.Backend.service.ClinicalHistoryService;
import com.Healthtech.Backend.service.DoctorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/doctor")
public class DoctorController {

    private final DoctorService doctorService;

    @GetMapping()
    public ResponseEntity<List<DoctorEntity>> findAll() {
        return ResponseEntity.status(HttpStatus.OK).body(doctorService.findAll());
    }

    @PostMapping()
    public ResponseEntity<DoctorEntity> save(@RequestBody @Valid DoctorRequestDTO doctorRequestDTO) {
        DoctorEntity doctor = doctorService.save(doctorRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(doctor);
    }


}
