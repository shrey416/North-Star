# backend/app/api/profile.py
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from .. import crud, schemas, models
from ..db import get_db
from ..auth_middleware import get_current_user

router = APIRouter(
    prefix="/profile",
    dependencies=[Depends(get_current_user)]
)

@router.put("/me", response_model=schemas.User)
async def update_current_user_profile(
    update_data: schemas.UserUpdate,
    current_user: models.User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Update the profile for the currently authenticated user.
    """
    updated_user = await crud.update_user(db, user=current_user, update_data=update_data)
    return updated_user