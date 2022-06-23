#!/bin/bash

git pull origin main

# Remove old packages and build files
rm -rf node_modules/ ./.next/

# Install dependencies and build
yarn install --frozen-lockfile
yarn build

# Start Server
yarn start
