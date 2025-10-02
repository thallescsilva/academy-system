package com.academy.repository;

import com.academy.entity.UserEntity;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;
import java.util.Optional;

/**
 * Repositório para operações de banco de dados relacionadas a usuários.
 * Utiliza Panache para simplificar operações CRUD.
 */
@ApplicationScoped
public class UserRepository implements PanacheRepository<UserEntity> {

    /**
     * Busca usuário por email.
     * 
     * @param email Email do usuário
     * @return Optional contendo o usuário encontrado
     */
    public Optional<UserEntity> findByEmail(String email) {
        return find("email", email).firstResultOptional();
    }

    /**
     * Busca usuários por papel.
     * 
     * @param role Papel do usuário
     * @return Lista de usuários com o papel especificado
     */
    public List<UserEntity> findByRole(UserEntity.UserRole role) {
        return find("role", role).list();
    }

    /**
     * Busca usuários ativos.
     * 
     * @return Lista de usuários ativos
     */
    public List<UserEntity> findActiveUsers() {
        return find("active", true).list();
    }

    /**
     * Busca usuários ativos por papel.
     * 
     * @param role Papel do usuário
     * @return Lista de usuários ativos com o papel especificado
     */
    public List<UserEntity> findActiveUsersByRole(UserEntity.UserRole role) {
        return find("active = true and role = ?1", role).list();
    }

    /**
     * Verifica se existe usuário com o email especificado.
     * 
     * @param email Email a ser verificado
     * @return true se existe, false caso contrário
     */
    public boolean existsByEmail(String email) {
        return count("email", email) > 0;
    }

    /**
     * Busca usuários por nome (busca parcial).
     * 
     * @param name Nome ou parte do nome
     * @return Lista de usuários que contêm o nome especificado
     */
    public List<UserEntity> findByNameContaining(String name) {
        return find("name like ?1", "%" + name + "%").list();
    }

    /**
     * Busca usuários ativos por nome (busca parcial).
     * 
     * @param name Nome ou parte do nome
     * @return Lista de usuários ativos que contêm o nome especificado
     */
    public List<UserEntity> findActiveUsersByNameContaining(String name) {
        return find("active = true and name like ?1", "%" + name + "%").list();
    }
}
