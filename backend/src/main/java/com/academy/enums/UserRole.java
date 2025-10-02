package com.academy.enums;

/**
 * Enum que define os papéis dos usuários no sistema acadêmico.
 */
public enum UserRole {
    ADMIN("Administrador"),
    COORDINATOR("Coordenador"),
    PROFESSOR("Professor"),
    STUDENT("Aluno");

    private final String description;

    UserRole(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    @Override
    public String toString() {
        return description;
    }
}
