from fastapi import APIRouter, Body, Response, status
from firebase_admin import auth
from pydantic import BaseModel
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

class TokenRequest(BaseModel):
    token: str

@router.post("/login")
async def create_session_cookie(response: Response, token_request: TokenRequest = Body(...)):
    """
    Verifies a Firebase ID token and sets a secure, HttpOnly session cookie.
    This cookie will be used for session management.
    """
    try:
        # Set session expiration. 5 days in this case.
        expires_in = 60 * 60 * 24 * 5 * 1000  # 5 days in milliseconds
        
        # Create the session cookie. This will also verify the ID token.
        session_cookie = auth.create_session_cookie(token_request.token, expires_in=expires_in)
        
        # Set cookie policy for the session cookie.
        response.set_cookie(
            key="session",
            value=session_cookie,
            max_age=expires_in,
            httponly=True,
            secure=True,  # Set to True for production (HTTPS)
            samesite="lax", # Can be 'strict', 'lax', or 'none'
            path="/"
        )
        logger.info("Successfully created session cookie.")
        return {"status": "success"}
    except auth.InvalidIdTokenError:
        logger.error("Invalid ID token provided.")
        response.status_code = status.HTTP_401_UNAUTHORIZED
        return {"error": "Invalid token"}
    except Exception as e:
        logger.error(f"An unexpected error occurred during login: {e}")
        response.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        return {"error": "Could not create session"}

@router.post("/logout")
async def clear_session_cookie(response: Response):
    """
    Clears the session cookie, effectively logging the user out.
    """
    response.delete_cookie(
        key="session",
        httponly=True,
        secure=True, # Ensure this matches the settings in /login
        samesite="lax",
        path="/"
    )
    logger.info("Successfully cleared session cookie.")
    return {"status": "success"}