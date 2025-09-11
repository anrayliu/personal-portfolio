#ifndef CORE_H
#define CORE_H

#include "Timer.h"

#include <memory>
#include <string>
#include <SDL2/SDL.h>
#include <SDL2/SDL_ttf.h>

#include "Button.h"

using std::string;


// singleton class
class Core {
    bool check_aspect_ratio;

    void construct_file_tree();

    void draw_background() const;

    void draw_outlines() const;

    void draw_topleft() const;

    // recursive functions to interact with file buttons
    void recursive_align(int x, int y, int *offset, Button *button);

    void recursive_update(Button *button);

    void update_tabs();

    void update_iframe();

    void update_dragging();

    void update_aspect_ratio();

    bool check_mobile();

    void move_iframe(int x, int y, int w, int h);

    void load_iframe(const std::string &file);

    void show_iframe();

    void hide_iframe();

    void disable_iframe();

    void enable_iframe();

    void set_cursor(const std::string &type);

    void init_rects();

    void init_textures();

    Core();

    ~Core();

    int mousex{};
    int mousey{};

    bool dragging;

    // mobile browser;
    bool mobile;

    SDL_Rect top_bar;
    SDL_Rect left_bar;
    SDL_Rect file_tree;
    SDL_Rect file_view;
    SDL_Rect tab_bar;

    std::shared_ptr<SDL_Texture> collapse_icon;
    std::shared_ptr<SDL_Texture> expand_icon;
    std::shared_ptr<SDL_Texture> close_icon;
    std::shared_ptr<SDL_Texture> file_icon;
    std::shared_ptr<SDL_Texture> logo;

    std::unique_ptr<DirButton> top_level;
    std::vector<std::shared_ptr<TabButton> > tabs;

    std::string loaded_iframe;
    bool iframe_hidden;
    std::shared_ptr<TabButton> selected_tab;

    std::unique_ptr<SDL_Texture, decltype(&SDL_DestroyTexture)> project_name_text;
    std::unique_ptr<SDL_Texture, decltype(&SDL_DestroyTexture)> empty_view_text;
    SDL_Point empty_view_dimensions{};
    SDL_Point project_name_dimensions{};

    std::unique_ptr<SDL_Window, decltype(&SDL_DestroyWindow)> win;
    std::unique_ptr<SDL_Renderer, decltype(&SDL_DestroyRenderer)> renderer;
    std::unique_ptr<TTF_Font, decltype(&TTF_CloseFont)> font;

public:
    // delete copy constructor and copy assignment operator
    Core(Core &core) = delete;
    void operator=(const Core &) = delete;

    bool click{};
    bool middle_click{};
    Timer timer;

    bool quit;

    void update();

    void init();

    static void init_sdl();

    static void quit_sdl();

    static Core *get_instance();

    static std::shared_ptr<SDL_Texture> load_texture(SDL_Renderer *renderer, const string &path, int w, int h);

    static std::unique_ptr<SDL_Texture, decltype(&SDL_DestroyTexture)> load_text(SDL_Renderer *renderer, TTF_Font *font,
        const string &text);
};

#endif
