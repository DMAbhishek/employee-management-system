package com.employee.management.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginResponse {
    private String token;
    private Long id;
    private String username;
    private String email;
    private String role;
}
