from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests
from dotenv import load_dotenv
import whisper
import tempfile
import subprocess
import traceback

# -------------------
# Setup
# -------------------
load_dotenv()
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"
OCR_API_KEY = os.getenv("OCR_SPACE_API_KEY")

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# -------------------
# Whisper model (lazy-loaded)
# -------------------
model = None  # don't load at startup


def get_whisper_model():
    global model
    if model is None:
        try:
            print("🧠 Loading Whisper model (tiny.en)...")
            model = whisper.load_model("tiny.en")
            print("✅ Whisper model loaded successfully.")
        except Exception as e:
            print("❌ Failed to load Whisper model:", e)
            model = None
    return model


# -------------------
# Chat endpoint
# -------------------
@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json(silent=True) or {}
    user_message = data.get("message", "")
    resume_text = data.get("resumeText", "")

    if not user_message:
        return jsonify({"error": "Message is required"}), 400

    prompt = (
        f"Resume:\n{resume_text}\n\nUser question: {user_message}"
        if resume_text
        else user_message
    )

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
    }

    payload = {
        "model": "gpt-4o-mini",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.7,
    }

    try:
        response = requests.post(OPENROUTER_API_URL, headers=headers, json=payload, timeout=60)
        response.raise_for_status()
        result = response.json()
        reply = result["choices"][0]["message"]["content"]
        return jsonify({"reply": reply})
    except Exception as e:
        print("❌ Chat error:", e)
        return jsonify({"error": str(e)}), 500


# -------------------
# Resume upload + OCR
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
            data={"apikey": OCR_API_KEY, "language": "eng"},
            timeout=60,
        )
        ocr_response.raise_for_status()
        ocr_result = ocr_response.json()

        parsed_results = ocr_result.get("ParsedResults", [])
        if not parsed_results:
            return jsonify({"error": "No text found in resume"}), 400

        text = parsed_results[0].get("ParsedText", "")
        score = rate_resume(text)
        return jsonify({"score": score, "text_preview": text[:500]})
    except Exception as e:
        print("❌ OCR error:", e)
        return jsonify({"error": f"OCR failed: {str(e)}"}), 500


# -------------------
# Resume scoring logic
# -------------------
def rate_resume(text: str) -> int:
    keywords = ["education", "experience", "skills", "projects", "certifications"]
    score = sum(20 for k in keywords if k in text.lower())
    return min(score, 100)


# -------------------
# Speech-to-Text (Whisper)
# -------------------
@app.route("/speech-to-text", methods=["POST"])
def speech_to_text():
    if "audio" not in request.files:
        return jsonify({"error": "No audio file uploaded"}), 400

    model = get_whisper_model()
    if model is None:
        return jsonify({"error": "Whisper model not loaded"}), 500

    audio_file = request.files["audio"]

    with tempfile.NamedTemporaryFile(delete=False, suffix=".webm") as temp_in:
        audio_file.save(temp_in.name)
        temp_in_path = temp_in.name

    temp_out_path = temp_in_path.replace(".webm", ".wav")

    try:
        subprocess.run(
            [
                "ffmpeg",
                "-i", temp_in_path,
                "-ar", "16000",
                "-ac", "1",
                "-c:a", "pcm_s16le",
                temp_out_path,
            ],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            check=True,
        )
    except subprocess.CalledProcessError:
        print("❌ FFmpeg conversion failed.")
        return jsonify({"error": "ffmpeg conversion failed"}), 500

    try:
        file_size = os.path.getsize(temp_out_path)
        print(f"🎧 Converted audio size: {file_size} bytes")

        if file_size == 0:
            return jsonify({"error": "Audio conversion produced empty file"}), 500

        print("🔊 Transcribing audio...")
        result = model.transcribe(temp_out_path)
        text = str(result.get("text", "")).strip()
        print("✅ Transcription complete:", text)
        return jsonify({"text": text})
    except Exception:
        print("❌ Whisper error:\n", traceback.format_exc())
        return jsonify({"error": "Transcription failed"}), 500
    finally:
        try:
            os.remove(temp_in_path)
            if os.path.exists(temp_out_path):
                os.remove(temp_out_path)
        except OSError:
            pass


# -------------------
# Generate Resume Summary
# -------------------
@app.route("/generate-summary", methods=["POST"])
def generate_summary():
    data = request.get_json(silent=True) or {}

    user_details = "\n".join([f"{k}: {v}" for k, v in data.items()])

    prompt = f"""
You are a professional resume writer. Based on the user's responses, generate a polished, well-structured resume summary and full resume content in Markdown.

Include:
- Professional Summary
- Education
- Experience/Projects
- Skills
- Certifications
- Languages
- Contact Info

User details:
{user_details}

Format clearly with **bold headings** and bullet points.
"""

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
    }

    payload = {
        "model": "gpt-4o-mini",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.7,
    }

    try:
        response = requests.post(OPENROUTER_API_URL, headers=headers, json=payload, timeout=60)
        response.raise_for_status()
        result = response.json()
        summary = result["choices"][0]["message"]["content"]
        return jsonify({"summary": summary})
    except Exception as e:
        print("❌ Summary generation error:", e)
        return jsonify({"error": str(e)}), 500


# -------------------
# Root health check
# -------------------
@app.route("/", methods=["GET"])
def health_check():
    return jsonify({"status": "ok", "message": "Resume Builder Backend is live"}), 200


# -------------------
# Run server
# -------------------
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"🚀 Starting Flask server on port {port}")
    app.run(host="0.0.0.0", port=port, debug=False)
