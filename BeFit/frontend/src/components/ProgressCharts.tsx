import React, { useMemo } from 'react';
import { TrendingUp, Calendar, Target, Zap } from 'lucide-react';
import { Workout } from '../types';

interface ProgressChartsProps {
  workouts: Workout[];
}

export function ProgressCharts({ workouts }: ProgressChartsProps) {
  const chartData = useMemo(() => {
    const sortedWorkouts = [...workouts].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const last30Days = sortedWorkouts.filter(w => {
      const workoutDate = new Date(w.date);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return workoutDate >= thirtyDaysAgo;
    });

    // Volume over time
    const volumeData = last30Days.map(workout => ({
      date: new Date(workout.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      volume: workout.totalVolume
    }));

    // Duration over time
    const durationData = last30Days.map(workout => ({
      date: new Date(workout.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      duration: workout.duration
    }));

    // Exercise frequency
    const exerciseFrequency: Record<string, number> = {};
    workouts.forEach(workout => {
      workout.exercises.forEach(exercise => {
        exerciseFrequency[exercise.exerciseName] = (exerciseFrequency[exercise.exerciseName] || 0) + 1;
      });
    });

    const topExercises = Object.entries(exerciseFrequency)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5);

    // Weekly summary
    const weeklyData = [];
    for (let i = 0; i < 4; i++) {
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - (i + 1) * 7);
      const weekEnd = new Date();
      weekEnd.setDate(weekEnd.getDate() - i * 7);

      const weekWorkouts = workouts.filter(w => {
        const workoutDate = new Date(w.date);
        return workoutDate >= weekStart && workoutDate < weekEnd;
      });

      weeklyData.unshift({
        week: `Week ${4 - i}`,
        workouts: weekWorkouts.length,
        totalVolume: weekWorkouts.reduce((sum, w) => sum + w.totalVolume, 0),
        avgDuration: weekWorkouts.length > 0 
          ? Math.round(weekWorkouts.reduce((sum, w) => sum + w.duration, 0) / weekWorkouts.length)
          : 0
      });
    }

    return {
      volumeData,
      durationData,
      topExercises,
      weeklyData,
      last30Days
    };
  }, [workouts]);

  const maxVolume = Math.max(...chartData.volumeData.map(d => d.volume), 0);
  const maxDuration = Math.max(...chartData.durationData.map(d => d.duration), 0);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Progress Analytics</h1>
        <p className="text-slate-600">Track your fitness journey over time</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 p-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
            <Calendar className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">{chartData.last30Days.length}</h3>
          <p className="text-slate-600 text-sm">Last 30 Days</p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 p-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">
            {chartData.last30Days.reduce((sum, w) => sum + w.totalVolume, 0).toLocaleString()}
          </h3>
          <p className="text-slate-600 text-sm">Total Volume (lbs)</p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 p-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
            <Target className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">
            {chartData.last30Days.length > 0 
              ? Math.round(chartData.last30Days.reduce((sum, w) => sum + w.duration, 0) / chartData.last30Days.length)
              : 0}
          </h3>
          <p className="text-slate-600 text-sm">Avg Duration (min)</p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 p-6 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
            <Zap className="h-6 w-6 text-orange-600" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800">
            {Math.round((chartData.last30Days.length / 30) * 7 * 10) / 10}
          </h3>
          <p className="text-slate-600 text-sm">Workouts/Week</p>
        </div>
      </div>

      {/* Volume Progress Chart */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 p-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-6">Volume Progress (Last 30 Days)</h2>
        {chartData.volumeData.length > 0 ? (
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <div className="flex items-end space-x-2 min-w-max h-48 px-4">
                {chartData.volumeData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="relative group">
                      <div
                        className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t hover:from-blue-600 hover:to-blue-500 transition-colors cursor-pointer min-w-[40px]"
                        style={{
                          height: `${(data.volume / maxVolume) * 160}px`,
                          minHeight: '4px'
                        }}
                      />
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap mb-1">
                        {data.volume.toLocaleString()} lbs
                      </div>
                    </div>
                    <div className="text-xs text-slate-600 mt-2 transform -rotate-45 origin-left whitespace-nowrap">
                      {data.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500">No data available</div>
        )}
      </div>

      {/* Duration Progress Chart */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 p-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-6">Workout Duration (Last 30 Days)</h2>
        {chartData.durationData.length > 0 ? (
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <div className="flex items-end space-x-2 min-w-max h-48 px-4">
                {chartData.durationData.map((data, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="relative group">
                      <div
                        className="bg-gradient-to-t from-green-500 to-green-400 rounded-t hover:from-green-600 hover:to-green-500 transition-colors cursor-pointer min-w-[40px]"
                        style={{
                          height: `${(data.duration / maxDuration) * 160}px`,
                          minHeight: '4px'
                        }}
                      />
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap mb-1">
                        {data.duration} min
                      </div>
                    </div>
                    <div className="text-xs text-slate-600 mt-2 transform -rotate-45 origin-left whitespace-nowrap">
                      {data.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500">No data available</div>
        )}
      </div>

      {/* Weekly Summary */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 p-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-6">Weekly Summary</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 font-semibold text-slate-800">Week</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-800">Workouts</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-800">Total Volume</th>
                <th className="text-left py-3 px-4 font-semibold text-slate-800">Avg Duration</th>
              </tr>
            </thead>
            <tbody>
              {chartData.weeklyData.map((week, index) => (
                <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4 text-slate-800">{week.week}</td>
                  <td className="py-3 px-4 text-slate-600">{week.workouts}</td>
                  <td className="py-3 px-4 text-slate-600">{week.totalVolume.toLocaleString()} lbs</td>
                  <td className="py-3 px-4 text-slate-600">{week.avgDuration} min</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Exercises */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-white/20 p-6">
        <h2 className="text-xl font-semibold text-slate-800 mb-6">Most Frequent Exercises</h2>
        {chartData.topExercises.length > 0 ? (
          <div className="space-y-3">
            {chartData.topExercises.map(([exercise, count], index) => (
              <div key={exercise} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
                    {index + 1}
                  </div>
                  <span className="font-medium text-slate-800">{exercise}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-sm text-slate-600">{count} times</div>
                  <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                      style={{
                        width: `${(count / chartData.topExercises[0][1]) * 100}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-slate-500">No exercise data available</div>
        )}
      </div>
    </div>
  );
}