package com.academy.service;

import com.academy.dto.CourseDTO;
import com.academy.entity.CourseEntity;
import com.academy.mapper.CourseMapper;
import com.academy.repository.CourseRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

/**
 * Serviço para operações de negócio relacionadas a cursos.
 * Contém a lógica de negócio e validações.
 */
@ApplicationScoped
public class CourseService {

    @Inject
    CourseRepository courseRepository;

    @Inject
    CourseMapper courseMapper;

    /**
     * Lista todos os cursos.
     * 
     * @return Lista de DTOs dos cursos
     */
    public List<CourseDTO> findAll() {
        List<CourseEntity> entities = courseRepository.listAll();
        return courseMapper.toDTOList(entities);
    }

    /**
     * Lista cursos ativos.
     * 
     * @return Lista de DTOs dos cursos ativos
     */
    public List<CourseDTO> findActiveCourses() {
        List<CourseEntity> entities = courseRepository.findActiveCourses();
        return courseMapper.toDTOList(entities);
    }

    /**
     * Busca curso por ID.
     * 
     * @param id ID do curso
     * @return Optional contendo o DTO do curso
     */
    public Optional<CourseDTO> findById(Long id) {
        return courseRepository.findByIdOptional(id)
                .map(courseMapper::toDTO);
    }

    /**
     * Busca curso por nome.
     * 
     * @param name Nome do curso
     * @return Optional contendo o DTO do curso
     */
    public Optional<CourseDTO> findByName(String name) {
        return courseRepository.findByName(name)
                .map(courseMapper::toDTO);
    }

    /**
     * Busca cursos por nome (busca parcial).
     * 
     * @param name Nome ou parte do nome do curso
     * @return Lista de DTOs dos cursos que contêm o nome especificado
     */
    public List<CourseDTO> findByNameContaining(String name) {
        List<CourseEntity> entities = courseRepository.findByNameContaining(name);
        return courseMapper.toDTOList(entities);
    }

    /**
     * Busca cursos ativos por nome (busca parcial).
     * 
     * @param name Nome ou parte do nome do curso
     * @return Lista de DTOs dos cursos ativos que contêm o nome especificado
     */
    public List<CourseDTO> findActiveCoursesByNameContaining(String name) {
        List<CourseEntity> entities = courseRepository.findActiveCoursesByNameContaining(name);
        return courseMapper.toDTOList(entities);
    }

    /**
     * Busca cursos por duração em semestres.
     * 
     * @param durationSemesters Duração em semestres
     * @return Lista de DTOs dos cursos com a duração especificada
     */
    public List<CourseDTO> findByDurationSemesters(Integer durationSemesters) {
        List<CourseEntity> entities = courseRepository.findByDurationSemesters(durationSemesters);
        return courseMapper.toDTOList(entities);
    }

    /**
     * Busca cursos ativos por duração em semestres.
     * 
     * @param durationSemesters Duração em semestres
     * @return Lista de DTOs dos cursos ativos com a duração especificada
     */
    public List<CourseDTO> findActiveCoursesByDurationSemesters(Integer durationSemesters) {
        List<CourseEntity> entities = courseRepository.findActiveCoursesByDurationSemesters(durationSemesters);
        return courseMapper.toDTOList(entities);
    }

    /**
     * Cria um novo curso.
     * 
     * @param courseDTO DTO do curso a ser criado
     * @return DTO do curso criado
     * @throws IllegalArgumentException se o nome do curso já existe
     */
    @Transactional
    public CourseDTO create(@Valid CourseDTO courseDTO) {
        // Verifica se o nome do curso já existe
        if (courseRepository.existsByName(courseDTO.getName())) {
            throw new IllegalArgumentException("Nome do curso já cadastrado: " + courseDTO.getName());
        }

        CourseEntity entity = courseMapper.toEntity(courseDTO);
        courseRepository.persist(entity);
        
        return courseMapper.toDTO(entity);
    }

    /**
     * Atualiza um curso existente.
     * 
     * @param id ID do curso
     * @param courseDTO DTO com os dados atualizados
     * @return DTO do curso atualizado
     * @throws IllegalArgumentException se o curso não existe ou se o nome já existe para outro curso
     */
    @Transactional
    public CourseDTO update(Long id, @Valid CourseDTO courseDTO) {
        CourseEntity entity = courseRepository.findByIdOptional(id)
                .orElseThrow(() -> new IllegalArgumentException("Curso não encontrado: " + id));

        // Verifica se o nome do curso já existe para outro curso
        Optional<CourseEntity> existingCourse = courseRepository.findByName(courseDTO.getName());
        if (existingCourse.isPresent() && !existingCourse.get().id.equals(id)) {
            throw new IllegalArgumentException("Nome do curso já cadastrado: " + courseDTO.getName());
        }

        courseMapper.updateEntityFromDTO(courseDTO, entity);
        courseRepository.persist(entity);
        
        return courseMapper.toDTO(entity);
    }

    /**
     * Remove um curso (soft delete).
     * 
     * @param id ID do curso
     * @throws IllegalArgumentException se o curso não existe
     */
    @Transactional
    public void delete(Long id) {
        CourseEntity entity = courseRepository.findByIdOptional(id)
                .orElseThrow(() -> new IllegalArgumentException("Curso não encontrado: " + id));

        entity.active = false;
        courseRepository.persist(entity);
    }

    /**
     * Remove permanentemente um curso.
     * 
     * @param id ID do curso
     * @throws IllegalArgumentException se o curso não existe
     */
    @Transactional
    public void deletePermanently(Long id) {
        CourseEntity entity = courseRepository.findByIdOptional(id)
                .orElseThrow(() -> new IllegalArgumentException("Curso não encontrado: " + id));

        courseRepository.delete(entity);
    }

    /**
     * Ativa um curso.
     * 
     * @param id ID do curso
     * @return DTO do curso ativado
     * @throws IllegalArgumentException se o curso não existe
     */
    @Transactional
    public CourseDTO activate(Long id) {
        CourseEntity entity = courseRepository.findByIdOptional(id)
                .orElseThrow(() -> new IllegalArgumentException("Curso não encontrado: " + id));

        entity.active = true;
        courseRepository.persist(entity);
        
        return courseMapper.toDTO(entity);
    }

    /**
     * Desativa um curso.
     * 
     * @param id ID do curso
     * @return DTO do curso desativado
     * @throws IllegalArgumentException se o curso não existe
     */
    @Transactional
    public CourseDTO deactivate(Long id) {
        CourseEntity entity = courseRepository.findByIdOptional(id)
                .orElseThrow(() -> new IllegalArgumentException("Curso não encontrado: " + id));

        entity.active = false;
        courseRepository.persist(entity);
        
        return courseMapper.toDTO(entity);
    }

    /**
     * Conta o número total de cursos.
     * 
     * @return Número total de cursos
     */
    public long count() {
        return courseRepository.count();
    }

    /**
     * Conta o número de cursos ativos.
     * 
     * @return Número de cursos ativos
     */
    public long countActive() {
        return courseRepository.countActiveCourses();
    }
}
