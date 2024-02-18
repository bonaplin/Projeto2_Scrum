// __mocks__/verifyFields.test.js
const { verifyFields } = require('./verifyFields');

test('verifyFields should return false and display message for empty fields', () => {
  // Mock do form object
    const form = {
        usernameRegister: { value: '' },
        passwordRegister: { value: '' },
        emailRegister: { value: '' },
        firstNameRegister: { value: '' },
        lastNameRegister: { value: '' },
        phoneRegister: { value: '' },
        photoRegister: { value: '' },
    };

    // Mock do elemento damensagem
    const messageElement = {
        textContent: '',
        style: { color: '' },
    };

    const result = verifyFields(form, messageElement);

    expect(result).toBe(false);
    expect(messageElement.textContent).toBe('Fill all fields');
    expect(messageElement.style.color).toBe('blue');
});

test('verifyFields should return true for all filled fields', () => {
    const form = {
        usernameRegister: { value: 'john_doe' },
        passwordRegister: { value: 'password123' },
        emailRegister: { value: 'john.doe@example.com' },
        firstNameRegister: { value: 'John' },
        lastNameRegister: { value: 'Doe' },
        phoneRegister: { value: '1234567890' },
        photoRegister: { value: 'profile.jpg' },
    };

    const messageElement = {
        textContent: '',
        style: { color: '' },
    };

    const result = verifyFields(form, messageElement);

    expect(result).toBe(true);

    expect(messageElement.textContent).toBe('');
    expect(messageElement.style.color).toBe('');
});
