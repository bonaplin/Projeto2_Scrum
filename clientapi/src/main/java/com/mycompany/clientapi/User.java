package com.mycompany.clientapi;
import jakarta.json.bind.annotation.JsonbProperty;

public class User {
    @JsonbProperty("username")
    private String username;
    @JsonbProperty("password")
    private String password;
    @JsonbProperty("email")
    private String email;
    @JsonbProperty("firstName")
    private String firstName;
    @JsonbProperty("lastName")
    private String lastName;
    @JsonbProperty("telephone")
    private String telephone;
    @JsonbProperty("photo")
    private String photo;

    public User() {
    }

    public User(String username, String password, String email, String firstName, String lastName, String telephone, String photo) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.telephone = telephone;
        this.photo = photo;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    @Override
    public String toString() {
        return "User{" +
                "username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", telephone='" + telephone + '\'' +
                ", photo='" + photo + '\'' +
                '}';
    }
}
