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
        return self.db[self.collection].insert_one(memory_data)

    def retrieve_memory(self, query):
        return self.db[self.collection].find(query)

    def retrieve_all(self):
        return list(self.collection.find({}))

