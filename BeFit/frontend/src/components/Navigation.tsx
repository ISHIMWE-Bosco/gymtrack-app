import React from 'react';
import { Activity, BarChart3, History, Plus, User as UserIcon, LogOut } from 'lucide-react';
import { User } from '../types';

interface NavigationProps {
  currentPage: 'dashboard' | 'log' | 'history' | 'progress';
  onPageChange: (page: 'dashboard' | 'log' | 'history' | 'progress') => void;
  user: User;
  onLogout: () => void;
}

export function Navigation({ currentPage, onPageChange, user, onLogout }: NavigationProps) {
  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Activity className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              BeFit
            </h1>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => onPageChange('dashboard')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                currentPage === 'dashboard' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
              }`}
            >
              <Activity className="h-5 w-5" />
              <span>Dashboard</span>
            </button>
            
            <button
              onClick={() => onPageChange('log')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                currentPage === 'log' 
                  ? 'bg-green-100 text-green-700' 
                  : 'text-slate-600 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              <Plus className="h-5 w-5" />
              <span>Log Workout</span>
            </button>
            
            <button
              onClick={() => onPageChange('history')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                currentPage === 'history' 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              <History className="h-5 w-5" />
              <span>History</span>
            </button>
            
            <button
              onClick={() => onPageChange('progress')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                currentPage === 'progress' 
                  ? 'bg-orange-100 text-orange-700' 
                  : 'text-slate-600 hover:text-orange-600 hover:bg-orange-50'
              }`}
            >
              <BarChart3 className="h-5 w-5" />
              <span>Progress</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-sm text-slate-600">
              <UserIcon className="h-4 w-4" />
              <span>{user.name}</span>
            </div>
            <button
              onClick={onLogout}
              className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        {/* Mobile navigation */}
        <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-200">
          <button
            onClick={() => onPageChange('dashboard')}
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
              currentPage === 'dashboard' ? 'text-blue-600' : 'text-slate-600'
            }`}
          >
            <Activity className="h-5 w-5" />
            <span className="text-xs">Dashboard</span>
          </button>
          
          <button
            onClick={() => onPageChange('log')}
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
              currentPage === 'log' ? 'text-green-600' : 'text-slate-600'
            }`}
          >
            <Plus className="h-5 w-5" />
            <span className="text-xs">Log</span>
          </button>
          
          <button
            onClick={() => onPageChange('history')}
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
              currentPage === 'history' ? 'text-purple-600' : 'text-slate-600'
            }`}
          >
            <History className="h-5 w-5" />
            <span className="text-xs">History</span>
          </button>
          
          <button
            onClick={() => onPageChange('progress')}
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
              currentPage === 'progress' ? 'text-orange-600' : 'text-slate-600'
            }`}
          >
            <BarChart3 className="h-5 w-5" />
            <span className="text-xs">Progress</span>
          </button>
        </div>
      </div>
    </nav>
  );
}