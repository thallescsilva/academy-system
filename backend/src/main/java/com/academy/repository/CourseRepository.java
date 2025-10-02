package com.academy.repository;

import com.academy.entity.CourseEntity;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;
import java.util.Optional;

/**
 * Repositório para operações de banco de dados relacionadas a cursos.
 * Utiliza Panache para simplificar operações CRUD.
 */
@ApplicationScoped
public class CourseRepository implements PanacheRepository<CourseEntity> {

    /**
     * Busca curso por nome.
     * 
     * @param name Nome do curso
     * @return Optional contendo o curso encontrado
     */
    public Optional<CourseEntity> findByName(String name) {
        return find("name", name).firstResultOptional();
    }

    /**
     * Busca cursos ativos.
     * 
     * @return Lista de cursos ativos
     */
    public List<CourseEntity> findActiveCourses() {
        return find("active", true).list();
    }

    /**
     * Busca cursos por nome (busca parcial).
     * 
     * @param name Nome ou parte do nome do curso
     * @return Lista de cursos que contêm o nome especificado
     */
    public List<CourseEntity> findByNameContaining(String name) {
        return find("name like ?1", "%" + name + "%").list();
    }

    /**
     * Busca cursos ativos por nome (busca parcial).
     * 
     * @param name Nome ou parte do nome do curso
     * @return Lista de cursos ativos que contêm o nome especificado
     */
    public List<CourseEntity> findActiveCoursesByNameContaining(String name) {
        return find("active = true and name like ?1", "%" + name + "%").list();
    }

    /**
     * Busca cursos por duração em semestres.
     * 
     * @param durationSemesters Duração em semestres
     * @return Lista de cursos com a duração especificada
     */
    public List<CourseEntity> findByDurationSemesters(Integer durationSemesters) {
        return find("durationSemesters", durationSemesters).list();
    }

    /**
     * Busca cursos ativos por duração em semestres.
     * 
     * @param durationSemesters Duração em semestres
     * @return Lista de cursos ativos com a duração especificada
     */
    public List<CourseEntity> findActiveCoursesByDurationSemesters(Integer durationSemesters) {
        return find("active = true and durationSemesters = ?1", durationSemesters).list();
    }

    /**
     * Verifica se existe curso com o nome especificado.
     * 
     * @param name Nome do curso
     * @return true se existe, false caso contrário
     */
    public boolean existsByName(String name) {
        return count("name", name) > 0;
    }

    /**
     * Conta o número de cursos ativos.
     * 
     * @return Número de cursos ativos
     */
    public long countActiveCourses() {
        return count("active", true);
    }
}
