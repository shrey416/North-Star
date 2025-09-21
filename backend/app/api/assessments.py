# backend/app/api/assessments.py
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from .. import crud, schemas, models
from ..db import get_db
from ..auth_middleware import get_current_user

router = APIRouter(
    prefix="/assessments",
    dependencies=[Depends(get_current_user)]
)

@router.get("/{assessment_id}", response_model=schemas.AssessmentDetailsSchema)
async def get_assessment_details(
    assessment_id: int,
    db: AsyncSession = Depends(get_db)
):
    """
    Retrieve the details, questions, and options for a specific assessment.
    """
    assessment = await crud.get_assessment_with_details(db, assessment_id=assessment_id)
    if not assessment:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Assessment not found")
    return assessment

@router.post("/{assessment_id}/submit", response_model=schemas.AssessmentResult)
async def submit_assessment_answers(
    assessment_id: int,
    submission: schemas.AssessmentSubmission,
    current_user: models.User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    """
    Submit user's answers for an assessment, get the score, and update skill verification.
    """
    result = await crud.submit_assessment(db, assessment_id=assessment_id, user_uid=current_user.uid, submission=submission)
    if result is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Assessment not found")
    return result