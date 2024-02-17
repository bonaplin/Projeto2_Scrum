package com.mycompany.clientapi;
import jakarta.json.JsonValue;
import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
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
            */
        }catch (Exception e){
            System.out.println("Error sending request");
        }


        System.out.println("out of try catch block");
    }



}
