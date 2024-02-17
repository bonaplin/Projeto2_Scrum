package aor.paj.jmrcproj2.service;


import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import aor.paj.jmrcproj2.bean.UserBean;
import aor.paj.jmrcproj2.dto.Task;
import aor.paj.jmrcproj2.dto.User;
import jakarta.inject.Inject;
import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.HeaderParam;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.Path;
@Path("/users")
public class UserService {
    @Inject
    UserBean userBean;

    //R1
    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response loginUser(@HeaderParam("username") String username, @HeaderParam("password") String password) {
        int responseStatus = userBean.authenticateUser(username, password);
        return Response.status(responseStatus).build();
    }

    @POST
    @Path("/logout")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response logoutUser(@HeaderParam("username") String username, @HeaderParam("password") String password) {
        int responseStatus = userBean.authenticateUser(username, password);
        return Response.status(responseStatus).build();
    }

    //R3
    @POST
    @Path("/register")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addUser(User u) {
        if(userBean.addUser(u)){
            System.out.println("A new user is created");
            return Response.status(201).entity("A new user is created").build();
        }else {
            System.out.println("Username already exists");
            return Response.status(400).entity("Username already exists").build();
        }
    }

    //R4
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<User> getUsers() {
        return userBean.getUsers();
    }

    //R5
    @GET
    @Path("/{username}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUserInfo(@PathParam("username") String username) {

        User user = userBean.getUserByUsername(username);

        if (user != null) {

            return Response.ok(user).build();
        } else {
            // é preferível um 404
            return Response.status(404).build();
        }
    }

    //R6
    @GET
    @Path("/{username}/tasks")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUserTasks(@PathParam("username") String username) {
        User user = userBean.getUserByUsername(username);

        if (user != null) {
            ArrayList<Task> tasks = user.getTasks();
            userBean.sortTasks(tasks);
            return Response.status(Response.Status.OK).entity(tasks).build();
        } else {
            return Response.status(404).build();
        }
    }

    //R7
    @PUT
    @Path("/{username}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateUser(@PathParam("username") String usernameP, User updateRequest, @HeaderParam("username") String username, @HeaderParam("password") String password) {
        int responseStatus = userBean.authenticateUser(username, password);
        if (responseStatus == 200){
            User updatedUser = userBean.updateUser(updateRequest, usernameP);
            if (updatedUser == null) {
                responseStatus = 400;
            }
        }
        return Response.status(responseStatus).build();
    }

    //R8 -
    @POST
    @Path("/{username}/tasks/{taskId}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response updateTask(@PathParam("username") String username,@PathParam("taskId") String taskId, Task task, @HeaderParam("username") String usernameH, @HeaderParam("password") String password) {
        int responseStatus = userBean.authenticateUser(username, password);
        if (responseStatus == 200) {
            // confirmação se header e path são iguais
            if (userBean.isLoggedUser(usernameH, username)) {
                Task updatedTask = userBean.updateTask(username, taskId, task);
                if (updatedTask == null) {
                    responseStatus = 400;
                }
            }else{
                responseStatus = 403;
            }
        }
        return Response.status(responseStatus).build();
    }
    //R9
    @POST
    @Path("/{username}/tasks")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addTask(@PathParam("username") String username, Task task, @HeaderParam("username") String usernameH, @HeaderParam("password") String password) {
        int responseStatus = userBean.authenticateUser(username, password);
        if (responseStatus == 200) {
            // confirmação se header e path são iguais
            if (userBean.isLoggedUser(usernameH, username)) {
                Task newTask = userBean.addTask(username, task);
                if (newTask == null) {
                    responseStatus = 400;
                }else{
                    responseStatus = 201;
                }
            } else {
                responseStatus = 403;
            }
        }
        return Response.status(responseStatus).build();
    }

    //R10
    @DELETE
    @Path("/{username}/tasks/{taskId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteTask(@PathParam("username") String username, @PathParam("taskId") String taskId, @HeaderParam("username") String usernameH, @HeaderParam("password") String password) {
        if(usernameH == null || password == null){ //if the user is not have permission
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
        User loggedUser = userBean.verifyUser(usernameH, password);
        if (loggedUser == null) {
            return Response.status(Response.Status.FORBIDDEN).build();
        }
        if(userBean.isLoggedUser(usernameH, username)) {
            Task deletedTask = userBean.deleteTask(username, taskId);
            if (deletedTask != null) {
                return Response.status(200).entity(deletedTask).build();
            } else {
                return Response.status(Response.Status.NOT_FOUND).build();
            }
        }else{
            return Response.status(Response.Status.FORBIDDEN).build();
        }
    }
    // R11 OPCIONAL
    @GET
    @Path("/{username}/tasks/{taskId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getTask(@PathParam("username") String username, @PathParam("taskId") String taskId, @HeaderParam("username") String usernameH, @HeaderParam("password") String password){
        if(usernameH == null || password == null){ //if the user is not have permission
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
        User loggedUser = userBean.verifyUser(usernameH, password);
        if (loggedUser == null) {
            return Response.status(Response.Status.FORBIDDEN).build();
        }
        if(userBean.isLoggedUser(usernameH, username)) {
            Task task = userBean.getTask(username, taskId);
            if (task != null) {
                return Response.status(Response.Status.OK).entity(task).build();
            } else {
                return Response.status(Response.Status.NOT_FOUND).entity("Task not found").build();
            }
        }
        return Response.status(Response.Status.FORBIDDEN).build();
    }


}

