from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
import os
from datetime import datetime
from bson import ObjectId
load_dotenv()
URL = os.getenv('MONGO_URL')
TEST = 1

class MongoDBConnection:
    def __init__(self, uri=URL, db_name='memory_database', collection='memories'):
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
        try:
            self.db[self.collection].insert_one(memory_data)
            print("Document inserted successfully.")
        except Exception as e:
            print(f"An error occurred: {e}")


    def retrieve_memory(self, memory_id_list):
        try:
            memory_id_list = [ObjectId(id) for id in memory_id_list]
            results = self.db[self.collection].find({"_id": {"$in": list(memory_id_list)}})
            memory_list = []
            for document in results:
                print(document['timestamp'])
                memory_list.append((document['timestamp'], document["text"]))
            return memory_list
        
        except Exception as e:
            print(f"An error occurred while retrieving memory: {e}")
        return []


    def retrieve_all(self):
        return list(self.db[self.collection].find({}))

if __name__ == '__main__':
    m = MongoDBConnection()
    key_list = ['67278f07b6d9426b79cc0799', '67278ed5b6d9426b79cc0798', '672785aaa9eb0273a95f91e4', '672784d98da127c87d101113', '6727825d14f2ee020439480a']
    print(m.retrieve_memory(key_list))