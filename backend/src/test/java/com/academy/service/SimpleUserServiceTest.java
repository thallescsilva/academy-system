package com.academy.service;

import com.academy.dto.UserDTO;
import com.academy.entity.UserEntity;
import com.academy.enums.UserRole;
import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Testes unitários simplificados para o serviço UserService.
 */
@QuarkusTest
class SimpleUserServiceTest {

    @Test
    void testUserRoleEnum() {
        // Testa se o enum UserRole funciona corretamente
        assertEquals("Administrador", UserRole.ADMIN.getDescription());
        assertEquals("Coordenador", UserRole.COORDINATOR.getDescription());
        assertEquals("Professor", UserRole.PROFESSOR.getDescription());
        assertEquals("Aluno", UserRole.STUDENT.getDescription());
        
        assertEquals(UserRole.ADMIN, UserRole.valueOf("ADMIN"));
        assertEquals(UserRole.STUDENT, UserRole.valueOf("STUDENT"));
    }

    @Test
    void testUserEntityCreation() {
        // Testa criação de UserEntity
        UserEntity user = new UserEntity();
        user.name = "João Silva";
        user.email = "joao@academy.com";
        user.password = "password123";
        user.role = UserRole.STUDENT;
        user.active = true;
        user.createdAt = LocalDateTime.now();
        user.updatedAt = LocalDateTime.now();

        assertEquals("João Silva", user.name);
        assertEquals("joao@academy.com", user.email);
        assertEquals("password123", user.password);
        assertEquals(UserRole.STUDENT, user.role);
        assertTrue(user.active);
        assertNotNull(user.createdAt);
        assertNotNull(user.updatedAt);
    }

    @Test
    void testUserDTOCreation() {
        // Testa criação de UserDTO
        UserDTO dto = new UserDTO();
        dto.name = "Maria Santos";
        dto.email = "maria@academy.com";
        dto.password = "password456";
        dto.role = UserRole.PROFESSOR;
        dto.active = true;
        dto.createdAt = LocalDateTime.now();
        dto.updatedAt = LocalDateTime.now();

        assertEquals("Maria Santos", dto.name);
        assertEquals("maria@academy.com", dto.email);
        assertEquals("password456", dto.password);
        assertEquals(UserRole.PROFESSOR, dto.role);
        assertTrue(dto.active);
        assertNotNull(dto.createdAt);
        assertNotNull(dto.updatedAt);
    }

    @Test
    void testUserEntityTimestamps() {
        // Testa se os timestamps podem ser definidos
        UserEntity user = new UserEntity();
        LocalDateTime now = LocalDateTime.now();
        user.createdAt = now;
        user.updatedAt = now.plusHours(1);
        
        assertEquals(now, user.createdAt);
        assertEquals(now.plusHours(1), user.updatedAt);
        assertTrue(user.updatedAt.isAfter(user.createdAt));
    }

    @Test
    void testUserEntityEquals() {
        // Testa o método equals
        UserEntity user1 = new UserEntity();
        user1.id = 1L;
        user1.email = "test@academy.com";

        UserEntity user2 = new UserEntity();
        user2.id = 1L;
        user2.email = "test@academy.com";

        UserEntity user3 = new UserEntity();
        user3.id = 2L;
        user3.email = "test@academy.com";

        assertEquals(user1, user2);
        assertNotEquals(user1, user3);
        assertNotEquals(user1, null);
        assertNotEquals(user1, "string");
    }

    @Test
    void testUserEntityHashCode() {
        // Testa o método hashCode
        UserEntity user1 = new UserEntity();
        user1.id = 1L;
        user1.email = "test@academy.com";

        UserEntity user2 = new UserEntity();
        user2.id = 1L;
        user2.email = "test@academy.com";

        assertEquals(user1.hashCode(), user2.hashCode());
    }

    @Test
    void testUserEntityToString() {
        // Testa o método toString
        UserEntity user = new UserEntity();
        user.id = 1L;
        user.name = "João Silva";
        user.email = "joao@academy.com";
        user.role = UserRole.STUDENT;
        user.active = true;

        String toString = user.toString();
        assertTrue(toString.contains("UserEntity"));
        assertTrue(toString.contains("id=1"));
        assertTrue(toString.contains("name='João Silva'"));
        assertTrue(toString.contains("email='joao@academy.com'"));
        assertTrue(toString.contains("role=STUDENT"));
        assertTrue(toString.contains("active=true"));
    }

    @Test
    void testUserDTOGettersAndSetters() {
        // Testa getters e setters do UserDTO
        UserDTO dto = new UserDTO();
        
        dto.setId(1L);
        dto.setName("João Silva");
        dto.setEmail("joao@academy.com");
        dto.setPassword("password123");
        dto.setRole(UserRole.STUDENT);
        dto.setActive(true);

        assertEquals(1L, dto.getId());
        assertEquals("João Silva", dto.getName());
        assertEquals("joao@academy.com", dto.getEmail());
        assertEquals("password123", dto.getPassword());
        assertEquals(UserRole.STUDENT, dto.getRole());
        assertTrue(dto.getActive());
    }

    @Test
    void testUserDTOConstructor() {
        // Testa o construtor com parâmetros
        LocalDateTime now = LocalDateTime.now();
        UserDTO dto = new UserDTO(1L, "João Silva", "joao@academy.com", "password123", UserRole.STUDENT, true);
        
        assertEquals(1L, dto.id);
        assertEquals("João Silva", dto.name);
        assertEquals("joao@academy.com", dto.email);
        assertEquals("password123", dto.password);
        assertEquals(UserRole.STUDENT, dto.role);
        assertTrue(dto.active);
    }

    @Test
    void testUserDTOEquals() {
        // Testa o método equals do UserDTO
        UserDTO dto1 = new UserDTO();
        dto1.id = 1L;
        dto1.email = "test@academy.com";

        UserDTO dto2 = new UserDTO();
        dto2.id = 1L;
        dto2.email = "test@academy.com";

        UserDTO dto3 = new UserDTO();
        dto3.id = 2L;
        dto3.email = "test@academy.com";

        assertEquals(dto1, dto2);
        assertNotEquals(dto1, dto3);
        assertNotEquals(dto1, null);
        assertNotEquals(dto1, "string");
    }

    @Test
    void testUserDTOHashCode() {
        // Testa o método hashCode do UserDTO
        UserDTO dto1 = new UserDTO();
        dto1.id = 1L;
        dto1.email = "test@academy.com";

        UserDTO dto2 = new UserDTO();
        dto2.id = 1L;
        dto2.email = "test@academy.com";

        assertEquals(dto1.hashCode(), dto2.hashCode());
    }

    @Test
    void testUserDTOToString() {
        // Testa o método toString do UserDTO
        UserDTO dto = new UserDTO();
        dto.id = 1L;
        dto.name = "João Silva";
        dto.email = "joao@academy.com";
        dto.role = UserRole.STUDENT;
        dto.active = true;

        String toString = dto.toString();
        assertTrue(toString.contains("UserDTO"));
        assertTrue(toString.contains("id=1"));
        assertTrue(toString.contains("name='João Silva'"));
        assertTrue(toString.contains("email='joao@academy.com'"));
        assertTrue(toString.contains("role=STUDENT"));
        assertTrue(toString.contains("active=true"));
    }
}
