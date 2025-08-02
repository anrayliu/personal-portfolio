#include "Core.h"
#include "SDL2/SDL_image.h"
#include <format>
#include <iostream>
#include <memory>

#include "Config.h"

#ifdef __EMSCRIPTEN__
#include "emscripten.h"
#endif


Core::Core():
    dragging(false), top_bar{}, bottom_bar{}, left_bar{},
    file_tree{},
    file_viewer{},
    tab_bar{},
    top_level(nullptr),
    selected_tab(nullptr), quit(false),
    win(nullptr, SDL_DestroyWindow), renderer(nullptr, SDL_DestroyRenderer), font(nullptr, TTF_CloseFont)
{
    init_sdl();
}

Core::~Core() {
    SDL_DestroyTexture(collapse_icon.get());
    SDL_DestroyTexture(expand_icon.get());
    SDL_DestroyTexture(close_icon.get());
    SDL_DestroyTexture(file_icon.get());
}

void Core::init() {
    quit = false;

    // init sdl materials

    win.reset(SDL_CreateWindow(Config::title.c_str(), SDL_WINDOWPOS_UNDEFINED, SDL_WINDOWPOS_UNDEFINED, Config::window_w, Config::window_h, SDL_RENDERER_ACCELERATED));
    if (!win) {
        throw std::runtime_error(std::format("Error creating window {}", SDL_GetError()));
    }

    // index -1 automatically chooses driver
    renderer.reset(SDL_CreateRenderer(win.get(), -1, 0));
    if (!renderer) {
        throw std::runtime_error(std::format("Error creating renderer {}", SDL_GetError()));
    }

    // linear interpolation
    SDL_SetHint (SDL_HINT_RENDER_SCALE_QUALITY, "1");

    font.reset(TTF_OpenFont("../assets/jetbrains-mono.ttf", Config::font_size));
    if (!font) {
        throw std::runtime_error(std::format("Error creating font {}", SDL_GetError()));
    }

    top_bar = {0, 0, Config::window_w, Config::top_bar_h};
    bottom_bar = {top_bar.x, Config::window_h - Config::bottom_bar_h, top_bar.w, Config::bottom_bar_h};
    left_bar = {top_bar.x, top_bar.y + top_bar.h, Config::left_bar_w, Config::window_h - top_bar.h - bottom_bar.h};
    file_tree = {left_bar.x + left_bar.w, left_bar.y, Config::file_tree_w, left_bar.h};
    tab_bar = {file_tree.x + file_tree.w, left_bar.y, Config::window_w - left_bar.w - file_tree.w, Config::tab_bar_h};
    file_viewer = {tab_bar.x, tab_bar.y + top_bar.h, tab_bar.w, left_bar.h - tab_bar.h};

    collapse_icon = load_texture(renderer.get(), "../assets/collapse.png", Config::file_button_h, Config::file_button_h);
    file_icon = load_texture(renderer.get(), "../assets/file.png", Config::file_button_h, Config::file_button_h);
    expand_icon = load_texture(renderer.get(), "../assets/expand.png", Config::file_button_h, Config::file_button_h);
    close_icon = load_texture(renderer.get(), "../assets/close.png", Config::tab_x_button_size, Config::tab_x_button_size);
    logo = load_texture(renderer.get(), "../assets/logo.png", 0, 0);

    construct_file_tree();

    move_iframe(file_viewer.x, file_viewer.y, file_viewer.w, file_viewer.h);
}

void Core::construct_file_tree() {
    top_level = std::make_unique<DirButton>(collapse_icon, expand_icon, renderer.get(), font.get(), "Anray Liu");

    std::unique_ptr<DirButton> work_exp = std::make_unique<DirButton>(collapse_icon, expand_icon, renderer.get(), font.get(), "Work Experience");

    std::unique_ptr<FileButton> item = std::make_unique<FileButton>(file_icon, renderer.get(), font.get(), "Cloud Engineer");
    work_exp->add_file(std::move(item));
    item = std::make_unique<FileButton>(file_icon, renderer.get(), font.get(), "Research Intern");
    work_exp->add_file(std::move(item));
    item = std::make_unique<FileButton>(file_icon, renderer.get(), font.get(), "GIS Technician");
    work_exp->add_file(std::move(item));

    std::unique_ptr<DirButton> projects = std::make_unique<DirButton>(collapse_icon, expand_icon, renderer.get(), font.get(), "Projects");

    item = std::make_unique<FileButton>(file_icon, renderer.get(), font.get(), "Pyvidplayer2");
    projects->add_file(std::move(item));
    item = std::make_unique<FileButton>(file_icon, renderer.get(), font.get(), "Home Server");
    projects->add_file(std::move(item));
    item = std::make_unique<FileButton>(file_icon, renderer.get(), font.get(), "TestMyCS");
    projects->add_file(std::move(item));
    item = std::make_unique<FileButton>(file_icon, renderer.get(), font.get(), "Volume Cleaner");
    projects->add_file(std::move(item));
    item = std::make_unique<FileButton>(file_icon, renderer.get(), font.get(), "Portfolio");
    projects->add_file(std::move(item));
    item = std::make_unique<FileButton>(file_icon, renderer.get(), font.get(), "Gomoku AI");
    projects->add_file(std::move(item));

    std::unique_ptr<FileButton> readme = std::make_unique<FileButton>(file_icon, renderer.get(), font.get(), "README");

    top_level->add_dir(std::move(work_exp));
    top_level->add_dir(std::move(projects));
    top_level->add_file(std::move(readme));
}

void Core::draw_background() {
    // draw filled rects
    SDL_SetRenderDrawColor(renderer.get(), Config::top_bar_colour.r, Config::top_bar_colour.g, Config::top_bar_colour.b, 0);
    SDL_RenderFillRect(renderer.get(), &top_bar);

    SDL_SetRenderDrawColor(renderer.get(), Config::left_bar_colour.r, Config::left_bar_colour.g, Config::left_bar_colour.b, 0);
    SDL_RenderFillRect(renderer.get(), &left_bar);
    SDL_RenderFillRect(renderer.get(), &bottom_bar);
    SDL_RenderFillRect(renderer.get(), &file_tree);

    SDL_SetRenderDrawColor(renderer.get(), Config::tab_bar_colour.r, Config::tab_bar_colour.g, Config::tab_bar_colour.b, 0);
    SDL_RenderFillRect(renderer.get(), &tab_bar);
    SDL_RenderFillRect(renderer.get(), &file_viewer);
}

void Core::draw_outlines() {
    SDL_SetRenderDrawColor(renderer.get(), Config::outline_colour.r, Config::outline_colour.g, Config::outline_colour.b, 0);

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
    *offset += Config::file_button_h + Config::file_button_spacing_y;

    auto dir = dynamic_cast<DirButton*>(button);
    if (dir && !dir->collapsed) {
        for (auto &file : dir->files) {
            recursive_align(x + Config::file_button_tab, y, w - Config::file_button_tab, h, offset, file.get());
        }
    }
}

void Core::recursive_update(Button *button) {
    button->update(renderer.get(), mousex, mousey, click);

    auto dir = dynamic_cast<DirButton*>(button);
    if (dir) {
        if (!dir->collapsed) {
            for (const auto& ptr : dir->files) {
                recursive_update(ptr.get());
            }
        }
    } else {
        // is a file button
        if (button->click) {
            int index = -1;
            for (int i = 0; i < tabs.size(); i ++) {
                if (tabs[i]->text == button->text) {
                    index = i;
                    break;
                }
            }
            if (index == -1) {
                std::shared_ptr<TabButton> tb = std::make_shared<TabButton>(close_icon, renderer.get(), font.get(), button->text);
                tabs.push_back(std::move(tb));
                if (!selected_tab) {
                    selected_tab.reset();
                }
                selected_tab = tabs[tabs.size() - 1];
            } else {
                if (tabs[index].get() != button) {
                    selected_tab.reset();
                    selected_tab = tabs[index];
                }
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

    if (w <= 0 || h <= 0) {
        return std::move(texture);
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
    const string &text, SDL_Color bg) {

    std::unique_ptr<SDL_Surface, decltype(&SDL_FreeSurface)> surf(TTF_RenderText_Shaded(font, text.c_str(), Config::text_colour, bg),
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
        tab_bar.w = file_viewer.w = Config::window_w - left_bar.w - file_tree.w;
        if (!(SDL_GetMouseState(nullptr, nullptr) & SDL_BUTTON(SDL_BUTTON_LEFT))) {
            dragging = false;
        }
        move_iframe(file_viewer.x, file_viewer.y, file_viewer.w, file_viewer.h);
    }

    int offset = 10;
    recursive_align(file_tree.x + Config::file_button_spacing_x, file_tree.y + Config::file_button_spacing_x,
                    file_tree.w - Config::file_button_spacing_x * 2, Config::file_button_h, &offset, top_level.get());

    recursive_update(top_level.get());

    SDL_SetRenderDrawColor(renderer.get(), Config::outline_colour.r, Config::outline_colour.g, Config::outline_colour.b, 255);

    // draw tabs
    const int w = tabs.empty() ? Config::tab_w : std::min(Config::tab_w, file_viewer.w / static_cast<int>(tabs.size()));

    for (int i = 0; i < tabs.size(); i++) {
        tabs[i]->rect = {tab_bar.x + i * w, tab_bar.y, w, tab_bar.h};
        tabs[i]->update(renderer.get(), mousex, mousey, click, selected_tab, tabs);

        SDL_SetRenderDrawColor(renderer.get(), Config::left_bar_colour.r, Config::left_bar_colour.g, Config::left_bar_colour.b, 255);
        SDL_RenderDrawRect(renderer.get(), &tabs[i]->rect);
    }

    // draw selected tab indicator
    if (selected_tab) {
        SDL_SetRenderDrawColor(renderer.get(), Config::select_tab_colour.r, Config::select_tab_colour.g, Config::select_tab_colour.b, 255);
        SDL_Rect dest{selected_tab->rect.x, selected_tab->rect.y + selected_tab->rect.h - 5, selected_tab->rect.w, 5};
        SDL_RenderFillRect(renderer.get(), &dest);
    }

    draw_outlines();

    // draw logo
    SDL_Rect dest{(Config::top_bar_h - Config::logo_size) / 2, (Config::top_bar_h - Config::logo_size) / 2, Config::logo_size, Config::logo_size};
    SDL_RenderCopy(renderer.get(), logo.get(), nullptr, &dest);

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
        Core core;
        core.init();

        #ifdef __EMSCRIPTEN__
                emscripten_set_main_loop_arg(mainloop, &core, 0, 1);
        #endif

        #ifndef __EMSCRIPTEN__
                while(!core.quit) {
                    mainloop(&core);
                    core.timer.tick(Config::fps);
                }
        #endif
    }

    // quit after core object is cleaned up
    // to prevent segfault
    Core::quit_sdl();

    return 0;
}
