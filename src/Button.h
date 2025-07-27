#ifndef BUTTON_H
#define BUTTON_H

#include <memory>
#include <vector>

#include "SDL2/SDL.h"
#include "SDL2/SDL_ttf.h"


class Button {
    static bool collidepoint(const SDL_Rect &rect, int x, int y);
public:
    std::shared_ptr<SDL_Texture> icon;
    SDL_Rect rect;
    bool click;

    std::string text;
    std::unique_ptr<SDL_Texture, decltype(&SDL_DestroyTexture)> text_texture;
    int texture_width;

    Button(const std::shared_ptr<SDL_Texture> &icon, SDL_Renderer* renderer, TTF_Font* font, const std::string &text);
    virtual ~Button();

    virtual void update(SDL_Renderer* renderer, int mousex, int mousey, bool mouse_down);
};

class FileButton : public Button {
public:
    FileButton(const std::shared_ptr<SDL_Texture> &icon, SDL_Renderer* renderer, TTF_Font* font, const std::string &text);
    ~FileButton();

    void update(SDL_Renderer* renderer, int mousex, int mousey, bool mouse_down) override;
};

class DirButton : public Button {
public:
    bool collapsed;
    std::vector<Button*> files;

    std::shared_ptr<SDL_Texture> collapse_icon;
    std::shared_ptr<SDL_Texture> expand_icon;

    DirButton(const std::shared_ptr<SDL_Texture> &collapse_icon, const std::shared_ptr<SDL_Texture> &expand_icon, SDL_Renderer* renderer, TTF_Font* font, const std::string &text);
    ~DirButton();

    void add_file(FileButton* button);
    void add_dir(DirButton* button);

    void update(SDL_Renderer* renderer, int mousex, int mousey, bool mouse_down) override;
};


#endif
