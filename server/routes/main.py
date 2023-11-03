from flask import Blueprint, jsonify, request
from models.testmod import Item
from database.database import db

main_routes = Blueprint("main", __name__)


@main_routes.route("/api/data", methods=["GET"])
def get_data():
    items = Item.query.all()
    data = [{"id": item.id, "name": item.name} for item in items]
    return jsonify(data)


@main_routes.route("/api/data", methods=["POST"])
def post_data():
    if request.method == "POST":
        data = request.get_json()
        if "name" in data:
            new_item = Item(name=data["name"])
            db.session.add(new_item)
            db.session.commit()
            return jsonify({"message": "Item added successfully"})
        else:
            return jsonify({"error": "Invalid data format"}, 400)


@main_routes.route("/api/data/<int:id>", methods=["DELETE"])
def delete_data(id):
    item = Item.query.get(id)
    if item:
        db.session.delete(item)
        db.session.commit()
        return jsonify({"message": "Item deleted successfully"})
    else:
        return jsonify({"error": "Item not found"}, 404)