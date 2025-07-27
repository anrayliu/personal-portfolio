#ifndef CONFIG_H
#define CONFIG_H

#define FILE_BUTTON_H 32
#define FILE_BUTTON_SPACING_Y 5
#define FILE_BUTTON_SPACING_X 15
#define FILE_BUTTON_TAB 45
#define FONT_SIZE 30
#define TOP_BAR_H 54
#define BOTTOM_BAR_H 41
#define LEFT_BAR_W 54
#define TAB_BAR_H 54
#define WINDOW_MIN 50

struct Config {
    int window_w;
    int window_h;
    double fps;
};

#endif
