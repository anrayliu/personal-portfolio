from flask import Flask, render_template, redirect


app = Flask(__name__)

tab_map = {"cloud-engineer":"Cloud Engineer",
           "research-intern":"Research Intern",
           "gis-technician":"GIS Technician",
           "pyvidplayer2":"Pyvidplayer2",
           "home-lab":"Home Lab",
           "testmycs": "TestMyCS",
           "portfolio": "Portfolio",
           "volume-cleaner": "Volume Cleaner",
           "resume":"Resume",
           "readme":"README"}

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/<page>")
def custom_index(page: str = ""):
    if page in tab_map:
        return render_template("index.html", starting_page=tab_map[page])
    return redirect("/")

@app.route("/page/<page>")
def iframe_page(page: str):
    return render_template(page + ".html")


if __name__ == "__main__":
    app.run(debug=True, port=5001)
