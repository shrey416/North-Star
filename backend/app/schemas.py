# backend/app/schemas.py
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import date
from .models import ProficiencyLevel

# --- Skill Schemas ---
class SkillBase(BaseModel):
    name: str
    description: Optional[str] = None
    category: Optional[str] = None

class Skill(SkillBase):
    id: int
    class Config:
        orm_mode = True

# --- UserSkill Schemas ---
class UserSkillBase(BaseModel):
    skill_id: int
    level: ProficiencyLevel

class UserSkillCreate(UserSkillBase):
    pass

class UserSkill(UserSkillBase):
    id: int
    is_verified: bool
    skill: Skill
    class Config:
        orm_mode = True

# --- User Schemas ---
class UserBase(BaseModel):
    email: EmailStr
    display_name: Optional[str] = None
    age: Optional[int] = None
    dob: Optional[date] = None

class UserCreate(UserBase):
    uid: str

class UserUpdate(BaseModel):
    display_name: Optional[str] = None
    age: Optional[int] = None
    dob: Optional[date] = None

class User(UserBase):
    uid: str
    skills: List[UserSkill] = []
    class Config:
        orm_mode = True

# --- Career Schemas ---
class Career(BaseModel):
    id: int
    title: str
    description: Optional[str] = None

    class Config:
        orm_mode = True

# ... Add other schemas for Roadmaps, Assessments etc.