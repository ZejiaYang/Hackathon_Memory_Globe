from transformers import AutoTokenizer, AutoModelForSequenceClassification, pipeline, AutoModel
import torch
import numpy as np

emotions =  ['admiration', 'amusement', 'anger', 'annoyance', 'approval', 'caring', 'confusion',\
            'curiosity', 'desire', 'disappointment', 'disapproval', 'disgust', 'embarrassment', \
            'excitement', 'fear', 'gratitude', 'grief', 'joy', 'love', 'nervousness', 'optimism', \
            'pride', 'realization', 'relief', 'remorse', 'sadness', 'surprise', 'neutral']
emo_save_directory = '../static/models/local_bert_multilingual_emotion'
embed_save_directory = "../static/models/roberta-base"

class Message:

    def __init__(self, message, timestamp) -> None:
        self.raw_message = message
        self.timestamp = timestamp
        self.emotions = {emo:0 for emo in emotions}
    
    def get_emomodel(self):
        tokenizer = AutoTokenizer.from_pretrained(emo_save_directory)
        model = AutoModelForSequenceClassification.from_pretrained(emo_save_directory)
        return tokenizer, model
    
    def get_embedmodel(self):
        tokenizer = AutoTokenizer.from_pretrained(embed_save_directory)
        model = AutoModel.from_pretrained(embed_save_directory)
        return tokenizer, model
    
    def compute_emotions(self):
        tokenizer, model = self.get_emomodel()
        pipe = pipeline("sentiment-analysis", model=model, tokenizer=tokenizer, return_all_scores=True)
        response = pipe(self.raw_message)[0]
        results = {}
        for res in response:
            results[res['label']] = res['score']
        self.raw_emotion = results
        return results
    
    def compute_embedding(self):
        tokenizer, model = self.get_emomodel()
        inputs = tokenizer(self.raw_message, return_tensors="pt")
        with torch.no_grad():
            outputs = model(**inputs)
            self.embedding = outputs.last_hidden_state.mean(dim=1).squeeze().numpy()
    
    def update_memory(self, connections, weight):
        self.neighbours = {}
        self.emotions = {l:w*(1-weight) for l, w in self.raw_emotion.items()}
        for (id, emotions, weight) in connections:
            self.neighbours[id] = weight
            for label, value in emotions.items():
                self.emotions[label] += weight * value * weight
        return self.neighbours

    def get_memory_data(self):
        return {
            'timestamp': self.timestamp,
            'text': self.raw_message,
            'raw_emo': self.raw_message,
            'embedding': self.embedding,
            'emotions': self.emotions, 
            'neighbours': self.neighbours
        }
