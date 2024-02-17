console.log("Script loaded");
localStorage.clear();
sessionStorage.clear();

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
    error.textContent = "Introduce your username and password";
  } else {
    console.log("Sending POST request to server");

    // Pedido ao
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
          console.log(response);
          console.log("Login successful");
          localStorage.setItem("username", username);
          localStorage.setItem("password", password);
          document.getElementById("username").value = "";
          document.getElementById("password").value = "";
          alert("User logged in successfully");
          window.location.href = "http://localhost:8080/jm-rc-proj2-frontend/scrum-board.html"; 
        } else {
          console.error("Error:", response);
          const errorElement = document.getElementById("error-login");
          errorElement.textContent = "Invalid username or password";
        }
      });
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
