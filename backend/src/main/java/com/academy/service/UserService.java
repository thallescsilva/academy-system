package com.academy.service;

import com.academy.dto.UserDTO;
import com.academy.entity.UserEntity;
import com.academy.enums.UserRole;
import com.academy.mapper.UserMapper;
import com.academy.repository.UserRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Optional;

/**
 * Serviço para operações de negócio relacionadas a usuários.
 * Contém a lógica de negócio e validações.
 */
@ApplicationScoped
public class UserService {

    @Inject
    UserRepository userRepository;

    @Inject
    UserMapper userMapper;

    /**
     * Lista todos os usuários.
     * 
     * @return Lista de DTOs dos usuários
     */
    public List<UserDTO> findAll() {
        List<UserEntity> entities = userRepository.listAll();
        return userMapper.toDTOList(entities);
    }

    /**
     * Lista usuários ativos.
     * 
     * @return Lista de DTOs dos usuários ativos
     */
    public List<UserDTO> findActiveUsers() {
        List<UserEntity> entities = userRepository.findActiveUsers();
        return userMapper.toDTOList(entities);
    }

    /**
     * Busca usuário por ID.
     * 
     * @param id ID do usuário
     * @return Optional contendo o DTO do usuário
     */
    public Optional<UserDTO> findById(Long id) {
        return userRepository.findByIdOptional(id)
                .map(userMapper::toDTO);
    }

    /**
     * Busca usuário por email.
     * 
     * @param email Email do usuário
     * @return Optional contendo o DTO do usuário
     */
    public Optional<UserDTO> findByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(userMapper::toDTO);
    }

    /**
     * Busca usuários por papel.
     * 
     * @param role Papel do usuário
     * @return Lista de DTOs dos usuários com o papel especificado
     */
    public List<UserDTO> findByRole(UserRole role) {
        List<UserEntity> entities = userRepository.findByRole(role);
        return userMapper.toDTOList(entities);
    }

    /**
     * Busca usuários ativos por papel.
     * 
     * @param role Papel do usuário
     * @return Lista de DTOs dos usuários ativos com o papel especificado
     */
    public List<UserDTO> findActiveUsersByRole(UserRole role) {
        List<UserEntity> entities = userRepository.findActiveUsersByRole(role);
        return userMapper.toDTOList(entities);
    }

    /**
     * Busca usuários por nome (busca parcial).
     * 
     * @param name Nome ou parte do nome
     * @return Lista de DTOs dos usuários que contêm o nome especificado
     */
    public List<UserDTO> findByNameContaining(String name) {
        List<UserEntity> entities = userRepository.findByNameContaining(name);
        return userMapper.toDTOList(entities);
    }

    /**
     * Busca usuários ativos por nome (busca parcial).
     * 
     * @param name Nome ou parte do nome
     * @return Lista de DTOs dos usuários ativos que contêm o nome especificado
     */
    public List<UserDTO> findActiveUsersByNameContaining(String name) {
        List<UserEntity> entities = userRepository.findActiveUsersByNameContaining(name);
        return userMapper.toDTOList(entities);
    }

    /**
     * Cria um novo usuário.
     * 
     * @param userDTO DTO do usuário a ser criado
     * @return DTO do usuário criado
     * @throws IllegalArgumentException se o email já existe
     */
    @Transactional
    public UserDTO create(@Valid UserDTO userDTO) {
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new IllegalArgumentException("Email já cadastrado: " + userDTO.getEmail());
        }

        UserEntity entity = userMapper.toEntity(userDTO);
        userRepository.persist(entity);
        
        return userMapper.toDTO(entity);
    }

    /**
     * Atualiza um usuário existente.
     * 
     * @param id ID do usuário
     * @param userDTO DTO com os dados atualizados
     * @return DTO do usuário atualizado
     * @throws IllegalArgumentException se o usuário não existe ou se o email já existe para outro usuário
     */
    @Transactional
    public UserDTO update(Long id, @Valid UserDTO userDTO) {
        UserEntity entity = userRepository.findByIdOptional(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado: " + id));

        Optional<UserEntity> existingUser = userRepository.findByEmail(userDTO.getEmail());
        if (existingUser.isPresent() && !existingUser.get().id.equals(id)) {
            throw new IllegalArgumentException("Email já cadastrado: " + userDTO.getEmail());
        }

        userMapper.updateEntityFromDTO(userDTO, entity);
        userRepository.persist(entity);
        
        return userMapper.toDTO(entity);
    }

    /**
     * Remove um usuário (soft delete).
     * 
     * @param id ID do usuário
     * @throws IllegalArgumentException se o usuário não existe
     */
    @Transactional
    public void delete(Long id) {
        UserEntity entity = userRepository.findByIdOptional(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado: " + id));

        userRepository.delete(entity);
    }

    /**
     * Remove permanentemente um usuário.
     * 
     * @param id ID do usuário
     * @throws IllegalArgumentException se o usuário não existe
     */
    @Transactional
    public void deletePermanently(Long id) {
        UserEntity entity = userRepository.findByIdOptional(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado: " + id));

        userRepository.delete(entity);
    }

    /**
     * Ativa um usuário.
     * 
     * @param id ID do usuário
     * @return DTO do usuário ativado
     * @throws IllegalArgumentException se o usuário não existe
     */
    @Transactional
    public UserDTO activate(Long id) {
        UserEntity entity = userRepository.findByIdOptional(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado: " + id));

        entity.active = true;
        userRepository.persist(entity);
        
        return userMapper.toDTO(entity);
    }

    /**
     * Desativa um usuário.
     * 
     * @param id ID do usuário
     * @return DTO do usuário desativado
     * @throws IllegalArgumentException se o usuário não existe
     */
    @Transactional
    public UserDTO deactivate(Long id) {
        UserEntity entity = userRepository.findByIdOptional(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado: " + id));

        entity.active = false;
        userRepository.persist(entity);
        
        return userMapper.toDTO(entity);
    }

    /**
     * Conta o número total de usuários.
     * 
     * @return Número total de usuários
     */
    public long count() {
        return userRepository.count();
    }

    /**
     * Conta o número de usuários ativos.
     * 
     * @return Número de usuários ativos
     */
    public long countActive() {
        return userRepository.findActiveUsers().size();
    }
}
