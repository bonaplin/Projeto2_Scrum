package aor.paj.jmrcproj2.bean;


import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.lang.reflect.Array;
import java.util.ArrayList;

import jakarta.enterprise.context.ApplicationScoped;
import aor.paj.jmrcproj2.dto.User;
import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.json.bind.JsonbConfig;

@ApplicationScoped
public class UserBean {

    final String filename = "users.json";
    private ArrayList<User> users;

    public UserBean() {
        File f = new File(filename);
        if (f.exists()) {
            try {
                FileReader filereader = new FileReader(f);
                users = JsonbBuilder.create().fromJson(filereader, new ArrayList<User>() {
                }.getClass().getGenericSuperclass());
            } catch (FileNotFoundException e) {
                throw new RuntimeException(e);
            }
        } else {
            users = new ArrayList<User>();
        }
    }
    public boolean addUser(User user) {
        for(User u: users){
            if(u.getUsername().equalsIgnoreCase(user.getUsername())){
                return false;
            }
        }
        users.add(user);
        writeIntoJsonFile();
        return true;
    }
    public User verifyUser(String username, String password) {
        // Check if the user exists
        User returnUser = null;
        for (User u : users) {
            // for correct login wiht no 500 error, he try read a null value and fail
            if (u.getUsername() != null && u.getPassword() != null) {
                if (u.getUsername().equalsIgnoreCase(username) && u.getPassword().equals(password)) {
                    returnUser = u;}
            }}
        return returnUser;
    }

    public ArrayList<User> getUsers() {
        return users;
    }

    private void writeIntoJsonFile(){
        Jsonb jsonb =  JsonbBuilder.create(new JsonbConfig().withFormatting(true));
        try {
            jsonb.toJson(users, new FileOutputStream(filename));
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
    }
    public User getUserByUsername(String username) {
        for (User user : users) {
            if (user.getUsername().equalsIgnoreCase(username)) {
                return user;
            }
        }
        return null;
    }

    public User updateUser(User updatedUser, String username) {
        // Find the user by username
        System.out.println("3");

        User existingUser = getUserByUsername(username);
        System.out.println("4");

        if (existingUser != null) {
            existingUser.setPassword(updatedUser.getPassword());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setFirstName(updatedUser.getFirstName());
            existingUser.setLastName(updatedUser.getLastName());
            existingUser.setTelephone(updatedUser.getTelephone());
            existingUser.setPhoto(updatedUser.getPhoto());
            System.out.println("5");

            // Save the updated user information to the file
            writeIntoJsonFile();

            return existingUser;
        } else {
            System.out.println("6");

            // User not found
            return null;
        }
    }

}

