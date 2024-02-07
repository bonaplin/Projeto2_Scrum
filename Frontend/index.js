const login = document.getElementById("login");
login.addEventListener("click", () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  // Verificar se o username e a password estão preenchidos
  if (username.trim() == "" || password.trim() == "") {
    const error = document.getElementById("error-login");
    error.textContent = "Verifique o username e a password!";
  } else {
    localStorage.setItem("username", username);
    window.location.href = "./scrum-board.html";
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
