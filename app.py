from flask import Flask, render_template
from flask_socketio import SocketIO
from flask_cors import CORS
import datetime
# from backend.services.memory_service import MemoryService

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins='http://127.0.0.1')

@app.route('/')
def index():
    return "Socket.IO Server is running!"

@socketio.on("memory submit")
def handle_message(timestamp, username, memory):
    tstamp = timestamp / 1e3
    dt = datetime.datetime.fromtimestamp(tstamp)
    
    print("at " + dt.strftime('%Y-%m-%d %H:%M:%S') + " " + username + " gained memory '"+memory + "'")

    # process_memory -> emotions = Dict[str, float], neighbours = Dict[neighbour_id = str, weight = float]
    # memory_service = MemoryService()
    # emotions, neighbours = memory_service.process_memory(memory, timestamp)
    # print(emotions, neighbours)



if __name__ == '__main__':
    socketio.run(app)
