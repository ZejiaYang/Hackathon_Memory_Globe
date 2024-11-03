from flask import Flask, render_template
from flask_socketio import SocketIO
from flask_cors import CORS
import datetime
from backend.services.memory_service import MemoryService
from backend.services.feedback_service import FeedbackService

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins='*')

@app.route('/')
def index():
    return "Socket.IO Server is running!"

@socketio.on("memory submit")
def handle_message(timestamp, username, memory):
    tstamp = timestamp / 10e3
    #print("at " + str(tstamp) + " " + username + " gained memory '"+memory + "'")
    service = MemoryService()
    print(timestamp)
    emotion, neighbour_ids = service.process_memory(memory, timestamp)  # dict[id, weight]
    neighbour_history = service.retrieve_memory(neighbour_ids.keys())     ## a list of [tstamp, text]
    #print(emotion, neighbour_ids, neighbour_history)
    socketio.emit('emotion response', (emotion, neighbour_ids, neighbour_history))
    feedback = FeedbackService()
    responses = feedback.get_feedback(memory, neighbour_history, emotion)
    socketio.emit('character speech', responses)


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5001)
