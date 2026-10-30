from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)


CORS(
    app,
    origins=[
        "https://frontend-sc1y.onrender.com",
        "http://localhost:3000",
    ],
)

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

    if not task or not str(task).strip():
        return jsonify({"error": "Task cannot be empty"}), 400

    new_todo = {"id": todo_id, "task": task.strip()}
    todos.append(new_todo)
    todo_id += 1
    return jsonify(new_todo), 201


@app.route("/todos/<int:id>", methods=["DELETE"])
def delete_todo(id):
    global todos

    if not any(t["id"] == id for t in todos):
        return jsonify({"error": "Item not found"}), 404

    todos = [t for t in todos if t["id"] != id]
    return jsonify({"message": "Item deleted"}), 200


if __name__ == "__main__":
    app.run(debug=True)
