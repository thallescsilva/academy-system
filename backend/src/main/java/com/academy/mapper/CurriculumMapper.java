package com.academy.mapper;

import com.academy.dto.CurriculumDTO;
import com.academy.entity.CurriculumEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

/**
 * Mapper para conversão entre CurriculumEntity e CurriculumDTO.
 * Utiliza MapStruct para geração automática de código de mapeamento.
 */
@Mapper(componentModel = "cdi")
public interface CurriculumMapper {

    CurriculumMapper INSTANCE = Mappers.getMapper(CurriculumMapper.class);

    /**
     * Converte CurriculumEntity para CurriculumDTO.
     * 
     * @param entity Entidade da matriz curricular
     * @return DTO da matriz curricular
     */
    @Mapping(target = "courseId", source = "course.id")
    @Mapping(target = "courseName", source = "course.name")
    @Mapping(target = "disciplineId", source = "discipline.id")
    @Mapping(target = "disciplineName", source = "discipline.name")
    @Mapping(target = "disciplineWorkload", source = "discipline.workload")
    @Mapping(target = "semesterId", source = "discipline.semester.id")
    @Mapping(target = "semesterNumber", source = "discipline.semester.number")
    CurriculumDTO toDTO(CurriculumEntity entity);

    /**
     * Converte CurriculumDTO para CurriculumEntity.
     * 
     * @param dto DTO da matriz curricular
     * @return Entidade da matriz curricular
     */
    @Mapping(target = "course", ignore = true)
    @Mapping(target = "discipline", ignore = true)
    CurriculumEntity toEntity(CurriculumDTO dto);

    /**
     * Converte lista de CurriculumEntity para lista de CurriculumDTO.
     * 
     * @param entities Lista de entidades
     * @return Lista de DTOs
     */
    List<CurriculumDTO> toDTOList(List<CurriculumEntity> entities);

    /**
     * Converte lista de CurriculumDTO para lista de CurriculumEntity.
     * 
     * @param dtos Lista de DTOs
     * @return Lista de entidades
     */
    List<CurriculumEntity> toEntityList(List<CurriculumDTO> dtos);

    /**
     * Atualiza entidade existente com dados do DTO.
     * 
     * @param dto DTO com dados atualizados
     * @param entity Entidade a ser atualizada
     */
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "course", ignore = true)
    @Mapping(target = "discipline", ignore = true)
    void updateEntityFromDTO(CurriculumDTO dto, @org.mapstruct.MappingTarget CurriculumEntity entity);
}
