from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import requests
from dotenv import load_dotenv
import whisper
import tempfile
import subprocess
import traceback
import logging

# -------------------- Setup --------------------
load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Logging setup
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OCR_API_KEY = os.getenv("OCR_SPACE_API_KEY")

OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# -------------------- Whisper Model --------------------
model = None

def get_whisper_model():
    """Lazy load Whisper model."""
    global model
    if model is None:
        try:
            logging.info("🧠 Loading Whisper model (tiny.en)...")
            model = whisper.load_model("tiny.en")
            logging.info("✅ Whisper model loaded successfully.")
        except Exception as e:
            logging.error(f"❌ Failed to load Whisper model: {e}")
            model = None
    return model

# -------------------- Chat Endpoint --------------------
@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json(silent=True) or {}
    user_message = data.get("message", "").strip()
    resume_text = data.get("resumeText", "")

    if not user_message:
        return jsonify({"error": "Message is required"}), 400

    prompt = f"Resume:\n{resume_text}\n\nUser question: {user_message}" if resume_text else user_message

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
        logging.error("❌ Chat error: %s", traceback.format_exc())
        return jsonify({"error": str(e)}), 500

# -------------------- Resume Upload / OCR --------------------
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
        logging.error("❌ OCR error: %s", traceback.format_exc())
        return jsonify({"error": f"OCR failed: {str(e)}"}), 500

def rate_resume(text: str) -> int:
    """Quick resume quality rating."""
    keywords = ["education", "experience", "skills", "projects", "certifications"]
    score = sum(20 for k in keywords if k in text.lower())
    return min(score, 100)

# -------------------- Speech-to-Text --------------------
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
            ["ffmpeg", "-i", temp_in_path, "-ar", "16000", "-ac", "1", "-c:a", "pcm_s16le", temp_out_path],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            check=True,
        )
    except subprocess.CalledProcessError:
        logging.error("❌ FFmpeg conversion failed.")
        return jsonify({"error": "ffmpeg conversion failed"}), 500

    try:
        file_size = os.path.getsize(temp_out_path)
        if file_size == 0:
            return jsonify({"error": "Audio conversion produced empty file"}), 500

        logging.info(f"🎧 Converted audio size: {file_size} bytes")
        result = model.transcribe(temp_out_path)
        text = str(result.get("text", "")).strip()
        logging.info(f"✅ Transcription complete: {text}")
        return jsonify({"text": text})
    except Exception:
        logging.error("❌ Whisper error:\n%s", traceback.format_exc())
        return jsonify({"error": "Transcription failed"}), 500
    finally:
        for path in [temp_in_path, temp_out_path]:
            try:
                if os.path.exists(path):
                    os.remove(path)
            except OSError:
                pass

# -------------------- Resume Summary Generation --------------------
@app.route("/generate-summary", methods=["POST"])
def generate_summary():
    data = request.get_json(silent=True) or {}
    user_details = "\n".join([f"{k}: {v}" for k, v in data.items()])

    skills = data.get("List your skills (comma separated).", "")
    projects = data.get("Tell me about your experience or projects.", "")
    education = data.get("Tell me about your education background.", "")

    prompt = f"""
You are an **expert resume writer and career branding specialist**.
Your task is to take the user's partial or rough details and create a **complete, professional, and engaging resume** in **Markdown format**.

Guidelines:
- Make it sound confident and achievement-oriented.
- If sections are missing, intelligently fill them in.
- Expand short entries into professional, quantifiable bullet points.
- Keep tone natural, concise, and professional.
- Output must look like a polished resume ready for job applications.

Structure:
**Professional Summary**
**Education**
**Experience / Projects**
**Skills**
**Certifications**
**Languages**
**Contact Info**

---
User Details:
{user_details}
Skills: {skills}
Projects: {projects}
Education: {education}
"""

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
    }

    payload = {
        "model": "gpt-4o-mini",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.85,
        "max_tokens": 1200,
    }

    try:
        response = requests.post(OPENROUTER_API_URL, headers=headers, json=payload, timeout=90)
        response.raise_for_status()
        result = response.json()
        summary = result["choices"][0]["message"]["content"]
        return jsonify({"summary": summary})
    except Exception as e:
        logging.error("❌ Summary generation error: %s", traceback.format_exc())
        return jsonify({"error": str(e)}), 500

# -------------------- Health Check --------------------
@app.route("/", methods=["GET"])
def health_check():
    return jsonify({"status": "ok", "message": "Resume Builder Backend is live"}), 200

# -------------------- Main --------------------
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    logging.info(f"🚀 Starting Flask server on port {port}")
    app.run(host="0.0.0.0", port=port, debug=False)
