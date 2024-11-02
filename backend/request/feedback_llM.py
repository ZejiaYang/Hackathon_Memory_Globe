from utils.prompts import run_prompts

class FiveCharacters:
    def __init__(self) -> None:
        self.characters = ['Joy', 'Sadness', 'Angry', 'Disgust', 'Fear']
        self.model = 'gpt-3.5-turbo'
    def get_feedback(self, current_situation, previous_memory, emotion_scores, model ='gpt-3.5-turbo'):
        feedbacks = {}
        self.model = model
        for character, emotion_score in zip(self.characters, emotion_scores):
            feedbacks[character] = run_prompts(self.model,character, previous_memory, current_situation, emotion_score)
        return feedbacks
 