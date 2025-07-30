## WIP

Personal portfolio

## Manual Deployment

1. Install and activate `emscripten`
2. Build project with the following command:
```
em++ src/Core.cpp src/Timer.cpp src/Tile.cpp src/Quicksort.cpp -std=c++23 -g -s USE_SDL=2 -s USE_SDL_IMAGE=2 \
-s SDL2_IMAGE_FORMATS="["png"]" -s --bind --preload-file assets -s NO_DISABLE_EXCEPTION_CATCHING \
-s ALLOW_MEMORY_GROWTH=1 -s ASSERTIONS=1 -s INITIAL_MEMORY=64MB -s MAXIMUM_MEMORY=1GB -o wasm_output.html \
--shell-file custom_shell_file.html
```
3. Serve build with the following command:
```
python -m http.server 8000
```
4. Open `wasm_output.html`