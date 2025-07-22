import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { AuthPage } from './components/AuthPage';
import { Dashboard } from './components/Dashboard';
import { WorkoutLogger } from './components/WorkoutLogger';
import { WorkoutHistory } from './components/WorkoutHistory';
import { ProgressCharts } from './components/ProgressCharts';
import { User, Workout } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'log' | 'history' | 'progress'>('dashboard');
  const [user, setUser] = useState<User | null>(null);
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  // Load data from localStorage on app start
  useEffect(() => {
    const savedUser = localStorage.getItem('befitUser');
    const savedWorkouts = localStorage.getItem('befitWorkouts');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    if (savedWorkouts) {
      setWorkouts(JSON.parse(savedWorkouts));
    }
  }, []);

  // Save workouts to localStorage when updated
  useEffect(() => {
    if (workouts.length > 0) {
      localStorage.setItem('befitWorkouts', JSON.stringify(workouts));
    }
  }, [workouts]);

  const handleLogin = (email: string, password: string) => {
    // Simple demo authentication
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name: email.split('@')[0],
      joinedDate: new Date().toISOString()
    };
    setUser(newUser);
    localStorage.setItem('befitUser', JSON.stringify(newUser));
  };

  const handleSignup = (email: string, password: string, name: string) => {
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      joinedDate: new Date().toISOString()
    };
    setUser(newUser);
    localStorage.setItem('befitUser', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('befitUser');
    setCurrentPage('dashboard');
  };

  const addWorkout = (workout: Omit<Workout, 'id'>) => {
    const newWorkout: Workout = {
      ...workout,
      id: Date.now().toString(),
    };
    setWorkouts(prev => [newWorkout, ...prev]);
  };

  const deleteWorkout = (workoutId: string) => {
    setWorkouts(prev => prev.filter(w => w.id !== workoutId));
  };

  if (!user) {
    return <AuthPage onLogin={handleLogin} onSignup={handleSignup} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation 
        currentPage={currentPage} 
        onPageChange={setCurrentPage}
        user={user}
        onLogout={handleLogout}
      />
      
      <main className="container mx-auto px-4 py-6">
        {currentPage === 'dashboard' && (
          <Dashboard 
            user={user} 
            workouts={workouts}
            onNavigate={setCurrentPage}
          />
        )}
        {currentPage === 'log' && (
          <WorkoutLogger 
            onWorkoutSaved={addWorkout}
            userId={user.id}
          />
        )}
        {currentPage === 'history' && (
          <WorkoutHistory 
            workouts={workouts}
            onDeleteWorkout={deleteWorkout}
          />
        )}
        {currentPage === 'progress' && (
          <ProgressCharts workouts={workouts} />
        )}
      </main>
    </div>
  );
}

export default App;