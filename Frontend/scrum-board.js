/* ---------------------------- */

/* Criação das variáveis:
1) id inicial
2) 3 arrays: lista do TO DO, lista do DOING e lista do DONE
3) containers (seleciona todos os elementos da classe "coluna" que ficam armazeandos nesta classe que se torna numa NodeList
*/
let clickedId = -1;
localStorage.setItem("idAtual", clickedId);
const containers = document.querySelectorAll(".coluna");
/* ---------------------------- */

/* ---------------------------- */

//Criação do botão logout que ao carregar nos leva para a página do login
const logout = document.getElementById("logout");
logout.addEventListener("click", () => {
  window.location.href = "./index.html";
  localStorage.clear();
  sessionStorage.clear();
});

//
const editProfile = document.getElementById("editProfile");
editProfile.addEventListener("click", () => {
  window.location.href = "./edit-register.html";
});
/* ---------------------------- */

/* ---------------------------- */

/*Função onload da Scrum-Board:
- ao abrir vai buscar o username guardado no localSotrage e troca o nome que aparece no ecrã (por default está vazio por esse username)
- o mesmo para o id 
- o mesmo para cada item onde converte o valor da array em String e chama a função createElements para cada task encontrada
*/
console.log("a");
window.onload = function () {
  console.log("1");
  if (localStorage.getItem("username")) {
    document.getElementById("nomeAaparecerNoEcra").innerHTML =
      "Welcome " + localStorage.getItem("username");
  }
  if (localStorage.getItem("photo")) {
    document.getElementById("profilePhoto").src = localStorage.getItem("photo");
  }
  console.log("2");
  updateTasksUI(localStorage.getItem("username"));
  console.log("3");
};
/* ---------------------------- */

// Função para ver a password através da checkbox
function VerPassword() {
  var passwordInput = document.getElementById("password");
  var verPasswordCheckbox = document.getElementById("verPasswordCheckbox");

  if (verPasswordCheckbox.checked) {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
}

/* ---------------------------- */

// Funções do modal, janela que aparece quando clicamos no botão "Adicionar tarefa"

// Função para abrir o modal fazendo com que fique visível
function openAddTaskModal() {
  document.getElementById("addTaskModal").style.display = "block";
  document.querySelector(".modal-background").style.display = "block";

  document.getElementById("error-create").textContent = ""; // Garante que o erro é limpo sempre que o modal é aberto
}

// Função para fechar o modal fazendo com que não fique visível e limpar os campos
function closeAddTaskModal() {
  document.getElementById("addTaskModal").style.display = "none";
  document.querySelector(".modal-background").style.display = "none";
  document.getElementById("addTaskName").value = "";
  document.getElementById("addTaskDescription").value = "";
}

// Função para adicionar tarefa
function addTaskModal(event) {
  event.preventDefault(); //impedir o comportamento padrão, por exemplo de recarregar a página quando é criada a tarefa
  // Obtém os valores dos textos
  var taskName = document.getElementById("addTaskName").value;
  var taskDescription = document.getElementById("addTaskDescription").value;

  if (taskName.trim() != "" && taskDescription.trim() != "") {
    // Cria a nova Task
    let task = new Task(taskName, taskDescription);
    //Adiciona a task ao quadro
    createElements(task);
    //Adicona a task à array
    tasks.push(task);
    //fecha o modal
    closeAddTaskModal();
    //grava os novos dados no localStorage
    save();
  } else {
    const error = document.getElementById("error-create");
    error.textContent = "Não pode submeter campos vazios!";
  }
}

/* ---------------------------- */
/* ---------------------------- */

//Construtor das tarefas
//Guarda o último id para ir incrementando na criação das próximas
function Task(name, description) {
  this.name = name;
  this.description = description;
  this.id = id++ + "task";
  this.status = "ToDo";
  localStorage.setItem("id", id);
}

/* ---------------------------- */

//Funçãopara criar o Elemento da task
function createElements(task) {
  // Encontra a coluna à qual pertence a task
  var column = document.getElementById(task.status);
  console.log(task.status);
  console.log(task.taskId);
  // Cria um elemento para a mesma com classe, texto, id, descrição e permite que seja arrastado
  var newTaskElement = document.createElement("div");
  newTaskElement.className = "task";
  newTaskElement.textContent = task.name;
  newTaskElement.id = task.taskId;
  newTaskElement.draggable = true;

  const stateIdColors = {
    100: "#CD6155", // high priority
    200: "#E59866", // medium priority
    300: "#7DCEA0", // low priority
  };

  // cor por prioridades
  newTaskElement.style.backgroundColor = stateIdColors[task.stateId];

  // Adiciona a classe dragging quando a tarefa é 'agarra' e remove quando é 'largada'
  // dragging é uma classe que dá um efeito visual à tarefa quando é arrastada
  newTaskElement.addEventListener("dragstart", () => {
    newTaskElement.classList.add("dragging");
  });
  newTaskElement.addEventListener("dragend", () => {
    newTaskElement.classList.remove("dragging");
  });

  //Cada elemento criado terá um evento de "click"
  newTaskElement.addEventListener("click", (e) => {
    let clickedId = e.target.id; //obtém o id da task clicada
    let clickedName = e.target.textContent; //obtém o nome da task clicada
    let clickedDescription = e.target.description; //obtém a descrição da task clicada
    //alert(clickedId);
    localStorage.setItem("idAtual", clickedId); //guarda no localStorage o id dessa task como o atual para usar na edição da mesma
    localStorage.setItem("nomeAtual", clickedName); //guarda no localStorage o nome dessa task como o atual para usar na edição da mesma
    localStorage.setItem("descricaoAtual", clickedDescription); //guarda no localStorage a descrição dessa task como o atual para usar na edição da mesma

    window.location.href = "./edit-task.html"; //e ao ser carregada abre a página html "edit-task.html"
  });
  column.appendChild(newTaskElement); //por fim adiciona o elemento à coluna respetiva dessa task
}

// Percorre os containers que são onde é possivel 'largar' a tarefa dando ações aos mesmos caso se passe sobre eles, ou se largue algo nesses mesmo containers
containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault(); // Previne o comportamento padrão do evento "dragover"
  });
  container.addEventListener("drop", async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do evento "drop"
    const draggable = document.querySelector(".dragging"); // A tarefa que queremos soltar
    container.appendChild(draggable); // Solta a tarefa na coluna
    let targetTaskId = draggable.id; // Obtém o id da tarefa que estamos a arrastar
    console.log(targetTaskId);

    const usernameLogged = localStorage.getItem("username");
    const passwordLogged = localStorage.getItem("password");

    //receber a task do be
    const taskToUpdate = await getTask(
      usernameLogged,
      passwordLogged,
      targetTaskId
    );
    console.log(taskToUpdate + "<- taskToUpdate");
    taskToUpdate.status = container.id; //atualizar o status da task
    //atualizar a task
    await updateTask(
      usernameLogged,
      passwordLogged,
      targetTaskId,
      taskToUpdate
    );
    //fazer update
    updateTasksUI(usernameLogged); //atualizar a UI
  });
});

async function updateTask(username, password, taskId, task) {
  await fetch(
    `http://localhost:8080/jm-rc-proj2/rest/users/${username}/tasks/${taskId}`,
    {
      method: "POST", // or "PUT" depending on your backend API
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
        // Handle success, if needed
        return response.json();
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
async function getTask(username, password, taskId) {
  try {
    const response = await fetch(
      `http://localhost:8080/jm-rc-proj2/rest/users/${username}/tasks/${taskId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          username: username,
          password: password,
        },
      }
    );

    if (response.status === 200) {
      console.log("Task fetched successfully");
      const data = await response.json();
      console.log("Task data:", data);
      return data;
    } else {
      throw new Error(`Failed to fetch task with status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Adiciona a tarefa ao array correto com base no id do container
function addTaskToArray(container, targetTask) {
  if (container.id === "To Do") {
    targetTask.status = "To Do"; // Define o status da tarefa como "ToDo"
    tasks.push(targetTask); // Adiciona a tarefa ao array de ToDo
    save(); // Salva as alterações
  } else if (container.id === "Doing") {
    targetTask.status = "Doing"; // Define o status da tarefa como "doing"
    tasksDoing.push(targetTask); // Adiciona a tarefa ao array doing
    save(); // Salva as alterações
  } else if (container.id === "Done") {
    targetTask.status = "Done"; // Define o status da tarefa como "done"
    tasksDone.push(targetTask); // Adiciona a tarefa ao array done
    save(); // Salva as alterações
  }
}

// Verifica se a tarefa existe nos arrays
function verify(targetTaskId) {
  let tasks = fetchTasks(localStorage.getItem("username"));
  console.log("tasks: " + tasks);
  // Procura a tarefa indicada nos 3 arrays
  let targetTask = tasks.find((task) => task.taskId === targetTaskId);
  return targetTask; // Retorna a tarefa encontrada
}

function findTaskById(id) {
  let tasks = fetchTasks(localStorage.getItem("username"));
  console.log("tasks: " + tasks);
  return tasks.find((task) => task.taskId === id);
}

//Função para voltar para o scrum-board.html
function backToHome() {
  window.location.href = "./scrum-board.html";
}

// Gravar os arrays em localStorage
function save() {
  localStorage.setItem("tasksToDo", JSON.stringify(tasks));
  localStorage.setItem("tasksDoing", JSON.stringify(tasksDoing));
  localStorage.setItem("tasksDone", JSON.stringify(tasksDone));
}
//Função para eliminar uma tarefa
function eliminateTask(targetCurrentStatus, targetTaskId) {
  // Dependendo do status atual da tarefa, procura-a e remove-a do array correspondente.
  if (targetCurrentStatus === "ToDo") {
    tasks = tasks.filter((task) => task.id !== targetTaskId);
  } else if (targetCurrentStatus === "doing") {
    tasksDoing = tasksDoing.filter((task) => task.id !== targetTaskId);
  } else if (targetCurrentStatus === "done") {
    tasksDone = tasksDone.filter((task) => task.id !== targetTaskId);
  }
}

function openEditProfile() {
  window.location.href = "./edit-register.html";
}

function openEditTask() {
  window.location.href = "./edit-task.html";
}

async function updateTasksUI(username) {
  const tasks = await fetchTasks(username);
  if (tasks) {
    clearTaskColumns();
    createTaskElements(tasks);
  }
}

async function fetchTasks(username) {
  try {
    const response = await fetch(
      `http://localhost:8080/jm-rc-proj2/rest/users/${username}/tasks`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch tasks: ${response.statusText}`);
    }
    const tasks = await response.json();
    console.log(tasks);
    return tasks;
  } catch (error) {
    console.error(error);
  }
}

function clearTaskColumns() {
  containers.forEach((container) => {
    container.innerHTML = "";
  });
}

function createTaskElements(tasks) {
  tasks.forEach((task) => {
    createElements(task);
  });
}
