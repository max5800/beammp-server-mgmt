import React from 'react';

const SERVER_URL = 'http://localhost:3000'; 

function ServerControl() {
  // Functions to interact with your backend
  const startServer = () => {
    console.log('Starting server');
    // API call to start the server
    fetch(`${SERVER_URL}/api/start`, {
      method: 'POST',
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const stopServer = () => {
    console.log('Stopping server');
    // API call to stop the server
  };

  const restartServer = () => {
    console.log('Restarting server');
    // API call to restart the server
  };

  return (
    <div>
      <button onClick={startServer}>Start</button>
      <button onClick={stopServer}>Stop</button>
      <button onClick={restartServer}>Restart</button>
    </div>
  );
}

export default ServerControl;
