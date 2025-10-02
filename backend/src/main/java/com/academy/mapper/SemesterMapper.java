package com.academy.mapper;

import com.academy.dto.SemesterDTO;
import com.academy.entity.SemesterEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

/**
 * Mapper para conversão entre SemesterEntity e SemesterDTO.
 * Utiliza MapStruct para geração automática de código de mapeamento.
 */
@Mapper(componentModel = "cdi")
public interface SemesterMapper {

    SemesterMapper INSTANCE = Mappers.getMapper(SemesterMapper.class);

    /**
     * Converte SemesterEntity para SemesterDTO.
     * 
     * @param entity Entidade do semestre
     * @return DTO do semestre
     */
    @Mapping(target = "courseId", source = "course.id")
    @Mapping(target = "courseName", source = "course.name")
    SemesterDTO toDTO(SemesterEntity entity);

    /**
     * Converte SemesterDTO para SemesterEntity.
     * 
     * @param dto DTO do semestre
     * @return Entidade do semestre
     */
    @Mapping(target = "course", ignore = true)
    @Mapping(target = "disciplines", ignore = true)
    SemesterEntity toEntity(SemesterDTO dto);

    /**
     * Converte lista de SemesterEntity para lista de SemesterDTO.
     * 
     * @param entities Lista de entidades
     * @return Lista de DTOs
     */
    List<SemesterDTO> toDTOList(List<SemesterEntity> entities);

    /**
     * Converte lista de SemesterDTO para lista de SemesterEntity.
     * 
     * @param dtos Lista de DTOs
     * @return Lista de entidades
     */
    List<SemesterEntity> toEntityList(List<SemesterDTO> dtos);

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
    @Mapping(target = "disciplines", ignore = true)
    void updateEntityFromDTO(SemesterDTO dto, @org.mapstruct.MappingTarget SemesterEntity entity);
}
