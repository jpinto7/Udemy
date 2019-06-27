import React from 'react';
import './UserOutput.css';

const userOutput = ({ username }) => {
  return (
    <div className="paragraphs">
      <p>Soy el usuario {username}</p>
      <p>Soy una salida</p>
      <p>Soy una solución</p>
    </div>
  );
};

export default userOutput;