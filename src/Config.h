#ifndef CONFIG_H
#define CONFIG_H

#include <string>

#include "SDL2/SDL_pixels.h"


// static constexpr allow compile time optimizations

struct Config {
    Config() = delete;

    inline std::string static title = "Anray Liu";
    inline int static window_w;
    inline int static window_h;
    double constexpr static fps = 60.0;

    int constexpr static file_button_h = 32;
    int constexpr static file_button_spacing_y = 5;
    int constexpr static file_button_spacing_x = 15;
    int constexpr static file_button_tab = 30;
    int constexpr static font_size = 20;
    int constexpr static top_bar_h = 54;
    int constexpr static bottom_bar_h = 41;
    int constexpr static left_bar_w = 54;
    int constexpr static tab_bar_h = 54;
    int constexpr static tab_w = 240;
    int constexpr static file_tree_w = 320;
    int constexpr static min_file_tree_w = 15;
    int constexpr static tab_x_button_size = 20;
    int constexpr static logo_size = 30;
    int constexpr static icon_spacing = 5;
    int constexpr static drag_tolerance = 10;

    SDL_Color constexpr static top_bar_colour{60, 63, 65};
    SDL_Color constexpr static text_colour{207, 206, 196};
    SDL_Color constexpr static tab_bar_colour{30, 31, 34};
    SDL_Color constexpr static left_bar_colour{43, 45, 48};
    SDL_Color constexpr static outline_colour{57, 59, 64};
    SDL_Color constexpr static select_tab_colour{41, 102, 213};
};


#endif
