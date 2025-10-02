package com.academy.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.time.LocalDateTime;

/**
 * DTO para representar dados de semestre.
 * Usado para transferência de dados entre frontend e backend.
 */
public class SemesterDTO {

    public Long id;

    @NotNull(message = "Semester number is required")
    @Positive(message = "Semester number must be positive")
    public Integer number;

    public Long courseId;

    public String courseName;

    public Boolean active;

    public LocalDateTime createdAt;

    public LocalDateTime updatedAt;

    // Construtores
    public SemesterDTO() {}

    public SemesterDTO(Long id, Integer number, Long courseId, String courseName, Boolean active) {
        this.id = id;
        this.number = number;
        this.courseId = courseId;
        this.courseName = courseName;
        this.active = active;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
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

    @Override
    public String toString() {
        return "SemesterDTO{" +
                "id=" + id +
                ", number=" + number +
                ", courseId=" + courseId +
                ", courseName='" + courseName + '\'' +
                ", active=" + active +
                '}';
    }
}
