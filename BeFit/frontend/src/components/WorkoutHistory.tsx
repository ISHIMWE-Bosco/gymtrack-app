import React, { useState } from 'react';
import { Calendar, Trash2, Clock, Weight, TrendingUp, Search } from 'lucide-react';
import { Workout } from '../types';

interface WorkoutHistoryProps {
  workouts: Workout[];
  onDeleteWorkout: (workoutId: string) => void;
}

export function WorkoutHistory({ workouts, onDeleteWorkout }: WorkoutHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'duration' | 'volume'>('date');

  const filteredWorkouts = workouts
    .filter(workout => {
      const searchLower = searchTerm.toLowerCase();
      return workout.exercises.some(ex => 
        ex.exerciseName.toLowerCase().includes(searchLower)
      ) || workout.notes?.toLowerCase().includes(searchLower);
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'duration':
          return b.duration - a.duration;
        case 'volume':
          return b.totalVolume - a.totalVolume;
        default:
          return 0;
      }
    });

  const handleDelete = (workoutId: string) => {
    if (confirm('Are you sure you want to delete this workout?')) {
      onDeleteWorkout(workoutId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Workout History</h1>
        <p className="text-slate-600">Review and track your fitness journey</p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search exercises or notes..."
            />
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'duration' | 'volume')}
            className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="date">Sort by Date</option>
            <option value="duration">Sort by Duration</option>
            <option value="volume">Sort by Volume</option>
          </select>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 p-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
            <Calendar className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">{workouts.length}</h3>
          <p className="text-slate-600 text-sm">Total Sessions</p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 p-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
            <Clock className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">
            {workouts.length > 0 ? Math.round(workouts.reduce((sum, w) => sum + w.duration, 0) / workouts.length) : 0}
          </h3>
          <p className="text-slate-600 text-sm">Avg Duration (min)</p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 p-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
            <Weight className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">
            {workouts.reduce((sum, w) => sum + w.totalVolume, 0).toLocaleString()}
          </h3>
          <p className="text-slate-600 text-sm">Total Volume (lbs)</p>
        </div>
      </div>

      {/* Workout List */}
      <div className="space-y-4">
        {filteredWorkouts.length > 0 ? (
          filteredWorkouts.map((workout) => (
            <div key={workout.id} className="bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-slate-400" />
                  <h3 className="text-lg font-semibold text-slate-800">
                    {new Date(workout.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </h3>
                </div>
                <button
                  onClick={() => handleDelete(workout.id)}
                  className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete workout"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <Clock className="h-4 w-4" />
                  <span>{workout.duration} minutes</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <Weight className="h-4 w-4" />
                  <span>{workout.totalVolume.toLocaleString()} lbs total</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <TrendingUp className="h-4 w-4" />
                  <span>{workout.exercises.length} exercises</span>
                </div>
              </div>

              {/* Exercises */}
              <div className="space-y-3">
                <h4 className="font-medium text-slate-800">Exercises:</h4>
                <div className="grid gap-3">
                  {workout.exercises.map((exercise, index) => (
                    <div key={index} className="bg-slate-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-slate-800">{exercise.exerciseName}</h5>
                        <span className="text-sm text-slate-600">
                          {exercise.sets.reduce((total, set) => total + (set.reps * set.weight), 0).toLocaleString()} lbs
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                        {exercise.sets.map((set, setIndex) => (
                          <div key={setIndex} className="text-xs bg-white rounded px-2 py-1 text-center">
                            <div className="font-medium">{set.weight} lbs</div>
                            <div className="text-slate-600">{set.reps} reps</div>
                          </div>
                        ))}
                      </div>
                      {exercise.notes && (
                        <p className="text-sm text-slate-600 mt-2 italic">{exercise.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {workout.notes && (
                <div className="mt-4 p-3 bg-slate-50 rounded-lg">
                  <h5 className="font-medium text-slate-800 mb-1">Workout Notes:</h5>
                  <p className="text-sm text-slate-600">{workout.notes}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <Calendar className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-600 mb-2">No workouts found</h3>
            <p className="text-slate-500">
              {searchTerm ? 'Try adjusting your search terms' : 'Start logging workouts to see them here'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}