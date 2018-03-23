from flask import Flask, Response, request, render_template, redirect, url_for
import json

app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')


# Closing the files ALMOST fixes weird behavior of file being overwritten.
#If refresh is crazy fast it overwrites the file with less items in cart.
@app.route("/savelist", methods=["POST"])
def save():
    content = request.get_json()
    text = open("remotestorage.txt","w")
    data = text.write(json.dumps(content))
    text.close()
    return redirect(url_for("index"))

@app.route("/getlist")
def getList():
    text = open("remotestorage.txt","r+")
    data = text.read()
    text.close()
    return data


app.run(debug=True, port=5001)
