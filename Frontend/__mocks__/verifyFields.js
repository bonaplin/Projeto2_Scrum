function verifyFields(form, messageElement) {
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


module.exports = {verifyFields};