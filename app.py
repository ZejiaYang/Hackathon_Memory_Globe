from flask import Flask, render_template
from flask_socketio import SocketIO
from flask_cors import CORS
import datetime
#from backend.services.memory_service import MemoryService

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins='*')

@socketio.on('memory submit')
def handle_message(timestamp, username, memory):
    tstamp = timestamp / 1e3
    dt = datetime.datetime.fromtimestamp(tstamp)
    
    print("at " + dt.strftime('%Y-%m-%d %H:%M:%S') + " " + username + " gained memory '"+memory + "'")


    # process_memory -> emotions = Dict[str, float], neighbours = Dict[neighbour_id = str, weight = float]

if __name__ == '__main__':
    socketio.run(app)
