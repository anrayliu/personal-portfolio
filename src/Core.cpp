#include "Core.h"
#include "SDL2/SDL_image.h"

#include <format>
#include <iostream>
#include <memory>

#ifdef __EMSCRIPTEN__
#include "emscripten.h"
#endif


Core::Core(Config &config):
    conf(config),
    quit(false), win(nullptr, SDL_DestroyWindow), renderer(nullptr, SDL_DestroyRenderer), font(nullptr, TTF_CloseFont),
    top_bar{},
    bottom_bar{},
    left_bar{},
    file_tree{},
    file_viewer{},
    tab_bar{}, top_level(nullptr)
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

    font.reset(TTF_OpenFont("../assets/jetbrains-mono.ttf", 30));
    if (!font) {
        throw std::runtime_error(std::format("Error creating font {}", SDL_GetError()));
    }

    top_bar = {0, 0, conf.window_w, 36};
    bottom_bar = {top_bar.x, conf.window_h - 27, top_bar.w, 27};
    left_bar = {top_bar.x, top_bar.y + top_bar.h, 36, conf.window_h - top_bar.h - bottom_bar.h};
    file_tree = {left_bar.x + left_bar.w, left_bar.y, 200, left_bar.h};
    tab_bar = {file_tree.x + file_tree.w, left_bar.y, conf.window_w - left_bar.w - file_tree.w, 36};
    file_viewer = {tab_bar.x, tab_bar.y + top_bar.h, tab_bar.w, left_bar.h - tab_bar.h};

    std::shared_ptr<SDL_Texture> collapse = load_texture(renderer.get(), "../assets/collapse.png", FILE_BUTTON_H, FILE_BUTTON_H);
    std::shared_ptr<SDL_Texture> expand = load_texture(renderer.get(), "../assets/expand.png", FILE_BUTTON_H, FILE_BUTTON_H);
    std::shared_ptr<SDL_Texture> directory = load_texture(renderer.get(), "../assets/directory.png", FILE_BUTTON_H, FILE_BUTTON_H);
    std::shared_ptr<SDL_Texture> file = load_texture(renderer.get(), "../assets/file.png", FILE_BUTTON_H, FILE_BUTTON_H);

    top_level = std::make_unique<DirButton>(directory);

    auto* work_exp = new DirButton(nullptr);
    auto stat_can = new FileButton(nullptr);
    work_exp->add_file(stat_can);

    auto projects = new DirButton(nullptr);
    auto pyvidplayer = new FileButton(nullptr);
    work_exp->add_file(pyvidplayer);
    auto server = new FileButton(nullptr);
    projects->add_file(server);

    auto readme = new FileButton(nullptr);

    top_level->add_dir(work_exp);
    top_level->add_dir(projects);

    top_level->add_file(readme);

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

void Core::recursive_align(int x, int y, int w, int h, int* offset, Button *button) {
    button->rect = {x, y + *offset, w, h};
    *offset += 21 + 5;

    auto dir = dynamic_cast<DirButton*>(button);
    if (dir && !dir->collapsed) {
        for (auto &file : dir->files) {
            recursive_align(x + 30, y, w, h, offset, file);
        }
    }
}

void Core::recursive_update(Button *button) {
    button->update(renderer.get(), mousex, mousey, click);

    auto dir = dynamic_cast<DirButton *>(button);
    if (dir && !dir->collapsed) {
        for (Button *sub_button: dir->files) {
            recursive_update(sub_button);
        }
    }
}

void Core::init_sdl() {
    if (SDL_Init(SDL_INIT_VIDEO | SDL_INIT_EVENTS)) {
        throw std::runtime_error(std::format("Error initializing SDL {}", SDL_GetError()));
    }

    constexpr int img_flags = IMG_INIT_JPG | IMG_INIT_PNG;
    if ((IMG_Init(img_flags) & img_flags) != img_flags) {
        throw std::runtime_error(std::format("Error initializing SDL_IMG {}", SDL_GetError()));
    }

    if (TTF_Init()) {
        throw std::runtime_error(std::format("Error initializing SDL_TTF {}", SDL_GetError()));
    }
}

void Core::quit_sdl() {
    TTF_Quit();
    IMG_Quit();
    SDL_Quit();
}

std::shared_ptr<SDL_Texture> Core::load_texture(SDL_Renderer* renderer, const string &path, int w, int h) {
    // load image texture

    std::unique_ptr<SDL_Texture, decltype(&SDL_DestroyTexture)> texture(IMG_LoadTexture(renderer, path.c_str()), SDL_DestroyTexture);
    if (!texture) {
        throw std::runtime_error(std::format("Error loading texture {}", IMG_GetError()));
    }

    // lossy texture resampling

    Uint32 pixel_format;
    SDL_QueryTexture(texture.get(), &pixel_format, nullptr, nullptr, nullptr);

    std::unique_ptr<SDL_Texture, decltype(&SDL_DestroyTexture)> new_texture(
        SDL_CreateTexture(renderer, pixel_format, SDL_TEXTUREACCESS_TARGET, w, h), SDL_DestroyTexture);
    if (!new_texture) {
        throw std::runtime_error(std::format("Error creating texture {}", IMG_GetError()));
    }

    SDL_SetRenderTarget(renderer, new_texture.get());

    SDL_Rect dest{0, 0, w, h};
    SDL_RenderCopy(renderer, texture.get(), nullptr, &dest);

    SDL_SetTextureBlendMode(texture.get(), SDL_BLENDMODE_BLEND);

    // reset render target
    SDL_SetRenderTarget(renderer, nullptr);

    return std::move(new_texture);
}

void Core::update() {
    // clear screen
    SDL_SetRenderDrawColor(renderer.get(), 0, 0, 0, 0);
    SDL_RenderClear(renderer.get());

    draw_background();

    int offset = 0;
    recursive_align(file_tree.x + 5, file_tree.y + 5, file_tree.w - 10, 21, &offset, top_level.get());
    recursive_update(top_level.get());

    SDL_RenderPresent(renderer.get());
}

void mainloop(void* arg) {
    static Core* core = static_cast<Core*>(arg);

    static SDL_Event event;

    SDL_GetMouseState(&core->mousex, &core->mousey);
    core->click = false;

    while (SDL_PollEvent(&event)) {
        switch (event.type) {
            case SDL_MOUSEBUTTONDOWN:
                if (event.button.button == SDL_BUTTON_LEFT) {
                    core->click = true;
                }
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
    {
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
                while(!core.quit) {
                    mainloop(&core);
                    core.timer.tick(core.conf.fps);
                }
        #endif
    }

    // quit after core object is cleaned up
    // to prevent segfault
    Core::quit_sdl();

    return 0;
}
