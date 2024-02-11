package aor.paj.jmrcproj2.dto;

import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;

import java.time.LocalDate;

@XmlRootElement
public class Task {
    private String name;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private int stateId;

    // Constants for priority levels
    public static final int highPriority = 100;
    public static final int mediumPriority = 200;
    public static final int lowPriority = 300;


    public Task(String title, String description, LocalDate startDate, LocalDate endDate, int stateId) {
        this.name = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.stateId = stateId;
    }

    @XmlElement
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    @XmlElement
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @XmlElement
    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }
    @XmlElement
    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }
    @XmlElement
    public int getStateId() {
        return stateId;
    }

    public void setStateId(int stateId) {
        this.stateId = stateId;
    }
}
