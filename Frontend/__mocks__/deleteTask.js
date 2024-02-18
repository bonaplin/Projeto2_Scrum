async function deleteTask(username, password, taskId) {
    try {
        const response = await fetch(`http://localhost:8080/jm-rc-proj2/rest/users/${username}/tasks/${taskId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "username": username,
                "password": password,
            },
        });

        if (response.status === 200) {
            console.log("Task deleted successfully");
            backToHome();
        } else if (response.status === 404) {
            console.log("Task not found");
        } else if (response.status === 403) {
            console.log("Forbidden");
        } else {
            console.error(`Failed to delete task: ${taskId}`);
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

module.exports = { deleteTask };