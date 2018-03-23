from flask import Flask, Response, request, render_template, redirect, url_for
import json

app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/savelist", methods=["POST"])
def save():
    content = request.get_json()
    with open("remotestorage.txt", "w") as f:
        f.write(json.dumps(content))
    f.close()
    return redirect(url_for("index"))

@app.route("/getlist")
def getList():
    with open("remotestorage.txt","r") as f:
        data = f.read()
    f.close()
    return data


app.run(debug=True, port=5001)
