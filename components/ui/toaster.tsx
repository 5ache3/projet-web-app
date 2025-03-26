// src/components/ui/toaster.js

import React from 'react';

const Toaster = ({ messages }) => {
  return (
    <div className="toast-container" style={{ position: 'fixed', top: '10px', right: '10px' }}>
      {messages.map((message, index) => (
        <div
          key={index}
          style={{
            backgroundColor: 'black',
            color: 'white',
            padding: '10px',
            marginBottom: '10px',
            borderRadius: '5px',
            maxWidth: '300px',
          }}
        >
          {message}
        </div>
      ))}
    </div>
  );
};

export default Toaster;
