#ifndef CORE_H
#define CORE_H

#include "Config.h"
#include "Timer.h"

#include <memory>
#include <string>
#include <SDL2/SDL.h>
#include <SDL2/SDL_ttf.h>

#include "Button.h"

using std::string;


class Core {
    void draw_background();
    // recursive functions to interact with file buttons
    void recursive_align(int x, int y, int w, int h, int* offset, Button *button);
    void recursive_update(Button *button);

public:
    int mousex;
    int mousey;
    bool click;

    SDL_Rect top_bar;
    SDL_Rect bottom_bar;
    SDL_Rect left_bar;
    SDL_Rect file_tree;
    SDL_Rect file_viewer;
    SDL_Rect tab_bar;

    std::unique_ptr<DirButton> top_level;

    Config conf;
    Timer timer;

    bool quit;

    std::unique_ptr<SDL_Window, decltype(&SDL_DestroyWindow)> win;
    std::unique_ptr<SDL_Renderer, decltype(&SDL_DestroyRenderer)> renderer;
    std::unique_ptr<TTF_Font, decltype(&TTF_CloseFont)> font;

    static void init_sdl();
    static void quit_sdl();
    static std::shared_ptr<SDL_Texture> load_texture(SDL_Renderer* renderer, const string &path, int w, int h);

    explicit Core(Config &config);

    void init();
    void update();

};

#endif
