#include "Core.h"
#include "SDL2/SDL_image.h"

#include <format>

#ifdef __EMSCRIPTEN__
#include "emscripten.h"
#endif


Core::Core(Config &config):
    conf(config),
    quit(false), win(nullptr, SDL_DestroyWindow), renderer(nullptr, SDL_DestroyRenderer),
    top_bar{},
    bottom_bar{},
    left_bar{},
    file_tree{},
    file_viewer{},
    tab_bar{}
{
    init_sdl();
}

void Core::init() {
    quit = false;

    // init sdl materials

    win.reset(SDL_CreateWindow("sort visualizer", SDL_WINDOWPOS_UNDEFINED, SDL_WINDOWPOS_UNDEFINED, conf.window_w, conf.window_h, SDL_RENDERER_ACCELERATED));
    if (!win) {
        throw std::runtime_error(std::format("Error creating window {}", SDL_GetError()));
    }

    // index -1 automatically chooses driver
    renderer.reset(SDL_CreateRenderer(win.get(), -1, 0));
    if (!renderer) {
        throw std::runtime_error(std::format("Error creating renderer {}", SDL_GetError()));
    }

    SDL_RenderSetLogicalSize(renderer.get(), 1920, 917);

    top_bar = {0, 0, conf.window_w, 36};
    bottom_bar = {top_bar.x, conf.window_h - 27, top_bar.w, 27};
    left_bar = {top_bar.x, top_bar.y + top_bar.h, 36, conf.window_h - top_bar.h - bottom_bar.h};
    file_tree = {left_bar.x + left_bar.w, left_bar.y, 200, left_bar.h};
    tab_bar = {file_tree.x + file_tree.w, left_bar.y, conf.window_w - left_bar.w - file_tree.w, 36};
    file_viewer = {tab_bar.x, tab_bar.y + top_bar.h, tab_bar.w, left_bar.h - tab_bar.h};
}

void Core::draw_background() {
    // draw filled rects
    SDL_SetRenderDrawColor(renderer.get(), 60, 63, 65, 0);
    SDL_RenderFillRect(renderer.get(), &top_bar);

    SDL_SetRenderDrawColor(renderer.get(), 43, 45, 48, 0);
    SDL_RenderFillRect(renderer.get(), &bottom_bar);
    SDL_RenderFillRect(renderer.get(), &left_bar);
    SDL_RenderFillRect(renderer.get(), &file_tree);

    SDL_SetRenderDrawColor(renderer.get(), 30, 31, 34, 0);
    SDL_RenderFillRect(renderer.get(), &tab_bar);
    SDL_RenderFillRect(renderer.get(), &file_viewer);

    // draw outlines

    SDL_SetRenderDrawColor(renderer.get(), 57, 59, 64, 0);

    SDL_RenderDrawRect(renderer.get(), &top_bar);
    SDL_RenderDrawRect(renderer.get(), &bottom_bar);
    SDL_RenderDrawRect(renderer.get(), &left_bar);
    SDL_RenderDrawRect(renderer.get(), &file_tree);
    SDL_RenderDrawRect(renderer.get(), &tab_bar);
    SDL_RenderDrawRect(renderer.get(), &file_viewer);
}

void Core::init_sdl() {
    if (SDL_Init(SDL_INIT_VIDEO | SDL_INIT_EVENTS)) {
        throw std::runtime_error(std::format("Error initializing SDL {}", SDL_GetError()));
    }
}

void Core::quit_sdl() {
    SDL_Quit();
}

void Core::update() {
    // clear screen
    SDL_SetRenderDrawColor(renderer.get(), 0, 0, 0, 0);
    SDL_RenderClear(renderer.get());

    draw_background();

    SDL_RenderPresent(renderer.get());
}

void mainloop(void* arg) {
    static Core* core = static_cast<Core*>(arg);

    static SDL_Event event;
    static int mousex, mousey;

    while (SDL_PollEvent(&event)) {
        switch (event.type) {
            case SDL_KEYDOWN:
                break;
            case SDL_QUIT:
                #ifdef __EMSCRIPTEN__
                    emscripten_cancel_main_loop();
                #endif

                #ifndef __EMSCRIPTEN__
                    core->quit = true;
                #endif

                return;

            case SDL_MOUSEMOTION:
                break;

            case SDL_MOUSEWHEEL:
                break;

            default:
                break;
        }
    }

    core->update();

}

int main(int argc, char* argv[]) {
    Config config{
        1920,
        917,
        60.0,
    };

    Core core(config);
    core.init();

    #ifdef __EMSCRIPTEN__
    emscripten_set_main_loop_arg(mainloop, &core, 0, 1);
    #endif

    #ifndef __EMSCRIPTEN__
        while(!core.quit) mainloop(&core);
    #endif

    Core::quit_sdl();

    return 0;
}
