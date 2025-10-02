package com.academy.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * Entidade que representa um curso do sistema acadêmico.
 * Um curso pode ter vários semestres e disciplinas.
 */
@Entity
@Table(name = "courses")
public class CourseEntity extends PanacheEntity {

    @NotBlank(message = "Course name is required")
    @Size(max = 100, message = "Course name must have at most 100 characters")
    @Column(name = "name", nullable = false, length = 100)
    public String name;

    @Size(max = 500, message = "Description must have at most 500 characters")
    @Column(name = "description", length = 500)
    public String description;

    @NotNull(message = "Total hours is required")
    @Column(name = "total_hours", nullable = false)
    public Integer totalHours;

    @NotNull(message = "Duration in semesters is required")
    @Column(name = "duration_semesters", nullable = false)
    public Integer durationSemesters;

    @Column(name = "active", nullable = false)
    public Boolean active = true;

    @Column(name = "created_at", nullable = false)
    public LocalDateTime createdAt;

    @Column(name = "updated_at")
    public LocalDateTime updatedAt;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    public List<SemesterEntity> semesters = new ArrayList<>();

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
        CourseEntity that = (CourseEntity) o;
        return Objects.equals(id, that.id) && Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }

    @Override
    public String toString() {
        return "CourseEntity{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", totalHours=" + totalHours +
                ", durationSemesters=" + durationSemesters +
                ", active=" + active +
                '}';
    }
}
