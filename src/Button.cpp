#include "Button.h"
#include "Config.h"
#include "Core.h"
#include "SDL2/SDL_ttf.h"

extern Config conf;

Button::Button(const std::shared_ptr<SDL_Texture> &icon, SDL_Renderer* renderer, TTF_Font* font, const std::string &text)
: icon(icon), rect{}, click(false), hover(false), text(text), text_texture(nullptr, SDL_DestroyTexture), hover_texture(nullptr, SDL_DestroyTexture),
select_texture(nullptr, SDL_DestroyTexture), texture_width(0) {
    TTF_SizeText(font, text.c_str(), &texture_width, &texture_height);
}

void Button::update(SDL_Renderer *renderer, int mousex, int mousey, bool mouse_down) {
    hover = mousex >= rect.x && mousex <= rect.x + rect.w && mousey >= rect.y && mousey <= rect.y + rect.h;
    click = mouse_down && hover;
}

bool Button::collidepoint(const SDL_Rect &rect, int x, int y) {
    return x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h;
}


DirButton::DirButton(const std::shared_ptr<SDL_Texture> &collapse_icon, const std::shared_ptr<SDL_Texture> &expand_icon, SDL_Renderer* renderer, TTF_Font* font, const std::string &text)
: Button(nullptr, renderer, font, text), collapsed(false), collapse_icon(collapse_icon), expand_icon(expand_icon) {
    text_texture = Core::load_text(renderer, font, text, conf.left_bar_colour);
    hover_texture = Core::load_text(renderer, font, text, conf.tab_bar_colour);
}

void DirButton::add_file(std::unique_ptr<FileButton> button) {
    files.push_back(std::move(button));
}

void DirButton::add_dir(std::unique_ptr<DirButton> button) {
    files.push_back(std::move(button));
}

void DirButton::update(SDL_Renderer *renderer, int mousex, int mousey, bool mouse_down) {
    Button::update(renderer, mousex, mousey, mouse_down);

    if (click) {
        collapsed = !collapsed;
    }

    SDL_Rect src = {0, 0, rect.w - rect.h, rect.h};
    SDL_Rect dest = {rect.x + conf.file_button_h, rect.y, std::min(rect.w - rect.h, texture_width), conf.file_button_h};

    if (hover) {
        SDL_SetRenderDrawColor(renderer, conf.tab_bar_colour.r, conf.tab_bar_colour.g, conf.tab_bar_colour.b, 255);
        SDL_Rect highlight_rect{conf.left_bar_w, rect.y, conf.file_tree_w, rect.h};
        SDL_RenderFillRect(renderer, &highlight_rect);
        SDL_RenderCopy(renderer, hover_texture.get(), &src, &dest);
    } else {
        SDL_RenderCopy(renderer, text_texture.get(), &src, &dest);
    }

    dest = {rect.x, rect.y, conf.file_button_h, conf.file_button_h};
    SDL_RenderCopy(renderer, collapsed ? expand_icon.get() : collapse_icon.get(), nullptr, &dest);
}

FileButton::FileButton(const std::shared_ptr<SDL_Texture> &icon, SDL_Renderer* renderer, TTF_Font* font, const std::string &text) : Button(icon, renderer, font, text) {
    text_texture = Core::load_text(renderer, font, text, conf.left_bar_colour);
    hover_texture = Core::load_text(renderer, font, text, conf.tab_bar_colour);
}

void FileButton::update(SDL_Renderer *renderer, int mousex, int mousey, bool mouse_down) {
    Button::update(renderer, mousex, mousey, mouse_down);

    SDL_Rect src = {0, 0, rect.w - rect.h, rect.h};
    SDL_Rect dest = {rect.x + conf.file_button_h, rect.y, std::min(rect.w - rect.h, texture_width), conf.file_button_h};

    if (hover) {
        SDL_SetRenderDrawColor(renderer, conf.tab_bar_colour.r, conf.tab_bar_colour.g, conf.tab_bar_colour.b, 255);
        SDL_Rect highlight_rect{conf.left_bar_w, rect.y, conf.file_tree_w, rect.h};
        SDL_RenderFillRect(renderer, &highlight_rect);
        SDL_RenderCopy(renderer, hover_texture.get(), &src, &dest);
    } else {
        SDL_RenderCopy(renderer, text_texture.get(), &src, &dest);
    }

    dest = {rect.x, rect.y, conf.file_button_h, conf.file_button_h};
    SDL_RenderCopy(renderer, icon.get(), nullptr, &dest);
}

TabButton::TabButton(const std::shared_ptr<SDL_Texture> &icon, SDL_Renderer* renderer, TTF_Font* font, const std::string &text) : Button(icon, renderer, font, text) {
    text_texture = Core::load_text(renderer, font, text, conf.tab_bar_colour);
    hover_texture = Core::load_text(renderer, font, text, conf.left_bar_colour);
}

void TabButton::update(SDL_Renderer *renderer, int mousex, int mousey, bool mouse_down) {
    Button::update(renderer, mousex, mousey, mouse_down);

    int w = std::min(rect.w - rect.h, texture_width);
    SDL_Rect src = {0, 0, w, texture_height};
    SDL_Rect dest = {rect.x + rect.w / 2 - w / 2, rect.y + rect.h / 2 - conf.file_button_h / 2, w, conf.file_button_h};

    if (hover) {
        SDL_SetRenderDrawColor(renderer, conf.left_bar_colour.r, conf.left_bar_colour.g, conf.left_bar_colour.b, 255);
        SDL_Rect highlight_rect{rect.x, rect.y, rect.w, rect.h};
        SDL_RenderFillRect(renderer, &highlight_rect);
        SDL_RenderCopy(renderer, hover_texture.get(), &src, &dest);

        dest = {rect.x + rect.w - conf.file_button_h - 10, dest.y, conf.file_button_h, conf.file_button_h};
        SDL_RenderCopy(renderer, icon.get(), nullptr, &dest);


    } else {
        SDL_RenderCopy(renderer, text_texture.get(), &src, &dest);
    }
}
