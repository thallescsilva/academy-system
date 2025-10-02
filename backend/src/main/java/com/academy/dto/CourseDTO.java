package com.academy.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;
import java.util.List;

/**
 * DTO para representar dados de curso.
 * Usado para transferência de dados entre frontend e backend.
 */
public class CourseDTO {

    public Long id;

    @NotBlank(message = "Course name is required")
    @Size(max = 100, message = "Course name must have at most 100 characters")
    public String name;

    @Size(max = 500, message = "Description must have at most 500 characters")
    public String description;

    @NotNull(message = "Total hours is required")
    @Positive(message = "Carga horária total deve ser positiva")
    public Integer totalHours;

    @NotNull(message = "Duration in semesters is required")
    @Positive(message = "Duração em semestres deve ser positiva")
    public Integer durationSemesters;

    public Boolean active;

    public LocalDateTime createdAt;

    public LocalDateTime updatedAt;

    public List<SemesterDTO> semesters;

    public CourseDTO() {}

    public CourseDTO(Long id, String name, String description, Integer totalHours, Integer durationSemesters, Boolean active) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.totalHours = totalHours;
        this.durationSemesters = durationSemesters;
        this.active = active;
    }

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getTotalHours() {
        return totalHours;
    }

    public void setTotalHours(Integer totalHours) {
        this.totalHours = totalHours;
    }

    public Integer getDurationSemesters() {
        return durationSemesters;
    }

    public void setDurationSemesters(Integer durationSemesters) {
        this.durationSemesters = durationSemesters;
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

    public List<SemesterDTO> getSemesters() {
        return semesters;
    }

    public void setSemesters(List<SemesterDTO> semesters) {
        this.semesters = semesters;
    }

    @Override
    public String toString() {
        return "CourseDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", totalHours=" + totalHours +
                ", durationSemesters=" + durationSemesters +
                ", active=" + active +
                '}';
    }
}
