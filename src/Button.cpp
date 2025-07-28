#include "Button.h"
#include "Config.h"
#include "Core.h"
#include "SDL2/SDL_ttf.h"


Button::Button(const std::shared_ptr<SDL_Texture> &icon, SDL_Renderer* renderer, TTF_Font* font, const std::string &text)
: icon(icon), rect{}, click(false), text_texture(nullptr, SDL_DestroyTexture), texture_width(0) {
    text_texture = Core::load_text(renderer, font, text);
    TTF_SizeText(font, text.c_str(), &texture_width, nullptr);
}

Button::~Button() {
    // textures are shared among all buttons, last one frees the texture

    if (icon && icon.use_count() == 1) {
        SDL_DestroyTexture(icon.get());
    }
}

void Button::update(SDL_Renderer *renderer, int mousex, int mousey, bool mouse_down) {
    click = mouse_down && mousex >= LEFT_BAR_W && mousex <= rect.x + rect.w && mousey >= rect.y && mousey <= rect.y + rect.h;

    SDL_Rect src = {0, 0, rect.w - rect.h, rect.h};
    SDL_Rect dest = {rect.x + FILE_BUTTON_H, rect.y, std::min(rect.w - rect.h, texture_width), FILE_BUTTON_H};
    SDL_RenderCopy(renderer, text_texture.get(), &src, &dest);
}

bool Button::collidepoint(const SDL_Rect &rect, int x, int y) {
    return x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h;
}

DirButton::DirButton(const std::shared_ptr<SDL_Texture> &collapse_icon, const std::shared_ptr<SDL_Texture> &expand_icon, SDL_Renderer* renderer, TTF_Font* font, const std::string &text)
: Button(nullptr, renderer, font, text), collapsed(false), collapse_icon(collapse_icon), expand_icon(expand_icon) {}

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
}

FileButton::FileButton(const std::shared_ptr<SDL_Texture> &icon, SDL_Renderer* renderer, TTF_Font* font, const std::string &text) : Button(icon, renderer, font, text) {}

void FileButton::update(SDL_Renderer *renderer, int mousex, int mousey, bool mouse_down) {
    Button::update(renderer, mousex, mousey, mouse_down);

    SDL_Rect dest = {rect.x, rect.y, FILE_BUTTON_H, FILE_BUTTON_H};
    SDL_RenderCopy(renderer, icon.get(), nullptr, &dest);
}
