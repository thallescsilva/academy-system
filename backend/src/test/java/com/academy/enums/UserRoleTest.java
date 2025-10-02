package com.academy.enums;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

/**
 * Testes unitários para o enum UserRole.
 */
class UserRoleTest {

    @Test
    void testUserRoleValues() {
        // Verifica se todos os valores estão presentes
        UserRole[] roles = UserRole.values();
        assertEquals(4, roles.length);
        
        assertTrue(contains(roles, UserRole.ADMIN));
        assertTrue(contains(roles, UserRole.COORDINATOR));
        assertTrue(contains(roles, UserRole.PROFESSOR));
        assertTrue(contains(roles, UserRole.STUDENT));
    }

    @Test
    void testUserRoleDescriptions() {
        // Verifica se as descrições estão corretas
        assertEquals("Administrador", UserRole.ADMIN.getDescription());
        assertEquals("Coordenador", UserRole.COORDINATOR.getDescription());
        assertEquals("Professor", UserRole.PROFESSOR.getDescription());
        assertEquals("Aluno", UserRole.STUDENT.getDescription());
    }

    @Test
    void testUserRoleToString() {
        // Verifica se o toString retorna a descrição
        assertEquals("Administrador", UserRole.ADMIN.toString());
        assertEquals("Coordenador", UserRole.COORDINATOR.toString());
        assertEquals("Professor", UserRole.PROFESSOR.toString());
        assertEquals("Aluno", UserRole.STUDENT.toString());
    }

    @Test
    void testUserRoleValueOf() {
        // Verifica se valueOf funciona corretamente
        assertEquals(UserRole.ADMIN, UserRole.valueOf("ADMIN"));
        assertEquals(UserRole.COORDINATOR, UserRole.valueOf("COORDINATOR"));
        assertEquals(UserRole.PROFESSOR, UserRole.valueOf("PROFESSOR"));
        assertEquals(UserRole.STUDENT, UserRole.valueOf("STUDENT"));
    }

    @Test
    void testUserRoleValueOfInvalid() {
        // Verifica se valueOf lança exceção para valores inválidos
        assertThrows(IllegalArgumentException.class, () -> UserRole.valueOf("INVALID"));
        assertThrows(IllegalArgumentException.class, () -> UserRole.valueOf("admin"));
        assertThrows(IllegalArgumentException.class, () -> UserRole.valueOf(""));
    }

    private boolean contains(UserRole[] roles, UserRole role) {
        for (UserRole r : roles) {
            if (r == role) {
                return true;
            }
        }
        return false;
    }
}
