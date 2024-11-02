# services/memory_service.py
from ..database.db_connection import MongoDBConnection
from message_service import Message

class MemoryService:
    def __init__(self, mongo_conn:MongoDBConnection, weight=0.5):
        self.mongo_conn = mongo_conn
        self.weight = weight
    
    def process_memory(self, memory, timestamp):
        message = Message(message=memory, timestamp=timestamp)
        message.compute_emotions()
        message.compute_embedding()
        # connections return a dict {id:[weight, emotios]}
        connections = self.compute_connections(message)
        # update memory
        neighbours = message.update_memory(connections, self.weight)
        # return previous relevant history and emotion scores (aggrgate)
        self.add_memory(message)
        # for the fronEnd - emotions and edge weights - graph visualizatio
        return message.emotions, neighbours
        
    def add_memory(self, memory):
        # add the meory 
        return self.mongo_conn.insert_memory(memory.get_memory_data())

    def compute_connections(self, memory):
        return self.mongo_conn.compute_connections(memory)
    
    def delete_memory(self, memory):
        pass

