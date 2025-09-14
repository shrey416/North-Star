import firebase_admin
from firebase_admin import credentials
from dotenv import load_dotenv
import os

load_dotenv()

def initialize_firebase():
    """
    Initializes the Firebase Admin SDK using credentials from environment variables.
    """
    cred_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
    if not cred_path:
        raise ValueError("GOOGLE_APPLICATION_CREDENTIALS environment variable not set.")
    
    try:
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred)
        print("Firebase Admin SDK initialized successfully.")
    except Exception as e:
        print(f"Error initializing Firebase Admin SDK: {e}")
        raise