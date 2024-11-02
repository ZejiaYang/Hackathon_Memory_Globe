from flask import Flask, render_template
<<<<<<< HEAD
from backend.services.feedback_service import FeedbackService
# from flask_socketio import SocketIO
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)
# socketio = SocketIO(app, cors_allowed_origins='http://localhost:3000')

if __name__ == '__main__':
    f = FeedbackService()
    print(f.get_feedback("lala", "lala", [0.1, 0.2, 0.3,]))
=======
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
>>>>>>> f5aaf35275b5b6f3fb7a97b89210bb3b18ab3822
