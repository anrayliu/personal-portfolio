#include "Button.h"

#include <iostream>

#include "Config.h"
#include "SDL2/SDL_ttf.h"


Button::Button(const std::shared_ptr<SDL_Texture> &icon, std::unique_ptr<SDL_Texture, decltype(&SDL_DestroyTexture)> &text_texture)
: icon(icon), rect{}, click(false), text_texture(std::move(text_texture)) {
    int w;
    SDL_QueryTexture(text_texture.get(), nullptr, nullptr, &w, nullptr);
    std::cout << w << std::endl;
    texture_width = 300;
}

Button::~Button() {
    // textures are shared among all buttons, last one frees the texture

    if (icon && icon.use_count() == 1) {
        SDL_DestroyTexture(icon.get());
    }
}

void Button::update(SDL_Renderer *renderer, int mousex, int mousey, bool mouse_down) {
    click = mouse_down && collidepoint(rect, mousex, mousey);
    SDL_RenderDrawRect(renderer, &rect);
}

bool Button::collidepoint(const SDL_Rect &rect, int x, int y) {
    return x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h;
}

DirButton::DirButton(const std::shared_ptr<SDL_Texture> &collapse_icon, const std::shared_ptr<SDL_Texture> &expand_icon,
    std::unique_ptr<SDL_Texture, decltype(&SDL_DestroyTexture)> &text_texture)
: Button(nullptr, text_texture), collapsed(false), collapse_icon(collapse_icon), expand_icon(expand_icon) {}

DirButton::~DirButton() {
    for (Button* button: files) {
        delete button;
    }

    if (collapse_icon && collapse_icon.use_count() == 1) {
        SDL_DestroyTexture(icon.get());
    }
    if (expand_icon && expand_icon.use_count() == 1) {
        SDL_DestroyTexture(icon.get());
    }
}

void DirButton::add_file(FileButton* button) {
    files.push_back(button);
}

void DirButton::add_dir(DirButton *button) {
    files.push_back(button);
}

void DirButton::update(SDL_Renderer *renderer, int mousex, int mousey, bool mouse_down) {
    Button::update(renderer, mousex, mousey, mouse_down);

    if (click) {
        collapsed = !collapsed;
    }

    SDL_Rect dest = {rect.x, rect.y, FILE_BUTTON_H, FILE_BUTTON_H};
    SDL_RenderCopy(renderer, collapsed ? expand_icon.get() : collapse_icon.get(), nullptr, &dest);

    dest = {dest.x + dest.w, dest.y, texture_width, dest.h};
    SDL_RenderCopy(renderer, text_texture.get(), nullptr, &dest);
}

FileButton::FileButton(const std::shared_ptr<SDL_Texture> &icon, std::unique_ptr<SDL_Texture,
    decltype(&SDL_DestroyTexture)> &text_texture) : Button(icon, text_texture) {}

FileButton::~FileButton() {}

void FileButton::update(SDL_Renderer *renderer, int mousex, int mousey, bool mouse_down) {
    Button::update(renderer, mousex, mousey, mouse_down);
}
