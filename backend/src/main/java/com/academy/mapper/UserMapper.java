package com.academy.mapper;

import com.academy.dto.UserDTO;
import com.academy.entity.UserEntity;
import com.academy.enums.UserRole;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

/**
 * Mapper para conversão entre UserEntity e UserDTO.
 * Utiliza MapStruct para geração automática de código de mapeamento.
 */
@Mapper(componentModel = "cdi")
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    /**
     * Converte UserEntity para UserDTO.
     * 
     * @param entity Entidade do usuário
     * @return DTO do usuário
     */
    @Mapping(target = "password", ignore = true) // Não expor senha no DTO
    UserDTO toDTO(UserEntity entity);

    /**
     * Converte UserDTO para UserEntity.
     * 
     * @param dto DTO do usuário
     * @return Entidade do usuário
     */
    UserEntity toEntity(UserDTO dto);

    /**
     * Converte lista de UserEntity para lista de UserDTO.
     * 
     * @param entities Lista de entidades
     * @return Lista de DTOs
     */
    List<UserDTO> toDTOList(List<UserEntity> entities);

    /**
     * Converte lista de UserDTO para lista de UserEntity.
     * 
     * @param dtos Lista de DTOs
     * @return Lista de entidades
     */
    List<UserEntity> toEntityList(List<UserDTO> dtos);

    /**
     * Atualiza entidade existente com dados do DTO.
     * 
     * @param dto DTO com dados atualizados
     * @param entity Entidade a ser atualizada
     */
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateEntityFromDTO(UserDTO dto, @org.mapstruct.MappingTarget UserEntity entity);
}
