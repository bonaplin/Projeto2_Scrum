package aor.paj.jmrcproj2.dto;

import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;

import java.time.LocalDate;

@XmlRootElement
public class Task {
    public static int codeTask = 1;
    private String name;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    private int stateId;
    private String status;
    private String taskId;

    // Constants for priority levels
    public static final int highPriority = 100;
    public static final int mediumPriority = 200;
    public static final int lowPriority = 300;

    public Task() {
    }
   public Task(String name, String description, String startDate, String endDate, String stateId, String status) {
        this.name = name;
        this.description = description;
        this.startDate = LocalDate.parse(startDate);
        if (endDate != null) {
           this.endDate = LocalDate.parse(endDate);
        } else {
           this.endDate = null;
        }
        this.stateId = convertPriorityStringToInt(stateId);
        this.status = status;
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
    @XmlElement

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    @XmlElement
    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }

    public int increaseCodeTask(){
        codeTask++;
        return codeTask;
    }
    public static void setCodeTask(int codeTask) {
        Task.codeTask = codeTask;
    }
    @Override
    public String toString() {
        return "Task{" +
                "name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", stateId=" + stateId +
                ", status=" + status +
                ", taskId" + taskId +
                '}';
    }
    public static int convertPriorityStringToInt(String priorityString) {
        switch (priorityString) {
            case "100":
                return highPriority;
            case "200":
                return mediumPriority;
            case "300":
                return lowPriority;
            default:
                throw new IllegalArgumentException("Unknown priority string: " + priorityString);
        }
    }
}
