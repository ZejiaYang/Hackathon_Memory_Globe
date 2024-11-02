# app.py
from flask import Flask, request, jsonify
from database.db_connection import MongoDBConnection
from database.neo4j_connection import Neo4jConnection
from services.memory_service import MemoryService
from services.graph_service import GraphService

app = Flask(__name__)

# Initialize connections
mongo_conn = MongoDBConnection(uri="mongodb://localhost:27017/", db_name="your_database")
neo4j_conn = Neo4jConnection(uri="bolt://localhost:7687", user="neo4j", password="your_password")

# Initialize services
memory_service = MemoryService(mongo_conn)
graph_service = GraphService(neo4j_conn)

@app.route('/memories', methods=['POST'])
def add_memory():
    data = request.json
    memory_id = memory_service.add_memory(data)
    
    # After inserting into MongoDB, also insert into Neo4j
    graph_service.insert_memory(
        text=data['text'],
        timestamp=data['timestamp'],
        keywords=data['keywords'],
        emotion_score=data['emotion_score']
    )

    # Optionally, compute connections and create relationships
    relevant_memory_ids = memory_service.compute_connections()  # Logic to compute connections
    for neighbor_id, weight in relevant_memory_ids:
        graph_service.create_relationship(memory_id, neighbor_id, weight)

    return jsonify({"message": "Memory added!", "memory_id": str(memory_id)}), 201

@app.route('/graph', methods=['GET'])
def get_graph():
    graph_data = graph_service.get_graph_data()
    return jsonify(graph_data)

if __name__ == '__main__':
    app.run(debug=True)
