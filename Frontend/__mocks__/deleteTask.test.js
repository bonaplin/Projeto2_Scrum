// __mocks__/deleteTask.test.js

const { deleteTask } = require('./deleteTask');

test('o deleteTask deverá conseguir fazer o delete da task', async () => {
    const mockUsername = 'mockUsername';
    const mockPassword = 'mockPassword';
    const mockTaskId = 'mockTaskId';

    // Mock da função fetch
    global.fetch = jest.fn(() =>
        Promise.resolve({
            status: 200, // Por o status pretendido
        })
    );

    // Espia o console.log para verificar que aquando chamado, vem com a mensagem correcta
    const consoleLogSpy = jest.spyOn(console, 'log');

    // Chama a função deleteTask
    await deleteTask(mockUsername, mockPassword, mockTaskId);

    expect(fetch).toHaveBeenCalledWith(
        `http://localhost:8080/jm-rc-proj2/rest/users/${mockUsername}/tasks/${mockTaskId}`,
        expect.objectContaining({
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'username': mockUsername,
                'password': mockPassword,
            },
        })
    );

    expect(consoleLogSpy).toHaveBeenCalledWith('Task deleted successfully');
    consoleLogSpy.mockRestore(); // Restore a função original do console.log
});

test('deleteTask deverá ser sucessida no task not found', async () => {
    const mockUsername = 'mockUsername';
    const mockPassword = 'mockPassword';
    const mockTaskId = 'mockTaskId';

    // Mock da função fetch (status code 404)
    global.fetch = jest.fn(() =>
        Promise.resolve({
            status: 404,
        })
    );

    const consoleLogSpy = jest.spyOn(console, 'log');

    await deleteTask(mockUsername, mockPassword, mockTaskId);

    expect(fetch).toHaveBeenCalledWith(
        `http://localhost:8080/jm-rc-proj2/rest/users/${mockUsername}/tasks/${mockTaskId}`,
        expect.objectContaining({
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'username': mockUsername,
                'password': mockPassword,
            },
        })
    );

    expect(consoleLogSpy).toHaveBeenCalledWith('Task not found');
    consoleLogSpy.mockRestore();
});

test('deleteTask deverá ser bem sucedida no network error', async () => {
    const mockUsername = 'mockUsername';
    const mockPassword = 'mockPassword';
    const mockTaskId = 'mockTaskId';

    global.fetch = jest.fn(() => Promise.reject('Network error'));

    const consoleErrorSpy = jest.spyOn(console, 'error');

    await deleteTask(mockUsername, mockPassword, mockTaskId);

    expect(fetch).toHaveBeenCalledWith(
        `http://localhost:8080/jm-rc-proj2/rest/users/${mockUsername}/tasks/${mockTaskId}`,
        expect.objectContaining({
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'username': mockUsername,
                'password': mockPassword,
            },
        })
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith('Error:', 'Network error');
    consoleErrorSpy.mockRestore();
});
