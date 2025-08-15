#include "Button.h"
#include "Config.h"
#include "Core.h"


FileButton::FileButton(const std::shared_ptr<SDL_Texture> &icon, SDL_Renderer* renderer, TTF_Font* font, const std::string &text) : Button(icon, renderer, font, text) {
    text_texture = Core::load_text(renderer, font, text, Config::left_bar_colour);
    hover_texture = Core::load_text(renderer, font, text, Config::tab_bar_colour);
    rect.w = texture_width + Config::file_button_h + Config::icon_spacing;
    rect.h = Config::file_button_h;
}

void FileButton::update(SDL_Renderer *renderer, int mousex, int mousey, bool mouse_down, int file_tree_w) {
    // Button::update(renderer, mousex, mousey, mouse_down, file_tree_w);

    hover = mousex >= Config::left_bar_w && mousex <= Config::left_bar_w + file_tree_w  - Config::drag_tolerance && mousey >= rect.y && mousey <= rect.y + rect.h;
    click = mouse_down && hover;

    SDL_Rect src = {0, 0, rect.w - rect.h, rect.h};
    SDL_Rect dest = {rect.x + Config::file_button_h + Config::icon_spacing, rect.y + (rect.h - texture_height) / 2, std::min(rect.w - rect.h, texture_width), texture_height};

    if (hover) {
        SDL_SetRenderDrawColor(renderer, Config::tab_bar_colour.r, Config::tab_bar_colour.g, Config::tab_bar_colour.b, 255);
        SDL_Rect highlight_rect{Config::left_bar_w, rect.y, file_tree_w, rect.h};
        SDL_RenderFillRect(renderer, &highlight_rect);

        SDL_RenderCopy(renderer, hover_texture.get(), &src, &dest);
    } else {
        SDL_RenderCopy(renderer, text_texture.get(), &src, &dest);
    }

    dest = {rect.x, rect.y, Config::file_button_h, Config::file_button_h};
    SDL_RenderCopy(renderer, icon.get(), nullptr, &dest);
}
