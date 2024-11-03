# services/memory_service.py
from ..database.db_connection import MongoDBConnection
from .message_service import Message
import numpy as np
import pickle

class MemoryService:
    def __init__(self, mongo_conn = MongoDBConnection(), weight=0.5):
        self.mongo_conn = mongo_conn
        self.weight = weight
    
    def process_memory(self, memory, timestamp):
        message = Message(message=memory, timestamp=timestamp)
        message.compute_emotions()
        message.compute_embedding()
        connections = self.compute_connections(message)
        neighbours = message.update_memory(connections, self.weight)
        self.add_memory(message)
        return message.emotions, neighbours
        
    def add_memory(self, memory):
        return self.mongo_conn.insert_memory(memory.get_memory_data())

    def compute_connections(self, memory, top_k=5, freshness_weight=0.3, similarity_threshold=0.3):
        all_memory_nodes = self.mongo_conn.retrieve_all()
        node_embedding = memory.embedding
        similarity_scores = []
        for node in all_memory_nodes:
            other_embedding = pickle.loads(node['embedding'])
            similarity = self.cosine_similarity(node_embedding, other_embedding)
            time_difference = (memory.timestamp- node['timestamp']) / (60 * 60 * 24)  # in days
            freshness_score = max(0, 1 - time_difference / 30) 
            combined_score = (similarity * (1 - freshness_weight)) + (freshness_score * freshness_weight)
            if combined_score >= similarity_threshold:
                similarity_scores.append((node['_id'],  node['emotions'], combined_score))
        top_similar_nodes = sorted(similarity_scores, key=lambda x: x[2], reverse=True)[:top_k]
        combined_sum = sum([x[2] for x in top_similar_nodes])
        top_similar_nodes = [(id, emotion, score/combined_sum) for id, emotion, score in top_similar_nodes]
        return top_similar_nodes

    @staticmethod
    def cosine_similarity(vec_a, vec_b):
        dot_product = np.dot(vec_a, vec_b)
        norm_a = np.linalg.norm(vec_a)
        norm_b = np.linalg.norm(vec_b)
        if norm_a == 0 or norm_b == 0:
            return 0.0  #
        return dot_product / (norm_a * norm_b)
    
    def retrieve_memory(self, memory_id_list, top_k=3):
        return self.mongo_conn.retrieve_memory(memory_id_list)[:top_k]
    
    def delete_memory(self, memory):
        pass

