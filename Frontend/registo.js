document.getElementById("register-form").addEventListener("submit", function (e) {
    e.preventDefault();

    let username = document.getElementById("usernameRegister").value;
    let password = document.getElementById("passwordRegister").value;
    let email = document.getElementById("emailRegister").value;
    let firstname = document.getElementById("firstNameRegister").value;
    let lastname = document.getElementById("lastnameRegister").value;
    let phone = document.getElementById("phoneRegister").value;
    let photo = document.getElementById("photoRegister").value;

    let user = {
        name: username,
        email: email,
        password: password,
        first_name: firstname,
        last_name: lastname,
        telephone: phone,
        photo: photo,
    };
    let url = "'http://localhost:8080/my_frontend/rest/activity/add";

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
});
