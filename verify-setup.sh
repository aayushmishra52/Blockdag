#!/bin/bash

# ANSI color codes
GREEN="\033[0;32m"
YELLOW="\033[1;33m"
RED="\033[0;31m"
NC="\033[0m" # No Color

echo "\n${YELLOW}DAGBoard Setup Verification${NC}\n"

# Check if Node.js is installed
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✓${NC} Node.js is installed (${NODE_VERSION})"
else
    echo -e "${RED}✗${NC} Node.js is not installed. Please install Node.js v14 or higher."
    exit 1
fi

# Check if npm is installed
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✓${NC} npm is installed (${NPM_VERSION})"
else
    echo -e "${RED}✗${NC} npm is not installed. Please install npm v6 or higher."
    exit 1
fi

# Check if server directory exists
if [ -d "server" ]; then
    echo -e "${GREEN}✓${NC} Server directory exists"
else
    echo -e "${RED}✗${NC} Server directory not found"
    exit 1
fi

# Check if client directory exists
if [ -d "client" ]; then
    echo -e "${GREEN}✓${NC} Client directory exists"
else
    echo -e "${RED}✗${NC} Client directory not found"
    exit 1
fi

# Check if server package.json exists
if [ -f "server/package.json" ]; then
    echo -e "${GREEN}✓${NC} Server package.json exists"
else
    echo -e "${RED}✗${NC} Server package.json not found"
    exit 1
fi

# Check if client package.json exists
if [ -f "client/package.json" ]; then
    echo -e "${GREEN}✓${NC} Client package.json exists"
else
    echo -e "${RED}✗${NC} Client package.json not found"
    exit 1
fi

# Check if server.js exists
if [ -f "server/server.js" ]; then
    echo -e "${GREEN}✓${NC} Server.js exists"
else
    echo -e "${RED}✗${NC} Server.js not found"
    exit 1
fi

# Check if data files exist
if [ -f "server/data/dagBlocks.json" ] && [ -f "server/data/minerStats.json" ] && [ -f "server/data/insights.json" ]; then
    echo -e "${GREEN}✓${NC} Data files exist"
else
    echo -e "${RED}✗${NC} One or more data files are missing"
    exit 1
fi

# Check if route files exist
if [ -f "server/routes/dag.js" ] && [ -f "server/routes/miner.js" ] && [ -f "server/routes/insights.js" ]; then
    echo -e "${GREEN}✓${NC} Route files exist"
else
    echo -e "${RED}✗${NC} One or more route files are missing"
    exit 1
fi

# Check if client App.js exists
if [ -f "client/src/App.js" ]; then
    echo -e "${GREEN}✓${NC} Client App.js exists"
else
    echo -e "${RED}✗${NC} Client App.js not found"
    exit 1
fi

# Check if client index.js exists
if [ -f "client/src/index.js" ]; then
    echo -e "${GREEN}✓${NC} Client index.js exists"
else
    echo -e "${RED}✗${NC} Client index.js not found"
    exit 1
fi

# Check if page components exist
if [ -f "client/src/pages/Home.js" ] && [ -f "client/src/pages/DagVisualizer.js" ] && 
   [ -f "client/src/pages/MinerDashboard.js" ] && [ -f "client/src/pages/AiInsights.js" ] && 
   [ -f "client/src/pages/LearnDag.js" ]; then
    echo -e "${GREEN}✓${NC} Page components exist"
else
    echo -e "${RED}✗${NC} One or more page components are missing"
    exit 1
fi

# Check if layout components exist
if [ -f "client/src/components/layout/Navbar.js" ] && [ -f "client/src/components/layout/Sidebar.js" ]; then
    echo -e "${GREEN}✓${NC} Layout components exist"
else
    echo -e "${RED}✗${NC} One or more layout components are missing"
    exit 1
fi

echo -e "\n${GREEN}All checks passed! Your DAGBoard setup is complete.${NC}\n"
echo -e "To install all dependencies, run: ${YELLOW}npm run install-all${NC}"
echo -e "To start the application, run: ${YELLOW}npm start${NC}\n"
echo -e "The server will run on http://localhost:5000"
echo -e "The client will run on http://localhost:3000\n"

chmod +x verify-setup.sh