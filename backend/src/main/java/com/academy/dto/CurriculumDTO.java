package com.academy.dto;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.List;

/**
 * DTO para representar dados da matriz curricular.
 * Usado para transferência de dados entre frontend e backend.
 */
public class CurriculumDTO {

    public Long id;

    public Long courseId;

    public String courseName;

    public Long disciplineId;

    public String disciplineName;

    public Integer disciplineWorkload;

    public Long semesterId;

    public Integer semesterNumber;

    public Boolean active;

    public LocalDateTime createdAt;

    public LocalDateTime updatedAt;

    public static class CurriculumMatrixDTO {
        public Long courseId;
        public String courseName;
        public List<SemesterDisciplinesDTO> semesters;

        public CurriculumMatrixDTO(Long courseId, String courseName, List<SemesterDisciplinesDTO> semesters) {
            this.courseId = courseId;
            this.courseName = courseName;
            this.semesters = semesters;
        }
    }

    public static class SemesterDisciplinesDTO {
        public Long semesterId;
        public Integer semesterNumber;
        public List<DisciplineDTO> disciplines;

        public SemesterDisciplinesDTO(Long semesterId, Integer semesterNumber, List<DisciplineDTO> disciplines) {
            this.semesterId = semesterId;
            this.semesterNumber = semesterNumber;
            this.disciplines = disciplines;
        }
    }

    public CurriculumDTO() {}

    public CurriculumDTO(Long id, Long courseId, String courseName, Long disciplineId, String disciplineName, 
                       Integer disciplineWorkload, Long semesterId, Integer semesterNumber, Boolean active) {
        this.id = id;
        this.courseId = courseId;
        this.courseName = courseName;
        this.disciplineId = disciplineId;
        this.disciplineName = disciplineName;
        this.disciplineWorkload = disciplineWorkload;
        this.semesterId = semesterId;
        this.semesterNumber = semesterNumber;
        this.active = active;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Long getDisciplineId() {
        return disciplineId;
    }

    public void setDisciplineId(Long disciplineId) {
        this.disciplineId = disciplineId;
    }

    public String getDisciplineName() {
        return disciplineName;
    }

    public void setDisciplineName(String disciplineName) {
        this.disciplineName = disciplineName;
    }

    public Integer getDisciplineWorkload() {
        return disciplineWorkload;
    }

    public void setDisciplineWorkload(Integer disciplineWorkload) {
        this.disciplineWorkload = disciplineWorkload;
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
        return "CurriculumDTO{" +
                "id=" + id +
                ", courseId=" + courseId +
                ", courseName='" + courseName + '\'' +
                ", disciplineId=" + disciplineId +
                ", disciplineName='" + disciplineName + '\'' +
                ", semesterId=" + semesterId +
                ", semesterNumber=" + semesterNumber +
                ", active=" + active +
                '}';
    }
}
