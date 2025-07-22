import React, { useState } from 'react';
import { Plus, Save, X, Clock, Weight } from 'lucide-react';
import { WorkoutExercise, Workout, WorkoutSet } from '../types';
import { exerciseDatabase } from '../data/exercises';

interface WorkoutLoggerProps {
  onWorkoutSaved: (workout: Omit<Workout, 'id'>) => void;
  userId: string;
}

export function WorkoutLogger({ onWorkoutSaved, userId }: WorkoutLoggerProps) {
  const [selectedExercises, setSelectedExercises] = useState<WorkoutExercise[]>([]);
  const [duration, setDuration] = useState<number>(0);
  const [notes, setNotes] = useState<string>('');
  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredExercises = exerciseDatabase.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || exercise.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { value: 'all', label: 'All' },
    { value: 'chest', label: 'Chest' },
    { value: 'back', label: 'Back' },
    { value: 'shoulders', label: 'Shoulders' },
    { value: 'arms', label: 'Arms' },
    { value: 'legs', label: 'Legs' },
    { value: 'core', label: 'Core' },
    { value: 'cardio', label: 'Cardio' }
  ];

  const addExercise = (exerciseId: string, exerciseName: string) => {
    const newExercise: WorkoutExercise = {
      exerciseId,
      exerciseName,
      sets: [{ reps: 0, weight: 0 }],
      notes: ''
    };
    setSelectedExercises(prev => [...prev, newExercise]);
    setShowExerciseModal(false);
    setSearchTerm('');
  };

  const removeExercise = (index: number) => {
    setSelectedExercises(prev => prev.filter((_, i) => i !== index));
  };

  const updateExercise = (exerciseIndex: number, updatedExercise: WorkoutExercise) => {
    setSelectedExercises(prev => prev.map((ex, i) => 
      i === exerciseIndex ? updatedExercise : ex
    ));
  };

  const addSet = (exerciseIndex: number) => {
    const exercise = selectedExercises[exerciseIndex];
    const lastSet = exercise.sets[exercise.sets.length - 1];
    const newSet: WorkoutSet = { 
      reps: lastSet?.reps || 0, 
      weight: lastSet?.weight || 0 
    };
    
    updateExercise(exerciseIndex, {
      ...exercise,
      sets: [...exercise.sets, newSet]
    });
  };

  const removeSet = (exerciseIndex: number, setIndex: number) => {
    const exercise = selectedExercises[exerciseIndex];
    if (exercise.sets.length > 1) {
      updateExercise(exerciseIndex, {
        ...exercise,
        sets: exercise.sets.filter((_, i) => i !== setIndex)
      });
    }
  };

  const updateSet = (exerciseIndex: number, setIndex: number, updatedSet: WorkoutSet) => {
    const exercise = selectedExercises[exerciseIndex];
    updateExercise(exerciseIndex, {
      ...exercise,
      sets: exercise.sets.map((set, i) => i === setIndex ? updatedSet : set)
    });
  };

  const calculateTotalVolume = () => {
    return selectedExercises.reduce((total, exercise) => {
      return total + exercise.sets.reduce((exerciseTotal, set) => {
        return exerciseTotal + (set.reps * set.weight);
      }, 0);
    }, 0);
  };

  const saveWorkout = () => {
    if (selectedExercises.length === 0) {
      alert('Please add at least one exercise');
      return;
    }

    const workout: Omit<Workout, 'id'> = {
      userId,
      date: new Date().toISOString(),
      exercises: selectedExercises,
      duration,
      notes,
      totalVolume: calculateTotalVolume()
    };

    onWorkoutSaved(workout);
    
    // Reset form
    setSelectedExercises([]);
    setDuration(0);
    setNotes('');
    
    alert('Workout saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Log Your Workout</h1>
        <p className="text-slate-600">Track your exercises, sets, and reps</p>
      </div>

      {/* Workout Duration */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Clock className="h-5 w-5 text-slate-600" />
          <h2 className="text-lg font-semibold text-slate-800">Workout Duration</h2>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
            className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-24"
            placeholder="0"
            min="0"
          />
          <span className="text-slate-600">minutes</span>
        </div>
      </div>

      {/* Add Exercise Button */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowExerciseModal(true)}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl hover:from-green-600 hover:to-green-700 transition-colors flex items-center space-x-2 shadow-lg"
        >
          <Plus className="h-5 w-5" />
          <span>Add Exercise</span>
        </button>
      </div>

      {/* Selected Exercises */}
      {selectedExercises.map((exercise, exerciseIndex) => (
        <div key={exerciseIndex} className="bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-800">{exercise.exerciseName}</h3>
            <button
              onClick={() => removeExercise(exerciseIndex)}
              className="text-red-500 hover:text-red-700 p-1"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Sets */}
          <div className="space-y-3 mb-4">
            <div className="grid grid-cols-4 gap-4 text-sm font-medium text-slate-600 px-2">
              <span>Set</span>
              <span>Weight (lbs)</span>
              <span>Reps</span>
              <span></span>
            </div>
            
            {exercise.sets.map((set, setIndex) => (
              <div key={setIndex} className="grid grid-cols-4 gap-4 items-center">
                <span className="text-slate-600 px-2">{setIndex + 1}</span>
                
                <div className="relative">
                  <Weight className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="number"
                    value={set.weight}
                    onChange={(e) => updateSet(exerciseIndex, setIndex, {
                      ...set,
                      weight: parseFloat(e.target.value) || 0
                    })}
                    className="w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                    min="0"
                    step="0.1"
                  />
                </div>
                
                <input
                  type="number"
                  value={set.reps}
                  onChange={(e) => updateSet(exerciseIndex, setIndex, {
                    ...set,
                    reps: parseInt(e.target.value) || 0
                  })}
                  className="px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0"
                  min="0"
                />
                
                {exercise.sets.length > 1 && (
                  <button
                    onClick={() => removeSet(exerciseIndex, setIndex)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => addSet(exerciseIndex)}
              className="text-green-600 hover:text-green-700 flex items-center space-x-2 text-sm font-medium"
            >
              <Plus className="h-4 w-4" />
              <span>Add Set</span>
            </button>
            
            <div className="text-sm text-slate-600">
              Volume: {exercise.sets.reduce((total, set) => total + (set.reps * set.weight), 0)} lbs
            </div>
          </div>

          {/* Exercise Notes */}
          <div className="mt-4">
            <textarea
              value={exercise.notes || ''}
              onChange={(e) => updateExercise(exerciseIndex, {
                ...exercise,
                notes: e.target.value
              })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={2}
              placeholder="Exercise notes (optional)"
            />
          </div>
        </div>
      ))}

      {/* Workout Notes */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Workout Notes</h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={3}
          placeholder="How did the workout feel? Any observations?"
        />
      </div>

      {/* Save Button */}
      {selectedExercises.length > 0 && (
        <div className="text-center space-y-4">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 p-4">
            <p className="text-lg font-semibold text-slate-800">
              Total Volume: {calculateTotalVolume().toLocaleString()} lbs
            </p>
          </div>
          
          <button
            onClick={saveWorkout}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-colors flex items-center space-x-2 shadow-lg mx-auto"
          >
            <Save className="h-5 w-5" />
            <span>Save Workout</span>
          </button>
        </div>
      )}

      {/* Exercise Selection Modal */}
      {showExerciseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-slate-800">Select Exercise</h2>
                <button
                  onClick={() => setShowExerciseModal(false)}
                  className="text-slate-500 hover:text-slate-700"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search exercises..."
                />
                
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        selectedCategory === category.value
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-96">
              <div className="grid gap-2">
                {filteredExercises.map(exercise => (
                  <button
                    key={exercise.id}
                    onClick={() => addExercise(exercise.id, exercise.name)}
                    className="text-left p-3 rounded-lg hover:bg-slate-50 border border-slate-200 transition-colors"
                  >
                    <div className="font-medium text-slate-800">{exercise.name}</div>
                    <div className="text-sm text-slate-600 capitalize">
                      {exercise.category} • {exercise.muscleGroups.join(', ')}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}