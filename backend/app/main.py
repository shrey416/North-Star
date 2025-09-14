from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from .api import auth as auth_router
from .core.firebase import initialize_firebase

# Load environment variables from .env file
load_dotenv()

# Initialize Firebase Admin
initialize_firebase()

app = FastAPI(title="North Star API")

# CORS (Cross-Origin Resource Sharing) Configuration
# This allows the frontend to communicate with this backend.
origins = [
    os.getenv("FRONTEND_URL"),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True, # Important for sending cookies
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routers
app.include_router(auth_router.router, prefix="/api/auth", tags=["Authentication"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the North Star API"}