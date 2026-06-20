package com.website.AutopartsHub.service;

import com.website.AutopartsHub.dto.AuthResponse;
import com.website.AutopartsHub.dto.LoginRequest;
import com.website.AutopartsHub.dto.RegisterRequest;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);
}
