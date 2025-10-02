package com.academy.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.Objects;

/**
 * Entidade que representa a matriz curricular.
 * Relaciona disciplinas com cursos, definindo quais disciplinas fazem parte de cada curso.
 */
@Entity
@Table(name = "curriculum")
public class CurriculumEntity extends PanacheEntity {

    @NotNull(message = "Course is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", nullable = false)
    public CourseEntity course;

    @NotNull(message = "Discipline is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "discipline_id", nullable = false)
    public DisciplineEntity discipline;

    @Column(name = "active", nullable = false)
    public Boolean active = true;

    @Column(name = "created_at", nullable = false)
    public LocalDateTime createdAt;

    @Column(name = "updated_at")
    public LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CurriculumEntity that = (CurriculumEntity) o;
        return Objects.equals(id, that.id) && 
               Objects.equals(course, that.course) && 
               Objects.equals(discipline, that.discipline);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, course, discipline);
    }

    @Override
    public String toString() {
        return "CurriculumEntity{" +
                "id=" + id +
                ", course=" + (course != null ? course.name : null) +
                ", discipline=" + (discipline != null ? discipline.name : null) +
                ", active=" + active +
                '}';
    }
}
