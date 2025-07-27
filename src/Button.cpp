#include "Button.h"

#include <iostream>

#include "Config.h"


Button::Button(std::shared_ptr<SDL_Texture> icon) : icon(icon), click(false) {}

Button::~Button() {
    // textures are shared among all buttons, last one frees the texture

    if (icon.use_count() == 1) {
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

DirButton::DirButton(std::shared_ptr<SDL_Texture> icon) : Button(icon), collapsed(false) {}

DirButton::~DirButton() {
    for (Button* button: files) {
        delete button;
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
}

FileButton::FileButton(std::shared_ptr<SDL_Texture> icon) : Button(icon) {}

FileButton::~FileButton() {}

void FileButton::update(SDL_Renderer *renderer, int mousex, int mousey, bool mouse_down) {
    Button::update(renderer, mousex, mousey, mouse_down);
}
