from flask import Flask, render_template
from flask_socketio import SocketIO
from flask_cors import CORS
#from backend.services.memory_service import MemoryService

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins='*')

@socketio.on('memory submit')
def handle_message(username, memory):
    print(username + " gained memory '"+memory + "'")

if __name__ == '__main__':
    socketio.run(app)