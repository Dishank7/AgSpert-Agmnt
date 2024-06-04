import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = () => {
    // You can add your login logic here (e.g., API calls, authentication checks).
    if(!username || !password) {
        alert("Please Enter All The Fields");
        return;
    }
    localStorage.setItem('username', username.toString());
    localStorage.setItem('password', password.toString());

    navigate('/customer-order');
   
  };

  return (
    <div>
      <h2>Login Form</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginForm;