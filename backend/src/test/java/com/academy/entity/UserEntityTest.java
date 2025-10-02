package com.academy.entity;

import com.academy.enums.UserRole;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Testes unitários para a entidade UserEntity.
 */
@ExtendWith(MockitoExtension.class)
class UserEntityTest {

    private UserEntity userEntity;

    @BeforeEach
    void setUp() {
        userEntity = new UserEntity();
    }

    @Test
    void testUserEntityCreation() {
        assertNotNull(userEntity);
        assertNull(userEntity.id);
        assertNull(userEntity.name);
        assertNull(userEntity.email);
        assertNull(userEntity.password);
        assertNull(userEntity.role);
        assertNull(userEntity.active);
        assertNull(userEntity.createdAt);
        assertNull(userEntity.updatedAt);
    }

    @Test
    void testUserEntitySettersAndGetters() {
        userEntity.name = "João Silva";
        userEntity.email = "joao.silva@academy.com";
        userEntity.password = "password123";
        userEntity.role = UserRole.STUDENT;
        userEntity.active = true;

        assertEquals("João Silva", userEntity.name);
        assertEquals("joao.silva@academy.com", userEntity.email);
        assertEquals("password123", userEntity.password);
        assertEquals(UserRole.STUDENT, userEntity.role);
        assertTrue(userEntity.active);
    }

    @Test
    void testUserEntityEquals() {
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
        userEntity.id = 1L;
        userEntity.name = "João Silva";
        userEntity.email = "joao.silva@academy.com";
        userEntity.role = UserRole.STUDENT;
        userEntity.active = true;

        String toString = userEntity.toString();
        assertTrue(toString.contains("UserEntity"));
        assertTrue(toString.contains("id=1"));
        assertTrue(toString.contains("name='João Silva'"));
        assertTrue(toString.contains("email='joao.silva@academy.com'"));
        assertTrue(toString.contains("role=STUDENT"));
        assertTrue(toString.contains("active=true"));
    }

    @Test
    void testUserEntityPrePersist() {
        userEntity.onCreate();
        
        assertNotNull(userEntity.createdAt);
        assertNotNull(userEntity.updatedAt);
        assertTrue(userEntity.createdAt.isBefore(LocalDateTime.now().plusSeconds(1)));
        assertTrue(userEntity.updatedAt.isBefore(LocalDateTime.now().plusSeconds(1)));
    }

    @Test
    void testUserEntityPreUpdate() {
        LocalDateTime initialTime = LocalDateTime.now().minusHours(1);
        userEntity.createdAt = initialTime;
        userEntity.updatedAt = initialTime;
        
        userEntity.onUpdate();
        
        assertEquals(initialTime, userEntity.createdAt);
        assertNotEquals(initialTime, userEntity.updatedAt);
        assertTrue(userEntity.updatedAt.isAfter(initialTime));
    }
}
