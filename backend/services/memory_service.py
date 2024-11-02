# services/memory_service.py
from database.db_connection import MongoDBConnection

class MemoryService:
    def __init__(self, mongo_conn):
        self.mongo_conn = mongo_conn

    def add_memory(self, memory_data):
        memory_id = self.mongo_conn.insert_memory(memory_data)
        return memory_id

    def compute_connections(self):
        return self.mongo_conn.compute_connections()

    def get_relevant_memory_ids(self, memory_id):
        return self.mongo_conn.get_relevant_memory_ids(memory_id)

