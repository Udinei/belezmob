#!/bin/sh
BLUE='\033[0;34m'
NC='\033[0m'

echo "${BLUE}==>1. Refresh watchman${NC}"
watchman watch-del-all

echo "${BLUE}==>2. Remove cache and node_module${NC}"
rm -rf $TMPDIR/react-* &&
rm -rf $TMPDIR/metro-bundler-cache-* &&
rm -rf node_modules/ &&
yarn cache clean

echo "${BLUE}==>3. Re-install libraries${NC}"
yarn install &&
react-native link &&
yarn start -- --reset-cache

echo "${BLUE} Reset successful!${NC}"