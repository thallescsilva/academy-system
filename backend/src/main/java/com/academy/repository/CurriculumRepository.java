package com.academy.repository;

import com.academy.entity.CurriculumEntity;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;
import java.util.Optional;

/**
 * Repositório para operações de banco de dados relacionadas à matriz curricular.
 * Utiliza Panache para simplificar operações CRUD.
 */
@ApplicationScoped
public class CurriculumRepository implements PanacheRepository<CurriculumEntity> {

    /**
     * Busca matriz curricular por curso.
     * 
     * @param courseId ID do curso
     * @return Lista de entradas da matriz curricular do curso
     */
    public List<CurriculumEntity> findByCourseId(Long courseId) {
        return find("course.id", courseId).list();
    }

    /**
     * Busca matriz curricular ativa por curso.
     * 
     * @param courseId ID do curso
     * @return Lista de entradas ativas da matriz curricular do curso
     */
    public List<CurriculumEntity> findActiveCurriculumByCourseId(Long courseId) {
        return find("active = true and course.id = ?1", courseId).list();
    }

    /**
     * Busca matriz curricular por disciplina.
     * 
     * @param disciplineId ID da disciplina
     * @return Lista de entradas da matriz curricular da disciplina
     */
    public List<CurriculumEntity> findByDisciplineId(Long disciplineId) {
        return find("discipline.id", disciplineId).list();
    }

    /**
     * Busca matriz curricular ativa por disciplina.
     * 
     * @param disciplineId ID da disciplina
     * @return Lista de entradas ativas da matriz curricular da disciplina
     */
    public List<CurriculumEntity> findActiveCurriculumByDisciplineId(Long disciplineId) {
        return find("active = true and discipline.id = ?1", disciplineId).list();
    }

    /**
     * Busca entrada específica da matriz curricular por curso e disciplina.
     * 
     * @param courseId ID do curso
     * @param disciplineId ID da disciplina
     * @return Optional contendo a entrada da matriz curricular
     */
    public Optional<CurriculumEntity> findByCourseIdAndDisciplineId(Long courseId, Long disciplineId) {
        return find("course.id = ?1 and discipline.id = ?2", courseId, disciplineId).firstResultOptional();
    }

    /**
     * Busca matriz curricular ativa.
     * 
     * @return Lista de entradas ativas da matriz curricular
     */
    public List<CurriculumEntity> findActiveCurriculum() {
        return find("active", true).list();
    }

    /**
     * Busca matriz curricular por semestre.
     * 
     * @param semesterId ID do semestre
     * @return Lista de entradas da matriz curricular do semestre
     */
    public List<CurriculumEntity> findBySemesterId(Long semesterId) {
        return find("discipline.semester.id", semesterId).list();
    }

    /**
     * Busca matriz curricular ativa por semestre.
     * 
     * @param semesterId ID do semestre
     * @return Lista de entradas ativas da matriz curricular do semestre
     */
    public List<CurriculumEntity> findActiveCurriculumBySemesterId(Long semesterId) {
        return find("active = true and discipline.semester.id = ?1", semesterId).list();
    }

    /**
     * Verifica se existe entrada na matriz curricular para o curso e disciplina especificados.
     * 
     * @param courseId ID do curso
     * @param disciplineId ID da disciplina
     * @return true se existe, false caso contrário
     */
    public boolean existsByCourseIdAndDisciplineId(Long courseId, Long disciplineId) {
        return count("course.id = ?1 and discipline.id = ?2", courseId, disciplineId) > 0;
    }

    /**
     * Conta o número de entradas ativas na matriz curricular por curso.
     * 
     * @param courseId ID do curso
     * @return Número de entradas ativas da matriz curricular do curso
     */
    public long countActiveCurriculumByCourseId(Long courseId) {
        return count("active = true and course.id = ?1", courseId);
    }

    /**
     * Conta o número de entradas ativas na matriz curricular por semestre.
     * 
     * @param semesterId ID do semestre
     * @return Número de entradas ativas da matriz curricular do semestre
     */
    public long countActiveCurriculumBySemesterId(Long semesterId) {
        return count("active = true and discipline.semester.id = ?1", semesterId);
    }
}
