package com.academy.repository;

import com.academy.entity.SemesterEntity;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;
import java.util.Optional;

/**
 * Repositório para operações de banco de dados relacionadas a semestres.
 * Utiliza Panache para simplificar operações CRUD.
 */
@ApplicationScoped
public class SemesterRepository implements PanacheRepository<SemesterEntity> {

    /**
     * Busca semestres por curso.
     * 
     * @param courseId ID do curso
     * @return Lista de semestres do curso
     */
    public List<SemesterEntity> findByCourseId(Long courseId) {
        return find("course.id", courseId).list();
    }

    /**
     * Busca semestres ativos por curso.
     * 
     * @param courseId ID do curso
     * @return Lista de semestres ativos do curso
     */
    public List<SemesterEntity> findActiveSemestersByCourseId(Long courseId) {
        return find("active = true and course.id = ?1", courseId).list();
    }

    /**
     * Busca semestre por curso e número.
     * 
     * @param courseId ID do curso
     * @param number Número do semestre
     * @return Optional contendo o semestre encontrado
     */
    public Optional<SemesterEntity> findByCourseIdAndNumber(Long courseId, Integer number) {
        return find("course.id = ?1 and number = ?2", courseId, number).firstResultOptional();
    }

    /**
     * Busca semestres ativos.
     * 
     * @return Lista de semestres ativos
     */
    public List<SemesterEntity> findActiveSemesters() {
        return find("active", true).list();
    }

    /**
     * Busca semestres por número.
     * 
     * @param number Número do semestre
     * @return Lista de semestres com o número especificado
     */
    public List<SemesterEntity> findByNumber(Integer number) {
        return find("number", number).list();
    }

    /**
     * Busca semestres ativos por número.
     * 
     * @param number Número do semestre
     * @return Lista de semestres ativos com o número especificado
     */
    public List<SemesterEntity> findActiveSemestersByNumber(Integer number) {
        return find("active = true and number = ?1", number).list();
    }

    /**
     * Verifica se existe semestre com o número especificado no curso.
     * 
     * @param courseId ID do curso
     * @param number Número do semestre
     * @return true se existe, false caso contrário
     */
    public boolean existsByCourseIdAndNumber(Long courseId, Integer number) {
        return count("course.id = ?1 and number = ?2", courseId, number) > 0;
    }

    /**
     * Conta o número de semestres ativos por curso.
     * 
     * @param courseId ID do curso
     * @return Número de semestres ativos do curso
     */
    public long countActiveSemestersByCourseId(Long courseId) {
        return count("active = true and course.id = ?1", courseId);
    }
}
