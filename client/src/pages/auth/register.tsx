import axios from 'axios';
import React from 'react';

export default function Register() {
  const handleRegister = () => {
    axios
      .post('/api/register')
      .then((response) => {
        console.log(response);
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  return (
    <div>
      Register
      <button onClick={handleRegister}>Go</button>
    </div>
  );
}
