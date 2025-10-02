package com.academy.controller;

import com.academy.dto.UserDTO;
import com.academy.entity.UserEntity;
import com.academy.enums.UserRole;
import com.academy.service.UserService;
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
 * Controller REST para operações relacionadas a usuários.
 * Apenas usuários com papel ADMIN podem acessar estes endpoints.
 */
@Path("/api/users")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Users", description = "Operações relacionadas a usuários")
// @RolesAllowed("ADMIN")
public class UserController {

    @Inject
    UserService userService;

    /**
     * Lista todos os usuários.
     * 
     * @return Lista de usuários
     */
    @GET
    @Operation(summary = "Lista todos os usuários", description = "Retorna uma lista com todos os usuários cadastrados")
    @APIResponse(responseCode = "200", description = "Lista de usuários retornada com sucesso",
            content = @Content(schema = @Schema(implementation = UserDTO.class)))
    public Response findAll() {
        List<UserDTO> users = userService.findAll();
        return Response.ok(users).build();
    }

    /**
     * Lista usuários ativos.
     * 
     * @return Lista de usuários ativos
     */
    @GET
    @Path("/active")
    @Operation(summary = "Lista usuários ativos", description = "Retorna uma lista com todos os usuários ativos")
    @APIResponse(responseCode = "200", description = "Lista de usuários ativos retornada com sucesso",
            content = @Content(schema = @Schema(implementation = UserDTO.class)))
    public Response findActiveUsers() {
        List<UserDTO> users = userService.findActiveUsers();
        return Response.ok(users).build();
    }

    /**
     * Busca usuário por ID.
     * 
     * @param id ID do usuário
     * @return Usuário encontrado
     */
    @GET
    @Path("/{id}")
    @Operation(summary = "Busca usuário por ID", description = "Retorna o usuário com o ID especificado")
    @APIResponse(responseCode = "200", description = "Usuário encontrado com sucesso",
            content = @Content(schema = @Schema(implementation = UserDTO.class)))
    @APIResponse(responseCode = "404", description = "Usuário não encontrado")
    public Response findById(@PathParam("id") Long id) {
        Optional<UserDTO> user = userService.findById(id);
        if (user.isPresent()) {
            return Response.ok(user.get()).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("{\"error\": \"Usuário não encontrado\"}")
                    .build();
        }
    }

    /**
     * Busca usuário por email.
     * 
     * @param email Email do usuário
     * @return Usuário encontrado
     */
    @GET
    @Path("/email/{email}")
    @Operation(summary = "Busca usuário por email", description = "Retorna o usuário com o email especificado")
    @APIResponse(responseCode = "200", description = "Usuário encontrado com sucesso",
            content = @Content(schema = @Schema(implementation = UserDTO.class)))
    @APIResponse(responseCode = "404", description = "Usuário não encontrado")
    public Response findByEmail(@PathParam("email") String email) {
        Optional<UserDTO> user = userService.findByEmail(email);
        if (user.isPresent()) {
            return Response.ok(user.get()).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("{\"error\": \"Usuário não encontrado\"}")
                    .build();
        }
    }

    /**
     * Busca usuários por papel.
     * 
     * @param role Papel do usuário
     * @return Lista de usuários com o papel especificado
     */
    @GET
    @Path("/role/{role}")
    @Operation(summary = "Busca usuários por papel", description = "Retorna uma lista de usuários com o papel especificado")
    @APIResponse(responseCode = "200", description = "Lista de usuários retornada com sucesso",
            content = @Content(schema = @Schema(implementation = UserDTO.class)))
    public Response findByRole(@PathParam("role") String role) {
        try {
            UserRole userRole = UserRole.valueOf(role.toUpperCase());
            List<UserDTO> users = userService.findByRole(userRole);
            return Response.ok(users).build();
        } catch (IllegalArgumentException e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("{\"error\": \"Papel inválido: " + role + "\"}")
                    .build();
        }
    }

    /**
     * Busca usuários por nome (busca parcial).
     * 
     * @param name Nome ou parte do nome
     * @return Lista de usuários que contêm o nome especificado
     */
    @GET
    @Path("/search")
    @Operation(summary = "Busca usuários por nome", description = "Retorna uma lista de usuários que contêm o nome especificado")
    @APIResponse(responseCode = "200", description = "Lista de usuários retornada com sucesso",
            content = @Content(schema = @Schema(implementation = UserDTO.class)))
    public Response findByNameContaining(@QueryParam("name") String name) {
        List<UserDTO> users = userService.findByNameContaining(name);
        return Response.ok(users).build();
    }

    /**
     * Cria um novo usuário.
     * 
     * @param userDTO DTO do usuário a ser criado
     * @return Usuário criado
     */
    @POST
    @Operation(summary = "Cria um novo usuário", description = "Cria um novo usuário no sistema")
    @APIResponse(responseCode = "201", description = "Usuário criado com sucesso",
            content = @Content(schema = @Schema(implementation = UserDTO.class)))
    @APIResponse(responseCode = "400", description = "Dados inválidos")
    public Response create(@Valid UserDTO userDTO) {
        try {
            UserDTO createdUser = userService.create(userDTO);
            return Response.status(Response.Status.CREATED).entity(createdUser).build();
        } catch (IllegalArgumentException e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("{\"error\": \"" + e.getMessage() + "\"}")
                    .build();
        }
    }

    /**
     * Atualiza um usuário existente.
     * 
     * @param id ID do usuário
     * @param userDTO DTO com os dados atualizados
     * @return Usuário atualizado
     */
    @PUT
    @Path("/{id}")
    @Operation(summary = "Atualiza um usuário", description = "Atualiza os dados de um usuário existente")
    @APIResponse(responseCode = "200", description = "Usuário atualizado com sucesso",
            content = @Content(schema = @Schema(implementation = UserDTO.class)))
    @APIResponse(responseCode = "400", description = "Dados inválidos")
    @APIResponse(responseCode = "404", description = "Usuário não encontrado")
    public Response update(@PathParam("id") Long id, @Valid UserDTO userDTO) {
        try {
            UserDTO updatedUser = userService.update(id, userDTO);
            return Response.ok(updatedUser).build();
        } catch (IllegalArgumentException e) {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("{\"error\": \"" + e.getMessage() + "\"}")
                    .build();
        }
    }

    /**
     * Remove um usuário (soft delete).
     * 
     * @param id ID do usuário
     * @return Resposta de sucesso
     */
    @DELETE
    @Path("/{id}")
    @Operation(summary = "Remove um usuário", description = "Remove um usuário do sistema (soft delete)")
    @APIResponse(responseCode = "204", description = "Usuário removido com sucesso")
    @APIResponse(responseCode = "404", description = "Usuário não encontrado")
    public Response delete(@PathParam("id") Long id) {
        try {
            userService.delete(id);
            return Response.noContent().build();
        } catch (IllegalArgumentException e) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("{\"error\": \"" + e.getMessage() + "\"}")
                    .build();
        }
    }

    /**
     * Ativa um usuário.
     * 
     * @param id ID do usuário
     * @return Usuário ativado
     */
    @PUT
    @Path("/{id}/activate")
    @Operation(summary = "Ativa um usuário", description = "Ativa um usuário no sistema")
    @APIResponse(responseCode = "200", description = "Usuário ativado com sucesso",
            content = @Content(schema = @Schema(implementation = UserDTO.class)))
    @APIResponse(responseCode = "404", description = "Usuário não encontrado")
    public Response activate(@PathParam("id") Long id) {
        try {
            UserDTO activatedUser = userService.activate(id);
            return Response.ok(activatedUser).build();
        } catch (IllegalArgumentException e) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("{\"error\": \"" + e.getMessage() + "\"}")
                    .build();
        }
    }

    /**
     * Desativa um usuário.
     * 
     * @param id ID do usuário
     * @return Usuário desativado
     */
    @PUT
    @Path("/{id}/deactivate")
    @Operation(summary = "Desativa um usuário", description = "Desativa um usuário no sistema")
    @APIResponse(responseCode = "200", description = "Usuário desativado com sucesso",
            content = @Content(schema = @Schema(implementation = UserDTO.class)))
    @APIResponse(responseCode = "404", description = "Usuário não encontrado")
    public Response deactivate(@PathParam("id") Long id) {
        try {
            UserDTO deactivatedUser = userService.deactivate(id);
            return Response.ok(deactivatedUser).build();
        } catch (IllegalArgumentException e) {
            return Response.status(Response.Status.NOT_FOUND)
                    .entity("{\"error\": \"" + e.getMessage() + "\"}")
                    .build();
        }
    }

    /**
     * Conta o número total de usuários.
     * 
     * @return Número total de usuários
     */
    @GET
    @Path("/count")
    @Operation(summary = "Conta usuários", description = "Retorna o número total de usuários")
    @APIResponse(responseCode = "200", description = "Contagem retornada com sucesso")
    public Response count() {
        long count = userService.count();
        return Response.ok("{\"count\": " + count + "}").build();
    }
}
