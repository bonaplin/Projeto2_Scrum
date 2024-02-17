var storedUsername = localStorage.getItem("username");
var storedPassword = localStorage.getItem("password");

function backToHome(){
    window.location.href = "http://localhost:8080/jm-rc-proj2-frontend/scrum-board.html";
}

window.onload = async function () {
    console.log("nvdsnoipb");
    if (!localStorage.getItem("username") || !localStorage.getItem("password")) {
        // redireccionar, caso não haja username ou password na localstorage
        window.location.href = "http://localhost:8080/jm-rc-proj2-frontend/index.html";
    }
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
        const response = await fetch(`http://localhost:8080/jm-rc-proj2/rest/users/${username}`,{
            method: 'GET',
            headers:{
                'Accept': 'application/json'
            },
        });
        if (!response.ok){
            alert(`Error retrieving information! HTTP error: ${response.status}`);
        }else{
            const dataUser = await response.json();
            populateFormEdit(dataUser);
        }        
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
    const username = document.getElementById("usernameRegister2").value;
    const password = document.getElementById("passwordRegister2").value;
    const email = document.getElementById("emailRegister2").value;
    const firstName = document.getElementById("firstNameRegister2").value;
    const lastName = document.getElementById("lastnameRegister2").value;
    const phone = document.getElementById("phoneRegister2").value;
    const photo = document.getElementById("photoRegister2").value;
    try {
        const response = await fetch(`http://localhost:8080/jm-rc-proj2/rest/users/${username}`, {
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
                photo: photo,
            }),
        });
        console.log(response);
        if (!response.ok) {
            console.log(response.status)
            alert("There were no changes in the data");
        } else{
            alert("save successful");
            updateSuccess();
        } 
    } catch (error) {
        console.error("Error updating information: ", error);
    }
}

function updateSuccess() {
    // reedirecciona após um update bem sucedido
    window.location.href = "http://localhost:8080/jm-rc-proj2-frontend/scrum-board.html";
}


