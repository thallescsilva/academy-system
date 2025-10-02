package com.academy.controller;

import com.academy.dto.CurriculumDTO;
import com.academy.service.CurriculumService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.annotation.security.RolesAllowed;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import java.util.List;

@Path("/api/curricula")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Curricula", description = "Operations related to curricula")
public class CurriculumController {

    @Inject
    CurriculumService curriculumService;

    @GET
    @Operation(summary = "Get all curricula", description = "Retrieve a list of all curricula")
    public Response getAllCurricula() {
        try {
            List<CurriculumDTO> curricula = curriculumService.findAll();
            return Response.ok(curricula).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error retrieving curricula: " + e.getMessage())
                    .build();
        }
    }

    @GET
    @Path("/{id}")
    @Operation(summary = "Get curriculum by ID", description = "Retrieve a specific curriculum by its ID")
    public Response getCurriculumById(@PathParam("id") Long id) {
        try {
            CurriculumDTO curriculum = curriculumService.findById(id);
            if (curriculum == null) {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity("Curriculum not found with ID: " + id)
                        .build();
            }
            return Response.ok(curriculum).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error retrieving curriculum: " + e.getMessage())
                    .build();
        }
    }

    @POST
    @Operation(summary = "Create new curriculum", description = "Create a new curriculum")
    // @RolesAllowed({"COORDINATOR", "PROFESSOR"}) // Temporariamente desabilitado para validação manual
    public Response createCurriculum(CurriculumDTO curriculumDTO) {
        try {
            CurriculumDTO createdCurriculum = curriculumService.create(curriculumDTO);
            return Response.status(Response.Status.CREATED).entity(createdCurriculum).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Error creating curriculum: " + e.getMessage())
                    .build();
        }
    }

    @PUT
    @Path("/{id}")
    @Operation(summary = "Update curriculum", description = "Update an existing curriculum")
    // @RolesAllowed({"COORDINATOR", "PROFESSOR"}) // Temporariamente desabilitado para validação manual
    public Response updateCurriculum(@PathParam("id") Long id, CurriculumDTO curriculumDTO) {
        try {
            CurriculumDTO updatedCurriculum = curriculumService.update(id, curriculumDTO);
            if (updatedCurriculum == null) {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity("Curriculum not found with ID: " + id)
                        .build();
            }
            return Response.ok(updatedCurriculum).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Error updating curriculum: " + e.getMessage())
                    .build();
        }
    }

    @DELETE
    @Path("/{id}")
    @Operation(summary = "Delete curriculum", description = "Delete a curriculum by ID")
    // @RolesAllowed({"COORDINATOR", "PROFESSOR"}) // Temporariamente desabilitado para validação manual
    public Response deleteCurriculum(@PathParam("id") Long id) {
        try {
            boolean deleted = curriculumService.delete(id);
            if (!deleted) {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity("Curriculum not found with ID: " + id)
                        .build();
            }
            return Response.noContent().build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error deleting curriculum: " + e.getMessage())
                    .build();
        }
    }

    @GET
    @Path("/student/{studentId}")
    @Operation(summary = "Get curricula by student", description = "Retrieve all curricula for a specific student")
    // @RolesAllowed({"COORDINATOR", "PROFESSOR", "STUDENT"}) // Temporariamente desabilitado para validação manual
    public Response getCurriculaByStudent(@PathParam("studentId") Long studentId) {
        try {
            List<CurriculumDTO> curricula = curriculumService.findByStudentId(studentId);
            return Response.ok(curricula).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error retrieving curricula for student: " + e.getMessage())
                    .build();
        }
    }

    @GET
    @Path("/discipline/{disciplineId}")
    @Operation(summary = "Get curricula by discipline", description = "Retrieve all curricula for a specific discipline")
    public Response getCurriculaByDiscipline(@PathParam("disciplineId") Long disciplineId) {
        try {
            List<CurriculumDTO> curricula = curriculumService.findByDisciplineId(disciplineId);
            return Response.ok(curricula).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error retrieving curricula for discipline: " + e.getMessage())
                    .build();
        }
    }
}
