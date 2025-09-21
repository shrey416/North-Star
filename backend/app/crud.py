# backend/app/crud.py
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from typing import Dict

from . import models, schemas

# --- User CRUD ---
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

# --- Assessment CRUD (NEW/UPDATED) ---
async def get_assessment_with_details(db: AsyncSession, assessment_id: int):
    result = await db.execute(
        select(models.Assessment)
        .where(models.Assessment.id == assessment_id)
        .options(
            selectinload(models.Assessment.questions)
            .selectinload(models.AssessmentQuestion.options)
        )
    )
    return result.scalars().first()

async def submit_assessment(db: AsyncSession, assessment_id: int, user_uid: str, submission: schemas.AssessmentSubmission):
    # 1. Fetch the assessment with correct answers
    assessment_result = await db.execute(
        select(models.Assessment)
        .where(models.Assessment.id == assessment_id)
        .options(
            selectinload(models.Assessment.questions)
            .selectinload(models.AssessmentQuestion.options)
        )
    )
    assessment = assessment_result.scalars().first()
    if not assessment:
        return None

    # 2. Calculate score
    score = 0
    total_questions = len(assessment.questions)
    submitted_answers = submission.answers

    for question in assessment.questions:
        correct_option_id = next((opt.id for opt in question.options if opt.is_correct), None)
        user_answer_id = submitted_answers.get(question.id)
        if user_answer_id and user_answer_id == correct_option_id:
            score += 1
    
    # 3. Determine pass/fail (e.g., >80% to pass)
    pass_threshold = 0.8
    is_passed = (score / total_questions) >= pass_threshold if total_questions > 0 else False

    # 4. Update user_skills table if passed
    if is_passed:
        # Check if the user already has this skill
        user_skill_result = await db.execute(
            select(models.UserSkill)
            .where(models.UserSkill.user_uid == user_uid)
            .where(models.UserSkill.skill_id == assessment.skill_id)
        )
        user_skill = user_skill_result.scalars().first()

        if user_skill:
            user_skill.is_verified = True
        else:
            user_skill = models.UserSkill(
                user_uid=user_uid,
                skill_id=assessment.skill_id,
                level=models.ProficiencyLevel.Intermediate, # Assign a default level on pass
                is_verified=True
            )
            db.add(user_skill)
        
        await db.commit()
        message = "Congratulations! You passed and your skill has been verified."
    else:
        message = "Good effort! You can retake the assessment later to verify your skill."

    return {
        "score": score,
        "total_questions": total_questions,
        "is_passed": is_passed,
        "skill_id": assessment.skill_id,
        "is_verified": is_passed,
        "message": message
    }