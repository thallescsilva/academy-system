package com.academy.service;

import com.academy.dto.CurriculumDTO;
import com.academy.entity.CurriculumEntity;
import com.academy.entity.CourseEntity;
import com.academy.entity.DisciplineEntity;
import com.academy.entity.UserEntity;
import com.academy.enums.UserRole;
import com.academy.mapper.CurriculumMapper;
import com.academy.repository.CurriculumRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class CurriculumService {

    @Inject
    CurriculumRepository curriculumRepository;

    @Inject
    CurriculumMapper curriculumMapper;

    public List<CurriculumDTO> findAll() {
        List<CurriculumEntity> entities = curriculumRepository.listAll();
        return curriculumMapper.toDTOList(entities);
    }

    public CurriculumDTO findById(Long id) {
        Optional<CurriculumEntity> entity = curriculumRepository.findByIdOptional(id);
        return entity.map(curriculumMapper::toDTO).orElse(null);
    }

    @Transactional
    public CurriculumDTO create(CurriculumDTO curriculumDTO) {
        CurriculumEntity entity = curriculumMapper.toEntity(curriculumDTO);
        
        if (curriculumDTO.getCourseId() != null) {
            entity.course = CourseEntity.findById(curriculumDTO.getCourseId());
            if (entity.course == null) {
                throw new RuntimeException("Course not found with ID: " + curriculumDTO.getCourseId());
            }
        }
        
        if (curriculumDTO.getDisciplineId() != null) {
            entity.discipline = DisciplineEntity.findById(curriculumDTO.getDisciplineId());
            if (entity.discipline == null) {
                throw new RuntimeException("Discipline not found with ID: " + curriculumDTO.getDisciplineId());
            }
        }
        
        curriculumRepository.persist(entity);
        return curriculumMapper.toDTO(entity);
    }

    @Transactional
    public CurriculumDTO update(Long id, CurriculumDTO curriculumDTO) {
        Optional<CurriculumEntity> entityOpt = curriculumRepository.findByIdOptional(id);
        if (entityOpt.isEmpty()) {
            return null;
        }

        CurriculumEntity entity = entityOpt.get();
        entity.active = curriculumDTO.getActive();

        curriculumRepository.persist(entity);
        return curriculumMapper.toDTO(entity);
    }

    @Transactional
    public boolean delete(Long id) {
        Optional<CurriculumEntity> entity = curriculumRepository.findByIdOptional(id);
        if (entity.isEmpty()) {
            return false;
        }

        curriculumRepository.delete(entity.get());
        return true;
    }

    public List<CurriculumDTO> findByStudentId(Long studentId) {
        UserEntity student = UserEntity.findById(studentId);
        if (student == null || student.role != UserRole.STUDENT) {
            return List.of();
        }
        
        // Por enquanto, retornar todas as disciplinas ativas da matriz curricular
        // Em um sistema completo, seria necessário uma entidade de matrícula
        // que relacionasse o aluno com um curso específico
        List<CurriculumEntity> entities = curriculumRepository.find("active", true).list();
        return curriculumMapper.toDTOList(entities);
    }

    public List<CurriculumDTO> findByDisciplineId(Long disciplineId) {
        List<CurriculumEntity> entities = curriculumRepository.findByDisciplineId(disciplineId);
        return curriculumMapper.toDTOList(entities);
    }
}
