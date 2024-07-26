package com.Healthtech.Backend.service;

import com.Healthtech.Backend.dto.request.AuthLoginRequest;
import com.Healthtech.Backend.dto.response.AuthResponse;

public interface UserEntityService {

    AuthResponse loginUser(AuthLoginRequest userRequest);

}
