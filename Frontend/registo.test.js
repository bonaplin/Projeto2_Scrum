const { verifyFields } = require("./registo");

jest.mock("./registo", () => ({
  verifyFields: jest.fn((form) => {
    // Check if any field is empty
    for (let key in form) {
      // if any field is empty return false
      if (form[key].value === "") {
        return false;
      }
    }
    return true;
  }),
}));

test("verifyFields", () => {
  const form = {
    usernameRegister: { value: "username" },
    passwordRegister: { value: "password" },
    emailRegister: { value: "email" },
    firstNameRegister: { value: "firstName" },
    lastNameRegister: { value: "lastName" },
    phoneRegister: { value: "phonee" },
    photoRegister: { value: "photo" },
  };
  expect(verifyFields(form)).toBe(true);
});
