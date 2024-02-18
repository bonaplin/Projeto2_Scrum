// Limpa o localStorage e o sessionStorage quando o script é carregado.
console.log("Script loaded");
localStorage.clear();
sessionStorage.clear();

const login = document.getElementById("login");

// Adiciona um event listener ao botão de login. Quando o botão é clicado, obtém o username e a password do formulário,
// verifica se estão preenchidos e, se estiverem, faz uma requisição POST para o servidor para fazer login.
login.addEventListener("click", () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Verificar se o username e a password estão preenchidos
  if (username.trim() == "" || password.trim() == "") {
    const error = document.getElementById("error-login");
    error.textContent = "Introduce your username and password";
  } else {
    console.log("Sending POST request to server");

    // Pedido ao servidor para fazer login
    fetch("http://localhost:8080/jm-rc-proj2/rest/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        username: username,
        password: password,
      },
    }).then((response) => {
      console.log("Received response from server", response);
      if (response.status === 200) {
        console.log("Login successful");
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        alert("User logged in successfully");
        window.location.href =
          "http://localhost:8080/jm-rc-proj2-frontend/scrum-board.html";
      } else {
        console.error("Error:", response);
        const errorElement = document.getElementById("error-login");
        errorElement.textContent = "Invalid username or password";
      }
    });
  }
});

// Função para ver a password através da checkbox
function verPassword() {
  var passwordInput = document.getElementById("password");
  var verPasswordCheckbox = document.getElementById("verPasswordCheckbox");

  if (verPasswordCheckbox.checked) {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
}
