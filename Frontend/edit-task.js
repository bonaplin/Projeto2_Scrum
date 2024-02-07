/*---------------*/
//Recupera o valor associado ao id respetivo e converte-o para um objeto JS com o JSON.parse em array
// se não tiver valor retorna "null" ou "undefined" e a expressão "|| []" faz com que, nesse caso retorne uma array vazia
let tasks = JSON.parse(localStorage.getItem("tasksToDo")) || [];
let tasksDoing = JSON.parse(localStorage.getItem("tasksDoing")) || [];
let tasksDone = JSON.parse(localStorage.getItem("tasksDone")) || [];
/*---------------*/

/*---------------*/
//Função onload da edita-task.js:
// 1- recupera o nome atual da task
// 2- recupera a descrição atual da task
// 3- o campo de texto do nome abre logo com o nome atual
// 4- o campo de texto da descrição abre logo com a descrição atual
window.onload = function () {
  let nameTask = localStorage.getItem("nomeAtual");
  let descriptionTask = localStorage.getItem("descricaoAtual");
  document.getElementById("taskName").value = nameTask;
  document.getElementById("taskDescription").value = descriptionTask;
};
/*---------------*/
// Verifica se os campos estão preenchidos e retorna um booleano
function updateValues(task) {
  newName = document.getElementById("taskName").value;
  newDescription = document.getElementById("taskDescription").value;

  if (newName.trim() == "" || newDescription.trim() == "") {
    const error = document.getElementById("error-edit");
    error.textContent = "Não pode submeter campos vazios!";
    return false;
  } else {
    task.name = newName;
    task.description = newDescription;
    return true;
  }
}
/*---------------*/
//Função editar Tarefa
// 1- recupera o id da task carregada
// 2- percorre as arrays e assim que encontrar a task certa com o respetivo id troca o nome antigo pelo texto que estiver no texto quando carregar no botão "Gravar"
function editTask() {
  let idTask = localStorage.getItem("idAtual");
  let bool;
  for (const task of tasks) {
    if (idTask == task.id) {
      bool = updateValues(task);
      save();
      break;
    }
  }

  for (const task of tasksDoing) {
    if (idTask == task.id) {
      bool = updateValues(task);
      save();
      break;
    }
  }

  for (const task of tasksDone) {
    if (idTask == task.id) {
      bool = updateValues(task);
      save();
      break;
    }
  }
  // Se o booleano for true redireciona para o scrum-board.html pois não há campos vazios
  if (bool == true) {
    window.location.href = "./scrum-board.html";
  }
}
/*---------------*/

/*---------------*/
//Função apagar tarefa
// 1- recupera o id da task carregada
// 2- ercorre as arrays e assim que encontrar a task certa com o respetivo id encontra também o seu indice e apaga essa task
function deleteTask() {
  let idTask = localStorage.getItem("idAtual");

  tasks.forEach((task, index) => {
    if (idTask == task.id) {
      tasks.splice(index, 1);
      save();
    }
  });

  tasksDoing.forEach((task, index) => {
    if (idTask == task.id) {
      tasksDoing.splice(index, 1);
      save();
    }
  });

  tasksDone.forEach((task, index) => {
    if (idTask == task.id) {
      tasksDone.splice(index, 1);
      save();
    }
  });
}
/*---------------*/
/*---------------*/
//Função para voltar ao scrum-board.html
function backToHome() {
  window.location.href = "./scrum-board.html";
}
/*---------------*/
/*---------------*/

/* Gravar os arrays em localStorage */
function save() {
  localStorage.setItem("tasksToDo", JSON.stringify(tasks));
  localStorage.setItem("tasksDoing", JSON.stringify(tasksDoing));
  localStorage.setItem("tasksDone", JSON.stringify(tasksDone));
}
