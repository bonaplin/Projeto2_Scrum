// __mocks__/getUserInfo.test.js
const { getUserInfo } = require('./getUserInfo');

// Mock da fetch function
global.fetch = jest.fn();

test('getUserInfo should fetch user information successfully', async () => {
  // Mock de uma resposta bem sucedida
    fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => ({
        // mock do username
        username: 'testUser',
    }),
    });

    const username = 'testUser';

    // Garantir que a função vai buscar a informação com sucesso
    await getUserInfo(username);

});

test('getUserInfo should handle error when fetching user information', async () => {
    // Mock de um erro de resposta
    fetch.mockRejectedValueOnce({
    ok: false,
    status: 404, // Simula um not found error
    });

    const username = 'nonexistentUser';

    // Ensure that the function handles errors when the user is not found
    await getUserInfo(username);

});