package aor.paj.jmrcproj2.util;

import aor.paj.jmrcproj2.dto.Task;
import aor.paj.jmrcproj2.dto.User;
import jakarta.xml.bind.annotation.XmlElement;
import jakarta.xml.bind.annotation.XmlRootElement;

import java.util.ArrayList;

@XmlRootElement
public class ScrumDataManager {
    private ArrayList<User> userList;
    private ArrayList<Task> taskList;
    private User loggedUser;

    public ScrumDataManager() {
        this.userList = new ArrayList<>();
        this.taskList = new ArrayList<>();
        this.loggedUser = null;
    }
    @XmlElement
    public ArrayList<User> getUserList() {
        return userList;
    }

    public void setUserList(ArrayList<User> userList) {
        this.userList = userList;
    }
    @XmlElement
    public ArrayList<Task> getTaskList() {
        return taskList;
    }

    public void setTaskList(ArrayList<Task> taskList) {
        this.taskList = taskList;
    }
    @XmlElement
    public User getLoggedUser() {
        return loggedUser;
    }

    public void setLoggedUser(User loggedUser) {
        this.loggedUser = loggedUser;
    }
}
