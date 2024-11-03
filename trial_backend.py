from backend.services.memory_service import MemoryService
from backend.services.feedback_service import FeedbackService
emotion_to_category = {
    'admiration': 'joy',
    'amusement': 'joy',
    'anger': 'anger',
    'annoyance': 'anger',
    'approval': 'joy',
    'caring': 'joy',
    'confusion': 'sadness',
    'curiosity': 'joy',  # This could also be categorized differently based on context
    'desire': 'joy',     # Similar reasoning as above
    'disappointment': 'sadness',
    'disapproval': 'disgust',
    'disgust': 'disgust',
    'embarrassment': 'disgust',
    'excitement': 'joy',
    'fear': 'fear',
    'gratitude': 'joy',
    'grief': 'sadness',
    'joy': 'joy',
    'love': 'joy',
    'nervousness': 'fear',
    'optimism': 'joy',
    'pride': 'joy',
    'realization': 'joy',  # This could vary by context
    'relief': 'joy',
    'remorse': 'sadness',
    'sadness': 'sadness',
    'surprise': 'joy',  # This could vary by context
    'neutral': 'neutral'  # Treat as a separate category
}


if __name__ == '__main__':
    service = MemoryService()
    current_situation = "I went for hiking and breathed in fresh air"
    emotion, previous_id = service.process_memory(current_situation, 198888)
    previous_history = service.retrieve_memory(previous_id.keys())
    feedback = FeedbackService()
    feedback.get_feedback(current_situation, previous_history, emotion)
    
    
