## [https://www.anrayliu.ca](https://www.anrayliu.ca)

![cover.png](cover.png)

## Run Locally (Windows)

1. Install and activate `emscripten`
2. Create python vm and install packages
```
python -m venv .venv 
.venv\Scripts\activate
pip install -r requirements.txt
```
3. Run `python app.py` to start flask server
4. Run `.\compile.bat` to compile wasm files
