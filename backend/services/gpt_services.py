from flask import json
import openai
import os


def generate_response(form_data):
    prompt = f"Here's information about a webpage: {json.dumps(form_data, indent=2)}. Answer questions about this webpage."

    response = openai.Completion.create(
        engine="gpt-3.5-turbo",
        prompt=prompt,
        temperature=0.7,
        max_tokens=150,
        top_p=1.0,
        frequency_penalty=0.0,
        presence_penalty=0.0,
    )
    return response.text
