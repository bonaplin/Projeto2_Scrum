package aor.paj.jmrcproj2.bean;


import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.lang.reflect.Array;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;

import aor.paj.jmrcproj2.dto.Task;
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
                getMaxTaskId();
            } catch (FileNotFoundException e) {
                throw new RuntimeException(e);
            }
        } else {
            users = new ArrayList<User>();
        }
    }
    private void writeIntoJsonFile(){
        Jsonb jsonb =  JsonbBuilder.create(new JsonbConfig().withFormatting(true));
        try {
            jsonb.toJson(users, new FileOutputStream(filename));
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
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
            System.out.print("username " + u.getUsername());
            System.out.print("password " + u.getPassword());
            System.out.println("task: " + u.getTasks());
            if (u.getUsername() != null && u.getPassword() != null) {
                if (u.getUsername().equalsIgnoreCase(username) && u.getPassword().equals(password)) {
                    returnUser = u;
            }}}
        return returnUser;
    }

    public boolean isLoggedUser (String loggedUser, String username){
        if(loggedUser.equalsIgnoreCase(username)){
            return true;
        }
        return false;
    }

    public ArrayList<User> getUsers() {
        return users;
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

        User existingUser = getUserByUsername(username);
        // impede o update se o objecto for o mesmo
        if (areUsersEqual(updatedUser, existingUser)) {
            existingUser = null;
        }
        if (existingUser != null) {
            existingUser.setPassword(updatedUser.getPassword());
            existingUser.setEmail(updatedUser.getEmail());
            existingUser.setFirstName(updatedUser.getFirstName());
            existingUser.setLastName(updatedUser.getLastName());
            existingUser.setTelephone(updatedUser.getTelephone());
            existingUser.setPhoto(updatedUser.getPhoto());

            writeIntoJsonFile();

            return existingUser;
        } else {
            return null;
        }
    }

    private boolean areUsersEqual(User user1, User user2) {
        if (user1 == user2) {
            return true;
        }

        if (user1 == null || user2 == null) {
            return false;
        }

        return Objects.equals(user1.getPassword(), user2.getPassword()) &&
                Objects.equals(user1.getEmail(), user2.getEmail()) &&
                Objects.equals(user1.getFirstName(), user2.getFirstName()) &&
                Objects.equals(user1.getLastName(), user2.getLastName()) &&
                Objects.equals(user1.getTelephone(), user2.getTelephone()) &&
                Objects.equals(user1.getPhoto(), user2.getPhoto());
    }

    public Task updateTask(String username, String taskId, Task newTask) {
        System.out.println("1");
        System.out.println(newTask);
        System.out.println(taskId);
        User user = getUserByUsername(username);
        if (user != null) {
            ArrayList<Task> tasks = user.getTasks();
            System.out.println("2");
            for (Task t : tasks) {
                System.out.println(t.getTaskId());
                System.out.println(tasks.size());
                if (t.getTaskId().equals(taskId)) {
                    System.out.println("3");
                    t.setName(newTask.getName());
                    t.setDescription(newTask.getDescription());
                    t.setStartDate(newTask.getStartDate());
                    t.setEndDate(newTask.getEndDate());
                    t.setStatus(newTask.getStatus());
                    t.setStateId(newTask.getStateId());
                    writeIntoJsonFile();
                    return t;
                }
            }
        }
        return null;
    }

    public boolean areTasksEqual(Task task1, Task task2) {
        return task1.getName().equals(task2.getName()) &&
                task1.getDescription().equals(task2.getDescription()) &&
                task1.getStartDate().equals(task2.getStartDate()) &&
                task1.getEndDate().equals(task2.getEndDate()) &&
                task1.getStatus().equals(task2.getStatus()) &&
                task1.getStateId() == task2.getStateId();
    }

    public Task addTask(String username, Task task) {
        User user = getUserByUsername(username);
        if(task.getName() == null || task.getDescription() == null){
            user = null;
        }
        if (user != null) {
            ArrayList<Task> tasks = user.getTasks();
            String newId = "task" + task.increaseCodeTask();
            task.setTaskId(newId);
            if (task.getStartDate() != null) {
                String jsStartDate = convertLocalDateToJsDate(task.getStartDate());
                task.setStartDate(LocalDate.parse(jsStartDate.split("T")[0]));
            }
            if(task.getEndDate() != null) {
                String jsEndDate = convertLocalDateToJsDate(task.getEndDate());
                task.setEndDate(LocalDate.parse(jsEndDate.split("T")[0]));
            }
            tasks.add(task);
            writeIntoJsonFile();
            return task;
        }
        return null;
    }

    public Task deleteTask(String username, String taskId) {
        User user = getUserByUsername(username);
        if (user != null) {
            ArrayList<Task> tasks = user.getTasks();
            for (Task t : tasks) {
                if (t.getTaskId().equals(taskId)) {
                    tasks.remove(t);
                    writeIntoJsonFile();
                    return t;
                }
            }
        }
        return null;
    }

    // Search for the maximum task id and set the codeTask to the next number
    public void getMaxTaskId() {
        int maxTaskId = 0;
        for (User user : users) {
            for (Task task : user.getTasks()) {
                String taskId = task.getTaskId();
                if (taskId != null && taskId.startsWith("task")) {
                    try {
                        int numericPart = Integer.parseInt(taskId.substring(4)); // remove "task" prefix
                        if (numericPart > maxTaskId) {
                            maxTaskId = numericPart;
                        }
                    } catch (NumberFormatException e) {
                        e.printStackTrace();
                    }
                }
            }
        }
        Task.setCodeTask(maxTaskId);
    }

    public Task getTask(String username, String taskId) {
        User user = getUserByUsername(username);
        if (user != null) {
            ArrayList<Task> tasks = user.getTasks();
            for (Task t : tasks) {
                if (t.getTaskId().equals(taskId)) {
                    return t;
                }
            }
        }
        return null;
    }

    public ArrayList<Task> sortTasks(ArrayList<Task> tasks){
        tasks.sort(Comparator.comparing(Task::getStateId)
                .thenComparing(Task::getStartDate)
                .thenComparing(Comparator.comparing(Task::getEndDate, Comparator.nullsLast(Comparator.naturalOrder()))));
        return tasks;
    }


    public static String convertLocalDateToJsDate(LocalDate localDate) {
        // Convert the LocalDate object to a string in the format "YYYY-MM-DD"
        String dateString = localDate.format(DateTimeFormatter.ISO_LOCAL_DATE);
        // Append "T00:00:00.000Z" to the date string to create a JavaScript-compatible date string
        return dateString + "T00:00:00.000Z";
    }

    public int authenticateUser(String username, String password) {
        int responseStatus;
        if(username.isEmpty() || password.isEmpty()){
            responseStatus = 401;
        }else{
            User existingUser = verifyUser(username, password);
            if (existingUser != null) {
                responseStatus = 200;
            } else {
                responseStatus = 404;
            }
        }
        return responseStatus;
    }
//METHOD FOR TESTING ---------------------------------------------------------------------------------------------------
    public String getDate(String username, String taskId) {
        User user = getUserByUsername(username);
        if (user != null) {
            ArrayList<Task> tasks = user.getTasks();
            for (Task t : tasks) {
                if (t.getTaskId().equals(taskId)) {
                    return convertLocalDateToJsDate(t.getStartDate());
                }
            }
        }
        return null;
    }
//METHOD FOR TESTING ---------------------------------------------------------------------------------------------------

}

