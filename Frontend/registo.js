const form = document.getElementById("register-form");
const submit = document.getElementById("submit");
const messageElement = document.getElementById("message");

submit.addEventListener("click", function (event) {
  event.preventDefault();
  console.log("submit btn");
  //Verify if the fields are filled
  if (verifyFields()) {
    addUser(form);
  }
});

async function addUser(form) {
  let user = {
    // trim para remover espaços no início e fim
    idUser: 0,
    username: form.usernameRegister.value.trim(),
    password: form.passwordRegister.value.trim(),
    email: form.emailRegister.value.trim(),
    firstName: form.firstNameRegister.value.trim(),
    lastName: form.lastNameRegister.value.trim(),
    telephone: form.phoneRegister.value.trim(),
    photo: form.photoRegister.value.trim(),
  };

  await fetch("http://localhost:8080/jm-rc-proj2/rest/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(user),
  }).then(function (response) {
    console.log("response: " + response.status);

    if (response.status == 201) {
      messageElement.textContent = "Username created successfully";
      messageElement.style.color = "green";
      window.location.href = "http://localhost:8080/jm-rc-proj2-frontend/index.html";
    } else if (response.status == 400) {
      messageElement.textContent = "Username already exists";
      messageElement.style.color = "red";
    } else {
      messageElement.textContent = "Error";
      messageElement.style.color = "red";
    }
  });
}

function verifyFields() {
  let temp = false;
  if (
    form.usernameRegister.value.trim() == "" ||
    form.passwordRegister.value.trim() == "" ||
    form.emailRegister.value.trim() == "" ||
    form.firstNameRegister.value.trim() == "" ||
    form.lastNameRegister.value.trim() == "" ||
    form.phoneRegister.value.trim() == "" ||
    form.photoRegister.value.trim() == ""
  ) {
    temp = false;
    messageElement.textContent = "Fill all fields";
    messageElement.style.color = "blue";
  } else {
    temp = true;
  }
  return temp;
}
