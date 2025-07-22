export const exerciseDatabase = [
  // Chest
  {
    id: 'bench-press',
    name: 'Bench Press',
    category: 'chest' as const,
    muscleGroups: ['Chest', 'Triceps', 'Front Deltoids']
  },
  {
    id: 'incline-bench-press',
    name: 'Incline Bench Press',
    category: 'chest' as const,
    muscleGroups: ['Upper Chest', 'Triceps', 'Front Deltoids']
  },
  {
    id: 'dumbbell-press',
    name: 'Dumbbell Press',
    category: 'chest' as const,
    muscleGroups: ['Chest', 'Triceps', 'Front Deltoids']
  },
  {
    id: 'push-ups',
    name: 'Push-ups',
    category: 'chest' as const,
    muscleGroups: ['Chest', 'Triceps', 'Core']
  },
  {
    id: 'dips',
    name: 'Dips',
    category: 'chest' as const,
    muscleGroups: ['Chest', 'Triceps', 'Front Deltoids']
  },
  {
    id: 'chest-fly',
    name: 'Chest Fly',
    category: 'chest' as const,
    muscleGroups: ['Chest', 'Front Deltoids']
  },

  // Back
  {
    id: 'deadlift',
    name: 'Deadlift',
    category: 'back' as const,
    muscleGroups: ['Lower Back', 'Glutes', 'Hamstrings', 'Traps']
  },
  {
    id: 'pull-ups',
    name: 'Pull-ups',
    category: 'back' as const,
    muscleGroups: ['Lats', 'Rhomboids', 'Biceps']
  },
  {
    id: 'lat-pulldown',
    name: 'Lat Pulldown',
    category: 'back' as const,
    muscleGroups: ['Lats', 'Rhomboids', 'Biceps']
  },
  {
    id: 'barbell-row',
    name: 'Barbell Row',
    category: 'back' as const,
    muscleGroups: ['Middle Traps', 'Rhomboids', 'Rear Deltoids']
  },
  {
    id: 'dumbbell-row',
    name: 'Dumbbell Row',
    category: 'back' as const,
    muscleGroups: ['Lats', 'Rhomboids', 'Rear Deltoids']
  },
  {
    id: 'cable-row',
    name: 'Cable Row',
    category: 'back' as const,
    muscleGroups: ['Middle Traps', 'Rhomboids', 'Rear Deltoids']
  },

  // Shoulders
  {
    id: 'shoulder-press',
    name: 'Shoulder Press',
    category: 'shoulders' as const,
    muscleGroups: ['Front Deltoids', 'Side Deltoids', 'Triceps']
  },
  {
    id: 'lateral-raise',
    name: 'Lateral Raise',
    category: 'shoulders' as const,
    muscleGroups: ['Side Deltoids']
  },
  {
    id: 'rear-delt-fly',
    name: 'Rear Delt Fly',
    category: 'shoulders' as const,
    muscleGroups: ['Rear Deltoids', 'Rhomboids']
  },
  {
    id: 'front-raise',
    name: 'Front Raise',
    category: 'shoulders' as const,
    muscleGroups: ['Front Deltoids']
  },
  {
    id: 'upright-row',
    name: 'Upright Row',
    category: 'shoulders' as const,
    muscleGroups: ['Side Deltoids', 'Traps']
  },
  {
    id: 'arnold-press',
    name: 'Arnold Press',
    category: 'shoulders' as const,
    muscleGroups: ['All Deltoids', 'Triceps']
  },

  // Arms
  {
    id: 'bicep-curl',
    name: 'Bicep Curl',
    category: 'arms' as const,
    muscleGroups: ['Biceps']
  },
  {
    id: 'hammer-curl',
    name: 'Hammer Curl',
    category: 'arms' as const,
    muscleGroups: ['Biceps', 'Brachialis']
  },
  {
    id: 'tricep-extension',
    name: 'Tricep Extension',
    category: 'arms' as const,
    muscleGroups: ['Triceps']
  },
  {
    id: 'close-grip-bench-press',
    name: 'Close Grip Bench Press',
    category: 'arms' as const,
    muscleGroups: ['Triceps', 'Chest']
  },
  {
    id: 'preacher-curl',
    name: 'Preacher Curl',
    category: 'arms' as const,
    muscleGroups: ['Biceps']
  },
  {
    id: 'tricep-dips',
    name: 'Tricep Dips',
    category: 'arms' as const,
    muscleGroups: ['Triceps', 'Chest']
  },

  // Legs
  {
    id: 'squat',
    name: 'Squat',
    category: 'legs' as const,
    muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings']
  },
  {
    id: 'leg-press',
    name: 'Leg Press',
    category: 'legs' as const,
    muscleGroups: ['Quadriceps', 'Glutes']
  },
  {
    id: 'leg-extension',
    name: 'Leg Extension',
    category: 'legs' as const,
    muscleGroups: ['Quadriceps']
  },
  {
    id: 'leg-curl',
    name: 'Leg Curl',
    category: 'legs' as const,
    muscleGroups: ['Hamstrings']
  },
  {
    id: 'calf-raise',
    name: 'Calf Raise',
    category: 'legs' as const,
    muscleGroups: ['Calves']
  },
  {
    id: 'lunges',
    name: 'Lunges',
    category: 'legs' as const,
    muscleGroups: ['Quadriceps', 'Glutes', 'Hamstrings']
  },
  {
    id: 'romanian-deadlift',
    name: 'Romanian Deadlift',
    category: 'legs' as const,
    muscleGroups: ['Hamstrings', 'Glutes', 'Lower Back']
  },

  // Core
  {
    id: 'plank',
    name: 'Plank',
    category: 'core' as const,
    muscleGroups: ['Core', 'Shoulders']
  },
  {
    id: 'crunches',
    name: 'Crunches',
    category: 'core' as const,
    muscleGroups: ['Abs']
  },
  {
    id: 'russian-twists',
    name: 'Russian Twists',
    category: 'core' as const,
    muscleGroups: ['Obliques', 'Abs']
  },
  {
    id: 'mountain-climbers',
    name: 'Mountain Climbers',
    category: 'core' as const,
    muscleGroups: ['Core', 'Shoulders', 'Legs']
  },
  {
    id: 'bicycle-crunches',
    name: 'Bicycle Crunches',
    category: 'core' as const,
    muscleGroups: ['Abs', 'Obliques']
  },
  {
    id: 'leg-raises',
    name: 'Leg Raises',
    category: 'core' as const,
    muscleGroups: ['Lower Abs', 'Hip Flexors']
  },

  // Cardio
  {
    id: 'treadmill-running',
    name: 'Treadmill Running',
    category: 'cardio' as const,
    muscleGroups: ['Cardiovascular', 'Legs']
  },
  {
    id: 'elliptical',
    name: 'Elliptical',
    category: 'cardio' as const,
    muscleGroups: ['Cardiovascular', 'Full Body']
  },
  {
    id: 'stationary-bike',
    name: 'Stationary Bike',
    category: 'cardio' as const,
    muscleGroups: ['Cardiovascular', 'Legs']
  },
  {
    id: 'rowing-machine',
    name: 'Rowing Machine',
    category: 'cardio' as const,
    muscleGroups: ['Cardiovascular', 'Back', 'Legs']
  },
  {
    id: 'burpees',
    name: 'Burpees',
    category: 'cardio' as const,
    muscleGroups: ['Full Body', 'Cardiovascular']
  },
  {
    id: 'jump-rope',
    name: 'Jump Rope',
    category: 'cardio' as const,
    muscleGroups: ['Cardiovascular', 'Calves', 'Coordination']
  }
];