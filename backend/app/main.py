# backend/main.py
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from .app.core.firebase import initialize_firebase
from .app.api import auth as auth_router
from .app.auth_middleware import get_current_user
from .app import schemas, models # Example import

# Initialize Firebase Admin SDK on startup
initialize_firebase()

app = FastAPI()

# CORS Middleware Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"], # Your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# This router is for session cookie login, which is good but we'll also support token auth
app.include_router(auth_router.router, prefix="/api/auth", tags=["auth"])


# --- New API Routes ---
# Example of a protected route
@app.get("/api/users/me", response_model=schemas.User)
async def read_users_me(current_user: models.User = Depends(get_current_user)):
    """
    Get the profile of the currently authenticated user.
    """
    return current_user

# You would continue to build out your API here, putting routers in separate files
# for organization. For example, a '/api/profile' router for profile updates.

@app.get("/")
def read_root():
    return {"message": "Welcome to the North Star API"}