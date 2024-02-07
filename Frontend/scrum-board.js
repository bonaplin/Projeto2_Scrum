/* ---------------------------- */

/* Criação das variáveis:
1) id inicial
2) 3 arrays: lista do TO DO, lista do DOING e lista do DONE
3) containers (seleciona todos os elementos da classe "coluna" que ficam armazeandos nesta classe que se torna numa NodeList
*/
let id = 1;
let tasks = [];
let tasksDoing = [];
let tasksDone = [];
const containers = document.querySelectorAll(".coluna");
/* ---------------------------- */

/* ---------------------------- */

//Criação do botão logout que ao carregar nos leva para a página do login
const logout = document.getElementById("logout");
logout.addEventListener("click", () => {
  window.location.href = "./index.html";
});
/* ---------------------------- */

/* ---------------------------- */

/*Função onload da Scrum-Board:
- ao abrir vai buscar o username guardado no localSotrage e troca o nome que aparece no ecrã (por default está vazio por esse username)
- o mesmo para o id 
- o mesmo para cada item onde converte o valor da array em String e chama a função createElements para cada task encontrada
*/
window.onload = function () {
  if (localStorage.getItem("username")) {
    document.getElementById("nomeAaparecerNoEcra").innerHTML =
      localStorage.getItem("username");
  }
  if (localStorage.getItem("id")) {
    id = localStorage.getItem("id");
  }
  if (localStorage.getItem("tasksToDo")) {
    tasks = JSON.parse(localStorage.getItem("tasksToDo"));
    tasks.forEach((task) => {
      createElements(task);
    });
  }
  if (localStorage.getItem("tasksDoing")) {
    tasksDoing = JSON.parse(localStorage.getItem("tasksDoing"));
    tasksDoing.forEach((task) => {
      createElements(task);
    });
  }
  if (localStorage.getItem("tasksDoing")) {
    tasksDone = JSON.parse(localStorage.getItem("tasksDone"));
    tasksDone.forEach((task) => {
      createElements(task);
    });
  }
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
  // Cria um elemento para a mesma com classe, texto, id, descrição e permite que seja arrastado
  var newTaskElement = document.createElement("div");
  newTaskElement.className = "task";
  newTaskElement.textContent = task.name;
  newTaskElement.id = task.id;
  newTaskElement.description = task.description;
  newTaskElement.draggable = true;

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
  container.addEventListener("drop", (e) => {
    e.preventDefault(); // Previne o comportamento padrão do evento "drop"
    const draggable = document.querySelector(".dragging"); // A tarefa que queremos soltar
    container.appendChild(draggable); // Solta a tarefa na coluna
    let targetTaskId = draggable.id; // Obtém o id da tarefa que estamos a arrastar
    let targetTask = verify(targetTaskId); // Verifica se a tarefa existe
    if (targetTask) {
      // Se a tarefa existe
      let targetCurrentStatus = targetTask.status; // Remove a tarefa do array com base no status atual
      eliminateTask(targetCurrentStatus, targetTaskId); // Atualiza o status da tarefa com base no id do container
      addTaskToArray(container, targetTask);
    }
    // Salva os arrays atualizados no armazenamento local
    save();
  });
});
// Adiciona a tarefa ao array correto com base no id do container
function addTaskToArray(container, targetTask) {
  if (container.id === "ToDo") {
    targetTask.status = "ToDo"; // Define o status da tarefa como "ToDo"
    tasks.push(targetTask); // Adiciona a tarefa ao array de ToDo
    save(); // Salva as alterações
  } else if (container.id === "doing") {
    targetTask.status = "doing"; // Define o status da tarefa como "doing"
    tasksDoing.push(targetTask); // Adiciona a tarefa ao array doing
    save(); // Salva as alterações
  } else if (container.id === "done") {
    targetTask.status = "done"; // Define o status da tarefa como "done"
    tasksDone.push(targetTask); // Adiciona a tarefa ao array done
    save(); // Salva as alterações
  }
}

// Verifica se a tarefa existe nos arrays
function verify(targetTaskId) {
  // Procura a tarefa indicada nos 3 arrays
  let targetTask =
    tasks.find((task) => task.id === targetTaskId) ||
    tasksDoing.find((task) => task.id === targetTaskId) ||
    tasksDone.find((task) => task.id === targetTaskId);
  return targetTask; // Retorna a tarefa encontrada
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
