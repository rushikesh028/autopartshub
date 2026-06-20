package com.website.AutopartsHub.service.impl;

import com.website.AutopartsHub.dto.AuthResponse;
import com.website.AutopartsHub.dto.LoginRequest;
import com.website.AutopartsHub.dto.RegisterRequest;
import com.website.AutopartsHub.dto.UserSummary;
import com.website.AutopartsHub.entity.Role;
import com.website.AutopartsHub.entity.User;
import com.website.AutopartsHub.repository.UserRepository;
import com.website.AutopartsHub.service.AuthService;
import com.website.AutopartsHub.service.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("User already registered with this email");
        }

        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.CUSTOMER)
                .build();

        User savedUser = userRepository.save(user);

        return new AuthResponse(
                "User registered successfully",
                jwtService.generateToken(savedUser.getEmail()),
                UserSummary.from(savedUser)
        );
    }

    @Override
    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return new AuthResponse(
                "Login successful",
                jwtService.generateToken(user.getEmail()),
                UserSummary.from(user)
        );
    }
}
