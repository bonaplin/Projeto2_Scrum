var storedUsername = localStorage.getItem("username");
var storedPassword = localStorage.getItem("password");

function backToHome(){
    window.location.href = "./scrum-board.html";
}

document.addEventListener("DOMContentLoaded", function () {
    // vai buscar o username na localstorage
    getUserInfo(storedUsername);
    document.getElementById("register-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission
        save(); // Call the save function
    });
});

async function getUserInfo(username){
    try{
        const response = await fetch(`http://localhost:8080/jm-rc-proj2/rest/user/${username}`,{
            method: 'GET',
            headers:{
                'Accept': 'application/json'
            },
        });
        if (!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const dataUser = await response.json();
        populateFormEdit(dataUser);
    }catch (error){
        console.error("Error retrieving information: ", error)
    }
}

function populateFormEdit(userData) {
    // Update dos dados do user logado
    document.getElementById("usernameRegister2").value = userData.username || "";
    document.getElementById("emailRegister2").value = userData.email || "";
    document.getElementById("passwordRegister2").value = userData.password || "";
    document.getElementById("firstNameRegister2").value = userData.firstName || "";
    document.getElementById("lastnameRegister2").value = userData.lastName || "";
    document.getElementById("phoneRegister2").value = userData.telephone || "";
    document.getElementById("photoRegister2").value = userData.photo || "";
}

async function save() {
    // faz get dos novos valores
    console.log("ola");
    const username = document.getElementById("usernameRegister2").value;
    const password = document.getElementById("passwordRegister2").value;
    const email = document.getElementById("emailRegister2").value;
    const firstName = document.getElementById("firstNameRegister2").value;
    const lastName = document.getElementById("lastnameRegister2").value;
    const phone = document.getElementById("phoneRegister2").value;
    const photoURL = document.getElementById("photoRegister2").value;
    console.log(password);
    console.log(email);
    console.log(firstName);
    console.log(lastName);
    console.log(phone);
    console.log(photoURL);
    try {
        const response = await fetch("http://localhost:8080/jm-rc-proj2/rest/user/update", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "username": username,
                "password": storedPassword,
            },
            body: JSON.stringify({
                password: password,
                email: email,
                firstName: firstName,
                lastName: lastName,
                telephone: phone,
                photo: photoURL,
            }),
        });

        if (!response.ok) {
            console.log(response.status)
            throw new Error(`HTTP error! Status: ${response.status}`);
        } else{
            console.log("nooooooo")
        } 

        // aguarda a resposta
        const updatedUserData = await response.json();

        updateSuccess();

    } catch (error) {
        console.error("Error updating information: ", error);
    }
}

function updateSuccess() {
    // reedirecciona após um update bem sucedido
    window.location.href = "./scrum-board.html";
}


