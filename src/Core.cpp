#include "Core.h"
#include <format>
#include "SDL2/SDL_image.h"

#ifdef __EMSCRIPTEN__
#include "emscripten.h"
#endif

Core::Core(Config &config):
    conf(config),
    quit(false), win(nullptr, SDL_DestroyWindow), renderer(nullptr, SDL_DestroyRenderer)
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
    SDL_SetRenderDrawColor(renderer.get(), 255, 0, 0, 0);

    SDL_RenderClear(renderer.get());

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
        1280,
        720,
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
