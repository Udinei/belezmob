@echo off
echo Deleting metro cache
rd %localappdata%\Temp\metro-cache /s /q 
del %localappdata%\Temp\haste-map*
echo Cleaning build
cd android & gradlew clean & cd .. 
echo Deleting node_modules
rd node_modules /q /s 
echo Cleaning npm cache
yarn cache clean --force 
echo Installing modules
yarn install
echo Done