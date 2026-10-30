from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["https://flask-frontend-30ir.onrender.com"])
todo_id = 1
todos = []


@app.route("/todos", methods=["GET"])
def show_todo():
    return jsonify(todos)


@app.route("/todos", methods=["POST"])
def add_todo():
    global todo_id
    if not request.is_json:
        return jsonify({"error": "Give request in json format"}), 400

    data = request.get_json()
    task = data.get("task")

    new_todo = {"id": todo_id, "task": task}

    todos.append(new_todo)
    todo_id = todo_id + 1

    return jsonify(new_todo), 201


@app.route("/todos/<int:id>", methods=["DELETE"])
def delete_todo(id):
    global todos
    todos = [t for t in todos if t["id"] != id]
    return jsonify({"message": "Item deleted"})
