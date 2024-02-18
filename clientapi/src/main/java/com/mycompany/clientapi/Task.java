package com.mycompany.clientapi;

import java.time.LocalDate;

public class Task {
    private String name;
    private String description;
    private LocalDate startDate;
    private int stateId;

    public Task() {
    }


    public Task(String name, String description, LocalDate startDate) {
        this.name = name;
        this.description = description;
        this.startDate = startDate;
        this.stateId = 100;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
