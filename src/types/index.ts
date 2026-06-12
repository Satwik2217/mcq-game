export type Difficulty = 'easy' | 'medium' | 'hard';

export type QuestionType =
  | 'mcq'
  | 'true-false'
  | 'fill-blank'
  | 'assertion-reason'
  | 'scenario'
  | 'visual'
  | 'hot'
  | 'application';

export interface Question {
  id: number;
  worldId: string;
  type: QuestionType;
  difficulty: Difficulty;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  learningTip?: string;
}

export interface World {
  id: string;
  name: string;
  subtitle: string;
  icon: string;
  color: string;
  gradient: string;
  requiredScore: number;
  questionCount: number;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: (state: GameState) => boolean;
}

export interface Level {
  level: number;
  name: string;
  xpRequired: number;
}

export interface PowerUp {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  duration: number;
}

export interface GameState {
  screen: GameScreen;
  playerName: string;
  currentWorldIndex: number;
  currentQuestionIndex: number;
  questions: Question[];
  score: number;
  xp: number;
  level: number;
  streak: number;
  longestStreak: number;
  correctAnswers: number;
  wrongAnswers: number;
  answers: Record<number, number | null>;
  violations: number;
  timeTaken: number;
  startTime: number;
  badges: string[];
  activePowerUp: PowerUp | null;
  muted: boolean;
  volume: number;
  completed: boolean;
}

export type GameScreen =
  | 'landing'
  | 'name-input'
  | 'fullscreen-prompt'
  | 'game'
  | 'progress-map'
  | 'results'
  | 'review'
  | 'certificate';
