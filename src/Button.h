#ifndef FILEBUTTON_H
#define FILEBUTTON_H

#include <vector>

#include "SDL2/SDL.h"


class Button {
    SDL_Texture* icon;

    static bool collidepoint(const SDL_Rect &rect, int x, int y);
public:
    SDL_Rect rect;
    bool click;

    Button(SDL_Texture* icon);
    virtual ~Button();

    virtual void update(SDL_Renderer* renderer, int mousex, int mousey, bool mouse_down);
};


class FileButton : public Button {
public:
    FileButton(SDL_Texture *icon);
    ~FileButton();

    void update(SDL_Renderer* renderer, int mousex, int mousey, bool mouse_down) override;
};


class DirButton : public Button {
public:
    bool collapsed;
    std::vector<Button*> files;

    DirButton(SDL_Texture* icon);
    ~DirButton();

    void add_file(FileButton* button);
    void add_dir(DirButton* button);

    void update(SDL_Renderer* renderer, int mousex, int mousey, bool mouse_down) override;
};


#endif
