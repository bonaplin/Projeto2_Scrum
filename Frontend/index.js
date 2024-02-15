console.log("Script loaded");
window.onload = function () {
  localStorage.clear();
  sessionStorage.clear();
}

const login = document.getElementById("login");
console.log("Login button:", login);

login.addEventListener("click", () => {
  console.log("Login button clicked");

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  console.log("Username:", username);
  console.log("Password:", password);

  // Verificar se o username e a password estão preenchidos
  if (username.trim() == "" || password.trim() == "") {
    const error = document.getElementById("error-login");
    error.textContent = "Verifique o username e a password!";
  } else {
    console.log("Sending POST request to server");

    // POST request to the server ------------------------------------------
    fetch("http://localhost:8080/jm-rc-proj2/rest/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "username": username,
        "password": password,
      },
    })
      .then((response) => {
        console.log("Received response from server", response);
        if (response.status === 200) {
          console.log("Login successful");
          localStorage.setItem("username", username);
          localStorage.setItem("password", password);

          // retorna se houver um json com o url
          return response.json();
        } else {
          throw new Error(`Login failed with status: ${response.status}`);
        }
      })
      .then((data) => {
        // Carregar a foto na localstorage
        localStorage.setItem("photo", data.photo);
        window.location.href = "./scrum-board.html";
      })
      .catch((error) => {
        console.error("Error:", error);
        const errorElement = document.getElementById("error-login");
        errorElement.textContent = "Invalid username or password";
      });
    //POST request to the server ------------------------------------------
  }
});

/* Função para ver a password através da checkbox */
function verPassword() {
  var passwordInput = document.getElementById("password");
  var verPasswordCheckbox = document.getElementById("verPasswordCheckbox");

  if (verPasswordCheckbox.checked) {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
}
