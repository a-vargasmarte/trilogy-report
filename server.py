from flask import Flask, render_template, jsonify
from flask_cors import CORS
import random
import json
with open('scores.json') as data:
    d = json.load(data)

app = Flask(__name__)

CORS(app)

@app.route('/hello')
def sayHello():
    return jsonify(d)

if __name__ == '__main__':
    app.run()