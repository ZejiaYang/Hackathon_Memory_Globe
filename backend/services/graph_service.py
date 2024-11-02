from ..database.neo4j_connection import Neo4jConnection

class GraphService:
    def __init__(self, neo4j_conn):
        self.neo4j_conn = neo4j_conn

    def insert_memory(self, text, timestamp, keywords, emotion_score):
        return self.neo4j_conn.insert_memory(text, timestamp, keywords, emotion_score)

    def create_relationship(self, memory_id, neighbor_id, weight):
        return self.neo4j_conn.create_relationship(memory_id, neighbor_id, weight)

    def get_graph_data(self):
        return self.neo4j_conn.get_graph_data()

