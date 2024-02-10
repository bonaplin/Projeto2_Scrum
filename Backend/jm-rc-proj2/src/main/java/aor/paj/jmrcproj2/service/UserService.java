package aor.paj.jmrcproj2.service;


import java.util.List;
import aor.paj.jmrcproj2.bean.UserBean;
import aor.paj.jmrcproj2.dto.User;
import jakarta.inject.Inject;
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
@Path("/user")
public class UserService {
    @Inject
    UserBean userBean;

    @POST
    @Path("/add")
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
    @GET
    @Path("/all")
    @Produces(MediaType.APPLICATION_JSON)
    public List<User> getUsers() {
        return userBean.getUsers();
    }


    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response loginUser(@HeaderParam("username") String username, @HeaderParam("password") String password) {
        User existingUser = userBean.verifyUser(username, password);
        if (existingUser != null) {
            return Response.status(200).entity("User logged in successfully").build();
        } else {
            return Response.status(401).entity("Invalid username or password").build();
        }
    }

    @GET
    @Path("/{username}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUserInfo(@PathParam("username") String username) {

        User user = userBean.getUserByUsername(username);

        if (user != null) {

            return Response.ok(user).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }
    @PUT
    @Path("/update")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateUser(User updateRequest, @HeaderParam("Authorization") String authorizationHeader) {

        User updatedUser = userBean.updateUser(updateRequest);

        if (updatedUser != null) {
            return Response.status(200).entity(updatedUser).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }
}

