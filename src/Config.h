#ifndef CONFIG_H
#define CONFIG_H

#include <string>

#include "SDL2/SDL_pixels.h"

struct Config {
    std::string title;
    int window_w;
    int window_h;
    double fps;

    int file_button_h = 32;
    int file_button_spacing_y = 5;
    int file_button_spacing_x = 15;
    int file_button_tab = 45;
    int font_size = 20;
    int top_bar_h = 54;
    int bottom_bar_h = 41;
    int left_bar_w = 54;
    int tab_bar_h = 54;
    int tab_w = 300;
    int file_tree_w = 400;

    SDL_Color top_bar_colour{60, 63, 65};
    SDL_Color text_colour{207, 206, 196};
    SDL_Color tab_bar_colour{30, 31, 34};
    SDL_Color left_bar_colour{43, 45, 48};
    SDL_Color outline_colour{57, 59, 64};
    SDL_Color select_tab_colour{41, 102, 213};
};

#endif
