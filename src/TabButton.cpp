#include <algorithm>
#include "Config.h"
#include "Button.h"
#include "Core.h"


TabButton::TabButton(const std::shared_ptr<SDL_Texture> &icon, SDL_Renderer* renderer, TTF_Font* font, const std::string &text) :
Button(icon, renderer, font, text), x_rect{0, 0, Config::tab_x_button_size, Config::tab_x_button_size} {
    text_texture = Core::load_text(renderer, font, text, Config::tab_bar_colour);
    hover_texture = Core::load_text(renderer, font, text, Config::left_bar_colour);

    // get static file to load in iframe
    file = text;
    std::replace(file.begin(), file.end(), ' ', '-');
    // convert to lower case
    std::transform(file.begin(), file.end(), file.begin(),
    [](unsigned char c) {
        return std::tolower(c);
    });
    file += ".html";

}

void TabButton::update(SDL_Renderer *renderer, int mousex, int mousey, bool mouse_down,
    std::shared_ptr<TabButton> &selected, std::vector<std::shared_ptr<TabButton>> &tabs) {
    Button::update(renderer, mousex, mousey, mouse_down);

    int w = std::min(rect.w - rect.h, texture_width);
    SDL_Rect src = {0, 0, w, texture_height};
    SDL_Rect dest = {rect.x + rect.w / 2 - w / 2, rect.y + rect.h / 2 - texture_height / 2, w, texture_height};

    if (hover) {
        SDL_SetRenderDrawColor(renderer, Config::left_bar_colour.r, Config::left_bar_colour.g, Config::left_bar_colour.b, 255);
        SDL_Rect highlight_rect{rect.x, rect.y, rect.w, rect.h};
        SDL_RenderFillRect(renderer, &highlight_rect);
        SDL_RenderCopy(renderer, hover_texture.get(), &src, &dest);

        x_rect.x = rect.x + rect.w - Config::tab_x_button_size - 10;
        x_rect.y = rect.y + rect.h / 2 - Config::tab_x_button_size / 2;

        // check if x button hover
        if (mousex >= x_rect.x && mousex <= x_rect.x + rect.w && mousey >= x_rect.y && mousey <= x_rect.y + x_rect.h) {
            SDL_SetRenderDrawColor(renderer, Config::tab_bar_colour.r, Config::tab_bar_colour.g, Config::tab_bar_colour.b, 255);
            SDL_RenderFillRect(renderer, &x_rect);

            if (click) {
                // close tab
                for (int i = 0; i < tabs.size(); i ++) {
                    if (tabs[i].get() == this) {
                        tabs.erase(tabs.begin() + i);
                        if (selected.get() == this) {
                            selected.reset();
                            if (!tabs.empty()) {
                                selected = tabs[tabs.size() - 1];
                            }
                        }
                        return;
                    }
                }
            }
        }

        // tab is clicked
        if (click) {
            for (auto & tab : tabs) {
                if (tab.get() == this) {
                    selected.reset();
                    selected = tab;
                    break;
                }
            }
        }

        SDL_RenderCopy(renderer, icon.get(), nullptr, &x_rect);

    } else {
        SDL_RenderCopy(renderer, text_texture.get(), &src, &dest);
    }
}
