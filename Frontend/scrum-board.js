// Iniciar a variável idAtual com o valor de -1, para que seja possível verificar se a tarefa é nova ou se é uma tarefa já existente.
let clickedId = -1;
localStorage.setItem("idAtual", clickedId);
const containers = document.querySelectorAll(".coluna");

// Adiciona um event listener ao documento que, quando o DOM estiver carregado, faz uma requisição GET para buscar a foto do usuário.
document.addEventListener("DOMContentLoaded", function () {
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  fetch(`http://localhost:8080/jm-rc-proj2/rest/users/${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      username: username,
      password: password,
    },
  })
    //conversão de resposta para json
    .then((response) => response.json())
    .then((data) => {
      // seleccionar a foto do objecto data
      const userPhoto = data.photo;

      // colocar a foto no elemento
      const userPhotoElement = document.getElementById("profilePhoto");
      userPhotoElement.src = userPhoto;
    })
    .catch((error) => {
      console.error("Error fetching user info:", error);
    });
});

//Criação do botão logout que ao carregar nos leva para a página do login
function logout() {
  window.location.href =
    "http://localhost:8080/jm-rc-proj2-frontend/index.html";
  localStorage.clear();
  sessionStorage.clear();
}

const editProfile = document.getElementById("editProfile");
editProfile.addEventListener("click", () => {
  window.location.href =
    "http://localhost:8080/jm-rc-proj2-frontend/edit-register.html";
});
// Função que é executada quando a página é carregada. Se o username ou password não estiverem no localStorage, redireciona o usuário para a página de login.
// Caso contrário, atualiza a UI com as informações do usuário e suas tarefas.
window.onload = function () {
  if (!localStorage.getItem("username") || !localStorage.getItem("password")) {
    // redireccionar, caso não haja username ou password na localstorage
    window.location.href =
      "http://localhost:8080/jm-rc-proj2-frontend/index.html";
  }
  if (localStorage.getItem("username")) {
    document.getElementById("nomeAaparecerNoEcra").innerHTML =
      "Welcome " + localStorage.getItem("username");
  }
  if (localStorage.getItem("photo")) {
    document.getElementById("profilePhoto").src = localStorage.getItem("photo");
  }
  updateTasksUI(localStorage.getItem("username"));
};

// Função para criar um elemento de tarefa. Cada tarefa é um div com a classe "task", que pode ser arrastada e clicada.
// Quando clicada, o id da tarefa é armazenado no localStorage e o usuário é redirecionado para a página de edição de tarefa.
function createElements(task) {
  // Encontra a coluna à qual pertence a task
  var column = document.getElementById(task.status);
  // Cria um elemento para a mesma com classe, texto, id, descrição e permite que seja arrastado
  var newTaskElement = document.createElement("div");
  newTaskElement.className = "task";
  newTaskElement.textContent = task.name;
  newTaskElement.id = task.taskId;
  newTaskElement.draggable = true;

  // Objeto mapeia os IDs de estado para cores específicas.
  const stateIdColors = {
    100: "#CD6155",
    200: "#E59866",
    300: "#7DCEA0",
  };

  // Aqui, a cor de fundo do novo elemento de tarefa é definida com base no ID de estado da tarefa.
  // A propriedade 'style.backgroundColor' define a cor de fundo de um elemento HTML.
  // 'stateIdColors[task.stateId]' procura a cor correspondente ao ID de estado da tarefa no objeto 'stateIdColors'.
  // Se 'task.stateId' for 100, por exemplo, a cor de fundo será "#CD6155".
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
    //alert(clickedId);
    localStorage.setItem("idAtual", clickedId); //guarda no localStorage o id dessa task como o atual para usar na edição da mesma
    window.location.href =
      "http://localhost:8080/jm-rc-proj2-frontend/edit-task.html"; //e ao ser carregada abre a página html "edit-task.html"
  });
  column.appendChild(newTaskElement); //por fim adiciona o elemento à coluna respetiva dessa task
}

// Adiciona event listeners a cada container para permitir que tarefas sejam arrastadas e soltas neles.
// Quando uma tarefa é solta num container, seu status é atualizado e a UI é atualizada.
containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault(); // Previne o comportamento padrão do evento "dragover"
  });
  container.addEventListener("drop", async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do evento "drop"
    const draggable = document.querySelector(".dragging"); // A tarefa que queremos soltar
    container.appendChild(draggable); // Solta a tarefa na coluna
    let targetTaskId = draggable.id; // Obtém o id da tarefa que estamos a arrastar

    const usernameLogged = localStorage.getItem("username");
    const passwordLogged = localStorage.getItem("password");

    //receber a task do be
    const taskToUpdate = await getTask(
      usernameLogged,
      passwordLogged,
      targetTaskId
    );
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
        alert("There are no changes");
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
      return data;
    } else {
      throw new Error(`Failed to fetch task with status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

//Função para voltar para o scrum-board.html
function backToHome() {
  window.location.href =
    "http://localhost:8080/jm-rc-proj2-frontend/scrum-board.html";
}

// Gravar os arrays em localStorage
function save() {
  localStorage.setItem("tasksToDo", JSON.stringify(tasks));
  localStorage.setItem("tasksDoing", JSON.stringify(tasksDoing));
  localStorage.setItem("tasksDone", JSON.stringify(tasksDone));
}

function openEditProfile() {
  window.location.href =
    "http://localhost:8080/jm-rc-proj2-frontend/edit-register.html";
}

function openEditTask() {
  window.location.href =
    "http://localhost:8080/jm-rc-proj2-frontend/edit-task.html";
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
