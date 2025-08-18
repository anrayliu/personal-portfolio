cmake_minimum_required(VERSION 3.30)
project(PersonalPortfolio)

set(CMAKE_CXX_STANDARD 20)

set(SDL2_INCLUDE_DIR ${CMAKE_CURRENT_SOURCE_DIR}/SDL2/include)
set(SDL2_LIB_DIR ${CMAKE_CURRENT_SOURCE_DIR}/SDL2/lib)

include_directories(${SDL2_INCLUDE_DIR})
link_directories(${SDL2_LIB_DIR})
link_directories(${CMAKE_CURRENT_SOURCE_DIR}/assets)

aux_source_directory(src SRC_FILES)
add_executable(PersonalPortfolio ${SRC_FILES}
        src/Core.cpp
        src/Core.h
        src/Timer.cpp
        src/Timer.h
        src/Config.h
        src/Button.cpp
        src/Button.h
        src/TabButton.cpp
        src/DirButton.cpp
        src/FileButton.cpp
)

target_link_libraries(${PROJECT_NAME} mingw32 SDL2main SDL2 SDL2_image SDL2_ttf)
