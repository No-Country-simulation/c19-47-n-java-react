package com.Healthtech.Backend.controller;

import com.Healthtech.Backend.dto.request.PatientEntityRequestDTO;
import com.Healthtech.Backend.model.PatientEntity;
import com.Healthtech.Backend.service.PatientEntityService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/patient")
public class PatientEntityCotroller {

    private final PatientEntityService patientEntityService;

    @GetMapping()
    public ResponseEntity<List<PatientEntity>> findAll() {
        return ResponseEntity.status(HttpStatus.OK).body( patientEntityService.findAll());
    }

    @PostMapping()
    public ResponseEntity<?> save(@RequestBody @Valid PatientEntityRequestDTO patientEntityRequestDTO) {

        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(patientEntityService.save(patientEntityRequestDTO));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }



}
