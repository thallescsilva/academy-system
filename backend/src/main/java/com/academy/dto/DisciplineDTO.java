package com.academy.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;

/**
 * DTO para representar dados de disciplina.
 * Usado para transferência de dados entre frontend e backend.
 */
public class DisciplineDTO {

    public Long id;

    @NotBlank(message = "Discipline name is required")
    @Size(max = 100, message = "Discipline name must have at most 100 characters")
    public String name;

    @Size(max = 500, message = "Description must have at most 500 characters")
    public String description;

    @NotNull(message = "Workload is required")
    @Positive(message = "Workload must be positive")
    public Integer workload;

    public Long semesterId;

    public Integer semesterNumber;

    public Long courseId;

    public String courseName;

    public Boolean active;

    public LocalDateTime createdAt;

    public LocalDateTime updatedAt;

    // Construtores
    public DisciplineDTO() {}

    public DisciplineDTO(Long id, String name, String description, Integer workload, Long semesterId, Integer semesterNumber, Boolean active) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.workload = workload;
        this.semesterId = semesterId;
        this.semesterNumber = semesterNumber;
        this.active = active;
    }

    // Getters e Setters
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

    public Integer getWorkload() {
        return workload;
    }

    public void setWorkload(Integer workload) {
        this.workload = workload;
    }

    public Long getSemesterId() {
        return semesterId;
    }

    public void setSemesterId(Long semesterId) {
        this.semesterId = semesterId;
    }

    public Integer getSemesterNumber() {
        return semesterNumber;
    }

    public void setSemesterNumber(Integer semesterNumber) {
        this.semesterNumber = semesterNumber;
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
        return "DisciplineDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", workload=" + workload +
                ", semesterId=" + semesterId +
                ", semesterNumber=" + semesterNumber +
                ", courseId=" + courseId +
                ", courseName='" + courseName + '\'' +
                ", active=" + active +
                '}';
    }
}
