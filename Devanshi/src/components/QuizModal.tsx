import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { QuizQuestion } from '../types';
import { Award, CheckCircle2, XCircle, RefreshCw, X, ArrowRight, HelpCircle } from 'lucide-react';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    prompt: 'What is the key defining property of a Gray code that distinguishes it from natural binary?',
    options: [
      'It allows direct hardware arithmetic addition',
      'Only one bit changes between any two consecutive numbers (Unit Distance Property)',
      'It requires half the number of wires to transmit',
      'It has an odd parity bit attached to every byte',
    ],
    correctIndex: 1,
    explanation:
      'Gray code is a unit distance code where only a single bit changes between adjacent numbers, preventing transition race conditions.',
    mode: 'bin2gray',
  },
  {
    id: 2,
    prompt: 'Given the 4-bit Binary input B₃B₂B₁B₀ = 1011₂, what is the corresponding Gray code G₃G₂G₁G₀?',
    options: ['1110', '1100', '1010', '1101'],
    correctIndex: 0,
    explanation:
      'G₃ = B₃ = 1; G₂ = 1 ⊕ 0 = 1; G₁ = 0 ⊕ 1 = 1; G₀ = 1 ⊕ 1 = 0. Therefore, Gray code is 1110.',
    mode: 'bin2gray',
  },
  {
    id: 3,
    prompt: 'How many 2-input XOR gates inside the IC 7486 are actively used for a 4-bit Binary-to-Gray converter?',
    options: ['4 gates', '3 gates', '2 gates', '1 gate'],
    correctIndex: 1,
    explanation:
      'Only 3 XOR gates are needed because the MSB (Bit 3) passes through directly without requiring any logic gate.',
    mode: 'bin2gray',
  },
  {
    id: 4,
    prompt: 'Why are optical rotary encoders and shaft position sensors encoded in Gray code rather than standard binary?',
    options: [
      'To prevent false intermediate glitch states caused by slight physical misalignment of tracks',
      'To make the optical disk rotate faster',
      'To reduce laser diode power consumption',
      'To enable analog waveform reconstruction',
    ],
    correctIndex: 0,
    explanation:
      'In standard binary, multiple bits change simultaneously across boundaries (e.g. 0111 to 1000). Mechanical/optical imperfections cause wild erroneous readings unless Gray code is used.',
    mode: 'bin2gray',
  },
  {
    id: 5,
    prompt: 'In the Gray-to-Binary converter circuit, why is the structure called "cascaded"?',
    options: [
      'The power supply voltages drop across each stage',
      'Each gate’s output feeds back into the next XOR gate along with the next Gray bit',
      'The clock signal triggers gates in reverse order',
      'Gates are wired in series to ground',
    ],
    correctIndex: 1,
    explanation:
      'In Gray-to-Binary, B[i] = B[i+1] ⊕ G[i], which means each computed binary output cascades into the input of the next XOR gate.',
    mode: 'gray2bin',
  },
];

export const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    if (selectedOption === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsCompleted(true);
      const finalScore = score + (selectedOption === currentQ.correctIndex ? 1 : 0);
      if (finalScore >= 4) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    }
  };

  const handleResetQuiz = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl text-slate-200 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isCompleted ? (
          <div>
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-sky-400" />
              <div>
                <h3 className="text-base font-bold text-slate-100">
                  Virtual Lab Assessment Quiz
                </h3>
                <span className="text-xs text-slate-400 font-mono">
                  Question {currentIdx + 1} of {QUIZ_QUESTIONS.length} • Score: {score}
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1.5 bg-slate-800 rounded-full mb-5 overflow-hidden">
              <div
                className="h-full bg-sky-500 transition-all duration-300 rounded-full"
                style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>

            {/* Question Prompt */}
            <p className="text-sm font-semibold text-slate-100 mb-4 leading-relaxed">
              {currentQ.prompt}
            </p>

            {/* Options */}
            <div className="space-y-2.5 mb-5">
              {currentQ.options.map((opt, idx) => {
                let btnStyle = 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700';

                if (isAnswerSubmitted) {
                  if (idx === currentQ.correctIndex) {
                    btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold';
                  } else if (selectedOption === idx) {
                    btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                  } else {
                    btnStyle = 'bg-slate-950/40 border-slate-800/60 text-slate-500 opacity-60';
                  }
                } else if (selectedOption === idx) {
                  btnStyle = 'bg-sky-950/60 border-sky-500 text-sky-200 font-semibold';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswerSubmitted}
                    className={`w-full text-left p-3 rounded-xl border text-xs leading-relaxed transition-all flex items-start gap-2.5 ${btnStyle}`}
                  >
                    <span className="font-mono text-slate-400 font-bold">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanation box after answer */}
            {isAnswerSubmitted && (
              <div className="p-3.5 mb-5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1 animate-in fade-in duration-150">
                <div className="font-bold flex items-center gap-1.5">
                  {selectedOption === currentQ.correctIndex ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Correct!
                    </span>
                  ) : (
                    <span className="text-rose-400 flex items-center gap-1">
                      <XCircle className="w-4 h-4" /> Incorrect
                    </span>
                  )}
                </div>
                <p className="text-slate-300">{currentQ.explanation}</p>
              </div>
            )}

            {/* Footer Action Button */}
            <div className="flex justify-end">
              {!isAnswerSubmitted ? (
                <button
                  onClick={handleConfirmAnswer}
                  disabled={selectedOption === null}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    selectedOption !== null
                      ? 'bg-sky-500 text-slate-950 hover:bg-sky-400'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-500 text-slate-950 hover:bg-sky-400 flex items-center gap-1.5 transition-all"
                >
                  <span>{currentIdx < QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'View Results'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Quiz Results screen */
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-400 flex items-center justify-center mx-auto mb-2">
              <Award className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-slate-100">Assessment Complete!</h3>
            <p className="text-xs text-slate-400">
              You scored <strong className="text-sky-400 text-sm">{score}</strong> out of{' '}
              <strong className="text-slate-200 text-sm">{QUIZ_QUESTIONS.length}</strong> questions correctly.
            </p>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
              {score === 5
                ? 'Outstanding Mastery! You demonstrated a complete conceptual and practical understanding of IC 7486 and Gray code conversion.'
                : score >= 3
                ? 'Great job! You have a solid grasp of XOR logic and unit distance properties.'
                : 'Good attempt! Review the Lab Theory Manual tab to strengthen your understanding of XOR gate connections.'}
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handleResetQuiz}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Retake Quiz
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-xs font-bold text-slate-950 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
