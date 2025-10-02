package com.academy.service;

import com.academy.dto.DisciplineDTO;
import com.academy.entity.DisciplineEntity;
import com.academy.entity.SemesterEntity;
import com.academy.mapper.DisciplineMapper;
import com.academy.repository.DisciplineRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;

@ApplicationScoped
public class DisciplineService {

    @Inject
    DisciplineRepository disciplineRepository;

    @Inject
    DisciplineMapper disciplineMapper;

    public List<DisciplineDTO> findAll() {
        List<DisciplineEntity> entities = disciplineRepository.listAll();
        return disciplineMapper.toDTOList(entities);
    }

    public DisciplineDTO findById(Long id) {
        Optional<DisciplineEntity> entity = disciplineRepository.findByIdOptional(id);
        return entity.map(disciplineMapper::toDTO).orElse(null);
    }

    @Transactional
    public DisciplineDTO create(DisciplineDTO disciplineDTO) {
        DisciplineEntity entity = disciplineMapper.toEntity(disciplineDTO);
        
        // Carregar o semestre se semesterId foi fornecido
        if (disciplineDTO.getSemesterId() != null) {
            entity.semester = SemesterEntity.findById(disciplineDTO.getSemesterId());
            if (entity.semester == null) {
                throw new RuntimeException("Semester not found with ID: " + disciplineDTO.getSemesterId());
            }
        }
        
        disciplineRepository.persist(entity);
        return disciplineMapper.toDTO(entity);
    }

    @Transactional
    public DisciplineDTO update(Long id, DisciplineDTO disciplineDTO) {
        Optional<DisciplineEntity> entityOpt = disciplineRepository.findByIdOptional(id);
        if (entityOpt.isEmpty()) {
            return null;
        }

        DisciplineEntity entity = entityOpt.get();
        entity.name = disciplineDTO.getName();
        entity.workload = disciplineDTO.getWorkload();
        entity.description = disciplineDTO.getDescription();

        disciplineRepository.persist(entity);
        return disciplineMapper.toDTO(entity);
    }

    @Transactional
    public boolean delete(Long id) {
        Optional<DisciplineEntity> entity = disciplineRepository.findByIdOptional(id);
        if (entity.isEmpty()) {
            return false;
        }

        disciplineRepository.delete(entity.get());
        return true;
    }

    public List<DisciplineDTO> findBySemesterId(Long semesterId) {
        List<DisciplineEntity> entities = disciplineRepository.findBySemesterId(semesterId);
        return disciplineMapper.toDTOList(entities);
    }
}
