package com.academy.integration;

import com.academy.dto.CourseDTO;
import com.academy.dto.CurriculumDTO;
import com.academy.dto.DisciplineDTO;
import com.academy.dto.SemesterDTO;
import com.academy.dto.UserDTO;
import com.academy.enums.UserRole;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Order;

import java.time.LocalDateTime;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

/**
 * Testes de integração para o backend completo.
 * Testa o fluxo completo de criação e relacionamento entre entidades.
 */
@QuarkusTest
class BackendIntegrationTest {

    @Test
    @Order(1)
    void testCreateUser() {
        UserDTO user = new UserDTO();
        user.name = "João Silva";
        user.email = "joao.silva@academy.com";
        user.password = "joao123";
        user.role = UserRole.STUDENT;
        user.active = true;

        given()
            .contentType(ContentType.JSON)
            .body(user)
            .when()
                .post("/api/users")
            .then()
                .statusCode(201)
                .contentType(ContentType.JSON)
                .body("name", is("João Silva"))
                .body("email", is("joao.silva@academy.com"))
                .body("role", is("STUDENT"))
                .body("active", is(true))
                .body("id", notNullValue());
    }

    @Test
    @Order(2)
    void testCreateCourse() {
        CourseDTO course = new CourseDTO();
        course.name = "Ciência da Computação";
        course.description = "Curso de graduação em Ciência da Computação";
        course.totalHours = 3200;
        course.durationSemesters = 8;
        course.active = true;

        given()
            .contentType(ContentType.JSON)
            .body(course)
            .when()
                .post("/api/courses")
            .then()
                .statusCode(201)
                .contentType(ContentType.JSON)
                .body("name", is("Ciência da Computação"))
                .body("description", is("Curso de graduação em Ciência da Computação"))
                .body("totalHours", is(3200))
                .body("durationSemesters", is(8))
                .body("active", is(true))
                .body("id", notNullValue());
    }

    @Test
    @Order(3)
    void testCreateSemester() {
        SemesterDTO semester = new SemesterDTO();
        semester.number = 1;
        semester.courseId = 1L;
        semester.active = true;

        given()
            .contentType(ContentType.JSON)
            .body(semester)
            .when()
                .post("/api/semesters")
            .then()
                .statusCode(201)
                .contentType(ContentType.JSON)
                .body("number", is(1))
                .body("courseId", is(1))
                .body("active", is(true))
                .body("id", notNullValue());
    }

    @Test
    @Order(4)
    void testCreateDiscipline() {
        DisciplineDTO discipline = new DisciplineDTO();
        discipline.name = "Algoritmos e Estruturas de Dados";
        discipline.description = "Introdução a algoritmos e estruturas de dados";
        discipline.workload = 80;
        discipline.semesterId = 1L;
        discipline.active = true;

        given()
            .contentType(ContentType.JSON)
            .body(discipline)
            .when()
                .post("/api/disciplines")
            .then()
                .statusCode(201)
                .contentType(ContentType.JSON)
                .body("name", is("Algoritmos e Estruturas de Dados"))
                .body("description", is("Introdução a algoritmos e estruturas de dados"))
                .body("workload", is(80))
                .body("semesterId", is(1))
                .body("active", is(true))
                .body("id", notNullValue());
    }

    @Test
    @Order(5)
    void testCreateCurriculum() {
        CurriculumDTO curriculum = new CurriculumDTO();
        curriculum.courseId = 1L;
        curriculum.disciplineId = 1L;
        curriculum.active = true;

        given()
            .contentType(ContentType.JSON)
            .body(curriculum)
            .when()
                .post("/api/curricula")
            .then()
                .statusCode(201)
                .contentType(ContentType.JSON)
                .body("courseId", is(1))
                .body("disciplineId", is(1))
                .body("active", is(true))
                .body("id", notNullValue());
    }

    @Test
    @Order(6)
    void testListAllUsers() {
        given()
            .when()
                .get("/api/users")
            .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .body("size()", greaterThanOrEqualTo(1))
                .body("[0].name", notNullValue())
                .body("[0].email", notNullValue())
                .body("[0].role", notNullValue());
    }

    @Test
    @Order(7)
    void testListAllCourses() {
        given()
            .when()
                .get("/api/courses")
            .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .body("size()", greaterThanOrEqualTo(1))
                .body("[0].name", notNullValue())
                .body("[0].description", notNullValue())
                .body("[0].totalHours", notNullValue());
    }

    @Test
    @Order(8)
    void testListAllSemesters() {
        given()
            .when()
                .get("/api/semesters")
            .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .body("size()", greaterThanOrEqualTo(1))
                .body("[0].number", notNullValue())
                .body("[0].courseId", notNullValue());
    }

    @Test
    @Order(9)
    void testListAllDisciplines() {
        given()
            .when()
                .get("/api/disciplines")
            .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .body("size()", greaterThanOrEqualTo(1))
                .body("[0].name", notNullValue())
                .body("[0].workload", notNullValue())
                .body("[0].semesterId", notNullValue());
    }

    @Test
    @Order(10)
    void testListAllCurricula() {
        given()
            .when()
                .get("/api/curricula")
            .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .body("size()", greaterThanOrEqualTo(1))
                .body("[0].courseId", notNullValue())
                .body("[0].disciplineId", notNullValue());
    }

    @Test
    @Order(11)
    void testFindUserById() {
        given()
            .when()
                .get("/api/users/1")
            .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .body("id", is(1))
                .body("name", notNullValue())
                .body("email", notNullValue())
                .body("role", notNullValue());
    }

    @Test
    @Order(12)
    void testFindCourseById() {
        given()
            .when()
                .get("/api/courses/1")
            .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .body("id", is(1))
                .body("name", notNullValue())
                .body("description", notNullValue());
    }

    @Test
    @Order(13)
    void testUpdateUser() {
        UserDTO user = new UserDTO();
        user.name = "João Silva Updated";
        user.email = "joao.updated@academy.com";
        user.password = "newpassword123";
        user.role = UserRole.STUDENT;
        user.active = true;

        given()
            .contentType(ContentType.JSON)
            .body(user)
            .when()
                .put("/api/users/1")
            .then()
                .statusCode(200)
                .contentType(ContentType.JSON)
                .body("id", is(1))
                .body("name", is("João Silva Updated"))
                .body("email", is("joao.updated@academy.com"));
    }

    @Test
    @Order(14)
    void testDeleteUser() {
        given()
            .when()
                .delete("/api/users/1")
            .then()
                .statusCode(204);
    }

    @Test
    @Order(15)
    void testFindUserByIdNotFound() {
        given()
            .when()
                .get("/api/users/1")
            .then()
                .statusCode(404)
                .contentType(ContentType.JSON)
                .body("error", is("Usuário não encontrado"));
    }
}
