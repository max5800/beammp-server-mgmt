import React from 'react';

function ServerStatus() {
  // You would fetch the server status from your state or props here
  const status = 'Online'; // Example status

  return (
    <div>
      <h2>Server Status: {status}</h2>
    </div>
  );
}

export default ServerStatus;
