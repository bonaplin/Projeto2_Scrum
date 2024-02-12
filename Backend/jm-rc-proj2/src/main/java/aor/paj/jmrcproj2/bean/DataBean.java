package aor.paj.jmrcproj2.bean;

import aor.paj.jmrcproj2.dto.Task;
import aor.paj.jmrcproj2.dto.User;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.json.bind.JsonbConfig;

import java.io.*;
import java.util.ArrayList;

@ApplicationScoped
public class DataBean implements Serializable {
    final String filename = "data.json";
    private ArrayList<User> users;
    private ArrayList<Task> tasks;

    public DataBean() {
        File f = new File(filename);
        if (f.exists() && f.length()>0) {
            try {
                FileReader filereader = new FileReader(f);
                Data data = JsonbBuilder.create().fromJson(filereader, Data.class);
                users = data.getUsers();
                tasks = data.getTasks();
            } catch (FileNotFoundException e) {
                System.out.println("File not found: " + filename);
                e.printStackTrace();
            } catch (Exception e) {
                System.out.println("An error occurred while initializing DataBean");
                e.printStackTrace();
            }
        } else {
            users = new ArrayList<>();
            tasks = new ArrayList<>();
        }
    }

    public ArrayList<User> getUsers() {
        return users;
    }

    public void setUsers(ArrayList<User> users) {
        this.users = users;
    }

    public ArrayList<Task> getTasks() {
        return tasks;
    }

    public void setTasks(ArrayList<Task> tasks) {
        this.tasks = tasks;
    }
    // Add your methods to add, update, delete, and get users and tasks here

    public void writeToFile() {
        Jsonb jsonb = JsonbBuilder.create(new JsonbConfig().withFormatting(true));
        try (FileOutputStream fos = new FileOutputStream(filename)) {
            jsonb.toJson(new Data(users, tasks), fos);
        } catch (FileNotFoundException e) {
            // Handle file not found exception
        } catch (Exception e) {
            // Handle other exceptions
        }
    }

    private static class Data {
        private ArrayList<User> users;
        private ArrayList<Task> tasks;

        public Data(ArrayList<User> users, ArrayList<Task> tasks) {
            this.users = users;
            this.tasks = tasks;
        }

        public ArrayList<User> getUsers() {
            return users;
        }

        public ArrayList<Task> getTasks() {
            return tasks;
        }
    }
}