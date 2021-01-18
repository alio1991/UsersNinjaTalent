// const getUsers = [
const urlUserBase = 'http://127.0.0.1:8080/users/';
const urlCountries = 'http://127.0.0.1:8080/countries/'

const getUsers = () =>{
  return fetch(urlUserBase);
}

const createUser = (data) => {
  return fetch(urlUserBase,
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
  return fetch(urlUserBase+id,
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
  return fetch(urlUserBase+id,
    {
        method: "DELETE",
    })
}

const getCountries = () => {
    return fetch(urlCountries)
}

export {getUsers, createUser, editUser, deleteUser, getCountries};