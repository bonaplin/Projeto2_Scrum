async function addUser(form) {
  console.log(form);
  //lê a activity do form
  let user = {
    id: "1",
    username: form.usernameRegister.value,
    email: form.emailRegister.value,
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
    if (response.status == 200) {
      //se a atividade foi adicionada corretamente mostra um alerta
      alert("user is added successfully :)");

      //adiciona a atividade na tabela com a função do frontend
      window.location.href = "index.html";
      //addActivityToTable(user);
    } else {
      //se a atividade não foi adicionada corretamente mostra um alerta
      alert("something went wrong");
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
