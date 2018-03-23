from flask import Flask, Response, request, render_template, redirect, url_for
import json

app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/savelist", methods=["POST"])
def save():
    content = request.get_json()
    text = open("remotestorage.txt","w")
    text.write(json.dumps(content))
    text.close()

    # with open("remotestorage.txt", "w") as f:
        # f.write(json.dumps(content))
    return redirect(url_for("index"))

@app.route("/getlist")
def getList():
    text = open("remotestorage.txt","r+")
    # with open("remotestorage.txt","r") as f:
    data = text.read()
    text.close()
    return data


app.run(debug=True, port=5001)
