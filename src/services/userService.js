const getUsers = [
        {
          "id": 1,
          "firstname": "John",
          "lastname": "Smith",
          "email": "john.smith@example.com",
          "birthDate": "1980-01-23",
          "address": {
            "id": 1,
            "street": "Lindenstraße 89",
            "city": "Freiburg im Breisgau",
            "country": "DE",
            "postalcode": "42030"
          }
        },
        {
            "id": 2,
            "firstname": "Pedro",
            "lastname": "Sanchez",
            "email": "pedro.sanchez@example.com",
            "birthDate": "1980-01-23",
            "address": {
              "id": 1,
              "street": "Calle 1",
              "city": "París",
              "country": "FR",
              "postalcode": "67456"
            }
          },
          {
            "id": 3,
            "firstname": "David",
            "lastname": "Velasco",
            "email": "david.velasco@example.com",
            "birthDate": "1980-01-23",
            "address": {
              "id": 1,
              "street": "Calle 2",
              "city": "Roma",
              "country": "IT",
              "postalcode": "02030"
            }
          },
          {
            "id": 4,
            "firstname": "Juan",
            "lastname": "Pérez",
            "email": "juan.perez@example.com",
            "birthDate": "1980-01-23",
            "address": {
              "id": 1,
              "street": "Calle 3",
              "city": "Madrid",
              "country": "ES",
              "postalcode": "28065"
            }
          }
];

const createUser = (data) => {
  console.log('Usuario creado!!');
}

const editUser = (id, data) => {
  console.log('Usuario '+id+' modificado!!');
}

const deleteUser = (id) => {
  console.log('Usuario '+id+' borrado!!');
}

export {getUsers, createUser, editUser, deleteUser};