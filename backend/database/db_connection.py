from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import numpy as np
from datetime import datetime

TEST = 1

class MongoDBConnection:
    def __init__(self, uri, db_name, collection):
        self.client = MongoClient(uri, server_api=ServerApi('1'))
        if TEST: 
            try:
                self.client.admin.command('ping')
                print("Pinged your deployment. You successfully connected to MongoDB!")
            except Exception as e:
                print(e)
        self.db = self.client[db_name]
        self.collection = collection

    def close(self):
        self.client.close()

    def insert_memory(self, memory_data):
        return self.db[self.collection].insert_one(memory_data)

    def retrieve_memory(self, query):
        return self.db[self.collection].find(query)

    def compute_connections(self, memory, top_k=5, freshness_weight=0.5, similarity_threshold=0.001):
        # Fetch all memory nodes from the MongoDB collection
        all_memory_nodes = list(self.collection.find({}))
        now = datetime.fromisoformat(memory.timestamp.replace("Z", "+00:00"))
        node_embedding = np.array(memory.embedding) 
        similarity_scores = []
        for node in all_memory_nodes:
            # Calculate cosine similarity
            other_embedding = np.array(node['embedding'])
            similarity = self.cosine_similarity(node_embedding, other_embedding)
            other = datetime.fromisoformat(node['timestamp'].replace("Z", "+00:00")) 
            time_difference = (now - other).total_seconds() / (60 * 60 * 24)  # in days
            freshness_score = max(0, 1 - time_difference / 30) 
            # Combine similarity and freshness
            combined_score = (similarity * (1 - freshness_weight)) + (freshness_score * freshness_weight)
            if combined_score >= similarity_threshold:
                similarity_scores.append((node['_id'],  node['emotions'], combined_score,))
        top_similar_nodes = sorted(similarity_scores, key=lambda x: x[2], reverse=True)[:top_k]
        combined_sum = sum([x[3] for x in top_similar_nodes])
        top_similar_nodes = {(id, emotion, score/combined_sum) for id, emotion, score in top_similar_nodes}
        return top_similar_nodes

    @staticmethod
    def cosine_similarity(vec_a, vec_b):
        dot_product = np.dot(vec_a, vec_b)
        norm_a = np.linalg.norm(vec_a)
        norm_b = np.linalg.norm(vec_b)
        if norm_a == 0 or norm_b == 0:
            return 0.0  # Avoid division by zero
        return dot_product / (norm_a * norm_b)
