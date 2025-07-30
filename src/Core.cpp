#include "Core.h"
#include "SDL2/SDL_image.h"
#include <format>
#include <iostream>
#include <memory>

#ifdef __EMSCRIPTEN__
#include "emscripten.h"
#endif


Core::Core(const Config &config):
    conf(config),
    quit(false), win(nullptr, SDL_DestroyWindow), renderer(nullptr, SDL_DestroyRenderer), font(nullptr, TTF_CloseFont),
    top_bar{},
    bottom_bar{},
    left_bar{},
    file_tree{},
    file_viewer{},
    tab_bar{}, top_level(nullptr), dragging(false)
{
    init_sdl();
}

Core::~Core() {
    for (const TabButton* tb : tabs) {
        delete tb;
    }
}

void Core::init() {
    quit = false;

    // init sdl materials

    win.reset(SDL_CreateWindow(conf.title.c_str(), SDL_WINDOWPOS_UNDEFINED, SDL_WINDOWPOS_UNDEFINED, conf.window_w, conf.window_h, SDL_RENDERER_ACCELERATED));
    if (!win) {
        throw std::runtime_error(std::format("Error creating window {}", SDL_GetError()));
    }

    // index -1 automatically chooses driver
    renderer.reset(SDL_CreateRenderer(win.get(), -1, 0));
    if (!renderer) {
        throw std::runtime_error(std::format("Error creating renderer {}", SDL_GetError()));
    }

    font.reset(TTF_OpenFont("../assets/jetbrains-mono.ttf", FONT_SIZE));
    if (!font) {
        throw std::runtime_error(std::format("Error creating font {}", SDL_GetError()));
    }

    top_bar = {0, 0, conf.window_w, TOP_BAR_H};
    bottom_bar = {top_bar.x, conf.window_h - BOTTOM_BAR_H, top_bar.w, BOTTOM_BAR_H};
    left_bar = {top_bar.x, top_bar.y + top_bar.h, LEFT_BAR_W, conf.window_h - top_bar.h - bottom_bar.h};
    file_tree = {left_bar.x + left_bar.w, left_bar.y, FILE_TREE_W, left_bar.h};
    tab_bar = {file_tree.x + file_tree.w, left_bar.y, conf.window_w - left_bar.w - file_tree.w, TAB_BAR_H};
    file_viewer = {tab_bar.x, tab_bar.y + top_bar.h, tab_bar.w, left_bar.h - tab_bar.h};

    std::shared_ptr<SDL_Texture> collapse_icon = load_texture(renderer.get(), "../assets/collapse.png", FILE_BUTTON_H, FILE_BUTTON_H);
    std::shared_ptr<SDL_Texture> expand_icon = load_texture(renderer.get(), "../assets/expand.png", FILE_BUTTON_H, FILE_BUTTON_H);
    std::shared_ptr<SDL_Texture> dir_icon = load_texture(renderer.get(), "../assets/directory.png", FILE_BUTTON_H, FILE_BUTTON_H);
    std::shared_ptr<SDL_Texture> file_icon = load_texture(renderer.get(), "../assets/file.png", FILE_BUTTON_H, FILE_BUTTON_H);

    top_level = std::make_unique<DirButton>(collapse_icon, expand_icon, renderer.get(), font.get(), "Anray Liu");

    auto work_exp = new DirButton(collapse_icon, expand_icon, renderer.get(), font.get(), "Work Experience");

    auto stats_can = new FileButton(file_icon, renderer.get(), font.get(), "Cloud Engineer");

    work_exp->add_file(stats_can);

    auto projects = new DirButton(collapse_icon, expand_icon, renderer.get(), font.get(), "Projects");

    auto pyvidplayer = new FileButton(file_icon, renderer.get(), font.get(), "Pyvidplayer2");

    auto server = new FileButton(file_icon, renderer.get(), font.get(), "Home Server");

    projects->add_file(pyvidplayer);
    projects->add_file(server);

    auto readme = new FileButton(file_icon, renderer.get(), font.get(), "README");

    top_level->add_dir(work_exp);
    top_level->add_dir(projects);
    top_level->add_file(readme);

    move_iframe(file_viewer.x, file_viewer.y, file_viewer.w, file_viewer.h);

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

    // do not draw the file view
    // SDL_RenderFillRect(renderer.get(), &file_viewer);

    // draw outlines

    SDL_SetRenderDrawColor(renderer.get(), 57, 59, 64, 0);

    SDL_RenderDrawRect(renderer.get(), &top_bar);
    SDL_RenderDrawRect(renderer.get(), &bottom_bar);
    SDL_RenderDrawRect(renderer.get(), &left_bar);
    SDL_RenderDrawRect(renderer.get(), &file_tree);
    SDL_RenderDrawRect(renderer.get(), &tab_bar);
    SDL_RenderDrawRect(renderer.get(), &file_viewer);
}

void Core::draw_file_view() {

}

void Core::recursive_align(int x, int y, int w, int h, int* offset, Button *button) {
    button->rect = {x, y + *offset, w, h};
    *offset += FILE_BUTTON_H + FILE_BUTTON_SPACING_Y;

    auto dir = dynamic_cast<DirButton*>(button);
    if (dir && !dir->collapsed) {
        for (auto &file : dir->files) {
            recursive_align(x + FILE_BUTTON_TAB, y, w - FILE_BUTTON_TAB, h, offset, file);
        }
    }
}

void Core::recursive_update(Button *button) {
    button->update(renderer.get(), mousex, mousey, click);

    auto dir = dynamic_cast<DirButton *>(button);
    if (dir) {
        if (!dir->collapsed) {
            for (Button *sub_button: dir->files) {
                recursive_update(sub_button);
            }
        }
    } else {
        // is a file button
        if (button->click) {
            bool add = true;
            for (TabButton* &tab: tabs) {
                if (tab->text == button->text) {
                    add = false;
                    break;
                }
            }
            if (add) {
                auto* tb = new TabButton(nullptr, renderer.get(), font.get(), button->text);
                tabs.push_back(tb);
            }
        }
    }
}

void Core::move_iframe(int x, int y, int w, int h) {
#ifdef __EMSCRIPTEN__
    EM_ASM({
        const iframe = document.getElementById('webpage-iframe');
               iframe.style.left = ` ${$0}px`;
               iframe.style.top = ` ${$1}px`;
               iframe.style.width = ` ${$2}px`;
               iframe.style.height = ` ${$3}px`;
           }, x, y, w, h);
#endif
}

void Core::init_sdl() {
    if (SDL_Init(SDL_INIT_VIDEO | SDL_INIT_EVENTS)) {
        throw std::runtime_error(std::format("Error initializing SDL {}", SDL_GetError()));
    }

    constexpr int img_flags = IMG_INIT_PNG;
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

    SDL_SetTextureBlendMode(new_texture.get(), SDL_BLENDMODE_BLEND);
    SDL_SetTextureBlendMode(texture.get(), SDL_BLENDMODE_BLEND);

    SDL_SetRenderTarget(renderer, new_texture.get());

    SDL_Rect dest{0, 0, w, h};
    SDL_RenderCopy(renderer, texture.get(), nullptr, &dest);

    // reset render target
    SDL_SetRenderTarget(renderer, nullptr);

    return std::move(new_texture);
}

std::unique_ptr<SDL_Texture, decltype(&SDL_DestroyTexture)> Core::load_text(SDL_Renderer *renderer, TTF_Font *font,
    const string &text) {

    SDL_Color bg{207, 206, 196};
    SDL_Color fg{43, 45, 48};

    std::unique_ptr<SDL_Surface, decltype(&SDL_FreeSurface)> surf(TTF_RenderText_Shaded(font, text.c_str(), bg, fg),
                                                                  SDL_FreeSurface);
    std::unique_ptr<SDL_Texture, decltype(&SDL_DestroyTexture)> texture(SDL_CreateTextureFromSurface(renderer, surf.get()), SDL_DestroyTexture);

    return std::move(texture);
}

void Core::update() {
    // clear screen
    SDL_SetRenderDrawColor(renderer.get(), 0, 0, 0, 0);
    SDL_RenderClear(renderer.get());

    draw_background();

    // disable dragging for now

    // if (!dragging && click && abs(file_tree.x + file_tree.w - mousex) <= 10) {
    //     dragging = true;
    // }
    if (dragging) {
        file_tree.w = mousex - left_bar.w;
        tab_bar.x = file_viewer.x = file_tree.x + file_tree.w;
        tab_bar.w = file_viewer.w = conf.window_w - left_bar.w - file_tree.w;
        if (!(SDL_GetMouseState(nullptr, nullptr) & SDL_BUTTON(SDL_BUTTON_LEFT))) {
            dragging = false;
        }
        move_iframe(file_viewer.x, file_viewer.y, file_viewer.w, file_viewer.h);
    }

    int offset = 10;
    recursive_align(file_tree.x + FILE_BUTTON_SPACING_X, file_tree.y + FILE_BUTTON_SPACING_X,
                    file_tree.w - FILE_BUTTON_SPACING_X * 2, FILE_BUTTON_H, &offset, top_level.get());

    recursive_update(top_level.get());

    int w = tabs.size() == 0 ? TAB_W : std::min(TAB_W, file_viewer.w / static_cast<int>(tabs.size()));

    for (int i = 0; i < tabs.size(); i++) {
        tabs[i]->rect = {tab_bar.x + i * w, tab_bar.y, w, tab_bar.h};
        tabs[i]->update(renderer.get(), mousex, mousey, click);

        SDL_RenderDrawRect(renderer.get(), &tabs[i]->rect);
    }

    SDL_RenderPresent(renderer.get());
}

void mainloop(void* arg) {
    Core* core = static_cast<Core*>(arg);

    SDL_GetMouseState(&core->mousex, &core->mousey);
    core->click = false;

    SDL_Event event;
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
            "Anray Liu",
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
