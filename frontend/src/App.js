import React from 'react';
import ServerStatus from './components/ServerStatus';
import ServerControl from './components/ServerControl';
import './App.css';

function App() {
  return (
    <div>
      <h1>BeamMP Server Management</h1>
      <ServerStatus />
      <ServerControl />
    </div>
  );
}

export default App;

