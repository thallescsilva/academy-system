package com.academy.mapper;

import com.academy.dto.CourseDTO;
import com.academy.dto.SemesterDTO;
import com.academy.entity.CourseEntity;
import com.academy.entity.SemesterEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

/**
 * Mapper para conversão entre CourseEntity e CourseDTO.
 * Utiliza MapStruct para geração automática de código de mapeamento.
 */
@Mapper(componentModel = "cdi", uses = {SemesterMapper.class})
public interface CourseMapper {

    CourseMapper INSTANCE = Mappers.getMapper(CourseMapper.class);

    /**
     * Converte CourseEntity para CourseDTO.
     * 
     * @param entity Entidade do curso
     * @return DTO do curso
     */
    CourseDTO toDTO(CourseEntity entity);

    /**
     * Converte CourseDTO para CourseEntity.
     * 
     * @param dto DTO do curso
     * @return Entidade do curso
     */
    CourseEntity toEntity(CourseDTO dto);

    /**
     * Converte lista de CourseEntity para lista de CourseDTO.
     * 
     * @param entities Lista de entidades
     * @return Lista de DTOs
     */
    List<CourseDTO> toDTOList(List<CourseEntity> entities);

    /**
     * Converte lista de CourseDTO para lista de CourseEntity.
     * 
     * @param dtos Lista de DTOs
     * @return Lista de entidades
     */
    List<CourseEntity> toEntityList(List<CourseDTO> dtos);

    /**
     * Atualiza entidade existente com dados do DTO.
     * 
     * @param dto DTO com dados atualizados
     * @param entity Entidade a ser atualizada
     */
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "semesters", ignore = true)
    void updateEntityFromDTO(CourseDTO dto, @org.mapstruct.MappingTarget CourseEntity entity);
}
