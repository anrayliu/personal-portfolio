#ifndef CORE_H
#define CORE_H

#include <memory>
#include <string>
#include <SDL2/SDL.h>
#include "Config.h"
#include "Timer.h"


using std::string;

class Core {
public:
    Config conf;
    Timer timer;

    bool quit;

    std::unique_ptr<SDL_Window, decltype(&SDL_DestroyWindow)> win;
    std::unique_ptr<SDL_Renderer, decltype(&SDL_DestroyRenderer)> renderer;

    static void init_sdl();
    static void quit_sdl();

    explicit Core(Config &config);

    void init();
    void update();
};

#endif
