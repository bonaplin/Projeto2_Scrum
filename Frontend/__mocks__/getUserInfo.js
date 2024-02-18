async function getUserInfo(username){
    try{
        const response = await fetch(`http://localhost:8080/jm-rc-proj2/rest/users/${username}`,{
            method: 'GET',
            headers:{
                'Accept': 'application/json'
            },
        });
        if (!response.ok){
            alert(`Error retrieving information! HTTP error: ${response.status}`);
        }else{
            const dataUser = await response.json();
            populateFormEdit(dataUser);
        }        
    }catch (error){
        console.error("Error retrieving information: ", error)
    }
}

module.exports = {getUserInfo};
