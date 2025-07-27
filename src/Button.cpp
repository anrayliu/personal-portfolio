#include "Button.h"

#include <iostream>


Button::Button(SDL_Texture* icon) : icon(icon), click(false) {}

Button::~Button() {
    SDL_DestroyTexture(icon);
}

void Button::update(SDL_Renderer *renderer, int mousex, int mousey, bool mouse_down) {
    click = mouse_down && collidepoint(rect, mousex, mousey);
    SDL_RenderDrawRect(renderer, &rect);
}

bool Button::collidepoint(const SDL_Rect &rect, int x, int y) {
    return x >= rect.x && x <= rect.x + rect.w && y >= rect.y && y <= rect.y + rect.h;
}

DirButton::DirButton(SDL_Texture* icon) : Button(icon), collapsed(false) {}

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

FileButton::FileButton(SDL_Texture* icon) : Button(icon) {}

FileButton::~FileButton() {}

void FileButton::update(SDL_Renderer *renderer, int mousex, int mousey, bool mouse_down) {
    Button::update(renderer, mousex, mousey, mouse_down);
}
