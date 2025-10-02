package com.academy.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

/**
 * Entidade que representa uma disciplina do sistema acadêmico.
 * Uma disciplina pertence a um semestre e pode estar em várias matrizes curriculares.
 */
@Entity
@Table(name = "disciplines")
public class DisciplineEntity extends PanacheEntity {

    @NotBlank(message = "Discipline name is required")
    @Size(max = 100, message = "Discipline name must have at most 100 characters")
    @Column(name = "name", nullable = false, length = 100)
    public String name;

    @Size(max = 500, message = "Description must have at most 500 characters")
    @Column(name = "description", length = 500)
    public String description;

    @NotNull(message = "Workload is required")
    @Positive(message = "Workload must be positive")
    @Column(name = "workload", nullable = false)
    public Integer workload;

    @NotNull(message = "Semester is required")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "semester_id", nullable = false)
    public SemesterEntity semester;

    @Column(name = "active", nullable = false)
    public Boolean active = true;

    @Column(name = "created_at", nullable = false)
    public LocalDateTime createdAt;

    @Column(name = "updated_at")
    public LocalDateTime updatedAt;

    @OneToMany(mappedBy = "discipline", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    public List<CurriculumEntity> curricula = new ArrayList<>();

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
        DisciplineEntity that = (DisciplineEntity) o;
        return Objects.equals(id, that.id) && Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name);
    }

    @Override
    public String toString() {
        return "DisciplineEntity{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", workload=" + workload +
                ", semester=" + (semester != null ? semester.number : null) +
                ", active=" + active +
                '}';
    }
}
