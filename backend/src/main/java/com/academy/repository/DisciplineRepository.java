package com.academy.repository;

import com.academy.entity.DisciplineEntity;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;
import java.util.Optional;

/**
 * Repositório para operações de banco de dados relacionadas a disciplinas.
 * Utiliza Panache para simplificar operações CRUD.
 */
@ApplicationScoped
public class DisciplineRepository implements PanacheRepository<DisciplineEntity> {

    /**
     * Busca disciplinas por semestre.
     * 
     * @param semesterId ID do semestre
     * @return Lista de disciplinas do semestre
     */
    public List<DisciplineEntity> findBySemesterId(Long semesterId) {
        return find("semester.id", semesterId).list();
    }

    /**
     * Busca disciplinas ativas por semestre.
     * 
     * @param semesterId ID do semestre
     * @return Lista de disciplinas ativas do semestre
     */
    public List<DisciplineEntity> findActiveDisciplinesBySemesterId(Long semesterId) {
        return find("active = true and semester.id = ?1", semesterId).list();
    }

    /**
     * Busca disciplinas por curso.
     * 
     * @param courseId ID do curso
     * @return Lista de disciplinas do curso
     */
    public List<DisciplineEntity> findByCourseId(Long courseId) {
        return find("semester.course.id", courseId).list();
    }

    /**
     * Busca disciplinas ativas por curso.
     * 
     * @param courseId ID do curso
     * @return Lista de disciplinas ativas do curso
     */
    public List<DisciplineEntity> findActiveDisciplinesByCourseId(Long courseId) {
        return find("active = true and semester.course.id = ?1", courseId).list();
    }

    /**
     * Busca disciplina por nome.
     * 
     * @param name Nome da disciplina
     * @return Optional contendo a disciplina encontrada
     */
    public Optional<DisciplineEntity> findByName(String name) {
        return find("name", name).firstResultOptional();
    }

    /**
     * Busca disciplinas ativas.
     * 
     * @return Lista de disciplinas ativas
     */
    public List<DisciplineEntity> findActiveDisciplines() {
        return find("active", true).list();
    }

    /**
     * Busca disciplinas por nome (busca parcial).
     * 
     * @param name Nome ou parte do nome da disciplina
     * @return Lista de disciplinas que contêm o nome especificado
     */
    public List<DisciplineEntity> findByNameContaining(String name) {
        return find("name like ?1", "%" + name + "%").list();
    }

    /**
     * Busca disciplinas ativas por nome (busca parcial).
     * 
     * @param name Nome ou parte do nome da disciplina
     * @return Lista de disciplinas ativas que contêm o nome especificado
     */
    public List<DisciplineEntity> findActiveDisciplinesByNameContaining(String name) {
        return find("active = true and name like ?1", "%" + name + "%").list();
    }

    /**
     * Busca disciplinas por carga horária.
     * 
     * @param workload Carga horária
     * @return Lista de disciplinas com a carga horária especificada
     */
    public List<DisciplineEntity> findByWorkload(Integer workload) {
        return find("workload", workload).list();
    }

    /**
     * Busca disciplinas ativas por carga horária.
     * 
     * @param workload Carga horária
     * @return Lista de disciplinas ativas com a carga horária especificada
     */
    public List<DisciplineEntity> findActiveDisciplinesByWorkload(Integer workload) {
        return find("active = true and workload = ?1", workload).list();
    }

    /**
     * Verifica se existe disciplina com o nome especificado.
     * 
     * @param name Nome da disciplina
     * @return true se existe, false caso contrário
     */
    public boolean existsByName(String name) {
        return count("name", name) > 0;
    }

    /**
     * Conta o número de disciplinas ativas por semestre.
     * 
     * @param semesterId ID do semestre
     * @return Número de disciplinas ativas do semestre
     */
    public long countActiveDisciplinesBySemesterId(Long semesterId) {
        return count("active = true and semester.id = ?1", semesterId);
    }

    /**
     * Conta o número de disciplinas ativas por curso.
     * 
     * @param courseId ID do curso
     * @return Número de disciplinas ativas do curso
     */
    public long countActiveDisciplinesByCourseId(Long courseId) {
        return count("active = true and semester.course.id = ?1", courseId);
    }
}
