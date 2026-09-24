import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

import DashboardView from './views/DashboardView';
import CoursesView from './views/CoursesView';
import RoutineView from './views/RoutineView';
import TasksView from './views/TasksView';
import AttendanceView from './views/AttendanceView';
import GpaView from './views/GpaView';

import { 
  INITIAL_USER, 
  INITIAL_COURSES, 
  INITIAL_TASKS, 
  INITIAL_ROUTINE,
  INITIAL_MATERIALS 
} from './data/initialData';

import { Search, X, Check, Timer as TimerIcon } from 'lucide-react';

export default function App() {
  // Navigation & Role State
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [userRole, setUserRole] = useState('STUDENT'); // 'STUDENT' | 'TEACHER' | 'ADMIN'
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isTimerOpen, setIsTimerOpen] = useState(false);

  // App-wide Persisted States
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('studentos_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('studentos_courses');
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('studentos_tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  const [routine, setRoutine] = useState(() => {
    const saved = localStorage.getItem('studentos_routine');
    return saved ? JSON.parse(saved) : INITIAL_ROUTINE;
  });

  // Keep LocalStorage synchronized
  useEffect(() => {
    localStorage.setItem('studentos_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('studentos_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('studentos_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('studentos_routine', JSON.stringify(routine));
  }, [routine]);

  // Global Keyboard Shortcut: ⌘ K / Ctrl K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter items for Global Search
  const searchResults = searchQuery.trim()
    ? [
        ...courses.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.code.toLowerCase().includes(searchQuery.toLowerCase())).map(c => ({ type: 'Course', title: `${c.code} – ${c.name}`, tab: 'courses' })),
        ...tasks.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase())).map(t => ({ type: 'Task', title: t.title, tab: 'tasks' })),
        ...routine.filter(r => r.course.toLowerCase().includes(searchQuery.toLowerCase())).map(r => ({ type: 'Class', title: `${r.day}: ${r.course}`, tab: 'routine' })),
      ]
    : [];

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-800 font-sans overflow-hidden">
      {/* Fixed Left Sidebar */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        userRole={userRole}
        onLogout={() => alert('Logged out successfully.')}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <Header
          user={user}
          userRole={userRole}
          setUserRole={setUserRole}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenProfile={() => setCurrentTab('settings')}
        />

        {/* Dynamic View Body */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto pb-12">
            {currentTab === 'dashboard' && (
              <DashboardView
                user={user}
                courses={courses}
                tasks={tasks}
                routine={routine}
                onNavigate={(tab) => setCurrentTab(tab)}
                onOpenAddTask={() => setCurrentTab('tasks')}
                onOpenTimer={() => setIsTimerOpen(true)}
              />
            )}

            {currentTab === 'courses' && (
              <CoursesView
                courses={courses}
                setCourses={setCourses}
                userRole={userRole}
              />
            )}

            {currentTab === 'routine' && (
              <RoutineView
                routine={routine}
                setRoutine={setRoutine}
                courses={courses}
              />
            )}

            {currentTab === 'tasks' && (
              <TasksView
                tasks={tasks}
                setTasks={setTasks}
                courses={courses}
              />
            )}

            {currentTab === 'attendance' && (
              <AttendanceView
                courses={courses}
                setCourses={setCourses}
              />
            )}

            {currentTab === 'gpa' && (
              <GpaView
                courses={courses}
              />
            )}

            {currentTab === 'settings' && (
              <div className="bg-white rounded-2xl border border-slate-200/80 p-6 max-w-xl">
                <h3 className="text-lg font-bold text-slate-900 mb-2">Student Profile & Settings</h3>
                <p className="text-xs text-slate-500 mb-6">Update your account information and preferences.</p>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      value={user.name} 
                      onChange={(e) => setUser({ ...user, name: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Student ID</label>
                    <input 
                      type="text" 
                      value={user.studentId} 
                      onChange={(e) => setUser({ ...user, studentId: e.target.value })}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Role Preview</label>
                    <div className="flex gap-2">
                      {['STUDENT', 'TEACHER', 'ADMIN'].map((role) => (
                        <button
                          key={role}
                          onClick={() => setUserRole(role)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                            userRole === role ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {role}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Global Search Dialog Modal (⌘ K) */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-start justify-center pt-20 p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-4 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-100">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                type="text"
                autoFocus
                placeholder="Search courses, tasks, or classes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm outline-none text-slate-800 placeholder-slate-400"
              />
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-3 max-h-60 overflow-y-auto space-y-1">
              {searchQuery && searchResults.length === 0 && (
                <p className="text-xs text-slate-400 py-4 text-center">No results found for "{searchQuery}"</p>
              )}
              {searchResults.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentTab(item.tab);
                    setIsSearchOpen(false);
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 flex items-center justify-between text-xs"
                >
                  <span className="font-semibold text-slate-800">{item.title}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-500 uppercase">
                    {item.type}
                  </span>
                </button>
              ))}
              {!searchQuery && (
                <p className="text-xs text-slate-400 py-3 text-center">Type something to search across your system...</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Pomodoro Study Timer Modal */}
      {isTimerOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-center animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 mx-auto flex items-center justify-center mb-3">
              <TimerIcon className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Study Focus Timer</h3>
            <div className="text-4xl font-extrabold text-slate-900 my-4 tracking-tight">25:00</div>
            <p className="text-xs text-slate-500 mb-6">Stay focused for 25 minutes, then take a 5-minute break.</p>
            <div className="flex gap-2">
              <button 
                onClick={() => setIsTimerOpen(false)}
                className="flex-1 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Close
              </button>
              <button 
                onClick={() => alert('Focus session started!')}
                className="flex-1 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors"
              >
                Start Focus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}