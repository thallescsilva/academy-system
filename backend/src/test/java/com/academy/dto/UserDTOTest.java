package com.academy.dto;

import com.academy.enums.UserRole;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Testes unitários para o DTO UserDTO.
 */
class UserDTOTest {

    private UserDTO userDTO;

    @BeforeEach
    void setUp() {
        userDTO = new UserDTO();
    }

    @Test
    void testUserDTOCreation() {
        assertNotNull(userDTO);
        assertNull(userDTO.id);
        assertNull(userDTO.name);
        assertNull(userDTO.email);
        assertNull(userDTO.password);
        assertNull(userDTO.role);
        assertNull(userDTO.active);
        assertNull(userDTO.createdAt);
        assertNull(userDTO.updatedAt);
    }

    @Test
    void testUserDTOConstructor() {
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
    void testUserDTOSettersAndGetters() {
        userDTO.setId(1L);
        userDTO.setName("João Silva");
        userDTO.setEmail("joao@academy.com");
        userDTO.setPassword("password123");
        userDTO.setRole(UserRole.STUDENT);
        userDTO.setActive(true);

        assertEquals(1L, userDTO.getId());
        assertEquals("João Silva", userDTO.getName());
        assertEquals("joao@academy.com", userDTO.getEmail());
        assertEquals("password123", userDTO.getPassword());
        assertEquals(UserRole.STUDENT, userDTO.getRole());
        assertTrue(userDTO.getActive());
    }

    @Test
    void testUserDTOEquals() {
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
        userDTO.id = 1L;
        userDTO.name = "João Silva";
        userDTO.email = "joao@academy.com";
        userDTO.role = UserRole.STUDENT;
        userDTO.active = true;

        String toString = userDTO.toString();
        assertTrue(toString.contains("UserDTO"));
        assertTrue(toString.contains("id=1"));
        assertTrue(toString.contains("name='João Silva'"));
        assertTrue(toString.contains("email='joao@academy.com'"));
        assertTrue(toString.contains("role=STUDENT"));
        assertTrue(toString.contains("active=true"));
    }

    @Test
    void testUserDTOWithTimestamps() {
        LocalDateTime now = LocalDateTime.now();
        userDTO.createdAt = now;
        userDTO.updatedAt = now.plusHours(1);

        assertEquals(now, userDTO.createdAt);
        assertEquals(now.plusHours(1), userDTO.updatedAt);
    }

    @Test
    void testUserDTOWithAllRoles() {
        userDTO.setRole(UserRole.ADMIN);
        assertEquals(UserRole.ADMIN, userDTO.getRole());

        userDTO.setRole(UserRole.COORDINATOR);
        assertEquals(UserRole.COORDINATOR, userDTO.getRole());

        userDTO.setRole(UserRole.PROFESSOR);
        assertEquals(UserRole.PROFESSOR, userDTO.getRole());

        userDTO.setRole(UserRole.STUDENT);
        assertEquals(UserRole.STUDENT, userDTO.getRole());
    }
}
