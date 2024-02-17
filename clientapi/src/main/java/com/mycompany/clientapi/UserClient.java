package com.mycompany.clientapi;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import jakarta.ws.rs.client.Client;
import jakarta.ws.rs.client.ClientBuilder;
import jakarta.ws.rs.client.Entity;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.nio.file.Files;
import java.nio.file.Paths;


import java.io.StringReader;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

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
            default:
                System.out.println("invalid command");
                break;
        }
    }
    public static void addUser(int numUsers){
        System.out.println("Adding " + numUsers + " users -----------------");

        HttpClient client = HttpClient.newHttpClient();
        System.out.println("Client created");
        String randomUserApiUrl = "https://randomuser.me/api/?results=" + numUsers;

        System.out.println("Sending request to " + randomUserApiUrl);
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(randomUserApiUrl))
                .GET()
                .build();
        try {
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println("Sucess TRY");
            System.out.println(response.body());

/*
                User user = new User();
                user.setUsername(jsonUser.getJsonObject("login").getString("username"));
                user.setPassword(jsonUser.getJsonObject("login").getString("password"));
                user.setEmail(jsonUser.getString("email"));
                user.setFirstName(name.getJsonObject("name").getString("first"));
                user.setLastName(name.getJsonObject("name").getString("last"));
                user.setTelephone(jsonUser.getString("phone"));
                user.setPhoto(jsonUser.getJsonObject("picture").getString("medium"));*/

        }catch (Exception e){
            System.out.println("Error sending request");
        }
        System.out.println("Response received");


    }



}
