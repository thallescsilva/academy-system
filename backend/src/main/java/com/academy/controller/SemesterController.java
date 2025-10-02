package com.academy.controller;

import com.academy.dto.SemesterDTO;
import com.academy.service.SemesterService;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.annotation.security.RolesAllowed;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.tags.Tag;

import java.util.List;

@Path("/api/semesters")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Semesters", description = "Operations related to semesters")
public class SemesterController {

    @Inject
    SemesterService semesterService;

    @GET
    @Operation(summary = "Get all semesters", description = "Retrieve a list of all semesters")
    public Response getAllSemesters() {
        try {
            List<SemesterDTO> semesters = semesterService.findAll();
            return Response.ok(semesters).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error retrieving semesters: " + e.getMessage())
                    .build();
        }
    }

    @GET
    @Path("/{id}")
    @Operation(summary = "Get semester by ID", description = "Retrieve a specific semester by its ID")
    public Response getSemesterById(@PathParam("id") Long id) {
        try {
            SemesterDTO semester = semesterService.findById(id);
            if (semester == null) {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity("Semester not found with ID: " + id)
                        .build();
            }
            return Response.ok(semester).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error retrieving semester: " + e.getMessage())
                    .build();
        }
    }

    @POST
    @Operation(summary = "Create new semester", description = "Create a new semester")
    @RolesAllowed("COORDINATOR")
    public Response createSemester(SemesterDTO semesterDTO) {
        try {
            SemesterDTO createdSemester = semesterService.create(semesterDTO);
            return Response.status(Response.Status.CREATED).entity(createdSemester).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Error creating semester: " + e.getMessage())
                    .build();
        }
    }

    @PUT
    @Path("/{id}")
    @Operation(summary = "Update semester", description = "Update an existing semester")
    @RolesAllowed("COORDINATOR")
    public Response updateSemester(@PathParam("id") Long id, SemesterDTO semesterDTO) {
        try {
            SemesterDTO updatedSemester = semesterService.update(id, semesterDTO);
            if (updatedSemester == null) {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity("Semester not found with ID: " + id)
                        .build();
            }
            return Response.ok(updatedSemester).build();
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("Error updating semester: " + e.getMessage())
                    .build();
        }
    }

    @DELETE
    @Path("/{id}")
    @Operation(summary = "Delete semester", description = "Delete a semester by ID")
    @RolesAllowed("COORDINATOR")
    public Response deleteSemester(@PathParam("id") Long id) {
        try {
            boolean deleted = semesterService.delete(id);
            if (!deleted) {
                return Response.status(Response.Status.NOT_FOUND)
                        .entity("Semester not found with ID: " + id)
                        .build();
            }
            return Response.noContent().build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error deleting semester: " + e.getMessage())
                    .build();
        }
    }

    @GET
    @Path("/course/{courseId}")
    @Operation(summary = "Get semesters by course", description = "Retrieve all semesters for a specific course")
    public Response getSemestersByCourse(@PathParam("courseId") Long courseId) {
        try {
            List<SemesterDTO> semesters = semesterService.findByCourseId(courseId);
            return Response.ok(semesters).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Error retrieving semesters for course: " + e.getMessage())
                    .build();
        }
    }
}
