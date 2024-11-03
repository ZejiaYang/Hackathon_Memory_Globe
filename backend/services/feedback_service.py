from ..utils.prompts import run_prompts
from collections import defaultdict
emotion_to_category = {
    'admiration': 'joy',
    'amusement': 'joy',
    'anger': 'anger',
    'annoyance': 'anger',
    'approval': 'joy',
    'caring': 'joy',
    'confusion': 'sadness',
    'curiosity': 'joy',  
    'desire': 'joy',    
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

class FeedbackService:
    def __init__(self) -> None:
        self.characters = ['Joy', 'Sadness', 'Angry', 'Disgust', 'Fear']
        self.model = 'gpt-3.5-turbo'
        
    def get_feedback(self, current_situation, previous_memory, emotion_scores, model ='gpt-3.5-turbo'):
        combined_emotions = defaultdict(lambda:0)
        for label, weight in emotion_scores.items():
            combined_emotions[emotion_to_category[label]] += weight
        feedbacks = {}
        self.model = model
        for character, emotion_score in zip(self.characters, combined_emotions):
            feedbacks[character] = run_prompts(self.model,character, previous_memory, current_situation, emotion_score)
        return feedbacks
