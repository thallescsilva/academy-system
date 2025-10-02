package com.academy.dto;

import com.academy.enums.UserRole;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

/**
 * DTO para atualização de usuário.
 * Não exige password (que pode ser null em atualizações).
 */
public class UserUpdateDTO {

    public Long id;

    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Name must have at most 100 characters")
    public String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Email must have valid format")
    @Size(max = 100, message = "Email must have at most 100 characters")
    public String email;

    @Size(min = 6, message = "Password must have at least 6 characters")
    public String password;

    @NotNull(message = "Role is required")
    public UserRole role;

    public Boolean active;

    public LocalDateTime createdAt;

    public LocalDateTime updatedAt;

    public UserUpdateDTO() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {
        this.role = role;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}

