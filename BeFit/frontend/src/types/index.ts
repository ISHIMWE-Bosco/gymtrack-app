export interface User {
  id: string;
  email: string;
  name: string;
  joinedDate: string;
}

export interface Exercise {
  id: string;
  name: string;
  category: 'chest' | 'back' | 'shoulders' | 'arms' | 'legs' | 'core' | 'cardio';
  muscleGroups: string[];
}

export interface WorkoutSet {
  reps: number;
  weight: number;
  restTime?: number;
}

export interface WorkoutExercise {
  exerciseId: string;
  exerciseName: string;
  sets: WorkoutSet[];
  notes?: string;
}

export interface Workout {
  id: string;
  userId: string;
  date: string;
  exercises: WorkoutExercise[];
  duration: number; // in minutes
  notes?: string;
  totalVolume: number; // weight * reps sum
}