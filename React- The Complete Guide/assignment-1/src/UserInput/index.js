import React from 'react';
import './UserInput.css';

const userInput = ({ change, username }) => {
  return (
    <input
      type="text"
      onChange={change}
      value={username}
      className="input-username"
    />
  );
};

export default userInput;