from flask import Flask, render_template
from backend.services.feedback_service import FeedbackService
# from flask_socketio import SocketIO
# from flask_cors import CORS

# app = Flask(__name__)
# CORS(app)
# socketio = SocketIO(app, cors_allowed_origins='http://localhost:3000')

if __name__ == '__main__':
    f = FeedbackService()
    print(f.get_feedback("lala", "lala", [0.1, 0.2, 0.3,]))