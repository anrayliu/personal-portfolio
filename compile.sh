!#/bin/bash

cd emsdk
./emsdk activate latest
source ./emsdk_env.sh
cd ..
em++ src/Core.cpp src/Button.cpp src/Timer.cpp src/TabButton.cpp src/DirButton.cpp src/FileButton.cpp -std=c++23 -g -Os --closure 1 -s USE_SDL=2 -s USE_SDL_IMAGE=2 -s USE_SDL_TTF=2 -s SDL2_IMAGE_FORMATS="["png"]" -s --bind --preload-file assets -s NO_DISABLE_EXCEPTION_CATCHING -s ALLOW_MEMORY_GROWTH=1 -s ASSERTIONS=1 -s INITIAL_MEMORY=512MB -s MAXIMUM_MEMORY=2GB -o index.js
echo compiled
firefox --new-tab http://localhost:8000/
