import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserForm from './UserForm';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => setUsers(response.data))
      .catch(error => console.log(error));
  }, []);

  const addUser = (user) => {
    axios.post('https://jsonplaceholder.typicode.com/users', user)
      .then(response => setUsers([...users, response.data]))
      .catch(error => console.log(error));
  };

  const updateUser = (user) => {
    axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, user)
      .then(response => {
        setUsers(users.map(u => (u.id === user.id ? response.data : u)));
        setSelectedUser(null);
      })
      .catch(error => console.log(error));
  };

  const deleteUser = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => setUsers(users.filter(user => user.id !== id)))
      .catch(error => console.log(error));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">User List CRUD App</h1>
      <UserForm addUser={addUser} updateUser={updateUser} selectedUser={selectedUser} />
      <ul className="list-group">
        {users.map(user => (
          <li key={user.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{user.name} - {user.email}</span>
            <div>
              <button 
                className="btn btn-success btn-sm mr-2" 
                onClick={() => setSelectedUser(user)}
              >
                Edit
              </button>
              <button 
                className="btn btn-danger btn-sm" 
                onClick={() => deleteUser(user.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
