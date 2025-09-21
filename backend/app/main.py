# backend/main.py
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from .app.core.firebase import initialize_firebase
from .app.api import auth as auth_router
from .app.api import profile as profile_router # <-- ADD THIS
from .app.api import assessments as assessments_router # <-- ADD THIS
from .app.auth_middleware import get_current_user
from .app import schemas, models

# Initialize Firebase Admin SDK on startup
initialize_firebase()

app = FastAPI()

# CORS Middleware Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:8080","http://127.0.0.1"], # Updated for Vite default
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Auth router for session management (optional, token-based is primary)
app.include_router(auth_router.router, prefix="/api/auth", tags=["auth"])
# Profile router for user data management
app.include_router(profile_router.router, prefix="/api", tags=["profile"]) # <-- ADD THIS
# Assessments router for the quiz feature
app.include_router(assessments_router.router, prefix="/api", tags=["assessments"]) # <-- ADD THIS

# Example of a protected route using the new middleware
@app.get("/api/users/me", response_model=schemas.User)
async def read_users_me(current_user: models.User = Depends(get_current_user)):
    """
    Get the profile of the currently authenticated user.
    This endpoint now implicitly handles user creation on first call.
    """
    return current_user

@app.get("/")
def read_root():
    return {"message": "Welcome to the North Star API"}