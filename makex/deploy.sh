#!/bin/bash

# Deploy script for the project

# Install server dependencies
echo "Installing server dependencies..."
cd server
npm install
if [ $? -ne 0 ]; then
  echo "Failed to install server dependencies"
  exit 1
fi

# Install client dependencies
echo "Installing client dependencies..."
cd ../client
npm install
if [ $? -ne 0 ]; then
  echo "Failed to install client dependencies"
  exit 1
fi

# Build client
echo "Building client..."
npm run build
if [ $? -ne 0 ]; then
  echo "Client build failed"
  exit 1
fi

# Return to server directory to start server
cd ../server

echo "Deployment steps completed. You can now start the server with:"
echo "npm run start:dev"
