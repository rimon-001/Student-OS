import React, { useState, useEffect, useMemo } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  CheckSquare,
  BarChart2,
  GraduationCap,
  FolderOpen,
  Settings,
  LogOut,
  Search,
  Bell,
  ChevronDown,
  ChevronRight,
  Plus,
  FileText,
  Clock,
  Calculator,
  Folder,
  MapPin,
  User,
  Check,
  X,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Lightbulb,
  ExternalLink,
  Percent,
  CheckCircle,
  AlertCircle,
  Trash2,
  Edit3,
  Shield,
  Eye,
  EyeOff,
  Download,
  Star,
  Users,
  Briefcase,
  Megaphone,
  Filter,
  Sliders,
  Sun,
  Moon,
  RefreshCw
} from 'lucide-react';

const DEFAULT_COURSES = [
  { id: 'cse101', code: 'CSE 101', name: 'C Programming', teacher: 'Dr. Rahman', room: 'Room 302', credits: 3.0, semester: '1st Semester', color: '#0EA5E9', description: 'Foundations of structured programming, pointers, memory allocation, and algorithms.' },
  { id: 'math101', code: 'MATH 101', name: 'Mathematics', teacher: 'Prof. Karim', room: 'Room 201', credits: 3.0, semester: '1st Semester', color: '#2563EB', description: 'Differential & integral calculus, linear algebra, vectors, and complex matrices.' },
  { id: 'se101', code: 'SE 101', name: 'Software Engineering', teacher: 'Ms. Sultana', room: 'Room 305', credits: 3.0, semester: '1st Semester', color: '#F59E0B', description: 'Software Development Life Cycle, Agile Scrum, UML modeling, and SRS documentation.' },
  { id: 'eng101', code: 'ENG 101', name: 'English', teacher: 'Prof. Hasan', room: 'Room 204', credits: 2.0, semester: '1st Semester', color: '#8B5CF6', description: 'Technical communication, academic essay formulation, and professional presentation.' },
  { id: 'bio101', code: 'BIO 101', name: 'Biology for Engineers', teacher: 'Dr. Ayesha', room: 'Room 105', credits: 2.0, semester: '1st Semester', color: '#10B981', description: 'Bio-inspired computing, genetics, cellular dynamics, and biomedical signals.' },
  { id: 'chem101', code: 'CHEM 101', name: 'Engineering Chemistry', teacher: 'Dr. Alam', room: 'Lab 102', credits: 3.0, semester: '1st Semester', color: '#6366F1', description: 'Chemical thermodynamics, molecular orbital theories, polymer structures, and electrochemistry.' }
];

const DEFAULT_ROUTINE = [
  { id: 'r1', courseId: 'cse101', courseName: 'C Programming', code: 'CSE 101', teacher: 'Dr. Rahman', day: 'Monday', timeSlot: '10:00 – 11:30', startTime: '10:00 AM', endTime: '11:30 AM', room: 'Room 302', color: '#0EA5E9' },
  { id: 'r2', courseId: 'cse101', courseName: 'C Programming', code: 'CSE 101', teacher: 'Dr. Rahman', day: 'Tuesday', timeSlot: '10:00 – 11:30', startTime: '10:00 AM', endTime: '11:30 AM', room: 'Room 302', color: '#0EA5E9' },
  { id: 'r3', courseId: 'cse101', courseName: 'C Programming', code: 'CSE 101', teacher: 'Dr. Rahman', day: 'Wednesday', timeSlot: '10:00 – 11:30', startTime: '10:00 AM', endTime: '11:30 AM', room: 'Room 302', color: '#0EA5E9' },
  { id: 'r4', courseId: 'cse101', courseName: 'C Programming', code: 'CSE 101', teacher: 'Dr. Rahman', day: 'Friday', timeSlot: '10:00 – 11:30', startTime: '10:00 AM', endTime: '11:30 AM', room: 'Room 302', color: '#0EA5E9' },
  
  { id: 'r5', courseId: 'math101', courseName: 'Mathematics', code: 'MATH 101', teacher: 'Prof. Karim', day: 'Monday', timeSlot: '12:00 – 01:30', startTime: '12:00 PM', endTime: '01:30 PM', room: 'Room 201', color: '#2563EB' },
  { id: 'r6', courseId: 'math101', courseName: 'Mathematics', code: 'MATH 101', teacher: 'Prof. Karim', day: 'Tuesday', timeSlot: '12:00 – 01:30', startTime: '12:00 PM', endTime: '01:30 PM', room: 'Room 201', color: '#2563EB' },
  { id: 'r7', courseId: 'math101', courseName: 'Mathematics', code: 'MATH 101', teacher: 'Prof. Karim', day: 'Wednesday', timeSlot: '12:00 – 01:30', startTime: '12:00 PM', endTime: '01:30 PM', room: 'Room 201', color: '#2563EB' },
  { id: 'r8', courseId: 'math101', courseName: 'Mathematics', code: 'MATH 101', teacher: 'Prof. Karim', day: 'Thursday', timeSlot: '12:00 – 01:30', startTime: '12:00 PM', endTime: '01:30 PM', room: 'Room 201', color: '#2563EB' },
  { id: 'r9', courseId: 'math101', courseName: 'Mathematics', code: 'MATH 101', teacher: 'Prof. Karim', day: 'Friday', timeSlot: '12:00 – 01:30', startTime: '12:00 PM', endTime: '01:30 PM', room: 'Room 201', color: '#2563EB' },

  { id: 'r10', courseId: 'se101', courseName: 'Software Engineering', code: 'SE 101', teacher: 'Ms. Sultana', day: 'Monday', timeSlot: '02:30 – 04:00', startTime: '02:30 PM', endTime: '04:00 PM', room: 'Room 305', color: '#F59E0B' },
  { id: 'r11', courseId: 'se101', courseName: 'Software Engineering', code: 'SE 101', teacher: 'Ms. Sultana', day: 'Tuesday', timeSlot: '02:30 – 04:00', startTime: '02:30 PM', endTime: '04:00 PM', room: 'Room 305', color: '#F59E0B' },
  { id: 'r12', courseId: 'se101', courseName: 'Software Engineering', code: 'SE 101', teacher: 'Ms. Sultana', day: 'Wednesday', timeSlot: '02:30 – 04:00', startTime: '02:30 PM', endTime: '04:00 PM', room: 'Room 305', color: '#F59E0B' },
  { id: 'r13', courseId: 'se101', courseName: 'Software Engineering', code: 'SE 101', teacher: 'Ms. Sultana', day: 'Thursday', timeSlot: '02:30 – 04:00', startTime: '02:30 PM', endTime: '04:00 PM', room: 'Room 305', color: '#F59E0B' },
  { id: 'r14', courseId: 'se101', courseName: 'Software Engineering', code: 'SE 101', teacher: 'Ms. Sultana', day: 'Friday', timeSlot: '02:30 – 04:00', startTime: '02:30 PM', endTime: '04:00 PM', room: 'Room 305', color: '#F59E0B' },

  { id: 'r15', courseId: 'eng101', courseName: 'English', code: 'ENG 101', teacher: 'Prof. Hasan', day: 'Monday', timeSlot: '04:30 – 06:00', startTime: '04:30 PM', endTime: '06:00 PM', room: 'Room 204', color: '#8B5CF6' },
  { id: 'r16', courseId: 'eng101', courseName: 'English', code: 'ENG 101', teacher: 'Prof. Hasan', day: 'Tuesday', timeSlot: '04:30 – 06:00', startTime: '04:30 PM', endTime: '06:00 PM', room: 'Room 204', color: '#8B5CF6' },
  { id: 'r17', courseId: 'eng101', courseName: 'English', code: 'ENG 101', teacher: 'Prof. Hasan', day: 'Wednesday', timeSlot: '04:30 – 06:00', startTime: '04:30 PM', endTime: '06:00 PM', room: 'Room 204', color: '#8B5CF6' },
  { id: 'r18', courseId: 'eng101', courseName: 'English', code: 'ENG 101', teacher: 'Prof. Hasan', day: 'Thursday', timeSlot: '04:30 – 06:00', startTime: '04:30 PM', endTime: '06:00 PM', room: 'Room 204', color: '#8B5CF6' },
  { id: 'r19', courseId: 'eng101', courseName: 'English', code: 'ENG 101', teacher: 'Prof. Hasan', day: 'Friday', timeSlot: '04:30 – 06:00', startTime: '04:30 PM', endTime: '06:00 PM', room: 'Room 204', color: '#8B5CF6' }
];

const DEFAULT_ATTENDANCE = [
  { courseId: 'cse101', courseName: 'C Programming', total: 20, present: 18, absent: 2, color: 'bg-emerald-500' },
  { courseId: 'math101', courseName: 'Mathematics', total: 22, present: 19, absent: 3, color: 'bg-blue-600' },
  { courseId: 'se101', courseName: 'Software Engineering', total: 20, present: 17, absent: 3, color: 'bg-amber-500' },
  { courseId: 'eng101', courseName: 'English', total: 18, present: 17, absent: 1, color: 'bg-purple-600' },
  { courseId: 'bio101', courseName: 'Biology for Engineers', total: 16, present: 14, absent: 2, color: 'bg-emerald-500' },
  { courseId: 'chem101', courseName: 'Chemistry', total: 15, present: 12, absent: 3, color: 'bg-indigo-600' }
];

const DEFAULT_ASSIGNMENTS = [
  { id: 'a1', title: 'C Programming Assignment', course: 'CSE 101', priority: 'High', due: 'Tomorrow', date: '25 Sep 2026', description: 'Implement pointer-based linked list and dynamic array reallocation with Valgrind leak checking.', color: '#EF4444', completed: false },
  { id: 'a2', title: 'Math Quiz', course: 'MATH 101', priority: 'Medium', due: '3 days', date: '27 Sep 2026', description: 'Calculus derivatives, chain rule theorems and differential equations problem set 4.', color: '#F59E0B', completed: false },
  { id: 'a3', title: 'SE Presentation', course: 'SE 101', priority: 'Medium', due: '5 days', date: '29 Sep 2026', description: 'Software Architecture Diagram & Agile Sprint Backlog planning for group project.', color: '#F59E0B', completed: false },
  { id: 'a4', title: 'English Essay', course: 'ENG 101', priority: 'Low', due: '7 days', date: '1 Oct 2026', description: 'Critique on Modern Technological Ethics in Artificial Intelligence research (1500 words).', color: '#10B981', completed: false }
];

const DEFAULT_MATERIALS = [
  { id: 'm1', courseId: 'cse101', courseName: 'C Programming', title: 'Lecture 01 - Intro & Data Types.pdf', category: 'Lecture', size: '2.4 MB', date: '12 Sep 2026', isFavorite: true },
  { id: 'm2', courseId: 'cse101', courseName: 'C Programming', title: 'Pointers Deep Dive & Memory.pdf', category: 'Handout', size: '5.1 MB', date: '18 Sep 2026', isFavorite: true },
  { id: 'm3', courseId: 'cse101', courseName: 'C Programming', title: 'Lab 04 - Pointers Exercises.c', category: 'Code', size: '45 KB', date: '21 Sep 2026', isFavorite: false },
  { id: 'm4', courseId: 'math101', courseName: 'Mathematics', title: 'Linear Algebra Matrices Notes.pdf', category: 'Lecture', size: '4.2 MB', date: '14 Sep 2026', isFavorite: true },
  { id: 'm5', courseId: 'math101', courseName: 'Mathematics', title: 'Calculus CheatSheet & Formulas.pdf', category: 'Handout', size: '1.8 MB', date: '16 Sep 2026', isFavorite: false },
  { id: 'm6', courseId: 'se101', courseName: 'Software Engineering', title: 'SDLC Methodologies & Scrum.pdf', category: 'Lecture', size: '3.6 MB', date: '10 Sep 2026', isFavorite: false },
  { id: 'm7', courseId: 'se101', courseName: 'Software Engineering', title: 'UML Class Diagram Examples.pdf', category: 'Assignment', size: '2.9 MB', date: '20 Sep 2026', isFavorite: true }
];

const DEFAULT_NOTICES = [
  { id: 'n1', title: 'Midterm Examination Schedule Released', date: '23 Sep 2026', author: 'Academic Registrar', content: 'The Fall 2026 Midterm schedule is available. Ensure no exam clash is reported by 28 Sep.' },
  { id: 'n2', title: 'University Tech Fest Registration Open', date: '21 Sep 2026', author: 'Dept. of Software Eng.', content: 'Participate in Hackathon 2026 and Competitive Programming challenges. Prizes up to $5,000.' },
  { id: 'n3', title: 'Library Digital Repository Maintenance', date: '19 Sep 2026', author: 'IT Directorate', content: 'Digital IEEE repository access will be under routine maintenance on Sunday 2:00 AM.' }
];

const DEFAULT_STUDENTS = [
  { id: '10231', name: 'Md. Jahid Hasan Rimon', email: 'rimon.swe@uni.edu', dept: 'Software Engineering', semester: '1st Semester', status: 'Active', gpa: '3.62' },
  { id: '10232', name: 'Rahim Chowdhury', email: 'rahim.cse@uni.edu', dept: 'Computer Science', semester: '1st Semester', status: 'Active', gpa: '3.78' },
  { id: '10233', name: 'Karim Ullah', email: 'karim.swe@uni.edu', dept: 'Software Engineering', semester: '2nd Semester', status: 'Suspended', gpa: '2.84' },
  { id: '10234', name: 'Sarah Tahsin', email: 'sarah.swe@uni.edu', dept: 'Software Engineering', semester: '1st Semester', status: 'Active', gpa: '3.91' }
];

const DEFAULT_TEACHERS = [
  { id: 't1', name: 'Dr. Rahman', email: 'rahman@uni.edu', dept: 'Computer Science', courses: 'CSE 101, CSE 205', room: 'Faculty Rm 302' },
  { id: 't2', name: 'Prof. Karim', email: 'karim@uni.edu', dept: 'Mathematics', courses: 'MATH 101, MATH 202', room: 'Faculty Rm 201' },
  { id: 't3', name: 'Ms. Sultana', email: 'sultana@uni.edu', dept: 'Software Engineering', courses: 'SE 101, SE 201', room: 'Faculty Rm 305' },
  { id: 't4', name: 'Prof. Hasan', email: 'hasan@uni.edu', dept: 'Humanities & English', courses: 'ENG 101', room: 'Faculty Rm 204' }
];

export default function App() {
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentUserRole, setCurrentUserRole] = useState('STUDENT'); // 'STUDENT' | 'TEACHER' | 'ADMIN'
  const [authView, setAuthView] = useState('login'); // 'login' | 'register' | 'forgot'
  const [loginEmail, setLoginEmail] = useState('rimon.swe@uni.edu');
  const [loginPassword, setLoginPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Student Profile Data
  const [profile, setProfile] = useState({
    name: 'Md. Jahid Hasan Rimon',
    studentId: 'SWE-2026-098',
    department: 'Software Engineering',
    university: 'Daffodil International University',
    semester: '1st Semester',
    session: '2026-27',
    email: 'rimon.swe@uni.edu',
    phone: '+880 1712-345678',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250'
  });

  // App Navigation & Core Data
  const [activeTab, setActiveTab] = useState('dashboard');
  const [courses, setCourses] = useState(DEFAULT_COURSES);
  const [routine, setRoutine] = useState(DEFAULT_ROUTINE);
  const [attendance, setAttendance] = useState(DEFAULT_ATTENDANCE);
  const [tasks, setTasks] = useState(DEFAULT_ASSIGNMENTS);
  const [materials, setMaterials] = useState(DEFAULT_MATERIALS);
  const [notices, setNotices] = useState(DEFAULT_NOTICES);
  const [students, setStudents] = useState(DEFAULT_STUDENTS);
  const [teachers, setTeachers] = useState(DEFAULT_TEACHERS);

  // Modals & Panels
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [isRoutineModalOpen, setIsRoutineModalOpen] = useState(false);
  const [editingRoutine, setEditingRoutine] = useState(null);
  const [isMaterialModalOpen, setIsMaterialModalOpen] = useState(false);
  const [isNoticeModalOpen, setIsNoticeModalOpen] = useState(false);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isTimerModalOpen, setIsTimerModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Settings & Customization
  const [settings, setSettings] = useState({
    theme: 'light',
    accentColor: 'blue',
    showAttendance: true,
    showGpa: true,
    showPendingTasks: true,
    showTodaysClasses: true,
    showUpcomingAssignments: true,
    showWeeklyRoutine: true,
    showProgressChart: true,
    notifyBeforeClass: true,
    attendanceAlertLimit: 80
  });

  // Pomodoro Focus Timer
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds(prev => prev - 1), 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const formatTimer = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  // ⌘K Keyboard Shortcut Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const attendanceStats = useMemo(() => {
    const totalClasses = attendance.reduce((sum, a) => sum + a.total, 0);
    const totalPresent = attendance.reduce((sum, a) => sum + a.present, 0);
    const overallPct = totalClasses > 0 ? Math.round((totalPresent / totalClasses) * 100) : 0;
    return { totalClasses, totalPresent, overallPct };
  }, [attendance]);

  const pendingTasksCount = useMemo(() => {
    return tasks.filter(t => !t.completed).length;
  }, [tasks]);

  // One-click attendance actions
  const handleMarkAttendance = (courseId, type) => {
    setAttendance(prev => prev.map(item => {
      if (item.courseId === courseId) {
        if (type === 'present') {
          return { ...item, total: item.total + 1, present: item.present + 1 };
        } else {
          return { ...item, total: item.total + 1, absent: item.absent + 1 };
        }
      }
      return item;
    }));
  };

  // Toggle Assignment completion
  const handleToggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDeleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  // Course Delete
  const handleDeleteCourse = (id) => {
    setCourses(prev => prev.filter(c => c.id !== id));
    setRoutine(prev => prev.filter(r => r.courseId !== id));
    setAttendance(prev => prev.filter(a => a.courseId !== id));
    setMaterials(prev => prev.filter(m => m.courseId !== id));
  };

  // Live filter today's classes from weekly routine (assuming Today is Tuesday)
  const todaysClassesList = useMemo(() => {
    const currentDay = 'Tuesday'; // matches the UI screenshot
    return routine.filter(r => r.day === currentDay);
  }, [routine]);

  // Global search filtering
  const filteredSearchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    return {
      courses: courses.filter(c => c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q)),
      tasks: tasks.filter(t => t.title.toLowerCase().includes(q) || t.course.toLowerCase().includes(q)),
      materials: materials.filter(m => m.title.toLowerCase().includes(q) || m.courseName.toLowerCase().includes(q)),
      notices: notices.filter(n => n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q))
    };
  }, [searchQuery, courses, tasks, materials, notices]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full bg-[#0F172A] flex items-center justify-center p-4 font-sans text-slate-100">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 text-slate-800 shadow-2xl border border-slate-200">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white mx-auto mb-3 shadow-lg shadow-blue-500/30">
              <GraduationCap className="h-7 w-7" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">StudentOS</h1>
            <p className="text-xs text-slate-400 font-medium mt-1">Your University Assistant</p>
          </div>

          {authView === 'login' && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsAuthenticated(true);
              }}
              className="space-y-4"
            >
              {/* Role Quick Selector */}
              <div className="p-1 bg-slate-100 rounded-xl flex text-xs font-semibold text-slate-600">
                {['STUDENT', 'TEACHER', 'ADMIN'].map(role => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => {
                      setCurrentUserRole(role);
                      if (role === 'STUDENT') setLoginEmail('rimon.swe@uni.edu');
                      if (role === 'TEACHER') setLoginEmail('rahman.faculty@uni.edu');
                      if (role === 'ADMIN') setLoginEmail('admin@uni.edu');
                    }}
                    className={`flex-1 py-1.5 rounded-lg transition ${
                      currentUserRole === role ? 'bg-white text-blue-600 shadow-xs font-bold' : 'hover:text-slate-900'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Email / Student ID</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="Enter your student email or ID"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white transition pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500 h-3.5 w-3.5"
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => setAuthView('forgot')}
                  className="font-semibold text-blue-600 hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 transition"
              >
                Sign In to StudentOS
              </button>

              <div className="text-center text-xs text-slate-500 pt-2">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthView('register')}
                  className="font-bold text-blue-600 hover:underline"
                >
                  Create account
                </button>
              </div>
            </form>
          )}

          {authView === 'register' && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Account registered successfully! Signing you in.');
                setIsAuthenticated(true);
              }}
              className="space-y-3.5 text-xs"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                <input required placeholder="Md. Jahid Hasan Rimon" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">University Email</label>
                <input type="email" required placeholder="rimon.swe@uni.edu" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Department</label>
                  <input required defaultValue="Software Engineering" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Semester</label>
                  <input required defaultValue="1st Semester" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500" />
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Create Password</label>
                <input type="password" required placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-blue-500" />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl uppercase tracking-wider shadow-md transition"
              >
                Register Account
              </button>
              <div className="text-center pt-2">
                <button type="button" onClick={() => setAuthView('login')} className="text-blue-600 font-semibold hover:underline">
                  Already have an account? Sign in
                </button>
              </div>
            </form>
          )}

          {authView === 'forgot' && (
            <div className="space-y-4 text-xs">
              <p className="text-slate-600">Enter your student email address and we'll send you an instant reset link.</p>
              <input type="email" placeholder="name@uni.edu" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 focus:outline-none focus:border-blue-500" />
              <button
                onClick={() => {
                  alert('Password reset instructions sent to your email.');
                  setAuthView('login');
                }}
                className="w-full py-2.5 bg-blue-600 text-white font-bold rounded-xl uppercase shadow"
              >
                Send Reset Link
              </button>
              <div className="text-center">
                <button onClick={() => setAuthView('login')} className="text-slate-500 hover:text-slate-800 font-semibold">
                  Back to login
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex h-screen w-full font-sans antialiased overflow-hidden select-none ${
      settings.theme === 'dark' ? 'bg-[#0B132B] text-slate-100' : 'bg-[#0F172A] text-slate-800'
    }`}>
      {/* ===================== SIDEBAR ===================== */}
      <aside className="w-64 bg-[#0F172A] flex flex-col justify-between border-r border-slate-800 text-slate-300 shrink-0">
        <div>
          {/* Logo & Tagline */}
          <div className="px-6 py-6 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center text-xl font-bold tracking-tight text-white leading-none">
                Student<span className="text-blue-500">OS</span>
              </div>
              <span className="text-[11px] text-slate-400 font-medium tracking-wide">
                Your University Assistant
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="px-3 space-y-1 mt-2">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'courses', label: 'Courses', icon: BookOpen },
              { id: 'routine', label: 'Class Routine', icon: Calendar },
              { id: 'tasks', label: 'Assignments & Tasks', icon: CheckSquare },
              { id: 'attendance', label: 'Attendance', icon: BarChart2 },
              { id: 'gpa', label: 'GPA / CGPA', icon: GraduationCap },
              { id: 'materials', label: 'Study Materials', icon: FolderOpen }
            ].map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Admin Panel button (highlighted if Admin or for instant test switch) */}
            <button
              onClick={() => setActiveTab('admin')}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all ${
                activeTab === 'admin'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-purple-300 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <Shield className="h-4 w-4 text-purple-400" />
                <span>Admin Panel</span>
              </div>
              <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">
                {currentUserRole}
              </span>
            </button>

            <div className="my-4 border-t border-slate-800/80 mx-2" />

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all ${
                activeTab === 'settings'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <Settings className="h-4 w-4 text-slate-400" />
              <span>Settings</span>
            </button>

            <button
              onClick={() => setIsAuthenticated(false)}
              className="w-full flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-[13px] font-semibold text-slate-400 hover:text-rose-400 hover:bg-slate-800/60 transition-all"
            >
              <LogOut className="h-4 w-4 text-slate-400" />
              <span>Logout</span>
            </button>
          </nav>
        </div>

        {/* Motivational Card at bottom */}
        <div className="p-4">
          <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 p-4 shadow-xl">
            <div
              className="absolute inset-0 opacity-25 bg-cover bg-center pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle at 50% 120%, #3b82f6 0%, transparent 60%)'
              }}
            />
            <div className="relative z-10">
              <p className="text-xs text-slate-200 font-medium leading-relaxed">
                Small steps every day lead to big results.
              </p>
              <p className="text-[11px] text-slate-400 mt-2 font-mono">
                — Keep going, {profile.name.split(' ').pop()}!
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* ===================== MAIN CONTENT WRAPPER ===================== */}
      <div className={`flex-1 flex flex-col h-full overflow-hidden ${
        settings.theme === 'dark' ? 'bg-[#0B132B]' : 'bg-[#F8FAFC]'
      }`}>
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200/80 px-8 flex items-center justify-between shrink-0 z-10">
          {/* Functional Global Search Trigger */}
          <div className="flex items-center flex-1 max-w-xl">
            <div
              onClick={() => setSearchOpen(true)}
              className="w-full max-w-md bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 rounded-xl px-3.5 py-2 flex items-center gap-2.5 text-xs text-slate-400 cursor-pointer transition"
            >
              <Search className="h-4 w-4 text-slate-400" />
              <span className="flex-1">Search courses, notes, assignments...</span>
              <kbd className="text-[10px] font-semibold text-slate-400 bg-white border border-slate-200 rounded px-1.5 py-0.5 shadow-xs">
                ⌘ K
              </kbd>
            </div>
          </div>

          {/* Right Header: Role switcher, Notifications, and Profile Modal trigger */}
          <div className="flex items-center gap-4">
            {/* Quick Switch Role for Demo Testing */}
            <div className="hidden lg:flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-[11px] font-semibold text-slate-600">
              <span className="px-2 text-slate-400">Role:</span>
              {['STUDENT', 'TEACHER', 'ADMIN'].map(role => (
                <button
                  key={role}
                  onClick={() => setCurrentUserRole(role)}
                  className={`px-2.5 py-1 rounded-lg transition ${
                    currentUserRole === role ? 'bg-white text-blue-600 shadow-xs font-bold' : 'hover:text-slate-900'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-4 w-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                  {notices.length}
                </span>
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl p-4 z-50 animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-800">University Notices</span>
                    <span onClick={() => setActiveTab('admin')} className="text-[10px] text-blue-600 font-semibold cursor-pointer">
                      Manage Notices
                    </span>
                  </div>
                  <div className="space-y-2 mt-3 text-xs max-h-72 overflow-y-auto">
                    {notices.map(notice => (
                      <div key={notice.id} className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition cursor-pointer">
                        <div className="flex items-center justify-between">
                          <p className="font-bold text-slate-800 truncate">{notice.title}</p>
                          <span className="text-[10px] text-slate-400 shrink-0">{notice.date}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{notice.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Trigger Button */}
            <div
              onClick={() => setIsProfileModalOpen(true)}
              className="flex items-center gap-3 pl-2 border-l border-slate-200 cursor-pointer group"
            >
              <div className="relative">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-500/20 group-hover:ring-blue-500/50 transition"
                />
              </div>
              <div className="text-left hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition leading-tight">
                    {profile.name}
                  </h4>
                  <span className="text-[9px] font-black bg-blue-100 text-blue-700 px-1.5 py-0.2 rounded font-mono">
                    {currentUserRole}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                  {profile.department} • {profile.semester}
                </p>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-slate-600" />
            </div>
          </div>
        </header>

        {/* Scrollable View Container */}
        <main className="flex-1 overflow-y-auto p-8">
          {activeTab === 'dashboard' && (
            <DashboardHome
              profile={profile}
              settings={settings}
              attendanceStats={attendanceStats}
              pendingTasksCount={pendingTasksCount}
              courses={courses}
              tasks={tasks}
              routine={routine}
              todaysClassesList={todaysClassesList}
              attendance={attendance}
              toggleTask={handleToggleTask}
              onOpenTaskModal={() => setIsTaskModalOpen(true)}
              onOpenTimerModal={() => setIsTimerModalOpen(true)}
              onOpenNoteModal={() => setIsNoteModalOpen(true)}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'courses' && (
            <CoursesFullView
              courses={courses}
              currentUserRole={currentUserRole}
              onAddCourse={() => { setEditingCourse(null); setIsCourseModalOpen(true); }}
              onEditCourse={(c) => { setEditingCourse(c); setIsCourseModalOpen(true); }}
              onDeleteCourse={handleDeleteCourse}
            />
          )}

          {activeTab === 'routine' && (
            <RoutineFullView
              routine={routine}
              courses={courses}
              currentUserRole={currentUserRole}
              onAddClass={() => { setEditingRoutine(null); setIsRoutineModalOpen(true); }}
              onEditClass={(r) => { setEditingRoutine(r); setIsRoutineModalOpen(true); }}
              onDeleteClass={(id) => setRoutine(prev => prev.filter(r => r.id !== id))}
            />
          )}

          {activeTab === 'tasks' && (
            <TasksFullView
              tasks={tasks}
              courses={courses}
              toggleTask={handleToggleTask}
              onDeleteTask={handleDeleteTask}
              onOpenModal={() => setIsTaskModalOpen(true)}
            />
          )}

          {activeTab === 'attendance' && (
            <AttendanceFullView
              attendance={attendance}
              courses={courses}
              onMarkAttendance={handleMarkAttendance}
            />
          )}

          {activeTab === 'gpa' && (
            <GpaFullView courses={courses} />
          )}

          {activeTab === 'materials' && (
            <MaterialsFullView
              materials={materials}
              courses={courses}
              onOpenUpload={() => setIsMaterialModalOpen(true)}
              onToggleFavorite={(id) => setMaterials(prev => prev.map(m => m.id === id ? { ...m, isFavorite: !m.isFavorite } : m))}
              onDeleteMaterial={(id) => setMaterials(prev => prev.filter(m => m.id !== id))}
            />
          )}

          {activeTab === 'admin' && (
            <AdminFullView
              students={students}
              teachers={teachers}
              courses={courses}
              notices={notices}
              onAddNotice={() => setIsNoticeModalOpen(true)}
              onDeleteNotice={(id) => setNotices(prev => prev.filter(n => n.id !== id))}
              onAddStudent={() => setIsStudentModalOpen(true)}
              onDeleteStudent={(id) => setStudents(prev => prev.filter(s => s.id !== id))}
              onNavigate={setActiveTab}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsFullView
              settings={settings}
              setSettings={setSettings}
              profile={profile}
              onOpenProfile={() => setIsProfileModalOpen(true)}
            />
          )}
        </main>
      </div>

      {/* ===================== ALL APPLICATION MODALS ===================== */}

      {/* 1. Student Profile Modal */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">Student Profile</h3>
              </div>
              <button onClick={() => setIsProfileModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsProfileModalOpen(false);
              }}
              className="mt-4 space-y-4 text-xs"
            >
              <div className="flex items-center gap-4 pb-2">
                <img src={profile.avatar} alt="Avatar" className="h-16 w-16 rounded-full object-cover ring-4 ring-blue-500/20" />
                <div className="flex-1">
                  <label className="block font-bold text-slate-700 mb-1">Avatar Image URL</label>
                  <input
                    value={profile.avatar}
                    onChange={(e) => setProfile({ ...profile, avatar: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                  <input
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Student ID</label>
                  <input
                    value={profile.studentId}
                    onChange={(e) => setProfile({ ...profile, studentId: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Department</label>
                  <input
                    value={profile.department}
                    onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">University</label>
                  <input
                    value={profile.university}
                    onChange={(e) => setProfile({ ...profile, university: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Semester</label>
                  <input
                    value={profile.semester}
                    onChange={(e) => setProfile({ ...profile, semester: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Academic Session</label>
                  <input
                    value={profile.session}
                    onChange={(e) => setProfile({ ...profile, session: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsProfileModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-bold shadow hover:bg-blue-700"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Add / Edit Assignment Modal */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <CheckSquare className="h-4 w-4 text-blue-600" />
                Add New Assignment
              </h3>
              <button onClick={() => setIsTaskModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-4 w-4" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                const newTask = {
                  id: `a-${Date.now()}`,
                  title: form.title.value,
                  course: form.course.value,
                  priority: form.priority.value,
                  due: 'Upcoming',
                  date: form.date.value || '28 Sep 2026',
                  description: form.description.value,
                  color: form.priority.value === 'High' ? '#EF4444' : form.priority.value === 'Medium' ? '#F59E0B' : '#10B981',
                  completed: false
                };
                setTasks([newTask, ...tasks]);
                setIsTaskModalOpen(false);
              }}
              className="mt-4 space-y-3.5 text-xs"
            >
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Title</label>
                <input
                  name="title"
                  required
                  placeholder="e.g. C Programming Assignment 01"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Course</label>
                  <select name="course" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800">
                    {courses.map(c => (
                      <option key={c.id} value={c.code}>{c.code} - {c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Priority</label>
                  <select name="priority" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800">
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Deadline</label>
                <input
                  type="date"
                  name="date"
                  defaultValue="2026-09-28"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  name="description"
                  rows="3"
                  placeholder="Write programs using loops and pointers..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsTaskModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700"
                >
                  Save Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Add / Edit Course Modal */}
      {isCourseModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-blue-600" />
                {editingCourse ? 'Edit Course' : '+ Add Course'}
              </h3>
              <button onClick={() => setIsCourseModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-4 w-4" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                if (editingCourse) {
                  setCourses(prev => prev.map(c => c.id === editingCourse.id ? {
                    ...c,
                    code: form.code.value,
                    name: form.name.value,
                    teacher: form.teacher.value,
                    credits: parseFloat(form.credits.value),
                    room: form.room.value,
                    semester: form.semester.value,
                    color: form.color.value,
                    description: form.description.value
                  } : c));
                } else {
                  const newC = {
                    id: `c-${Date.now()}`,
                    code: form.code.value,
                    name: form.name.value,
                    teacher: form.teacher.value,
                    credits: parseFloat(form.credits.value),
                    room: form.room.value,
                    semester: form.semester.value,
                    color: form.color.value,
                    description: form.description.value
                  };
                  setCourses([...courses, newC]);
                  // Also add default attendance tracker entry
                  setAttendance([...attendance, { courseId: newC.id, courseName: newC.name, total: 1, present: 1, absent: 0, color: 'bg-blue-600' }]);
                }
                setIsCourseModalOpen(false);
              }}
              className="mt-4 space-y-3 text-xs"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Course Code</label>
                  <input name="code" defaultValue={editingCourse?.code || 'CSE 205'} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Credits</label>
                  <input type="number" step="0.5" name="credits" defaultValue={editingCourse?.credits || 3.0} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800" />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Course Name</label>
                <input name="name" defaultValue={editingCourse?.name || 'Object Oriented Programming'} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Teacher</label>
                  <input name="teacher" defaultValue={editingCourse?.teacher || 'Dr. Rahman'} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Room</label>
                  <input name="room" defaultValue={editingCourse?.room || 'Room 302'} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Semester</label>
                  <input name="semester" defaultValue={editingCourse?.semester || '1st Semester'} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Card Color</label>
                  <input type="color" name="color" defaultValue={editingCourse?.color || '#0EA5E9'} className="w-full h-9 bg-slate-50 border border-slate-200 rounded-xl p-1" />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description</label>
                <textarea name="description" rows="2" defaultValue={editingCourse?.description || ''} placeholder="Course overview and syllabus..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800" />
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setIsCourseModalOpen(false)} className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow">
                  {editingCourse ? 'Save Changes' : 'Create Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Add / Edit Routine Class Modal */}
      {isRoutineModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                {editingRoutine ? 'Edit Class Schedule' : 'Add Class to Routine'}
              </h3>
              <button onClick={() => setIsRoutineModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-4 w-4" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                const selectedCourse = courses.find(c => c.id === form.courseId.value) || courses[0];
                const newSlot = {
                  id: editingRoutine ? editingRoutine.id : `r-${Date.now()}`,
                  courseId: selectedCourse.id,
                  courseName: selectedCourse.name,
                  code: selectedCourse.code,
                  teacher: form.teacher.value,
                  day: form.day.value,
                  timeSlot: `${form.start.value} – ${form.end.value}`,
                  startTime: `${form.start.value}`,
                  endTime: `${form.end.value}`,
                  room: form.room.value,
                  color: selectedCourse.color
                };
                if (editingRoutine) {
                  setRoutine(prev => prev.map(r => r.id === editingRoutine.id ? newSlot : r));
                } else {
                  setRoutine([...routine, newSlot]);
                }
                setIsRoutineModalOpen(false);
              }}
              className="mt-4 space-y-3.5 text-xs"
            >
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Course</label>
                <select name="courseId" defaultValue={editingRoutine?.courseId || courses[0]?.id} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800">
                  {courses.map(c => (
                    <option key={c.id} value={c.id}>{c.code} – {c.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Teacher</label>
                  <input name="teacher" defaultValue={editingRoutine?.teacher || 'Dr. Rahman'} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Day</label>
                  <select name="day" defaultValue={editingRoutine?.day || 'Monday'} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Start Time</label>
                  <input name="start" defaultValue={editingRoutine?.startTime || '10:00 AM'} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">End Time</label>
                  <input name="end" defaultValue={editingRoutine?.endTime || '11:30 AM'} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800" />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Room</label>
                <input name="room" defaultValue={editingRoutine?.room || 'Room 302'} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800" />
              </div>
              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setIsRoutineModalOpen(false)} className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow">
                  Save Class
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Add Study Material Modal */}
      {isMaterialModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FolderOpen className="h-4 w-4 text-blue-600" />
                Upload Study Material
              </h3>
              <button onClick={() => setIsMaterialModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-4 w-4" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                const selectedCourse = courses.find(c => c.id === form.courseId.value) || courses[0];
                const newM = {
                  id: `m-${Date.now()}`,
                  courseId: selectedCourse.id,
                  courseName: selectedCourse.name,
                  title: form.title.value,
                  category: form.category.value,
                  size: '3.1 MB',
                  date: 'Today',
                  isFavorite: false
                };
                setMaterials([newM, ...materials]);
                setIsMaterialModalOpen(false);
              }}
              className="mt-4 space-y-3.5 text-xs"
            >
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Material Title</label>
                <input name="title" required placeholder="e.g. Lecture 05 - Memory Leaks & Pointers.pdf" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Course</label>
                  <select name="courseId" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800">
                    {courses.map(c => (
                      <option key={c.id} value={c.id}>{c.code} – {c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select name="category" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800">
                    <option value="Lecture">Lecture Slides</option>
                    <option value="Handout">Handout</option>
                    <option value="Code">Code Snippet</option>
                    <option value="Assignment">Past Question</option>
                  </select>
                </div>
              </div>
              <div className="p-4 border-2 border-dashed border-slate-200 rounded-2xl text-center bg-slate-50 hover:bg-blue-50/30 cursor-pointer">
                <FolderOpen className="h-6 w-6 text-slate-400 mx-auto mb-1" />
                <span className="text-slate-600 font-semibold block">Click to select files from device</span>
                <span className="text-[10px] text-slate-400">PDF, DOCX, ZIP, or Source Code up to 50MB</span>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsMaterialModalOpen(false)} className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow">
                  Upload Material
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Admin Add Notice Modal */}
      {isNoticeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Megaphone className="h-4 w-4 text-purple-600" />
                Publish University Notice
              </h3>
              <button onClick={() => setIsNoticeModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-4 w-4" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                const newN = {
                  id: `n-${Date.now()}`,
                  title: form.title.value,
                  date: 'Just now',
                  author: form.author.value,
                  content: form.content.value
                };
                setNotices([newN, ...notices]);
                setIsNoticeModalOpen(false);
              }}
              className="mt-4 space-y-3.5 text-xs"
            >
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Notice Headline</label>
                <input name="title" required placeholder="e.g. Schedule for Lab Finals" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800" />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Publishing Authority</label>
                <input name="author" defaultValue="Dean of Engineering" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800" />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Detailed Content</label>
                <textarea name="content" rows="4" required placeholder="Provide notice details and instructions for students..." className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsNoticeModalOpen(false)} className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-purple-600 text-white font-semibold shadow">
                  Broadcast Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. Admin Add Student Modal */}
      {isStudentModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-600" />
                Add Student Record
              </h3>
              <button onClick={() => setIsStudentModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-4 w-4" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target;
                const newS = {
                  id: form.id.value,
                  name: form.name.value,
                  email: form.email.value,
                  dept: form.dept.value,
                  semester: '1st Semester',
                  status: 'Active',
                  gpa: '3.50'
                };
                setStudents([...students, newS]);
                setIsStudentModalOpen(false);
              }}
              className="mt-4 space-y-3.5 text-xs"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Student ID</label>
                  <input name="id" defaultValue="10235" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-mono" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Department</label>
                  <input name="dept" defaultValue="Software Engineering" required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800" />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                <input name="name" required placeholder="Student Name" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800" />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Institutional Email</label>
                <input type="email" name="email" required placeholder="student@uni.edu" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsStudentModalOpen(false)} className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-purple-600 text-white font-semibold shadow">
                  Enroll Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 8. Study Timer Modal (Pomodoro) */}
      {isTimerModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl text-center border border-slate-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-4">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                Focus Study Session
              </h3>
              <button onClick={() => setIsTimerModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="my-6">
              <span className="text-5xl font-black text-slate-900 tracking-tight font-mono">
                {formatTimer(timerSeconds)}
              </span>
              <p className="text-xs text-slate-500 mt-2 font-medium">
                {isTimerRunning ? '🔥 Deep Study in Progress' : '25-minute Pomodoro focus block'}
              </p>
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white shadow-md transition ${
                  isTimerRunning ? 'bg-amber-500 hover:bg-amber-600' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isTimerRunning ? <><Pause className="h-4 w-4" /> Pause</> : <><Play className="h-4 w-4" /> Start Focus</>}
              </button>
              <button
                onClick={() => {
                  setIsTimerRunning(false);
                  setTimerSeconds(25 * 60);
                }}
                className="p-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition"
                title="Reset Timer"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 9. Quick Add Note Modal */}
      {isNoteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <FileText className="h-4 w-4 text-blue-600" />
                Quick Study Note
              </h3>
              <button onClick={() => setIsNoteModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4 space-y-3 text-xs">
              <input
                id="note-title-quick"
                placeholder="Note title..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-semibold focus:outline-none"
              />
              <textarea
                id="note-content-quick"
                rows="4"
                placeholder="Write quick formulas, reminder, or memo..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none"
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setIsNoteModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    const title = document.getElementById('note-title-quick')?.value;
                    if (title) alert(`Note "${title}" saved to local study notebook.`);
                    setIsNoteModalOpen(false);
                  }}
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700"
                >
                  Save Note
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 10. Live Global Search Palette (⌘K) */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-start justify-center pt-20 p-4">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in">
            <div className="p-4 border-b border-slate-100 flex items-center gap-3">
              <Search className="h-5 w-5 text-blue-600" />
              <input
                autoFocus
                type="text"
                placeholder="Search courses, assignments, study materials, notices..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full text-xs text-slate-800 outline-none placeholder:text-slate-400 font-medium"
              />
              <button onClick={() => setSearchOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-4 max-h-96 overflow-y-auto space-y-4 text-xs">
              {!searchQuery && (
                <div className="text-slate-400 text-center py-6">
                  <p className="font-semibold text-slate-600">Type any keyword to search across StudentOS</p>
                  <p className="text-[11px] mt-1">Try "C Programming", "Quiz", "Materials", or "Midterm"</p>
                </div>
              )}

              {filteredSearchResults && (
                <>
                  {filteredSearchResults.courses.length > 0 && (
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Courses</span>
                      <div className="space-y-1">
                        {filteredSearchResults.courses.map(c => (
                          <div
                            key={c.id}
                            onClick={() => { setActiveTab('courses'); setSearchOpen(false); }}
                            className="p-2.5 rounded-xl hover:bg-blue-50 text-slate-800 cursor-pointer flex items-center justify-between"
                          >
                            <span className="font-bold">{c.code} – {c.name}</span>
                            <span className="text-[11px] text-slate-400">{c.teacher}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredSearchResults.tasks.length > 0 && (
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Assignments</span>
                      <div className="space-y-1">
                        {filteredSearchResults.tasks.map(t => (
                          <div
                            key={t.id}
                            onClick={() => { setActiveTab('tasks'); setSearchOpen(false); }}
                            className="p-2.5 rounded-xl hover:bg-blue-50 text-slate-800 cursor-pointer flex items-center justify-between"
                          >
                            <span className="font-bold">{t.title}</span>
                            <span className="text-[11px] text-slate-400">{t.course} • Due {t.date}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredSearchResults.materials.length > 0 && (
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Study Materials</span>
                      <div className="space-y-1">
                        {filteredSearchResults.materials.map(m => (
                          <div
                            key={m.id}
                            onClick={() => { setActiveTab('materials'); setSearchOpen(false); }}
                            className="p-2.5 rounded-xl hover:bg-blue-50 text-slate-800 cursor-pointer flex items-center justify-between"
                          >
                            <span className="font-bold">{m.title}</span>
                            <span className="text-[11px] text-slate-400">{m.courseName}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredSearchResults.notices.length > 0 && (
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Notices</span>
                      <div className="space-y-1">
                        {filteredSearchResults.notices.map(n => (
                          <div
                            key={n.id}
                            onClick={() => { setActiveTab('admin'); setSearchOpen(false); }}
                            className="p-2.5 rounded-xl hover:bg-blue-50 text-slate-800 cursor-pointer flex items-center justify-between"
                          >
                            <span className="font-bold">{n.title}</span>
                            <span className="text-[11px] text-slate-400">{n.date}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function DashboardHome({
  profile,
  settings,
  attendanceStats,
  pendingTasksCount,
  courses,
  tasks,
  routine,
  todaysClassesList,
  attendance,
  toggleTask,
  onOpenTaskModal,
  onOpenTimerModal,
  onOpenNoteModal,
  onNavigate
}) {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Greeting and Date Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Good evening, {profile.name.split(' ').pop()} <span className="inline-block">👋</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Here's what's happening with your studies today.
          </p>
        </div>

        {/* Date & Session Widget */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200/90 px-3.5 py-2 rounded-xl shadow-xs">
            <Calendar className="h-4 w-4 text-slate-500" />
            <span>Tue, 24 Sep 2026</span>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            Semester: <strong className="text-slate-600 font-semibold">{profile.semester}</strong> • Session: <strong className="text-slate-600 font-semibold">{profile.session}</strong>
          </span>
        </div>
      </div>

      {/* 4 Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Attendance */}
        {settings.showAttendance && (
          <div
            onClick={() => onNavigate('attendance')}
            className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:shadow-md transition cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3.5">
              <div className="h-12 w-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600">
                <Percent className="h-6 w-6 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-2xl font-black text-slate-900 leading-none block">
                  {attendanceStats.overallPct}%
                </span>
                <span className="text-xs font-medium text-slate-500 mt-1 block">Attendance</span>
                <span className="text-[11px] text-slate-400 mt-0.5 block">
                  {attendanceStats.totalPresent} / {attendanceStats.totalClasses} classes
                </span>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-300" />
          </div>
        )}

        {/* KPI 2: Pending Tasks */}
        {settings.showPendingTasks && (
          <div
            onClick={() => onNavigate('tasks')}
            className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:shadow-md transition cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3.5">
              <div className="h-12 w-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600">
                <FileText className="h-6 w-6 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-2xl font-black text-slate-900 leading-none block">
                  {pendingTasksCount}
                </span>
                <span className="text-xs font-medium text-slate-500 mt-1 block">Pending Tasks</span>
                <span className="text-[11px] text-slate-400 mt-0.5 block">2 due this week</span>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-300" />
          </div>
        )}

        {/* KPI 3: CGPA */}
        {settings.showGpa && (
          <div
            onClick={() => onNavigate('gpa')}
            className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:shadow-md transition cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center gap-3.5">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                <GraduationCap className="h-6 w-6 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-2xl font-black text-slate-900 leading-none block">3.62</span>
                <span className="text-xs font-medium text-slate-500 mt-1 block">CGPA</span>
                <span className="text-[11px] text-slate-400 mt-0.5 block">Last semester: 3.45</span>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-300" />
          </div>
        )}

        {/* KPI 4: Courses */}
        <div
          onClick={() => onNavigate('courses')}
          className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:shadow-md transition cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center gap-3.5">
            <div className="h-12 w-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500">
              <BookOpen className="h-6 w-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-2xl font-black text-slate-900 leading-none block">
                {courses.length}
              </span>
              <span className="text-xs font-medium text-slate-500 mt-1 block">Courses</span>
              <span className="text-[11px] text-slate-400 mt-0.5 block">5 active</span>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-slate-300" />
        </div>
      </div>

      {/* Main Grid: Left & Center (col-span-8) and Right sidebar (col-span-4) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left & Center Columns (8 of 12) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Row 1: Today's Classes + Upcoming Assignments */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card: Today's Classes */}
            {settings.showTodaysClasses && (
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      <h3 className="text-sm font-bold text-slate-900">Today's Classes</h3>
                    </div>
                    <button onClick={() => onNavigate('routine')} className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                      View All
                    </button>
                  </div>

                  <div className="space-y-3">
                    {todaysClassesList.length > 0 ? (
                      todaysClassesList.map(item => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-1 h-9 rounded-full shrink-0 mt-0.5" style={{ backgroundColor: item.color }} />
                            <div>
                              <span className="text-[11px] font-semibold text-slate-400 block font-mono">
                                {item.timeSlot}
                              </span>
                              <h4 className="text-xs font-bold text-slate-800 mt-0.5">
                                {item.code} — {item.courseName}
                              </h4>
                              <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                                <span>{item.room}</span>
                                <span>•</span>
                                <span>{item.teacher}</span>
                              </div>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200/60">
                            Upcoming
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400 py-4 text-center">No scheduled classes today.</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Card: Upcoming Assignments */}
            {settings.showUpcomingAssignments && (
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-3">
                    <div className="flex items-center gap-2">
                      <CheckSquare className="h-4 w-4 text-blue-600" />
                      <h3 className="text-sm font-bold text-slate-900">Upcoming Assignments</h3>
                    </div>
                    <button onClick={() => onNavigate('tasks')} className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                      View All
                    </button>
                  </div>

                  <div className="space-y-3">
                    {tasks.slice(0, 4).map(item => (
                      <div
                        key={item.id}
                        onClick={() => toggleTask(item.id)}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100 cursor-pointer group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-1 h-9 rounded-full shrink-0 mt-0.5" style={{ backgroundColor: item.color }} />
                          <div>
                            <h4 className={`text-xs font-bold ${item.completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                              {item.title}
                            </h4>
                            <span className="text-[11px] text-slate-400 block mt-0.5 font-mono">
                              {item.course}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            item.priority === 'High'
                              ? 'bg-rose-50 text-rose-600 border border-rose-200/60'
                              : item.priority === 'Medium'
                              ? 'bg-amber-50 text-amber-600 border border-amber-200/60'
                              : 'bg-emerald-50 text-emerald-600 border border-emerald-200/60'
                          }`}>
                            {item.priority}
                          </span>
                          <div className="text-right">
                            <span className={`text-[11px] font-bold block ${item.due === 'Tomorrow' ? 'text-rose-500' : 'text-slate-600'}`}>
                              {item.due}
                            </span>
                            <span className="text-[10px] text-slate-400 block font-mono">
                              {item.date}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Row 2: Weekly Routine + Your Progress */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card: Weekly Routine Preview */}
            {settings.showWeeklyRoutine && (
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
                <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-blue-600" />
                    <h3 className="text-sm font-bold text-slate-900">Weekly Routine</h3>
                  </div>
                  <button onClick={() => onNavigate('routine')} className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                    View Full Routine
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-center text-xs">
                    <thead>
                      <tr className="text-slate-400 text-[11px] border-b border-slate-100">
                        <th className="py-2 text-left font-semibold">Time</th>
                        <th className="py-2 font-semibold">Mon</th>
                        <th className="py-2 font-semibold">Tue</th>
                        <th className="py-2 font-semibold">Wed</th>
                        <th className="py-2 font-semibold">Thu</th>
                        <th className="py-2 font-semibold">Fri</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 font-mono text-[11px]">
                      {['10:00 – 11:30', '12:00 – 01:30', '02:30 – 04:00', '04:30 – 06:00'].map((slot, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/60">
                          <td className="py-2.5 text-left text-slate-500 font-sans font-medium text-[10px] whitespace-nowrap">
                            {slot}
                          </td>
                          <td className="py-2.5">
                            <span className="px-2 py-1 rounded-md bg-blue-50 text-blue-600 font-semibold text-[10px]">
                              {idx === 0 ? 'C Prog' : idx === 1 ? 'Math' : idx === 2 ? 'SE' : 'English'}
                            </span>
                          </td>
                          <td className="py-2.5">
                            <span className="px-2 py-1 rounded-md bg-blue-50 text-blue-600 font-semibold text-[10px]">
                              {idx === 0 ? 'C Prog' : idx === 1 ? 'Math' : idx === 2 ? 'SE' : 'English'}
                            </span>
                          </td>
                          <td className="py-2.5">
                            <span className="px-2 py-1 rounded-md bg-blue-50 text-blue-600 font-semibold text-[10px]">
                              {idx === 0 ? 'C Prog' : idx === 1 ? 'Math' : idx === 2 ? 'SE' : 'English'}
                            </span>
                          </td>
                          <td className="py-2.5">
                            {idx === 0 ? <span className="text-slate-300">-</span> : (
                              <span className="px-2 py-1 rounded-md bg-emerald-50 text-emerald-600 font-semibold text-[10px]">
                                {idx === 1 ? 'Math' : idx === 2 ? 'SE' : 'English'}
                              </span>
                            )}
                          </td>
                          <td className="py-2.5">
                            <span className="px-2 py-1 rounded-md bg-purple-50 text-purple-600 font-semibold text-[10px]">
                              {idx === 0 ? 'C Prog' : idx === 1 ? 'Math' : idx === 2 ? 'SE' : 'English'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Card: Your Progress */}
            {settings.showProgressChart && (
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
                    <div className="flex items-center gap-2">
                      <BarChart2 className="h-4 w-4 text-blue-600" />
                      <h3 className="text-sm font-bold text-slate-900">Your Progress</h3>
                    </div>
                    <button onClick={() => onNavigate('gpa')} className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                      View Details
                    </button>
                  </div>

                  <div className="flex items-center gap-6">
                    {/* Donut Chart Indicator */}
                    <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-slate-100"
                          strokeWidth="3.2"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-blue-600 transition-all duration-1000 ease-out"
                          strokeDasharray="90.5, 100"
                          strokeWidth="3.2"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute flex flex-col items-center">
                        <span className="text-xl font-black text-slate-900 leading-none">3.62</span>
                        <span className="text-[10px] text-slate-400 font-semibold mt-0.5">CGPA</span>
                      </div>
                    </div>

                    {/* Semester Breakdown List */}
                    <div className="flex-1 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-slate-600">
                          <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                          Semester 1
                        </span>
                        <span className="font-bold text-slate-900 font-mono">3.62</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-slate-500">
                          <span className="h-2 w-2 rounded-full bg-slate-300"></span>
                          Semester 2
                        </span>
                        <span className="font-semibold text-slate-600 font-mono">3.45</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-slate-400">
                          <span className="h-2 w-2 rounded-full bg-slate-200"></span>
                          Semester 3
                        </span>
                        <span className="text-slate-400 font-mono">-</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-slate-400">
                          <span className="h-2 w-2 rounded-full bg-slate-200"></span>
                          Semester 4
                        </span>
                        <span className="text-slate-400 font-mono">-</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Target Goal Widget */}
                <div
                  onClick={() => onNavigate('gpa')}
                  className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between cursor-pointer hover:bg-slate-100/70 transition"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <div className="h-6 w-6 rounded-lg bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold">
                      🎯
                    </div>
                    <div>
                      <span className="font-bold text-slate-800">Next Goal</span>
                      <p className="text-[11px] text-blue-600 font-medium">Maintain 3.75+ CGPA this semester</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </div>
              </div>
            )}
          </div>

          {/* Bottom Dark Gradient Banner */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] border border-slate-800 p-5 shadow-lg text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                <Lightbulb className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs md:text-sm font-bold tracking-tight text-white">
                  Better tools. Better study habits. A brighter future.
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  StudentOS is here to help you stay organized, focused and achieve your goals.
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('materials')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition shrink-0 shadow-md shadow-blue-600/20"
            >
              <span>Explore Features</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Right Section Column (4 of 12): Quick Actions & Weekly Attendance */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card: Quick Actions (2x3 Grid) */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 mb-4">Quick Actions</h3>

            <div className="grid grid-cols-2 gap-3">
              {/* 1. Add Task */}
              <button
                onClick={onOpenTaskModal}
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-blue-50/50 hover:border-blue-200 transition group text-center"
              >
                <div className="h-9 w-9 rounded-full bg-white border border-slate-200 group-hover:border-blue-400 flex items-center justify-center text-slate-700 group-hover:text-blue-600 shadow-2xs mb-2 transition">
                  <Plus className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-600">
                  Add Task
                </span>
              </button>

              {/* 2. Add Note */}
              <button
                onClick={onOpenNoteModal}
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-blue-50/50 hover:border-blue-200 transition group text-center"
              >
                <div className="h-9 w-9 rounded-full bg-white border border-slate-200 group-hover:border-blue-400 flex items-center justify-center text-slate-700 group-hover:text-blue-600 shadow-2xs mb-2 transition">
                  <FileText className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-600">
                  Add Note
                </span>
              </button>

              {/* 3. View Routine */}
              <button
                onClick={() => onNavigate('routine')}
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-blue-50/50 hover:border-blue-200 transition group text-center"
              >
                <div className="h-9 w-9 rounded-full bg-white border border-slate-200 group-hover:border-blue-400 flex items-center justify-center text-slate-700 group-hover:text-blue-600 shadow-2xs mb-2 transition">
                  <Calendar className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-600">
                  View Routine
                </span>
              </button>

              {/* 4. Calculate GPA */}
              <button
                onClick={() => onNavigate('gpa')}
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-blue-50/50 hover:border-blue-200 transition group text-center"
              >
                <div className="h-9 w-9 rounded-full bg-white border border-slate-200 group-hover:border-blue-400 flex items-center justify-center text-slate-700 group-hover:text-blue-600 shadow-2xs mb-2 transition">
                  <Calculator className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-600">
                  Calculate GPA
                </span>
              </button>

              {/* 5. Study Timer */}
              <button
                onClick={onOpenTimerModal}
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-blue-50/50 hover:border-blue-200 transition group text-center"
              >
                <div className="h-9 w-9 rounded-full bg-white border border-slate-200 group-hover:border-blue-400 flex items-center justify-center text-slate-700 group-hover:text-blue-600 shadow-2xs mb-2 transition">
                  <Clock className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-600">
                  Study Timer
                </span>
              </button>

              {/* 6. Browse Materials */}
              <button
                onClick={() => onNavigate('materials')}
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 bg-slate-50/60 hover:bg-blue-50/50 hover:border-blue-200 transition group text-center"
              >
                <div className="h-9 w-9 rounded-full bg-white border border-slate-200 group-hover:border-blue-400 flex items-center justify-center text-slate-700 group-hover:text-blue-600 shadow-2xs mb-2 transition">
                  <Folder className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold text-slate-700 group-hover:text-blue-600">
                  Browse Materials
                </span>
              </button>
            </div>
          </div>

          {/* Card: Weekly Attendance */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <BarChart2 className="h-4 w-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">Weekly Attendance</h3>
              </div>
              <button onClick={() => onNavigate('attendance')} className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                View Details
              </button>
            </div>

            <div className="space-y-4">
              {attendance.map((item, idx) => {
                const pct = item.total > 0 ? Math.round((item.present / item.total) * 100) : 0;
                return (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-800">{item.courseName}</span>
                      <span className="font-mono text-slate-600">{pct}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.color} transition-all duration-700`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CoursesFullView({ courses, currentUserRole, onAddCourse, onEditCourse, onDeleteCourse }) {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Courses Directory</h1>
          <p className="text-xs text-slate-500 mt-1">Manage curriculum, credits, faculty instructors, and syllabi</p>
        </div>
        <button
          onClick={onAddCourse}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md transition shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>+ Add Course</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.map(course => (
          <div key={course.id} className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg text-white" style={{ backgroundColor: course.color }}>
                  {course.code}
                </span>
                <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                  {course.credits} Credits
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900">{course.name}</h3>
              <p className="text-xs text-slate-500 mt-2 flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-slate-400" /> {course.teacher}
              </p>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-slate-400" /> {course.room}
              </p>
              <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed bg-slate-50 p-2 rounded-lg">
                {course.description || 'No course syllabus description provided yet.'}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-400">{course.semester}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onEditCourse(course)}
                  className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                  title="Edit Course"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDeleteCourse(course.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                  title="Delete Course"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RoutineFullView({ routine, courses, currentUserRole, onAddClass, onEditClass, onDeleteClass }) {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Class Routine & Timetable</h1>
          <p className="text-xs text-slate-500 mt-1">Real-time schedule synchronized with dashboard daily classes</p>
        </div>
        <button
          onClick={onAddClass}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md transition shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>+ Add Class Slot</span>
        </button>
      </div>

      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs overflow-x-auto">
        <table className="w-full text-center text-xs">
          <thead>
            <tr className="text-slate-400 text-xs border-b border-slate-200">
              <th className="py-3 text-left font-bold uppercase tracking-wider">Day</th>
              <th className="py-3 font-bold uppercase tracking-wider text-left pl-4">Time & Duration</th>
              <th className="py-3 font-bold uppercase tracking-wider text-left">Course</th>
              <th className="py-3 font-bold uppercase tracking-wider text-left">Teacher</th>
              <th className="py-3 font-bold uppercase tracking-wider text-left">Room</th>
              <th className="py-3 font-bold uppercase tracking-wider text-right pr-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono text-xs">
            {routine.map(slot => (
              <tr key={slot.id} className="hover:bg-slate-50/80 transition">
                <td className="py-3.5 text-left font-sans font-bold text-slate-800">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-[11px]">
                    {slot.day}
                  </span>
                </td>
                <td className="py-3.5 text-left pl-4 text-slate-500 font-mono text-[11px]">
                  {slot.timeSlot}
                </td>
                <td className="py-3.5 text-left font-sans">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: slot.color }} />
                    <span className="font-bold text-slate-800">{slot.code} — {slot.courseName}</span>
                  </div>
                </td>
                <td className="py-3.5 text-left font-sans text-slate-600">
                  {slot.teacher}
                </td>
                <td className="py-3.5 text-left font-mono text-slate-600">
                  {slot.room}
                </td>
                <td className="py-3.5 text-right pr-4">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onEditClass(slot)}
                      className="p-1 text-slate-400 hover:text-blue-600 rounded transition"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteClass(slot.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 rounded transition"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TasksFullView({ tasks, courses, toggleTask, onDeleteTask, onOpenModal }) {
  const [filter, setFilter] = useState('ALL');

  const filteredTasks = tasks.filter(t => {
    if (filter === 'PENDING') return !t.completed;
    if (filter === 'COMPLETED') return t.completed;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Assignments & Tasks</h1>
          <p className="text-xs text-slate-500 mt-1">Monitor coursework deadlines, projects, problem sets, and lab deliverables</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white border border-slate-200 rounded-xl p-1 flex text-xs font-semibold">
            {['ALL', 'PENDING', 'COMPLETED'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 rounded-lg transition ${
                  filter === f ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <button
            onClick={onOpenModal}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white shadow hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" /> Add Assignment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTasks.map(task => (
          <div
            key={task.id}
            className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between hover:border-blue-300 transition"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-1.5 h-10 rounded-full shrink-0" style={{ backgroundColor: task.color }} />
                  <div>
                    <h4 className={`text-sm font-bold ${task.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                      {task.title}
                    </h4>
                    <span className="text-xs font-mono text-slate-400 block mt-0.5">
                      {task.course}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    task.priority === 'High' ? 'bg-rose-50 text-rose-600' : task.priority === 'Medium' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                  }`}>
                    {task.priority}
                  </span>
                  <button
                    onClick={() => onDeleteTask(task.id)}
                    className="text-slate-300 hover:text-rose-500 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {task.description && (
                <p className="text-xs text-slate-600 mt-3 bg-slate-50 p-2.5 rounded-xl leading-relaxed">
                  {task.description}
                </p>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">
                Deadline: <strong className="text-slate-700">{task.date}</strong>
              </span>
              <button
                onClick={() => toggleTask(task.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  task.completed
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {task.completed ? <><CheckCircle className="h-3.5 w-3.5" /> Completed</> : 'Mark Complete'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AttendanceFullView({ attendance, courses, onMarkAttendance }) {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Attendance Tracker</h1>
        <p className="text-xs text-slate-500 mt-1">One-click live attendance logger with real-time percentage recalculation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {attendance.map((att) => {
          const percentage = att.total > 0 ? ((att.present / att.total) * 100).toFixed(1) : '100.0';
          const isWarning = parseFloat(percentage) < 80.0;

          return (
            <div key={att.courseId} className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-800">{att.courseName}</h3>
                  <span className={`text-xs font-mono font-bold px-2.5 py-0.5 rounded-full ${
                    isWarning ? 'bg-rose-50 text-rose-600 border border-rose-200' : 'bg-emerald-50 text-emerald-600'
                  }`}>
                    {percentage}%
                  </span>
                </div>

                <div className="w-full bg-slate-100 h-2.5 rounded-full mt-4 overflow-hidden">
                  <div
                    className={`h-full ${isWarning ? 'bg-rose-500' : att.color} rounded-full transition-all duration-500`}
                    style={{ width: `${Math.min(parseFloat(percentage), 100)}%` }}
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 mt-4 text-center bg-slate-50 p-2.5 rounded-xl font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-sans">Total</span>
                    <span className="font-bold text-slate-800">{att.total}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-600 block font-sans">Present</span>
                    <span className="font-bold text-emerald-600">{att.present}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-rose-500 block font-sans">Absent</span>
                    <span className="font-bold text-rose-500">{att.absent}</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => onMarkAttendance(att.courseId, 'present')}
                  className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition"
                >
                  Mark Present (+1)
                </button>
                <button
                  onClick={() => onMarkAttendance(att.courseId, 'absent')}
                  className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-700 font-bold text-xs transition"
                >
                  Mark Absent
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function GpaFullView({ courses }) {
  const [grades, setGrades] = useState({
    cse101: 4.0,
    math101: 3.75,
    se101: 3.50,
    eng101: 4.0,
    bio101: 3.75,
    chem101: 3.25
  });

  const [previousSemesters, setPreviousSemesters] = useState([
    { semester: 'Semester 1', gpa: 3.62, credits: 16 },
    { semester: 'Semester 2', gpa: 3.75, credits: 18 },
    { semester: 'Semester 3', gpa: 3.81, credits: 17 }
  ]);

  const GRADE_SCALE = [
    { label: 'A+ (4.00)', value: 4.0 },
    { label: 'A (3.75)', value: 3.75 },
    { label: 'A- (3.50)', value: 3.50 },
    { label: 'B+ (3.25)', value: 3.25 },
    { label: 'B (3.00)', value: 3.00 },
    { label: 'C+ (2.50)', value: 2.50 },
    { label: 'D (2.00)', value: 2.00 },
    { label: 'F (0.00)', value: 0.0 }
  ];

  // Live Semester GPA calculation
  const currentSemesterGPA = useMemo(() => {
    let totalPoints = 0;
    let totalCredits = 0;
    courses.forEach(c => {
      const g = grades[c.id] !== undefined ? grades[c.id] : 3.75;
      totalPoints += g * c.credits;
      totalCredits += c.credits;
    });
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  }, [courses, grades]);

  // Overall CGPA calculation
  const overallCGPA = useMemo(() => {
    const totalPreviousPoints = previousSemesters.reduce((acc, sem) => acc + (sem.gpa * sem.credits), 0);
    const totalPreviousCredits = previousSemesters.reduce((acc, sem) => acc + sem.credits, 0);
    const thisSemCredits = courses.reduce((acc, c) => acc + c.credits, 0);
    const combinedCredits = totalPreviousCredits + thisSemCredits;
    const combinedPoints = totalPreviousPoints + (parseFloat(currentSemesterGPA) * thisSemCredits);
    return combinedCredits > 0 ? (combinedPoints / combinedCredits).toFixed(2) : currentSemesterGPA;
  }, [previousSemesters, currentSemesterGPA, courses]);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">GPA / CGPA Calculator & Tracker</h1>
        <p className="text-xs text-slate-500 mt-1">Live credit-weighted grade simulator and official transcripts accumulator</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Grade assignment table (8 cols) */}
        <div className="lg:col-span-8 bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-800">Current Semester Courses (1st Semester)</h3>
            <span className="text-xs text-slate-400 font-medium">Standard 4.00 grading scale</span>
          </div>

          <div className="space-y-2.5">
            {courses.map(course => (
              <div key={course.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100/60 transition">
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{course.code} – {course.name}</h4>
                  <span className="text-[11px] text-slate-400 font-mono">{course.credits} Credits</span>
                </div>
                <select
                  value={grades[course.id] || 3.75}
                  onChange={(e) => setGrades({ ...grades, [course.id]: parseFloat(e.target.value) })}
                  className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 font-bold focus:outline-none focus:border-blue-500"
                >
                  {GRADE_SCALE.map(g => (
                    <option key={g.label} value={g.value}>{g.label}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Output CGPA Gauge (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col items-center justify-center text-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">Predicted Semester GPA</span>
            <span className="text-5xl font-black text-blue-600 mt-2 font-mono tracking-tight">{currentSemesterGPA}</span>
            <div className="mt-4 pt-4 border-t border-slate-100 w-full flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Cumulative CGPA:</span>
              <span className="text-base font-black text-slate-900 font-mono">{overallCGPA}</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-3">Academic History</h4>
            <div className="space-y-2 text-xs">
              {previousSemesters.map((sem, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                  <span className="font-semibold text-slate-700">{sem.semester}</span>
                  <span className="font-bold text-slate-900 font-mono">{sem.gpa.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MaterialsFullView({ materials, courses, onOpenUpload, onToggleFavorite, onDeleteMaterial }) {
  const [activeCourseFilter, setActiveCourseFilter] = useState('ALL');
  const [searchDoc, setSearchDoc] = useState('');

  const filteredMaterials = materials.filter(m => {
    const matchesCourse = activeCourseFilter === 'ALL' || m.courseId === activeCourseFilter;
    const matchesSearch = m.title.toLowerCase().includes(searchDoc.toLowerCase());
    return matchesCourse && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Study Materials & Notes</h1>
          <p className="text-xs text-slate-500 mt-1">Repository of lecture slides, source codes, past exam papers, and summaries</p>
        </div>
        <button
          onClick={onOpenUpload}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-blue-600 text-white shadow-md hover:bg-blue-700 transition"
        >
          <Plus className="h-4 w-4" />
          <span>Upload Material</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search material title..."
            value={searchDoc}
            onChange={(e) => setSearchDoc(e.target.value)}
            className="w-full bg-white border border-slate-200/90 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none"
          />
        </div>
        <select
          value={activeCourseFilter}
          onChange={(e) => setActiveCourseFilter(e.target.value)}
          className="bg-white border border-slate-200/90 rounded-xl px-3 py-2 text-xs text-slate-700 font-semibold"
        >
          <option value="ALL">All Enrolled Courses</option>
          {courses.map(c => (
            <option key={c.id} value={c.id}>{c.code} – {c.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMaterials.map(m => (
          <div key={m.id} className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
                  {m.category}
                </span>
                <button onClick={() => onToggleFavorite(m.id)}>
                  <Star className={`h-4 w-4 ${m.isFavorite ? 'text-amber-400 fill-amber-400' : 'text-slate-300'}`} />
                </button>
              </div>

              <h4 className="text-xs font-bold text-slate-900 mt-2 line-clamp-2">{m.title}</h4>
              <p className="text-[11px] text-slate-400 mt-1 font-mono">{m.courseName}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>{m.size}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert(`Downloading "${m.title}" to local drive.`)}
                  className="p-1 hover:text-blue-600 transition"
                  title="Download File"
                >
                  <Download className="h-4 w-4" />
                </button>
                <button
                  onClick={() => onDeleteMaterial(m.id)}
                  className="p-1 hover:text-rose-600 transition"
                  title="Delete File"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminFullView({
  students,
  teachers,
  courses,
  notices,
  onAddNotice,
  onDeleteNotice,
  onAddStudent,
  onDeleteStudent,
  onNavigate
}) {
  const [adminTab, setAdminTab] = useState('students'); // 'students' | 'teachers' | 'notices'

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-purple-600" />
            <h1 className="text-2xl font-bold text-slate-900">University Admin Panel</h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">Institutional records, role permissions, and academic system settings</p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl p-1 text-xs font-semibold">
          <button
            onClick={() => setAdminTab('students')}
            className={`px-3 py-1.5 rounded-lg transition ${
              adminTab === 'students' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Students ({students.length})
          </button>
          <button
            onClick={() => setAdminTab('teachers')}
            className={`px-3 py-1.5 rounded-lg transition ${
              adminTab === 'teachers' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Teachers ({teachers.length})
          </button>
          <button
            onClick={() => setAdminTab('notices')}
            className={`px-3 py-1.5 rounded-lg transition ${
              adminTab === 'notices' ? 'bg-purple-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Broadcast Notices ({notices.length})
          </button>
        </div>
      </div>

      {adminTab === 'students' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-800">Enrolled Students Database</h3>
            <button
              onClick={onAddStudent}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold bg-purple-600 text-white shadow hover:bg-purple-700"
            >
              <Plus className="h-3.5 w-3.5" /> + Add Student
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="text-slate-400 font-bold border-b border-slate-200">
                  <th className="py-2.5">Student ID</th>
                  <th className="py-2.5">Full Name</th>
                  <th className="py-2.5">Department</th>
                  <th className="py-2.5">Semester</th>
                  <th className="py-2.5">CGPA</th>
                  <th className="py-2.5">Status</th>
                  <th className="py-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-xs">
                {students.map(s => (
                  <tr key={s.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 font-bold text-slate-900">{s.id}</td>
                    <td className="py-3 font-sans font-semibold text-slate-800">{s.name}</td>
                    <td className="py-3 font-sans text-slate-600">{s.dept}</td>
                    <td className="py-3 font-sans text-slate-500">{s.semester}</td>
                    <td className="py-3 font-bold text-blue-600">{s.gpa}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        s.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                      }`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => onDeleteStudent(s.id)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                        title="Remove Student"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {adminTab === 'teachers' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-800">Faculty & Instructors Directory</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teachers.map(t => (
              <div key={t.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                <h4 className="font-bold text-slate-900 text-sm">{t.name}</h4>
                <p className="text-xs text-slate-500 mt-1">{t.dept} • {t.room}</p>
                <div className="mt-2 text-xs text-slate-600">
                  <span className="font-bold">Allocated Courses:</span> {t.courses}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {adminTab === 'notices' && (
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-slate-800">Broadcast Official Notices</h3>
            <button
              onClick={onAddNotice}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold bg-purple-600 text-white shadow hover:bg-purple-700"
            >
              <Plus className="h-3.5 w-3.5" /> Publish Notice
            </button>
          </div>

          <div className="space-y-3">
            {notices.map(n => (
              <div key={n.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">{n.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{n.author} • {n.date}</p>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">{n.content}</p>
                </div>
                <button
                  onClick={() => onDeleteNotice(n.id)}
                  className="text-slate-400 hover:text-rose-600 p-1 shrink-0"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SettingsFullView({ settings, setSettings, profile, onOpenProfile }) {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings & Customization</h1>
        <p className="text-xs text-slate-500 mt-1">Configure user profile, modular dashboard cards, and themes</p>
      </div>

      {/* Profile quick card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={profile.avatar} alt="Profile" className="h-12 w-12 rounded-full object-cover ring-2 ring-blue-500/20" />
          <div>
            <h3 className="text-sm font-bold text-slate-900">{profile.name}</h3>
            <p className="text-xs text-slate-400">{profile.email} • {profile.studentId}</p>
          </div>
        </div>
        <button
          onClick={onOpenProfile}
          className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 hover:bg-slate-50 text-slate-700 transition"
        >
          Edit Profile
        </button>
      </div>

      {/* Dashboard Card Customizer */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">Dashboard Layout & Widgets</h3>
        <p className="text-xs text-slate-500">Toggle which cards appear on your personal dashboard overview</p>

        <div className="space-y-3 pt-2 text-xs">
          <label className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer">
            <span className="font-semibold text-slate-700">Attendance KPI Card</span>
            <input
              type="checkbox"
              checked={settings.showAttendance}
              onChange={(e) => setSettings({ ...settings, showAttendance: e.target.checked })}
              className="h-4 w-4 rounded text-blue-600"
            />
          </label>
          <label className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer">
            <span className="font-semibold text-slate-700">CGPA KPI Card</span>
            <input
              type="checkbox"
              checked={settings.showGpa}
              onChange={(e) => setSettings({ ...settings, showGpa: e.target.checked })}
              className="h-4 w-4 rounded text-blue-600"
            />
          </label>
          <label className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer">
            <span className="font-semibold text-slate-700">Today's Classes Schedule</span>
            <input
              type="checkbox"
              checked={settings.showTodaysClasses}
              onChange={(e) => setSettings({ ...settings, showTodaysClasses: e.target.checked })}
              className="h-4 w-4 rounded text-blue-600"
            />
          </label>
          <label className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer">
            <span className="font-semibold text-slate-700">Upcoming Assignments</span>
            <input
              type="checkbox"
              checked={settings.showUpcomingAssignments}
              onChange={(e) => setSettings({ ...settings, showUpcomingAssignments: e.target.checked })}
              className="h-4 w-4 rounded text-blue-600"
            />
          </label>
          <label className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer">
            <span className="font-semibold text-slate-700">Weekly Routine Timetable Grid</span>
            <input
              type="checkbox"
              checked={settings.showWeeklyRoutine}
              onChange={(e) => setSettings({ ...settings, showWeeklyRoutine: e.target.checked })}
              className="h-4 w-4 rounded text-blue-600"
            />
          </label>
        </div>
      </div>
    </div>
  );
}