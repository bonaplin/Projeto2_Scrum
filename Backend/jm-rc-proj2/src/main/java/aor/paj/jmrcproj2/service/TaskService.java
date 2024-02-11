package aor.paj.jmrcproj2.service;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/tasks")
public class TaskService {
    private String username;
    public TaskService() {
    }
    // Constructor called by the UserService
    public TaskService(String username) {
        this.username = username;
    }
    //http://localhost:8080/jm-rc-proj2/rest/user/{username}/tasks/test
    //POST /rest/users/{username}/tasks/{taskId}
    @GET
    @Path("/test")
    @Consumes(MediaType.TEXT_PLAIN)
    public String addTask() {
        return username;
    }
}
