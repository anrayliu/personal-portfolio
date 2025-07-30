#ifndef CONFIG_H
#define CONFIG_H

#include <string>

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
};

#endif
