async function fetchTasks(username) {
    try {
    const response = await fetch(
        `http://localhost:8080/jm-rc-proj2/rest/users/${username}/tasks`
    );
    if (!response.ok) {
        throw new Error(`Failed to fetch tasks: ${response.statusText}`);
    }
    const tasks = await response.json();
    return tasks;
    } catch (error) {
    throw error;
    }
}

module.exports = { fetchTasks };