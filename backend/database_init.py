from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
from database.db_connection import MongoDBConnection
from bson import ObjectId
import os

previous_history = [{
    "text": "I swam in the clear blue lake and watched the ducks glide by.",
    "keywords": {
      "noun": ["lake", "ducks"],
      "adjective": ["clear", "blue"],
      "verb": ["swam", "watched", "glide"]
    },
    "emotion_scores": [0.7, 0.0, 0.0, 0.1, 0.0],
    "neighbours": [],
    "timestamp": new Date("2024-11-01T10:00:00Z")
  },
  {
    "text": "I hiked up the trail and noticed the vibrant colors of the leaves.",
    "keywords": {
      "noun": ["trail", "colors", "leaves"],
      "adjective": ["vibrant"],
      "verb": ["hiked", "noticed"]
    },
    "emotion_scores": [0.6, 0.0, 0.0, 0.0, 0.0],
    "neighbours": [],
    "timestamp": new Date("2024-11-01T12:00:00Z")
  },
  {
    "text": "I finished reading a novel about a journey through the mountains.",
    "keywords": {
      "noun": ["novel", "journey", "mountains"],
      "adjective": [],
      "verb": ["finished", "reading"]
    },
    "emotion_scores": [0.5, 0.0, 0.0, 0.0, 0.0],
    "neighbours": [],
    "timestamp": new Date("2024-11-01T14:00:00Z")
  },
  {
    "text": "I listened to a new album while cooking dinner and tried out a new recipe.",
    "keywords": {
      "noun": ["album", "dinner", "recipe"],
      "adjective": ["new"],
      "verb": ["listened", "cooking", "tried"]
    },
    "emotion_scores": [0.8, 0.0, 0.0, 0.0, 0.0],
    "neighbours": [],
    "timestamp": new Date("2024-11-01T16:00:00Z")
  },
  {
    "text": "I walked in the park and observed the children playing on the swings.",
    "keywords": {
      "noun": ["park", "children", "swings"],
      "adjective": [],
      "verb": ["walked", "observed", "playing"]
    },
    "emotion_scores": [0.6, 0.0, 0.0, 0.0, 0.0],
    "neighbours": [],
    "timestamp": new Date("2024-11-01T18:00:00Z")
  },
  {
    "text": "I saw a storm approaching while sitting on the balcony.",
    "keywords": {
      "noun": ["storm", "balcony"],
      "adjective": [],
      "verb": ["saw", "sitting", "approaching"]
    },
    "emotion_scores": [0.3, 0.0, 0.1, 0.2, 0.2],
    "neighbours": [],
    "timestamp": new Date("2024-11-01T20:00:00Z")
  },
  {
    "text": "I noticed the sun setting over the horizon while hiking.",
    "keywords": {
      "noun": ["sun", "horizon"],
      "adjective": ["setting"],
      "verb": ["noticed", "hiking"]
    },
    "emotion_scores": [0.7, 0.0, 0.0, 0.0, 0.0],
    "neighbours": [],
    "timestamp": new Date("2024-11-02T08:00:00Z")
  },
  {
    "text": "I watched the clouds gather before the rain started falling.",
    "keywords": {
      "noun": ["clouds", "rain"],
      "adjective": [],
      "verb": ["watched", "gather", "falling"]
    },
    "emotion_scores": [0.2, 0.0, 0.0, 0.0, 0.3],
    "neighbours": [],
    "timestamp": new Date("2024-11-02T10:00:00Z")
  },
  {
    "text": "I experienced a moment of calmness while sitting by the water.",
    "keywords": {
      "noun": ["calmness", "water"],
      "adjective": [],
      "verb": ["experienced", "sitting"]
    },
    "emotion_scores": [0.8, 0.0, 0.0, 0.0, 0.0],
    "neighbours": [],
    "timestamp": new Date("2024-11-02T12:00:00Z")
  },
  {
    "text": "I felt uneasy during the thunderstorm that shook the windows.",
    "keywords": {
      "noun": ["thunderstorm", "windows"],
      "adjective": [],
      "verb": ["felt", "shook"]
    },
    "emotion_scores": [0.1, 0.0, 0.2, 0.0, 0.5],
    "neighbours": [],
    "timestamp": new Date("2024-11-02T14:00:00Z")
  },
  {
    "text": "I found joy in the laughter of friends at dinner.",
    "keywords": {
      "noun": ["joy", "laughter", "friends", "dinner"],
      "adjective": [],
      "verb": ["found"]
    },
    "emotion_scores": [0.9, 0.0, 0.0, 0.0, 0.0],
    "neighbours": [],
    "timestamp": new Date("2024-11-02T16:00:00Z")
  },
  {
    "text": "I walked through the market and saw fresh produce everywhere.",
    "keywords": {
      "noun": ["market", "produce"],
      "adjective": ["fresh"],
      "verb": ["walked", "saw"]
    },
    "emotion_scores": [0.7, 0.0, 0.0, 0.0, 0.0],
    "neighbours": [],
    "timestamp": new Date("2024-11-02T18:00:00Z")
  },
  {
    "text": "I observed the art exhibit and appreciated the creativity on display.",
    "keywords": {
      "noun": ["art", "exhibit", "creativity"],
      "adjective": [],
      "verb": ["observed", "appreciated"]
    },
    "emotion_scores": [0.8, 0.0, 0.0, 0.0, 0.0],
    "neighbours": [],
    "timestamp": new Date("2024-11-02T20:00:00Z")
  },
  {
    "text": "I felt a twinge of disappointment when the event was canceled.",
    "keywords": {
      "noun": ["disappointment", "event"],
      "adjective": [],
      "verb": ["felt", "canceled"]
    },
    "emotion_scores": [0.2, 0.5, 0.0, 0.0, 0.0],
    "neighbours": [],
    "timestamp": new Date("2024-11-02T22:00:00Z")
  },
  {
    "text": "I was intrigued by the stories shared during our discussion.",
    "keywords": {
      "noun": ["stories", "discussion"],
      "adjective": [],
      "verb": ["was", "shared", "intrigued"]
    },
    "emotion_scores": [0.6, 0.0, 0.0, 0.0, 0.0],
    "neighbours": [],
    "timestamp": new Date("2024-11-03T08:00:00Z")
  },
  {
    "text": "I noticed the city lights twinkling as evening set in.",
    "keywords": {
      "noun": ["city", "lights", "evening"],
      "adjective": ["twinkling"],
      "verb": ["noticed", "set"]
    },
    "emotion_scores": [0.7, 0.0, 0.0, 0.0, 0.0],
    "neighbours": [],
    "timestamp": new Date("2024-11-03T10:00:00Z")
  },
  {
    "text": "I saw people dancing and enjoying themselves at the festival.",
    "keywords": {
      "noun": ["people", "dancing", "festival"],
      "adjective": [],
      "verb": ["saw", "enjoying"]
    },
    "emotion_scores": [0.8, 0.0, 0.0, 0.0, 0.0],
    "neighbours": [],
    "timestamp": new Date("2024-11-03T12:00:00Z")
  }
]
if __name__ == '__main__':
    load_dotenv()
    uri = os.getenv('MONGO_URL')
    db_name = 'memory_database'
    collection_name = 'memories'
    client = MongoDBConnection(uri, db_name, collection_name)
    # Send a ping to confirm a successful connection
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(e)
    

