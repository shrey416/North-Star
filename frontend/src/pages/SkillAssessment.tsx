// src/pages/SkillAssessment.tsx
import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthenticatedFetch } from '@/hooks/useAuthenticatedFetch';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const TOTAL_TIME_PER_QUESTION = 30;

// --- UPDATED TYPES TO MATCH BACKEND SCHEMAS ---
type QuestionOption = {
  id: number;
  option_text: string;
};

type Question = {
  id: number;
  question_text: string;
  options: QuestionOption[];
};

type Assessment = {
  id: number;
  title: string;
  questions: Question[];
};

type AssessmentResult = {
    score: number;
    total_questions: number;
    is_passed: boolean;
    message: string;
};

type Status = 'loading' | 'active' | 'submitting' | 'finished';

const SkillAssessment = () => {
  const { assessmentId } = useParams();
  const navigate = useNavigate();
  const authenticatedFetch = useAuthenticatedFetch();
  const { toast } = useToast();

  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [status, setStatus] = useState<Status>('loading');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME_PER_QUESTION);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [finalResult, setFinalResult] = useState<AssessmentResult | null>(null);

  useEffect(() => {
    const fetchAssessment = async () => {
      setStatus('loading');
      try {
        const data = await authenticatedFetch(`/assessments/${assessmentId}`);
        setAssessment(data);
        setStatus('active');
        setTimeLeft(TOTAL_TIME_PER_QUESTION);
      } catch (error) {
        toast({ title: 'Failed to load assessment', variant: 'destructive' });
        navigate('/dashboard');
      }
    };
    if (assessmentId) {
      fetchAssessment();
    }
  }, [assessmentId, authenticatedFetch, toast, navigate]);

  const submitAndFinish = useCallback(async (finalAnswers: Record<number, number>) => {
      if (!assessment) return;
      setStatus('submitting');
      try {
        const result = await authenticatedFetch(`/assessments/${assessment.id}/submit`, {
          method: 'POST',
          body: JSON.stringify({ answers: finalAnswers }),
        });
        setFinalResult(result);
        setStatus('finished');
      } catch (error) {
          toast({ title: 'Failed to submit assessment', variant: 'destructive' });
          setStatus('active'); // Go back to the last question on error
      }
  }, [assessment, authenticatedFetch, toast]);

  const handleNextQuestion = useCallback(() => {
    if (!assessment) return;

    // Record answer
    const currentQuestionId = assessment.questions[currentIndex].id;
    const updatedAnswers = { ...answers, [currentQuestionId]: selectedOptionId! };
    setAnswers(updatedAnswers);
    
    // Move to next question or finish
    if (currentIndex < assessment.questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setTimeLeft(TOTAL_TIME_PER_QUESTION);
    } else {
      submitAndFinish(updatedAnswers);
    }
  }, [assessment, currentIndex, selectedOptionId, answers, submitAndFinish]);

  useEffect(() => {
    if (status !== 'active') return;

    if (timeLeft === 0) {
      // If time runs out, treat as unanswered and move on
      handleNextQuestion();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, status, handleNextQuestion]);

  if (status === 'loading' || !assessment) {
    return <div className="min-h-screen pt-16 flex items-center justify-center">Loading Assessment...</div>;
  }

  if (status === 'finished' && finalResult) {
    return (
       <div className="min-h-screen pt-16 flex items-center justify-center px-4">
        <Card className="w-full max-w-2xl p-8 text-center cosmic-card">
            {finalResult.is_passed ? (
                <ShieldCheck className="w-24 h-24 mx-auto text-green-500 animate-pulse"/>
            ) : (
                <Trophy className="w-24 h-24 mx-auto text-primary animate-bounce"/>
            )}
            <h1 className="text-4xl font-bold mt-4">Assessment Complete!</h1>
            <p className="text-muted-foreground text-xl mt-2">{finalResult.message}</p>
            <div className="my-8">
                <p className="text-2xl font-semibold">Your Score</p>
                <p className={cn("text-6xl font-bold my-2", finalResult.is_passed ? "text-green-500" : "text-primary")}>
                    {finalResult.score} / {finalResult.total_questions}
                </p>
            </div>
            <Button onClick={() => navigate('/profile')} className="cosmic-button">Back to Profile</Button>
        </Card>
      </div>
    )
  }

  const currentQuestion = assessment.questions[currentIndex];
  
  return (
    <div className="min-h-screen pt-16 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-3xl p-6 sm:p-8 space-y-6 cosmic-card">
        <header className="space-y-3">
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <p>{assessment.title}</p>
            <p>Question {currentIndex + 1} of {assessment.questions.length}</p>
          </div>
          <Progress value={((currentIndex + 1) / assessment.questions.length) * 100} />
          
          <div className="relative h-2 w-full bg-border/50 rounded-full overflow-hidden">
             <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-accent"
                initial={{ width: '100%' }}
                animate={{ width: `${(timeLeft / TOTAL_TIME_PER_QUESTION) * 100}%` }}
                transition={{ duration: 1, ease: 'linear' }}
             />
          </div>
        </header>

        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-center">
                {currentQuestion.question_text}
              </h2>
            </motion.div>
          </AnimatePresence>
        </main>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQuestion.options.map(option => (
            <Button
              key={option.id}
              variant="outline"
              className={cn(
                "h-auto py-4 text-base whitespace-normal justify-start text-left transition-all duration-300",
                selectedOptionId === option.id && "ring-2 ring-primary border-primary"
              )}
              onClick={() => setSelectedOptionId(option.id)}
            >
              {option.option_text}
            </Button>
          ))}
        </div>

        <footer className="pt-4">
          <Button 
            className="w-full cosmic-button" 
            onClick={handleNextQuestion}
            disabled={selectedOptionId === null || status === 'submitting'}
          >
            {status === 'submitting' ? 'Submitting...' : 
             currentIndex === assessment.questions.length - 1 ? 'Finish & See Results' : 'Next Question'}
          </Button>
        </footer>
      </Card>
    </div>
  );
};

export default SkillAssessment;