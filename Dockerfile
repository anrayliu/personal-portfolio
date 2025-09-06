FROM python:3.12-slim

SHELL ["/bin/bash", "-c"]

RUN apt-get update && apt-get upgrade -y

COPY requirements.txt .

# create python venv and install requirements

RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
RUN pip install -r requirements.txt

COPY . .

RUN apt-get update && apt-get install -y git
RUN apt install xz-utils

# compile wasm statics

RUN git clone https://github.com/emscripten-core/emsdk.git \
    && cd emsdk \
    && ./emsdk install latest \
    && ./emsdk activate latest \
    && source ./emsdk_env.sh \
    && cd .. \
    && em++ src/Core.cpp src/Button.cpp src/Timer.cpp src/TabButton.cpp src/DirButton.cpp src/FileButton.cpp -std=c++23 -g -s USE_SDL=2 -s USE_SDL_IMAGE=2 -s USE_SDL_TTF=2 -s SDL2_IMAGE_FORMATS="["png"]" -s --bind --preload-file static/assets -s NO_DISABLE_EXCEPTION_CATCHING -s ALLOW_MEMORY_GROWTH=1 -s ASSERTIONS=1 -s INITIAL_MEMORY=512MB -s MAXIMUM_MEMORY=2GB -o static/index.js

CMD ["gunicorn", "-w", "4", "--bind", "0.0.0.0:5001", "app:app"]