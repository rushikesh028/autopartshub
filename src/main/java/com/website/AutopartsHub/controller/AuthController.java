package com.website.AutopartsHub.controller;

import com.website.AutopartsHub.dto.AuthResponse;
import com.website.AutopartsHub.dto.LoginRequest;
import com.website.AutopartsHub.dto.RegisterRequest;
import com.website.AutopartsHub.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }
}
