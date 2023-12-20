const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');
let serverProcess;

exports.startServer = (req, res) => {
  serverProcess = spawn('./start-test-script.sh', { cwd: '../../test/' });

  serverProcess.stdout.on('data', (data) => {
    console.log(`Server: ${data}`);
    // Optional: Send data to frontend via WebSocket
  });

  // serverProcess.stderr.on('data', (data) => {
  //   console.error(`Server Error: ${data}`);
  // });

  // serverProcess.on('close', (code) => {
  //   console.log(`Server process exited with code ${code}`);
  // });

  res.send({ message: "Server started" });
};

exports.stopServer = (req, res) => {
  if (serverProcess) {
    serverProcess.kill(); // Or send a specific command to gracefully stop the server
    res.send({ message: "Server stopped" });
  } else {
    res.status(400).send({ message: "Server is not running" });
  }
};

