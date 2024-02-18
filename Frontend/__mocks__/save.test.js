
const { Response } = require('node-fetch'); // importa a classe Response do módulo node-fetch. No teste vamos manualmente fazer mock da função fetch e retorna um objecto Resposta 
const { save } = require('./save'); // Update the path accordingly

// Mock the fetch function
global.fetch = jest.fn();

// Mock the necessary DOM elements
document.getElementById = jest.fn(() => ({ value: 'mockedValue' }));

// Your storedPassword, update this with a valid value
const storedPassword = 'yourStoredPassword';

// Test cases
describe('save function', () => {
    beforeEach(() => {
    // Clear previous fetch mocks before each test
    global.fetch.mockClear();
    });

  test('should handle a successful save', async () => {
    // Mock the fetch response for a successful save
    global.fetch.mockResolvedValueOnce(new Response(JSON.stringify({}), { status: 200 }));

    // Call the save function
    await save();

    // Check if the fetch function was called with the expected parameters
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/jm-rc-proj2/rest/users/mockedValue', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'username': 'mockedValue',
        'password': 'yourStoredPassword',
      },
      body: JSON.stringify({
        password: 'mockedValue',
        email: 'mockedValue',
        firstName: 'mockedValue',
        lastName: 'mockedValue',
        telephone: 'mockedValue',
        photo: 'mockedValue',
      }),
    });

    // Check if the success alert is called
    expect(window.alert).toHaveBeenCalledWith('save successful');

    // You may need to mock/update the implementation of updateSuccess
  });

  test('should handle a save with no changes', async () => {
    // Mock the fetch response for a save with no changes
    global.fetch.mockResolvedValueOnce(new Response(JSON.stringify({}), { status: 304 }));

    // Call the save function
    await save();

    // Check if the fetch function was called with the expected parameters
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:8080/jm-rc-proj2/rest/users/mockedValue', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'username': 'mockedValue',
        'password': 'yourStoredPassword',
      },
      body: JSON.stringify({
        password: 'mockedValue',
        email: 'mockedValue',
        firstName: 'mockedValue',
        lastName: 'mockedValue',
        telephone: 'mockedValue',
        photo: 'mockedValue',
      }),
    });

    // Check if the alert for no changes is called
    expect(window.alert).toHaveBeenCalledWith('There were no changes in the data');
  });

  test('should handle an error during save', async () => {
    // Mock the fetch response for an error during save
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    // Call the save function
    await save();

    // Check if the console.error is called with the expected error message
    expect(console.error).toHaveBeenCalledWith('Error updating information: ', expect.any(Error));
  });
});
