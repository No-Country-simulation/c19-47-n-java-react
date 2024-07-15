package com.Healthtech.Backend.controller;


import com.Healthtech.Backend.dto.request.ClinicalHistoryRequestDTO;
import com.Healthtech.Backend.model.ClinicalHistoryEntity;
import com.Healthtech.Backend.service.ClinicalHistoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/clinical-history")
public class ClinicalHistoryController {

    private final ClinicalHistoryService clinicalHistoryService;

    @GetMapping()
    public ResponseEntity<List<ClinicalHistoryEntity>> findAll() {
            return ResponseEntity.status(HttpStatus.OK).body(clinicalHistoryService.findAll());
    }

    @PostMapping()
    public ResponseEntity<ClinicalHistoryEntity> save(@RequestBody @Valid ClinicalHistoryRequestDTO clinicalHistoryRequestDTO) {
        ClinicalHistoryEntity clinicalHistory = clinicalHistoryService.save(clinicalHistoryRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(clinicalHistory);
    }


}
