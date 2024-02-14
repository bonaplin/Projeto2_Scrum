package aor.paj.jmrcproj2.service;

import aor.paj.jmrcproj2.bean.UserBean;
import aor.paj.jmrcproj2.dto.Task;
import aor.paj.jmrcproj2.dto.User;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.ArrayList;
//http://localhost:8080/jm-rc-proj2/rest/users/{username}/tasks/ (...)
@Path("{username}/tasks")
@Produces(MediaType.APPLICATION_JSON)
public class TaskService {
    UserBean userBean = new UserBean();

    //R6
    @GET
    public Response getUserTasks(@PathParam("username") String username) {
        User user = userBean.getUserByUsername(username);

        if (user != null) {
            ArrayList<Task> tasks = user.getTasks();
            userBean.sortTasks(tasks);
            return Response.status(Response.Status.OK).entity(tasks).build();
        } else {
            return Response.status(Response.Status.BAD_REQUEST).entity("User not found").build();
        }
    }

    //R9
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addTask(@PathParam("username") String username, Task task, @HeaderParam("username") String usernameH, @HeaderParam("password") String password) {
        if(usernameH == null || password == null){ //if the user is not have permission
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
        User loggedUser = userBean.verifyUser(usernameH, password);
        if (loggedUser == null) {
            return Response.status(Response.Status.FORBIDDEN).build();
        }
        if(userBean.isLoggedUser(usernameH, username)) {
            Task newTask = userBean.addTask(username, task);
            if (newTask != null) {
                return Response.status(201).entity(newTask).build();
            } else {
                return Response.status(Response.Status.NOT_FOUND).build();
            }
        }else{
            return Response.status(Response.Status.FORBIDDEN).build();
        }
    }

    //R8 -
    @POST
    @Path("/{taskId}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateTask(@PathParam("username") String username,@PathParam("taskId") String taskId, Task task, @HeaderParam("username") String usernameH, @HeaderParam("password") String password) {
        if(usernameH == null || password == null){ //if the user is not have permission
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
        User loggedUser = userBean.verifyUser(usernameH, password);
        if (loggedUser == null) {
            return Response.status(Response.Status.FORBIDDEN).build();
        }
        if(userBean.isLoggedUser(usernameH, username)) {
            Task updatedTask = userBean.updateTask(username, taskId, task);
            if (updatedTask != null) {
                return Response.status(200).entity(updatedTask).build();
            } else {
                return Response.status(Response.Status.NOT_FOUND).build();
            }
        }else{
            return Response.status(Response.Status.FORBIDDEN).build();
        }
    }

    //R10
    @DELETE
    @Path("/{taskId}")
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
    @Path("/{taskId}")
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
    //METHOD FOR TESTING ---------------------------------------------------------------------------------------------------
    @GET
    @Path("/{taskId}/1")
    public Response getDate(@PathParam("username") String username, @PathParam("taskId") String taskId, @HeaderParam("username") String usernameH, @HeaderParam("password") String password){
        Response response = checkUserAuthorization(usernameH, password, username);
        if(response != null) {
            return response;
        }
        String date = userBean.getDate(username, taskId);
        return processDateResponse(date);
    }

    private Response checkUserAuthorization(String usernameH, String password, String username) {
        if(usernameH == null || password == null){ //if the user is not have permission
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
        User loggedUser = userBean.verifyUser(usernameH, password);
        if (loggedUser == null || !userBean.isLoggedUser(usernameH, username)) {
            return Response.status(Response.Status.FORBIDDEN).build();
        }
        return null;
    }
    private Response processDateResponse(String date) {
        if (date != null) {
            return Response.status(Response.Status.OK).entity(date).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("Date not found").build();
        }
    }

}
