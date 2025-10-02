package com.academy.mapper;

import com.academy.dto.DisciplineDTO;
import com.academy.entity.DisciplineEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

/**
 * Mapper para conversão entre DisciplineEntity e DisciplineDTO.
 * Utiliza MapStruct para geração automática de código de mapeamento.
 */
@Mapper(componentModel = "cdi")
public interface DisciplineMapper {

    DisciplineMapper INSTANCE = Mappers.getMapper(DisciplineMapper.class);

    /**
     * Converte DisciplineEntity para DisciplineDTO.
     * 
     * @param entity Entidade da disciplina
     * @return DTO da disciplina
     */
    @Mapping(target = "semesterId", source = "semester.id")
    @Mapping(target = "semesterNumber", source = "semester.number")
    @Mapping(target = "courseId", source = "semester.course.id")
    @Mapping(target = "courseName", source = "semester.course.name")
    DisciplineDTO toDTO(DisciplineEntity entity);

    /**
     * Converte DisciplineDTO para DisciplineEntity.
     * 
     * @param dto DTO da disciplina
     * @return Entidade da disciplina
     */
    @Mapping(target = "semester", ignore = true)
    @Mapping(target = "curricula", ignore = true)
    DisciplineEntity toEntity(DisciplineDTO dto);

    /**
     * Converte lista de DisciplineEntity para lista de DisciplineDTO.
     * 
     * @param entities Lista de entidades
     * @return Lista de DTOs
     */
    List<DisciplineDTO> toDTOList(List<DisciplineEntity> entities);

    /**
     * Converte lista de DisciplineDTO para lista de DisciplineEntity.
     * 
     * @param dtos Lista de DTOs
     * @return Lista de entidades
     */
    List<DisciplineEntity> toEntityList(List<DisciplineDTO> dtos);

    /**
     * Atualiza entidade existente com dados do DTO.
     * 
     * @param dto DTO com dados atualizados
     * @param entity Entidade a ser atualizada
     */
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "semester", ignore = true)
    @Mapping(target = "curricula", ignore = true)
    void updateEntityFromDTO(DisciplineDTO dto, @org.mapstruct.MappingTarget DisciplineEntity entity);
}
