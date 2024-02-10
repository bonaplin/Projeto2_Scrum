const form = document.getElementById("register-form");
const submit = document.getElementById("submit");
submit.addEventListener("click", function (event) {
  event.preventDefault();
  console.log("submit btn");
  addUser(form);
});

async function addUser(form) {
  console.log("entrou na função addUser");
  //lê a activity do form
  let user = {
    idUser: "",
    username: form.usernameRegister.value,
    password: form.passwordRegister.value,
    email: form.emailRegister.value,
    firstName: form.firstNameRegister.value,
    lastName: form.lastNameRegister.value,
    telephone: form.phoneRegister.value,
    photo: form.photoRegister.value,
  };
  console.log(user);
  console.log("deu certo");

  // faz um post request para o backend
  await fetch("http://localhost:8080/jm-rc-proj2/rest/user/add", {
    method: "POST",
    headers:
      //define o tipo de conteudo que vai ser enviado
      {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    //transforma o objeto em json
    body: JSON.stringify(user),
  }).then(function (response) {
    console.log("response: " + response.status);
    //se o status for 200, a atividade foi adicionada com sucesso
    if (response.status == 201) {
      //se a atividade foi adicionada corretamente mostra um alerta
      alert("user is added successfully :)");
      console.log(user);
      //adiciona a atividade na tabela com a função do frontend
      window.location.href = "index.html";
      //addActivityToTable(user);
    } else if (response.status == 400) {
      //se a atividade não foi adicionada corretamente mostra um alerta
      alert("Username already exists");
    } else {
      alert("Error adding user");
    }
  });
}

async function getAllActivities() {
  const response = await fetch(
    "http://localhost:8080/jm-rc-proj2/rest/user/all",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );
  const data = await response.json();
  console.log(data);
  return data;
}
