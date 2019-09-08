#!/bin/sh

# If node_modules folder exists, don't npm ci unless --npm-i option is set
if [ ! -d "node_modules" ] || [ "$FORCE_NPM_I" == "true" ] ; then
  npm ci
fi

if [ "$NODE_ENV" == "production" ] ; then
  npm run start
else
  npm run dev
fi