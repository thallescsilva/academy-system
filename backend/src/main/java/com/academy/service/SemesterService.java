package com.academy.service;

import com.academy.dto.SemesterDTO;
import com.academy.entity.SemesterEntity;
import com.academy.entity.CourseEntity;
import com.academy.mapper.SemesterMapper;
import com.academy.repository.SemesterRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class SemesterService {

    @Inject
    SemesterRepository semesterRepository;

    @Inject
    SemesterMapper semesterMapper;

    public List<SemesterDTO> findAll() {
        List<SemesterEntity> entities = semesterRepository.listAll();
        return semesterMapper.toDTOList(entities);
    }

    public SemesterDTO findById(Long id) {
        Optional<SemesterEntity> entity = semesterRepository.findByIdOptional(id);
        return entity.map(semesterMapper::toDTO).orElse(null);
    }

    @Transactional
    public SemesterDTO create(SemesterDTO semesterDTO) {
        SemesterEntity entity = semesterMapper.toEntity(semesterDTO);
        
        if (semesterDTO.getCourseId() != null) {
            entity.course = CourseEntity.findById(semesterDTO.getCourseId());
            if (entity.course == null) {
                throw new RuntimeException("Course not found with ID: " + semesterDTO.getCourseId());
            }
        }
        
        semesterRepository.persist(entity);
        return semesterMapper.toDTO(entity);
    }

    @Transactional
    public SemesterDTO update(Long id, SemesterDTO semesterDTO) {
        Optional<SemesterEntity> entityOpt = semesterRepository.findByIdOptional(id);
        if (entityOpt.isEmpty()) {
            return null;
        }

        SemesterEntity entity = entityOpt.get();
        entity.number = semesterDTO.getNumber();
        entity.active = semesterDTO.getActive();

        semesterRepository.persist(entity);
        return semesterMapper.toDTO(entity);
    }

    @Transactional
    public boolean delete(Long id) {
        Optional<SemesterEntity> entity = semesterRepository.findByIdOptional(id);
        if (entity.isEmpty()) {
            return false;
        }

        semesterRepository.delete(entity.get());
        return true;
    }

    public List<SemesterDTO> findByCourseId(Long courseId) {
        List<SemesterEntity> entities = semesterRepository.findByCourseId(courseId);
        return semesterMapper.toDTOList(entities);
    }
}
