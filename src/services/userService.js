// const getUsers = [
const urlBase = 'http://127.0.0.1:8080/users/';

const getUsers = () =>{
  return fetch(urlBase);
}

const createUser = (data) => {
  return fetch(urlBase,
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    })
}

const editUser = (id, data) => {  
  return fetch(urlBase+id,
    {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "PUT",
        body: JSON.stringify(data)
    })
}

const deleteUser = (id) => {
  return fetch(urlBase+id,
    {
        method: "DELETE",
    })
}

export {getUsers, createUser, editUser, deleteUser};