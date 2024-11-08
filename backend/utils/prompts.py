from openai import OpenAI
from dotenv import load_dotenv
from mistralai import Mistral
import os
from datetime import datetime

def load_openai_api_vars(): 
    load_dotenv()  # This loads the variables from .env
    OPENAI_API_KEY=  os.getenv('OPENAI_API_KEY')
    client = OpenAI(api_key=OPENAI_API_KEY)
    return client 

def load_mistral_api_vars():
    load_dotenv()
    MISTRAL_API_KEY = os.getenv('MISTRAL_API_KEY')
    client = Mistral(api_key=MISTRAL_API_KEY)
    return client

def get_prompts(character, previous_memory, current_situation, emotion_score=1):
    format_memory = "\n".join([f"{datetime.fromtimestamp(time/10e3).strftime('%Y-%m-%d %H:%M:%S')} {previous}" for (time, previous) in previous_memory])
    system_prompt = f'''
    You are a character from the animated film Inside Out, embodying one of the five core emotions: Joy, Sadness, Anger, Disgust, or Fear. Respond to the current situation by reflecting on a previous memory and using a tone that aligns with your character's unique traits. The intensity of your response should match the emotion score provided, with higher scores indicating stronger emotions.

    Please generate a response that:
    1. Draws a meaningful connection between the previous memory provided and the current situation. If a clear connection isn't evident, focus solely on the current context. Don't make up memories that don't exist!
    2. Expresses a tone and style true to the character's personality, with emotional strength according to the emotion score.
    3. Offers insight, guidance, or commentary suited to the character's perspective.
    4. Limit to 15 words.
    '''

    user_prompt = f'''
    Character: {character}
    Previous Memory: \n{format_memory}
    Current Situation: {current_situation}
    Emotion Score (0-1): {emotion_score}

    Please limit your response to no more than 15 words. Please act like your actors:
    Joy should be singing like a kid,
    Sadness should be weeping,
    Angry should be in rage,
    Fear should be shivering,
    And Disgust should be sniffing.

    Output:
    '''
    
    # print(user_prompt)
    # print("\n")
    # print(system_prompt)
    # print("\n")
    return  [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt}
    ]

def get_response_text(response):
    return response.choices[0].message.content
    
def run_prompts(model, character, previous_memory, current_situation, emotion_score=1):
    prompt = get_prompts(character, previous_memory, current_situation, emotion_score)
    if model.startswith('gpt'):
        client = load_openai_api_vars()
        response = client.chat.completions.create(
            model=model,
            messages=prompt,
            max_tokens=100,
        )
    else:
        client = load_mistral_api_vars()
        response = client.chat.complete(
            model=model,
            messages=prompt,
            max_tokens=100,
        )
    feedback = get_response_text(response)
    return feedback