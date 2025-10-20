from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# OpenRouter API config
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"

# OCR API config
OCR_API_KEY = os.getenv("OCR_SPACE_API_KEY")


# -------------------
# Chat endpoint
# -------------------
@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message", "")
    resume_text = request.json.get("resumeText", "")

    if not user_message:
        return jsonify({"error": "Message is required"}), 400

    # Include resume text as context if available
    prompt = f"Resume:\n{resume_text}\n\nUser question: {user_message}" if resume_text else user_message

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "gpt-4o-mini",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.7
    }

    try:
        response = requests.post(OPENROUTER_API_URL, headers=headers, json=payload)
        response.raise_for_status()
        data = response.json()
        reply = data["choices"][0]["message"]["content"]
        return jsonify({"reply": reply})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# -------------------
# Resume upload + OCR + scoring
# -------------------
@app.route("/upload-resume", methods=["POST"])
def upload_resume():
    if "resume" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["resume"]

    try:
        ocr_response = requests.post(
            "https://api.ocr.space/parse/image",
            files={"file": (file.filename, file.stream, file.mimetype)},
            data={"apikey": OCR_API_KEY, "language": "eng"}
        )
        ocr_response.raise_for_status()
    except Exception as e:
        return jsonify({"error": f"OCR API request failed: {str(e)}"}), 500

    ocr_result = ocr_response.json()

    try:
        text = ocr_result["ParsedResults"][0]["ParsedText"]
    except (KeyError, IndexError):
        return jsonify({"error": "Could not extract text from resume"}), 500

    score = rate_resume(text)

    return jsonify({"score": score, "text_preview": text[:500]})


# -------------------
# Simple scoring logic
# -------------------
def rate_resume(text):
    score = 0
    keywords = ["education", "experience", "skills", "projects", "certifications"]
    text_lower = text.lower()
    for k in keywords:
        if k in text_lower:
            score += 20
    return min(score, 100)


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
