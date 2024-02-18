package com.mycompany.clientapi;
import jakarta.json.JsonValue;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;

import java.io.StringReader;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.LocalDate;
import java.util.Base64;

public class UserClient {

    public static void main(String[] args) {
        if(args.length == 0){
            System.out.println("insert arguments");
            return;
        }
        String command = args[0];

        switch (command){
            case "add_users":
                if(args.length  != 2){
                    System.out.println("wrong number of arguments");
                    return;
                }
                System.out.println("Adding users");
                int numberOfUsers = Integer.parseInt(args[1]);
                System.out.println("Number of users: " + numberOfUsers);
                addUser(numberOfUsers);
                break;
            case "add_tasks":
                if(args.length  != 4){
                    System.out.println("wrong number of arguments");
                    return;
                }
                System.out.println("Adding tasks");
                String username = args[1];
                String password = args[2];
                int numberOfTasks = Integer.parseInt(args[3]);
                System.out.println("Number of tasks: " + numberOfTasks);
                addTask(username, password, numberOfTasks);
                break;
            default:
                System.out.println("invalid command");
                break;
        }
    }
    public static void addUser(int numUsers){
        HttpClient client = HttpClient.newHttpClient();
        String randomUserApiUrl = "https://randomuser.me/api/?results=" + numUsers;

        System.out.println("Sending request to " + randomUserApiUrl);
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(randomUserApiUrl))
                .GET()
                .build();
        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("Sucess TRY");
            String responseBody = response.body();
            if(responseBody != null) System.out.println("Reponse ok");

            /*
            //FALHA AO TENTAR CONVERTER PARA JSON
            JsonReader jsonReader = Json.createReader(new StringReader(responseBody));
            JsonObject jsonObject = jsonReader.readObject();
            JsonArray results = jsonObject.getJsonArray("results");

            for (JsonValue result : results) {
                JsonObject jsonUser = result.asJsonObject();
                User user = new User();
                user.setUsername(jsonUser.getJsonObject("login").getString("username"));
                user.setPassword(jsonUser.getJsonObject("login").getString("password"));
                user.setEmail(jsonUser.getString("email"));
                user.setFirstName(jsonUser.getJsonObject("name").getString("first"));
                user.setLastName(jsonUser.getJsonObject("name").getString("last"));
                user.setTelephone(jsonUser.getString("phone"));
                user.setPhoto(jsonUser.getJsonObject("picture").getString("medium"));
            }

            registerUser(user);
            */
        }catch (Exception e){
            System.out.println("Error sending request");
        }


        System.out.println("out of try catch block");
    }
    public static void registerUser(User user) {
        HttpClient client = HttpClient.newHttpClient();
        String registerUrl = "http://localhost:8080/jm-rc-proj2/rest/users/register";

        // Convert User object to JSON
        Jsonb jsonb = JsonbBuilder.create();
        String userJson = jsonb.toJson(user);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(registerUrl))
                .POST(HttpRequest.BodyPublishers.ofString(userJson))
                .header("Content-Type", "application/json")
                .build();

        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() == 200) {
                System.out.println("User registered successfully");
            } else {
                System.out.println("Failed to register user. Status code: " + response.statusCode());
            }
        } catch (Exception e) {
            System.out.println("Error sending request");
        }
    }

    public static void addTask(String username, String password, int numTasks){
        HttpClient client = HttpClient.newHttpClient();
        String randomTaskApiUrl = "https://www.boredapi.com/api/activity/";

        for (int i = 0; i < numTasks; i++) {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(randomTaskApiUrl))
                    .GET()
                    .build();
            try {
                HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
                String responseBody = response.body();
                JsonReader jsonReader = Json.createReader(new StringReader(responseBody));
                JsonObject jsonObject = jsonReader.readObject();
                Task task = new Task();
                task.setName(jsonObject.getString("activity"));
                task.setDescription(jsonObject.getString("type"));
                task.setStartDate(LocalDate.now());

                registerTask(username, password, task);
            } catch (Exception e) {
                System.out.println("Error sending request");
            }
        }
    }
    public static void registerTask(String username, String password, Task task) {
        HttpClient client = HttpClient.newHttpClient();
        String registerUrl = "http://localhost:8080/jm-rc-proj2/rest/users/"+username+"/tasks/";

        // Convert Task object to JSON
        Jsonb jsonb = JsonbBuilder.create();
        String taskJson = jsonb.toJson(task);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(registerUrl))
                .POST(HttpRequest.BodyPublishers.ofString(taskJson))
                .header("Content-Type", "application/json")
                .header("Authorization", "Basic " + Base64.getEncoder().encodeToString((username + ":" + password).getBytes()))
                .build();

        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() == 200) {
                System.out.println("Task registered successfully");
            } else {
                System.out.println("Failed to register task. Status code: " + response.statusCode());
            }
        } catch (Exception e) {
            System.out.println("Error sending request");
        }
    }
}
