# backend/app/crud.py
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from . import models, schemas

async def get_user(db: AsyncSession, user_uid: str):
    result = await db.execute(select(models.User).where(models.User.uid == user_uid))
    return result.scalars().first()

async def create_user(db: AsyncSession, user_data: dict):
    db_user = models.User(**user_data)
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user

async def update_user(db: AsyncSession, user: models.User, update_data: schemas.UserUpdate):
    for key, value in update_data.dict(exclude_unset=True).items():
        setattr(user, key, value)
    await db.commit()
    await db.refresh(user)
    return user

async def get_user_skills(db: AsyncSession, user_uid: str):
    result = await db.execute(
        select(models.UserSkill).where(models.UserSkill.user_uid == user_uid)
    )
    return result.scalars().all()

async def add_user_skill(db: AsyncSession, user_uid: str, skill: schemas.UserSkillCreate):
    db_user_skill = models.UserSkill(**skill.dict(), user_uid=user_uid)
    db.add(db_user_skill)
    await db.commit()
    await db.refresh(db_user_skill)
    return db_user_skill

# ... other CRUD functions for careers, roadmaps etc.