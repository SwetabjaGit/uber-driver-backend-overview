#!/bin/bash
npm run build
./node_modules/.bin/pm2 start ./dist/bin/www.js
./node_modules/.bin/pm2 monit
