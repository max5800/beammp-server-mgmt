#!/bin/bash

# Set the project root directory name
PROJECT_ROOT="beammp-server-mgmt"

# Check if the project root directory exists
if [ ! -d "$PROJECT_ROOT" ]; then
  echo "Error: Directory $PROJECT_ROOT does not exist."
  exit 1
fi

# Navigate into the project root directory
cd "$PROJECT_ROOT"

# Create directories for backend and frontend if they don't exist
mkdir -p backend/src backend/test
mkdir -p frontend/public frontend/src

# Optionally create a directory for shared code if it doesn't exist
mkdir -p shared

# Initialize a new Node.js project for backend and frontend if not already initialized
if [ ! -f backend/package.json ]; then
  echo "Initializing backend..."
  (cd backend && npm init -y)
else
  echo "Backend already initialized."
fi

if [ ! -f frontend/package.json ]; then
  echo "Initializing frontend..."
  (cd frontend && npm init -y)
else
  echo "Frontend already initialized."
fi

# Create .gitignore in the project root if it doesn't exist
if [ ! -f .gitignore ]; then
  echo "node_modules/" > .gitignore
fi

# Create README.md in the project root if it doesn't exist
if [ ! -f README.md ]; then
  echo "# $PROJECT_ROOT" > README.md
fi

echo "Project structure for $PROJECT_ROOT has been updated."

# End of script
