package com.Healthtech.Backend.controller;

import com.Healthtech.Backend.dto.request.AuthLoginRequest;
import com.Healthtech.Backend.service.UserEntityService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/users")
public class UsuarioController {


    private final UserEntityService userEntityService;



    @PostMapping("/log-in")
    public ResponseEntity<?> login(@RequestBody @Valid AuthLoginRequest userRequest){

        try {
            return new ResponseEntity<>(userEntityService.loginUser(userRequest), HttpStatus.OK);
        }catch (RuntimeException e){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }

    }

}
