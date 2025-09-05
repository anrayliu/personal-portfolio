from flask import Flask, render_template


app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/html/<page>")
def iframe_page(page: str):
    return render_template(page + ".html")


if __name__ == "__main__":
    app.run(debug=True, port=8000)
