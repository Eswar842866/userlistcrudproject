import React, { useState, useEffect } from 'react';

const UserForm = ({ addUser, updateUser, selectedUser }) => {
  const [user, setUser] = useState({ name: '', email: '' });

  useEffect(() => {
    if (selectedUser) {
      setUser(selectedUser);
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.id) {
      updateUser(user);
    } else {
      addUser(user);
    }
    setUser({ name: '', email: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="form-row">
        <div className="form-group col-md-15">
          <input
            type="text"
            name="name"
            className="form-control"
            placeholder="Name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group col-md-15">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group col-md-5">
          <button type="submit" className="btn btn-primary btn-block">
            {user.id ? 'Update' : 'Add'} User
          </button>
        </div>
      </div>
    </form>
  );
};

export default UserForm;
