from flask import Flask, render_template, request, redirect, url_for
from flask_cors import CORS
import google.generativeai as genai
import os

# Initialize the Flask application
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Set up your API key using an environment variable
genai.configure(api_key="AIzaSyCFSjvztmOni1ycRPhAcza2PUPncGCLtiE")
model = genai.GenerativeModel('gemini-1.5-flash',system_instruction="suppose you are a doctor.")

@app.errorhandler(404)
def page_not_found(e):
    return redirect(url_for('index'))

@app.route('/', methods=['POST', 'GET'])
def index():
    if request.method == 'POST':
        try:
            prompt = request.json.get('prompt')  # Use request.json.get for JSON data
            if not prompt:
                return "No prompt provided.", 400  # Return an error if no prompt is given

            # Add context indicating that the conversation is with a doctor
            context_prompt = prompt

            response = model.generate_content(context_prompt, generation_config=genai.types.GenerationConfig(
                candidate_count=1,
                max_output_tokens=300,
            ))

            # Check if response has the expected attribute
            return response.text if hasattr(response, 'text') and response.text else "Sorry, but I think Gemini didn't want to answer that!"
        except Exception as e:
            print("Error:", str(e))  # Print the error for debugging
            return "Sorry, but Gemini didn't respond correctly.", 500

    return render_template('index.html')  # Make sure this path is correct

if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Run the app on port 5001