package com.academy.controller;

import com.academy.dto.CourseDTO;
import com.academy.service.CourseService;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import java.util.List;
import java.util.Optional;

/**
 * Controller REST para operações relacionadas a cursos.
 * Apenas usuários com papel COORDINATOR podem acessar estes endpoints.
 */
@Path("/api/courses")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Courses", description = "Operações relacionadas a cursos")
// @RolesAllowed("COORDINATOR")
public class CourseController {

    @Inject
    CourseService courseService;

    /**
     * Lista todos os cursos.
     * 
     * @return Lista de cursos
     */
    @GET
    @Operation(summary = "Lista todos os cursos", description = "Retorna uma lista com todos os cursos cadastrados")
    @APIResponse(responseCode = "200", description = "Lista de cursos retornada com sucesso",
            content = @Content(schema = @Schema(implementation = CourseDTO.class)))
    public Response findAll() {
        List<CourseDTO> courses = courseService.findAll();
        return Response.ok(courses).build();
    }

    /**
     * Lista cursos ativos.
     * 
     * @return Lista de cursos ativos
     */
    @GET
    @Path("/active")
    @Operation(summary = "Lista cursos ativos", description = "Retorna uma lista com todos os cursos ativos")
    @APIResponse(responseCode = "200", description = "Lista de cursos ativos retornada com sucesso",
            content = @Content(schema = @Schema(implementation = CourseDTO.class)))
    public Response findActiveCourses() {
        List<CourseDTO> courses = courseService.findActiveCourses();
        return Response.ok(courses).build();
    }

    /**
     * Busca curso por ID.
     * 
     * @param id ID do curso
     * @return Curso encontrado
     */
    @GET
    @Path("/{id}")
    @Operation(summary = "Busca curso por ID", description = "Retorna o curso com o ID especificado")
    @APIResponse(responseCode = "200", description = "Curso encontrado com sucesso",
            content = @Content(schema = @Schema(implementation = CourseDTO.class)))
    @APIResponse(responseCode = "404", description = "Curso não encontrado")
    public Response findById(@PathParam("id") Long id) {
        Optional<CourseDTO> course = courseService.findById(id);
        if (course.isPresent()) {
            return Response.ok(course.get()).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("{\"error\": \"Curso não encontrado\"}")
                    .build();
        }
    }

    /**
     * Busca curso por nome.
     * 
     * @param name Nome do curso
     * @return Curso encontrado
     */
    @GET
    @Path("/name/{name}")
    @Operation(summary = "Busca curso por nome", description = "Retorna o curso com o nome especificado")
    @APIResponse(responseCode = "200", description = "Curso encontrado com sucesso",
            content = @Content(schema = @Schema(implementation = CourseDTO.class)))
    @APIResponse(responseCode = "404", description = "Curso não encontrado")
    public Response findByName(@PathParam("name") String name) {
        Optional<CourseDTO> course = courseService.findByName(name);
        if (course.isPresent()) {
            return Response.ok(course.get()).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("{\"error\": \"Curso não encontrado\"}")
                    .build();
        }
    }

    /**
     * Busca cursos por nome (busca parcial).
     * 
     * @param name Nome ou parte do nome do curso
     * @return Lista de cursos que contêm o nome especificado
     */
    @GET
    @Path("/search")
    @Operation(summary = "Busca cursos por nome", description = "Retorna uma lista de cursos que contêm o nome especificado")
    @APIResponse(responseCode = "200", description = "Lista de cursos retornada com sucesso",
            content = @Content(schema = @Schema(implementation = CourseDTO.class)))
    public Response findByNameContaining(@QueryParam("name") String name) {
        List<CourseDTO> courses = courseService.findByNameContaining(name);
        return Response.ok(courses).build();
    }

    /**
     * Busca cursos por duração em semestres.
     * 
     * @param durationSemesters Duração em semestres
     * @return Lista de cursos com a duração especificada
     */
    @GET
    @Path("/duration/{durationSemesters}")
    @Operation(summary = "Busca cursos por duração", description = "Retorna uma lista de cursos com a duração especificada")
    @APIResponse(responseCode = "200", description = "Lista de cursos retornada com sucesso",
            content = @Content(schema = @Schema(implementation = CourseDTO.class)))
    public Response findByDurationSemesters(@PathParam("durationSemesters") Integer durationSemesters) {
        List<CourseDTO> courses = courseService.findByDurationSemesters(durationSemesters);
        return Response.ok(courses).build();
    }

    /**
     * Cria um novo curso.
     * 
     * @param courseDTO DTO do curso a ser criado
     * @return Curso criado
     */
    @POST
    @Operation(summary = "Cria um novo curso", description = "Cria um novo curso no sistema")
    @APIResponse(responseCode = "201", description = "Curso criado com sucesso",
            content = @Content(schema = @Schema(implementation = CourseDTO.class)))
    @APIResponse(responseCode = "400", description = "Dados inválidos")
    public Response create(@Valid CourseDTO courseDTO) {
        try {
            CourseDTO createdCourse = courseService.create(courseDTO);
            return Response.status(Response.Status.CREATED).entity(createdCourse).build();
        } catch (IllegalArgumentException e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("{\"error\": \"" + e.getMessage() + "\"}")
                    .build();
        }
    }

    /**
     * Atualiza um curso existente.
     * 
     * @param id ID do curso
     * @param courseDTO DTO com os dados atualizados
     * @return Curso atualizado
     */
    @PUT
    @Path("/{id}")
    @Operation(summary = "Atualiza um curso", description = "Atualiza os dados de um curso existente")
    @APIResponse(responseCode = "200", description = "Curso atualizado com sucesso",
            content = @Content(schema = @Schema(implementation = CourseDTO.class)))
    @APIResponse(responseCode = "400", description = "Dados inválidos")
    @APIResponse(responseCode = "404", description = "Curso não encontrado")
    public Response update(@PathParam("id") Long id, @Valid CourseDTO courseDTO) {
        try {
            CourseDTO updatedCourse = courseService.update(id, courseDTO);
            return Response.ok(updatedCourse).build();
        } catch (IllegalArgumentException e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("{\"error\": \"" + e.getMessage() + "\"}")
                    .build();
        }
    }

    /**
     * Remove um curso (soft delete).
     * 
     * @param id ID do curso
     * @return Resposta de sucesso
     */
    @DELETE
    @Path("/{id}")
    @Operation(summary = "Remove um curso", description = "Remove um curso do sistema (soft delete)")
    @APIResponse(responseCode = "204", description = "Curso removido com sucesso")
    @APIResponse(responseCode = "404", description = "Curso não encontrado")
    public Response delete(@PathParam("id") Long id) {
        try {
            courseService.delete(id);
            return Response.noContent().build();
        } catch (IllegalArgumentException e) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("{\"error\": \"" + e.getMessage() + "\"}")
                    .build();
        }
    }

    /**
     * Ativa um curso.
     * 
     * @param id ID do curso
     * @return Curso ativado
     */
    @PUT
    @Path("/{id}/activate")
    @Operation(summary = "Ativa um curso", description = "Ativa um curso no sistema")
    @APIResponse(responseCode = "200", description = "Curso ativado com sucesso",
            content = @Content(schema = @Schema(implementation = CourseDTO.class)))
    @APIResponse(responseCode = "404", description = "Curso não encontrado")
    public Response activate(@PathParam("id") Long id) {
        try {
            CourseDTO activatedCourse = courseService.activate(id);
            return Response.ok(activatedCourse).build();
        } catch (IllegalArgumentException e) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("{\"error\": \"" + e.getMessage() + "\"}")
                    .build();
        }
    }

    /**
     * Desativa um curso.
     * 
     * @param id ID do curso
     * @return Curso desativado
     */
    @PUT
    @Path("/{id}/deactivate")
    @Operation(summary = "Desativa um curso", description = "Desativa um curso no sistema")
    @APIResponse(responseCode = "200", description = "Curso desativado com sucesso",
            content = @Content(schema = @Schema(implementation = CourseDTO.class)))
    @APIResponse(responseCode = "404", description = "Curso não encontrado")
    public Response deactivate(@PathParam("id") Long id) {
        try {
            CourseDTO deactivatedCourse = courseService.deactivate(id);
            return Response.ok(deactivatedCourse).build();
        } catch (IllegalArgumentException e) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("{\"error\": \"" + e.getMessage() + "\"}")
                    .build();
        }
    }

    /**
     * Conta o número total de cursos.
     * 
     * @return Número total de cursos
     */
    @GET
    @Path("/count")
    @Operation(summary = "Conta cursos", description = "Retorna o número total de cursos")
    @APIResponse(responseCode = "200", description = "Contagem retornada com sucesso")
    public Response count() {
        long count = courseService.count();
        return Response.ok("{\"count\": " + count + "}").build();
    }
}
