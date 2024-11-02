from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi


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
        # memory_data is a dict
        return self.db[self.collection].insert_one(memory_data)

    def retrieve_memory(self, query):
        return self.db[self.collection].find(query)

    def compute_connections(self):
        # Logic to compute connections (e.g., using similarity metrics)
        # graph algroithm to compute the connectinos 
        pass

    def get_relevant_memory_ids(self, memory_id):
        # Logic to retrieve relevant memory IDs based on some criteria
        # TODO: get relevant memory id
        pass
