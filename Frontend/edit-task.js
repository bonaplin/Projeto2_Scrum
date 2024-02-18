// Variável taskId sleccionada no scrum-board.html. Caso o valor for -1, então é para adicionar nova tarefa.
// variáveis username e password para mandar nos headers.

let idAtual = localStorage.getItem("idAtual");
let username = localStorage.getItem("username");
let password = localStorage.getItem("password");
let msg = document.getElementById("error-edit");
let deleteBtn = document.getElementById("delete-btn");
deleteBtn.addEventListener("click", function (e) {
  let confirmation = confirm("Are you sure you want to delete this?");
  if (confirmation) {
    deleteTask();
  } else {
    e.preventDefault();
  }
});
window.onload = async function () {
  if (!localStorage.getItem("username") || !localStorage.getItem("password")) {
    // redireccionar, caso não haja username ou password na localstorage
    window.location.href =
      "http://localhost:8080/jm-rc-proj2-frontend/index.html";
  }
  // Se não houver idAtual ou se idAtual for "-1" então é para adicionar uma nova tarefa
  // idAtual é o id da task selecionada
  if (!idAtual || idAtual === "-1") {
    document.getElementById("delete-btn").disabled = true;
    document.getElementById("save-btn").innerText = "Add";
    document.querySelector("#w-title h2").innerText = "Add Task";
    const dropDown = document.getElementById("statusComboBox");
    dropDown.value = "To Do";
    dropDown.disabled = true;
  } else {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    // Procura a informação da task no backend
    try {
      const response = await fetch(
        `http://localhost:8080/jm-rc-proj2/rest/users/${username}/tasks/${idAtual}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            username: username,
            password: password,
          },
        }
      );
      // Se a resposta for bem sucedida, preenche os campos do formulário com a informação da tarefa
      if (response.status === 200) {
        const task = await response.json();
        document.getElementById("taskName").value = task.name;
        document.getElementById("startDate").value = task.startDate;
        //caso o valor for nulo ou não definido, não existe update do elemento
        if (task.endDate !== null && task.endDate !== undefined) {
          document.getElementById("endDate").value = task.endDate;
        }
        document.getElementById("statusComboBox").value = task.status;
        document.getElementById("stateIdComboBox").value = task.stateId;
        document.getElementById("taskDescription").value = task.description;
        console.log("Retrieved Task:", task);
      } else {
        throw new Error(`Failed to fetch task with status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
};

// Reset de id, para poder ter a função adicionar uma nova tarefa de volta
function backToHome() {
  localStorage.setItem("idAtual", -1);
  window.location.href =
    "http://localhost:8080/jm-rc-proj2-frontend/scrum-board.html";
}

// Função para salvar a tarefa no dia de hoje caso o campo de startDate não seja preenchido
function getCurrentDateFormatted() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  let month = currentDate.getMonth() + 1;
  let day = currentDate.getDate();

  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

// Função para adicionar ou gravar tasks
async function addOrUpdateTask() {
  let taskName = document.getElementById("taskName").value;
  let startDate = document.getElementById("startDate").value;
  let endDate = document.getElementById("endDate").value;
  let status = document.getElementById("statusComboBox").value;
  let stateId = document.getElementById("stateIdComboBox").value;
  let taskDescription = document.getElementById("taskDescription").value;

  let startDate2 = new Date(startDate);
  let endDate2 = new Date(endDate);

  // Se o nome da tarefa ou a descrição estiverem vazios, mostra um alerta e retorna
  if (taskName.trim() === "" || taskDescription.trim() === "") {
    msg.innerHTML = "Task name and description cannot be empty";
    return;
  }

  if (startDate2 > endDate2) {
    msg.innerHTML = "Start date should be before end date";
    return;
  }

  // se o campo startDate não for preenchido, então será o dia de hoje
  if (!startDate) {
    startDate = getCurrentDateFormatted();
  }
  if (!endDate) {
    endDate = null;
  }

  let task = {
    name: taskName,
    startDate: startDate,
    endDate: endDate,
    status: status,
    stateId: stateId,
    description: taskDescription,
  };

  if (!idAtual || idAtual === "-1") {
    try {
      const response = await fetch(
        `http://localhost:8080/jm-rc-proj2/rest/users/${username}/tasks`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            username: username,
            password: password,
          },
          body: JSON.stringify(task),
        }
      );

      if (response.status === 201) {
        console.log("Task added successfully");
        backToHome();
      } else {
        msg.innerHTML = "Insert name and description for a new task";
      }
    } catch (error) {
      console.error("Error:", error);
    }
  } else {
    await updateTask(username, password, idAtual, task);
    backToHome();
  }
}
// Função para atualizar uma tarefa no backend
async function updateTask(username, password, taskId, task) {
  await fetch(
    `http://localhost:8080/jm-rc-proj2/rest/users/${username}/tasks/${taskId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        username: username,
        password: password,
      },
      body: JSON.stringify(task),
    }
  )
    .then((response) => {
      if (response.status === 200) {
        console.log("Task updated successfully");
      } else {
        throw new Error(
          `Failed to update task with status: ${response.status}`
        );
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
// Função para deletar uma tarefa no backend
async function deleteTask() {
  let username = localStorage.getItem("username");
  let password = localStorage.getItem("password");
  let taskId = localStorage.getItem("idAtual");
  try {
    const response = await fetch(
      `http://localhost:8080/jm-rc-proj2/rest/users/${username}/tasks/${taskId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          username: username,
          password: password,
        },
      }
    );
    // Se a resposta for bem sucedida, redireciona para a página inicial
    if (response.status === 200) {
      console.log("Task deleted successfully");
      backToHome();
    } else if (response.status === 404) {
      console.log("Task not found");
    } else if (response.status === 403) {
      console.log("Forbidden");
    } else {
      console.error(`Failed to delete task: ${taskId}`);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
