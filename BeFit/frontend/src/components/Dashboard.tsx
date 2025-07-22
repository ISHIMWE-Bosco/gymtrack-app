import React from 'react';
import { Calendar, TrendingUp, Dumbbell, Clock, Target, Plus } from 'lucide-react';
import { User, Workout } from '../types';

interface DashboardProps {
  user: User;
  workouts: Workout[];
  onNavigate: (page: 'dashboard' | 'log' | 'history' | 'progress') => void;
}

export function Dashboard({ user, workouts, onNavigate }: DashboardProps) {
  const today = new Date().toISOString().split('T')[0];
  const thisWeekWorkouts = workouts.filter(w => {
    const workoutDate = new Date(w.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return workoutDate >= weekAgo;
  });

  const totalWorkouts = workouts.length;
  const totalVolume = workouts.reduce((sum, w) => sum + w.totalVolume, 0);
  const averageDuration = workouts.length > 0 
    ? Math.round(workouts.reduce((sum, w) => sum + w.duration, 0) / workouts.length)
    : 0;

  const recentWorkouts = workouts.slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">
          Welcome back, {user.name}! 💪
        </h1>
        <p className="text-slate-600">
          Ready to crush your fitness goals today?
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 p-6 text-center hover:shadow-lg transition-shadow">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
            <Dumbbell className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">{totalWorkouts}</h3>
          <p className="text-slate-600 text-sm">Total Workouts</p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 p-6 text-center hover:shadow-lg transition-shadow">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">{thisWeekWorkouts.length}</h3>
          <p className="text-slate-600 text-sm">This Week</p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 p-6 text-center hover:shadow-lg transition-shadow">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
            <Target className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">{totalVolume.toLocaleString()}</h3>
          <p className="text-slate-600 text-sm">Total Volume (lbs)</p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 p-6 text-center hover:shadow-lg transition-shadow">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
            <Clock className="h-6 w-6 text-orange-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">{averageDuration}</h3>
          <p className="text-slate-600 text-sm">Avg Duration (min)</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <button
          onClick={() => onNavigate('log')}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl hover:from-green-600 hover:to-green-700 transition-colors transform hover:scale-[1.02] duration-200 shadow-lg"
        >
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <Plus className="h-8 w-8" />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-semibold">Log New Workout</h3>
              <p className="text-green-100">Start tracking today's session</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => onNavigate('progress')}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-colors transform hover:scale-[1.02] duration-200 shadow-lg"
        >
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <TrendingUp className="h-8 w-8" />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-semibold">View Progress</h3>
              <p className="text-blue-100">Check your fitness journey</p>
            </div>
          </div>
        </button>
      </div>

      {/* Recent Workouts */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-800">Recent Workouts</h2>
          <button
            onClick={() => onNavigate('history')}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View All
          </button>
        </div>

        {recentWorkouts.length > 0 ? (
          <div className="space-y-4">
            {recentWorkouts.map((workout) => (
              <div key={workout.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-slate-400" />
                    <span className="font-medium text-slate-800">
                      {new Date(workout.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">
                    {workout.exercises.length} exercises • {workout.duration} min
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-800">{workout.totalVolume.toLocaleString()} lbs</p>
                  <p className="text-sm text-slate-600">Total Volume</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Dumbbell className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 mb-4">No workouts logged yet</p>
            <button
              onClick={() => onNavigate('log')}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
            >
              Log Your First Workout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}