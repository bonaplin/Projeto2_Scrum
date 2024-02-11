package aor.paj.jmrcproj2.bean;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.lang.reflect.Array;
import java.util.ArrayList;

import jakarta.enterprise.context.ApplicationScoped;
import aor.paj.jmrcproj2.dto.Task;
import jakarta.json.bind.Jsonb;
import jakarta.json.bind.JsonbBuilder;
import jakarta.json.bind.JsonbConfig;

@ApplicationScoped
public class TaskBean {
    private ArrayList<Task> task;
    public TaskBean(){

    }

}
