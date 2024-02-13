/*---------------*/
var idAtual = localStorage.getItem("idAtual");

window.onload = function () {
  // Caso não seja seleccionada task é porque é para editar uma nova
  if (idAtual === "-1") {
    document.getElementById("delete-btn").style.display = "none";
  }else {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    // Procura a informação da task
    fetch(`http://localhost:8080/jm-rc-proj2/rest/users/${username}/tasks/${idAtual}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "username": username,
        "password": password,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error(`Failed to fetch task with status: ${response.status}`);
        }
      })
      .then((task) => {
        document.getElementById("taskName").value = task.name;
        document.getElementById("startDate").value = task.startDate;
        if (task.endDate) {
          document.getElementById("endDate").value = task.endDate;
        }
        document.getElementById("StateComboBox").value = task.state;
        document.getElementById("priorityComboBox").value = task.priority;
        document.getElementById("taskDescription").value = task.description;
        console.log("Retrieved Task:", task);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
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
    if (!startDateElement.value) {
      task.startDate = getCurrentDateFormatted();
    } else {
      task.startDate = startDateElement.value;
    }
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
  localStorage.setItem("idAtual", -1);
  window.location.href = "./scrum-board.html";
}
/*---------------*/
/*---------------*/

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