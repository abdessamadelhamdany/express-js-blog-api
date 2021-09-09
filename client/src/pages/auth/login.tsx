import axios from 'axios';
import React from 'react';

export default function Login() {
  const handleLogin = () => {
    axios
      .post('/api/login')
      .then((response) => {
        console.log(response);
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  return (
    <div>
      Login
      <button onClick={handleLogin}>Go</button>
    </div>
  );
}
