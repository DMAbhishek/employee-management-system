package com.employee.management.controller;

import com.employee.management.entity.User;
import com.employee.management.repository.UserRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserRepository users;
    private final PasswordEncoder encoder;

    public UserController(UserRepository users, PasswordEncoder encoder) {
        this.users = users;
        this.encoder = encoder;
    }

    @GetMapping
    public List<User> all() { return users.findAll(); }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User create(@Valid @RequestBody UserRequest request) {
        User user = new User();
        user.setUsername(request.username());
        user.setEmail(request.email());
        user.setPassword(encoder.encode(request.password()));
        user.setRole(User.Role.valueOf(request.role()));
        user.setActive(true);
        return users.save(user);
    }

    public record UserRequest(
            @NotBlank String username,
            @NotBlank @Email String email,
            @NotBlank String password,
            @NotBlank String role) {}
}
