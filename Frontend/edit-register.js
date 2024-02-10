function backToHome(){
    window.location.href = "./scrum-board.html";
}

document.addEventListener("DOMContentLoaded", function () {
    // vai buscar o username na localstorage
    var storedUsername = localStorage.getItem("username");
    getUserInfo(storedUsername);
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

async function submit() {
    // faz get dos novos valores
    const password = document.getElementById("passwordRegister2").value;
    const email = document.getElementById("emailRegister2").value;
    const firstName = document.getElementById("firstNameRegister2").value;
    const lastName = document.getElementById("lastnameRegister2").value;
    const phone = document.getElementById("phoneRegister2").value;
    const photoURL = document.getElementById("photoRegister2").value;

    try {
        const base64Credentials = btoa(`${username}:${password}`);
        const response = await fetch(`http://localhost:8080/jm-rc-proj2/rest/user/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + base64Credentials,
            },
            body: JSON.stringify({
                email,
                firstName,
                lastName,
                telephone,
                photo,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
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


