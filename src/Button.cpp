#include "Button.h"
#include "Config.h"


Button::Button(const std::shared_ptr<SDL_Texture> &icon, SDL_Renderer *renderer, TTF_Font *font,
               const std::string &text)
    : icon(icon), rect{}, click(false), hover(false), text(text), text_texture(nullptr, SDL_DestroyTexture),
      hover_texture(nullptr, SDL_DestroyTexture),
      select_texture(nullptr, SDL_DestroyTexture), texture_width(0) {
    TTF_SizeText(font, text.c_str(), &texture_width, &texture_height);
}

void Button::update(SDL_Renderer *renderer, int mousex, int mousey, bool mouse_down) {
    hover = mousex >= rect.x && mousex <= rect.x + rect.w && mousey >= rect.y && mousey <= rect.y + rect.h;
    click = mouse_down && hover;
}
