# backend/app/schemas.py
from pydantic import BaseModel, EmailStr
from typing import List, Optional, Dict
from datetime import date
from .models import ProficiencyLevel

# --- Base Schemas ---
class SkillBase(BaseModel):
    name: str
    description: Optional[str] = None
    category: Optional[str] = None

class Skill(SkillBase):
    id: int
    class Config:
        orm_mode = True

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

# --- Assessment Schemas (NEW/UPDATED) ---

class QuestionOptionSchema(BaseModel):
    id: int
    option_text: str
    
    class Config:
        orm_mode = True

class AssessmentQuestionWithOptionsSchema(BaseModel):
    id: int
    question_text: str
    options: List[QuestionOptionSchema]
    
    class Config:
        orm_mode = True

class AssessmentDetailsSchema(BaseModel):
    id: int
    title: str
    skill_id: int
    questions: List[AssessmentQuestionWithOptionsSchema]
    
    class Config:
        orm_mode = True

# Schema for the frontend to send answers
class AssessmentSubmission(BaseModel):
    answers: Dict[int, int]  # { question_id: selected_option_id }

# Schema for the backend to respond with results
class AssessmentResult(BaseModel):
    score: int
    total_questions: int
    is_passed: bool
    skill_id: int
    is_verified: bool
    message: str