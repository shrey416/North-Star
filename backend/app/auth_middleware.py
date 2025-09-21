# backend/app/auth_middleware.py
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from firebase_admin import auth
from sqlalchemy.ext.asyncio import AsyncSession

from . import crud, schemas
from .db import get_db

bearer_scheme = HTTPBearer()

async def get_current_user(
    db: AsyncSession = Depends(get_db),
    creds: HTTPAuthorizationCredentials = Depends(bearer_scheme)
) -> schemas.User:
    """
    A dependency that verifies the Firebase ID token from the Authorization header,
    retrieves the user from the database, or creates a new user if it's their first time.
    """
    if not creds:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="No authorization credentials provided",
        )
    
    id_token = creds.credentials
    
    try:
        decoded_token = auth.verify_id_token(id_token)
        uid = decoded_token["uid"]
    except auth.InvalidIdTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Firebase ID token")
    except Exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not verify Firebase token")

    # Check if user exists in our database
    db_user = await crud.get_user(db, user_uid=uid)

    # If user does not exist, create them
    if not db_user:
        user_data = {
            "uid": uid,
            "email": decoded_token.get("email"),
            "display_name": decoded_token.get("name"),
        }
        db_user = await crud.create_user(db, user_data=user_data)

    return db_user