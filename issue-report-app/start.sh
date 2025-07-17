#!/bin/bash

# GitHub Issue Report Generator - Startup Script

echo "🚀 Starting GitHub Issue Report Generator..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  Warning: .env file not found. Please create one from env.example"
    echo "   cp env.example .env"
    echo "   Then add your GitHub token to the .env file"
    echo ""
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
fi

# Install UI dependencies if needed
if [ ! -d "ui/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd ui && npm install && cd ..
fi

# Build UI if build directory doesn't exist
if [ ! -d "ui/build" ]; then
    echo "🔨 Building frontend..."
    cd ui && npm run build && cd ..
fi

# Start the server
echo "🌐 Starting server on http://localhost:3001"
echo "📱 Frontend will be available at http://localhost:3001"
echo "📊 API will be available at http://localhost:3001/api"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run server:dev 