import LoginView from './views/LoginView';
import MaterialsView from './views/MaterialsView';
import AdminView from './views/AdminView';
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
  const [attendance, setAttendance] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [gpaData, setGpaData] = useState({ cgpa: 0, totalCredits: 0, semesters: [] });
  const [adminData, setAdminData] = useState({ stats: null, users: [] });

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('studentos_token');
  });

  const handleLogin = async ({ email, password }) => {
    try {
      const res = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const result = await res.json();
      if (result.success && result.data) {
        localStorage.setItem('studentos_token', result.data.token);
        setUser(result.data.user);
        setUserRole(result.data.user.role);
        setIsAuthenticated(true);
      } else {
        alert(result.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Unable to reach authentication server');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('studentos_token');
    setIsAuthenticated(false);
  };

   const handleMarkAttendance = async ({ courseId, isPresent }) => {
    setCourses((prevCourses) =>
      prevCourses.map((c) => {
        if (c.id === courseId) {
          const prevAtt = c.attendance || { present: 0, total: 0 };
          return {
            ...c,
            attendance: {
              present: isPresent ? prevAtt.present + 1 : prevAtt.present,
              total: prevAtt.total + 1,
            },
          };
        }
        return c;
      })
    );

    try {
      await fetch('http://localhost:5001/api/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('studentos_token')}`,
        },
        body: JSON.stringify({
          courseId,
          date: new Date().toISOString().split('T')[0],
          status: isPresent ? 'Present' : 'Absent',
        }),
      });
    } catch (err) {
      console.warn('Backend attendance logging failed:', err);
    }
  };

  const handleAddMaterial = async (materialData) => {
    try {
      const res = await fetch('http://localhost:5001/api/materials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('studentos_token')}`,
        },
        body: JSON.stringify(materialData),
      });
      const result = await res.json();
      if (result.success && result.data) {
        setMaterials((prev) => [result.data, ...(prev || [])]);
      }
    } catch (err) {
      console.warn('Backend unavailable, saving locally:', err);
      setMaterials((prev) => [{ id: 'mat_' + Date.now(), ...materialData }, ...(prev || [])]);
    }
  };

  const handleDeleteMaterial = async (id) => {
    try {
      await fetch(`http://localhost:5001/api/materials/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('studentos_token')}`,
        },
      });
      setMaterials((prev) => (prev || []).filter((m) => m.id !== id));
    } catch (err) {
      console.warn('Backend offline, deleting locally:', err);
      setMaterials((prev) => (prev || []).filter((m) => m.id !== id));
    }
  };

    // 2. Persist record to backend database

  // --- Task Action Handlers ---
  const handleAddTask = async (taskData) => {
    try {
      const response = await fetch('http://localhost:5001/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData),
      });
      const resData = await response.json();
      if (resData.success && resData.data) {
        setTasks((prev) => [resData.data, ...prev]);
      }
    } catch (err) {
      console.warn('Backend offline, saving locally:', err);
      const fallbackTask = { id: 't_' + Date.now(), ...taskData, status: 'Pending' };
      setTasks((prev) => [fallbackTask, ...prev]);
    }
  };

  const handleToggleTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:5001/api/tasks/${taskId}/toggle`, {
        method: 'PATCH',
      });
      const resData = await response.json();
      if (resData.success && resData.data) {
        setTasks((prev) =>
          prev.map((t) => (t.id === taskId ? resData.data : t))
        );
      }
    } catch (err) {
      console.warn('Backend offline, toggling locally:', err);
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId
            ? { ...t, status: t.status === 'Completed' ? 'Pending' : 'Completed' }
            : t
        )
      );
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await fetch(`http://localhost:5001/api/tasks/${taskId}`, { method: 'DELETE' });
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    } catch (err) {
      console.warn('Backend offline, deleting locally:', err);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    }
  };

  const handleRoleChange = async (newRole) => {
    try {
      const res = await fetch(`http://localhost:5001/api/auth/profile/${newRole.toLowerCase()}`);
      const result = await res.json();
      if (result.success && result.data) {
        setUser(result.data);
        setUserRole(result.data.role);
        setCurrentTab(result.data.role === 'Admin' ? 'admin' : 'dashboard');
      }
    } catch (err) {
      console.warn('Backend unavailable, switching role locally:', err);
      setUserRole(newRole);
      setCurrentTab(newRole === 'Admin' ? 'admin' : 'dashboard');
    }
  };

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

  // Fetch courses directly from Express API
  useEffect(() => {
    fetch('http://localhost:5001/api/courses')
      .then((res) => res.json())
      .then((result) => {
        if (result.success && Array.isArray(result.data)) {
          setCourses(result.data);
        }
      })
      .catch((err) => {
        console.warn('Backend unavailable, using local cache:', err);
      });
  }, []);

  // Fetch live tasks from Express API
  useEffect(() => {
    fetch('http://localhost:5001/api/tasks')
      .then((res) => res.json())
      .then((result) => {
        if (result.success && Array.isArray(result.data)) {
          setTasks(result.data);
        }
      })
      .catch((err) => console.warn('Backend unavailable, using local task cache:', err));
  }, []);

  // Fetch live routine from Express API
  useEffect(() => {
    fetch('http://localhost:5001/api/routine')
      .then((res) => res.json())
      .then((result) => {
        if (result.success && Array.isArray(result.data)) {
          setRoutine(result.data);
        }
      })
      .catch((err) => console.warn('Backend unavailable, using local routine cache:', err));
  }, []);

  // Fetch live attendance records from Express API
useEffect(() => {
  fetch('http://localhost:5001/api/attendance')
    .then((res) => res.json())
    .then((result) => {
      if (result.success && Array.isArray(result.data)) {
        setAttendance(result.data);
      }
    })
    .catch((err) => console.warn('Using local attendance cache:', err));
}, []);

// Fetch live study materials from Express API
useEffect(() => {
  fetch('http://localhost:5001/api/materials')
    .then((res) => res.json())
    .then((result) => {
      if (result.success && Array.isArray(result.data)) {
        setMaterials(result.data);
      }
    })
    .catch((err) => console.warn('Using local materials cache:', err));
}, []);

// Fetch live GPA records from Express API
useEffect(() => {
  fetch('http://localhost:5001/api/gpa')
    .then((res) => res.json())
    .then((result) => {
      if (result.success && result.data) {
        setGpaData(result.data);
      }
    })
    .catch((err) => console.warn('Using local GPA cache:', err));
}, []);

// Fetch Admin dashboard records
useEffect(() => {
  Promise.all([
    fetch('http://localhost:5001/api/admin/stats').then((res) => res.json()),
    fetch('http://localhost:5001/api/admin/users').then((res) => res.json()),
  ])
    .then(([statsRes, usersRes]) => {
      setAdminData({
        stats: statsRes.success ? statsRes.data : null,
        users: usersRes.success ? usersRes.data : [],
      });
    })
    .catch((err) => console.warn('Admin endpoints offline:', err));
}, []);

// Check JWT session on mount
useEffect(() => {
  const token = localStorage.getItem('studentos_token');
  if (token) {
    fetch('http://localhost:5001/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success && result.data) {
          setUser(result.data);
          setUserRole(result.data.role);
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('studentos_token');
          setIsAuthenticated(false);
        }
      })
      .catch(() => setIsAuthenticated(false));
  }
}, []);


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

  // Check JWT session on app load
  useEffect(() => {
    const token = localStorage.getItem('studentos_token');
    if (token) {
      fetch('http://localhost:5001/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.success && result.data) {
            setUser(result.data);
            setUserRole(result.data.role);
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem('studentos_token');
            setIsAuthenticated(false);
          }
        })
        .catch(() => setIsAuthenticated(false));
    }
  }, []);

  // Filter items for Global Search
  const searchResults = searchQuery.trim()
    ? [
        ...courses.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.code.toLowerCase().includes(searchQuery.toLowerCase())).map(c => ({ type: 'Course', title: `${c.code} – ${c.name}`, tab: 'courses' })),
        ...tasks.filter(t => t.title.toLowerCase().includes(searchQuery.toLowerCase())).map(t => ({ type: 'Task', title: t.title, tab: 'tasks' })),
        ...routine.filter(r => r.course.toLowerCase().includes(searchQuery.toLowerCase())).map(r => ({ type: 'Class', title: `${r.day}: ${r.course}`, tab: 'routine' })),
      ]
    : [];

    // Gatekeeper: Show Login if unauthenticated
  if (!isAuthenticated) {
    return <LoginView onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-slate-800 font-sans overflow-hidden">
      {/* Fixed Left Sidebar */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        userRole={userRole}
        user={user}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <Header
          user={user}
          userRole={userRole}
          setUserRole={handleRoleChange}
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
                courses={courses}
                onAddTask={handleAddTask}
                onToggleTask={handleToggleTask}
                onDeleteTask={handleDeleteTask}
              />
            )}

            {currentTab === 'attendance' && (
              <AttendanceView
                courses={courses}
                attendance={attendance}
                onMarkAttendance={handleMarkAttendance}
              />
            )}

            {currentTab === 'gpa' && (
              <GpaView
                courses={courses}
                gpaData={gpaData}
              />
            )}

            {currentTab === 'materials' && (
              <MaterialsView
                materials={materials}
                courses={courses}  
                onAddMaterial={handleAddMaterial}
                onDeleteMaterial={handleDeleteMaterial}
              />
            )}

            {currentTab === 'admin' && (
              <AdminView
                stats={adminData.stats}
                users={adminData.users}
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