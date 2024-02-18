// __mocks__/fetchTasks.test.js
const { fetchTasks } = require('./fetchTasks');

// Mock da função fetch 
global.fetch = jest.fn(() =>
    Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ tasks: ['Task 1', 'Task 2'] }),
    })
);

test('fetchTasks deverá fazer fetch das tasks de um user', async () => {
    const username = 'testUser';
    const tasks = await fetchTasks(username);

    expect(fetch).toHaveBeenCalledWith(
    `http://localhost:8080/jm-rc-proj2/rest/users/${username}/tasks`
    );

    expect(tasks).toEqual({ tasks: ['Task 1', 'Task 2'] });
});

test('fetchTasks deverá ser bem sucedida a lidar com o erro quando for fazer fetch das tasks', async () => {
    const username = 'testUser';
    global.fetch.mockImplementationOnce(() =>
    Promise.resolve({
        ok: false,
        statusText: 'Not Found',
    })
    );

  // Ensure that the function throws an error
    await expect(fetchTasks(username)).rejects.toThrow(
    'Failed to fetch tasks: Not Found'
    );
});