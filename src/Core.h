#ifndef CORE_H
#define CORE_H

#include "Config.h"
#include "Timer.h"

#include <memory>
#include <string>
#include <SDL2/SDL.h>

using std::string;


class Core {
    void draw_background();
public:
    SDL_Rect top_bar;
    SDL_Rect bottom_bar;
    SDL_Rect left_bar;
    SDL_Rect file_tree;
    SDL_Rect file_viewer;
    SDL_Rect tab_bar;

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
