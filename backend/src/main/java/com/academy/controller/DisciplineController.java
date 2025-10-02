package com.academy.controller;

import com.academy.dto.DisciplineDTO;
import com.academy.service.DisciplineService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.annotation.security.RolesAllowed;
import jakarta.annotation.security.PermitAll;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import java.util.List;

@Path("/api/disciplines")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Disciplines", description = "Operations related to disciplines")
@PermitAll
public class DisciplineController {

    @Inject
    DisciplineService disciplineService;

    @GET
    @Operation(summary = "Get all disciplines", description = "Retrieve a list of all disciplines")
    public Response getAllDisciplines() {
        try {
            List<DisciplineDTO> disciplines = disciplineService.findAll();
            return Response.ok(disciplines).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error retrieving disciplines: " + e.getMessage())
                    .build();
        }
    }

    @GET
    @Path("/{id}")
    @Operation(summary = "Get discipline by ID", description = "Retrieve a specific discipline by its ID")
    public Response getDisciplineById(@PathParam("id") Long id) {
        try {
            DisciplineDTO discipline = disciplineService.findById(id);
            if (discipline == null) {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity("Discipline not found with ID: " + id)
                        .build();
            }
            return Response.ok(discipline).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error retrieving discipline: " + e.getMessage())
                    .build();
        }
    }

    @POST
    @Operation(summary = "Create new discipline", description = "Create a new discipline")
    // @RolesAllowed("COORDINATOR")
    public Response createDiscipline(DisciplineDTO disciplineDTO) {
        try {
            DisciplineDTO createdDiscipline = disciplineService.create(disciplineDTO);
            return Response.status(Response.Status.CREATED).entity(createdDiscipline).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Error creating discipline: " + e.getMessage())
                    .build();
        }
    }

    @PUT
    @Path("/{id}")
    @Operation(summary = "Update discipline", description = "Update an existing discipline")
    // @RolesAllowed("COORDINATOR")
    public Response updateDiscipline(@PathParam("id") Long id, DisciplineDTO disciplineDTO) {
        try {
            DisciplineDTO updatedDiscipline = disciplineService.update(id, disciplineDTO);
            if (updatedDiscipline == null) {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity("Discipline not found with ID: " + id)
                        .build();
            }
            return Response.ok(updatedDiscipline).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Error updating discipline: " + e.getMessage())
                    .build();
        }
    }

    @DELETE
    @Path("/{id}")
    @Operation(summary = "Delete discipline", description = "Delete a discipline by ID")
    // @RolesAllowed("COORDINATOR")
    public Response deleteDiscipline(@PathParam("id") Long id) {
        try {
            boolean deleted = disciplineService.delete(id);
            if (!deleted) {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity("Discipline not found with ID: " + id)
                        .build();
            }
            return Response.noContent().build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error deleting discipline: " + e.getMessage())
                    .build();
        }
    }

    @GET
    @Path("/semester/{semesterId}")
    @Operation(summary = "Get disciplines by semester", description = "Retrieve all disciplines for a specific semester")
    public Response getDisciplinesBySemester(@PathParam("semesterId") Long semesterId) {
        try {
            List<DisciplineDTO> disciplines = disciplineService.findBySemesterId(semesterId);
            return Response.ok(disciplines).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error retrieving disciplines for semester: " + e.getMessage())
                    .build();
        }
    }
}
