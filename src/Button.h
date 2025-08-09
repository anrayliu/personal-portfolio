#ifndef BUTTON_H
#define BUTTON_H

#include <memory>
#include <vector>
#include "SDL2/SDL.h"
#include "SDL2/SDL_ttf.h"


class Button {
public:
    virtual ~Button() = default;

    std::shared_ptr<SDL_Texture> icon;
    SDL_Rect rect;
    bool click;
    bool hover;

    std::string text;
    std::unique_ptr<SDL_Texture, decltype(&SDL_DestroyTexture)> text_texture;
    std::unique_ptr<SDL_Texture, decltype(&SDL_DestroyTexture)> hover_texture;
    std::unique_ptr<SDL_Texture, decltype(&SDL_DestroyTexture)> select_texture;
    int texture_width;
    int texture_height{};

    Button(const std::shared_ptr<SDL_Texture> &icon, SDL_Renderer* renderer, TTF_Font* font, const std::string &text);

    virtual void update(SDL_Renderer* renderer, int mousex, int mousey, bool mouse_down);
};

class TabButton : public Button {
public:
    // x button
    SDL_Rect x_rect;
    std::string file;

    TabButton(const std::shared_ptr<SDL_Texture> &icon, SDL_Renderer* renderer, TTF_Font* font, const std::string &text);

    void update(SDL_Renderer* renderer, int mousex, int mousey, bool mouse_down,
    std::shared_ptr<TabButton> &selected, std::vector<std::shared_ptr<TabButton>> &tabs);
};

class FileButton : public Button {
public:
    FileButton(const std::shared_ptr<SDL_Texture> &icon, SDL_Renderer* renderer, TTF_Font* font, const std::string &text);

    void update(SDL_Renderer* renderer, int mousex, int mousey, bool mouse_down) override;
};

class DirButton : public Button {
public:
    bool collapsed;
    std::vector<std::unique_ptr<Button>> files;

    std::shared_ptr<SDL_Texture> collapse_icon;
    std::shared_ptr<SDL_Texture> expand_icon;

    DirButton(const std::shared_ptr<SDL_Texture> &collapse_icon, const std::shared_ptr<SDL_Texture> &expand_icon, SDL_Renderer* renderer, TTF_Font* font, const std::string &text);

    void add_file(std::unique_ptr<FileButton> button);
    void add_dir(std::unique_ptr<DirButton> button);

    void update(SDL_Renderer* renderer, int mousex, int mousey, bool mouse_down) override;
};


#endif
