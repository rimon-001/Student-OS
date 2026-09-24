import React from 'react';
import { 
  Users, 
  Calendar, 
  Clock, 
  ChevronRight, 
  ClipboardList, 
  GraduationCap, 
  BookOpen, 
  CheckCircle2, 
  Plus, 
  FileText, 
  Timer, 
  FolderOpen 
} from 'lucide-react';

export default function DashboardView({
  user,
  courses,
  tasks,
  routine,
  onNavigate,
  onOpenAddTask,
  onOpenTimer,
}) {
  // Compute key statistics
  const totalClasses = courses.reduce((acc, c) => acc + (c.attendance?.total || 0), 0);
  const presentClasses = courses.reduce((acc, c) => acc + (c.attendance?.present || 0), 0);
  const overallAttendance = totalClasses > 0 ? Math.round((presentClasses / totalClasses) * 100) : 0;
  const pendingTasks = tasks.filter(t => t.status !== 'Completed');

  // Filter today's classes (defaulting to Monday / weekday for preview)
  const todaysClasses = routine.filter(r => r.day === 'Monday');

  return (
    <div className="space-y-6">
      {/* Header Greeting & Term Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            Good evening, {user?.name ? user.name.split(' ').slice(-1)[0] : 'Student'} <span className="animate-pulse">👋</span>
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">Here's what's happening with your studies today.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            <span>Tue, 24 Sep 2026</span>
          </div>
          <div className="text-xs text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200/60 font-medium">
            Semester: <strong className="text-slate-700">{user.semester}</strong> • Session: <strong className="text-slate-700">{user.session}</strong>
          </div>
        </div>
      </div>

      {/* 4 Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Attendance KPI */}
        <div 
          onClick={() => onNavigate('attendance')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all cursor-pointer flex items-center justify-between group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">
              <span className="text-emerald-500">%</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{overallAttendance}%</div>
              <p className="text-xs font-medium text-slate-500">Attendance</p>
              <span className="text-[11px] text-slate-400 font-medium mt-0.5 block">{presentClasses} / {totalClasses} classes</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-transform group-hover:translate-x-0.5" />
        </div>

        {/* Tasks KPI */}
        <div 
          onClick={() => onNavigate('tasks')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all cursor-pointer flex items-center justify-between group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <ClipboardList className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{pendingTasks.length}</div>
              <p className="text-xs font-medium text-slate-500">Pending Tasks</p>
              <span className="text-[11px] text-slate-400 font-medium mt-0.5 block">2 due this week</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-transform group-hover:translate-x-0.5" />
        </div>

        {/* CGPA KPI */}
        <div 
          onClick={() => onNavigate('gpa')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all cursor-pointer flex items-center justify-between group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">3.62</div>
              <p className="text-xs font-medium text-slate-500">CGPA</p>
              <span className="text-[11px] text-slate-400 font-medium mt-0.5 block">Last semester: 3.45</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-transform group-hover:translate-x-0.5" />
        </div>

        {/* Courses KPI */}
        <div 
          onClick={() => onNavigate('courses')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all cursor-pointer flex items-center justify-between group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{courses.length}</div>
              <p className="text-xs font-medium text-slate-500">Courses</p>
              <span className="text-[11px] text-slate-400 font-medium mt-0.5 block">{courses.length} active</span>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition-transform group-hover:translate-x-0.5" />
        </div>
      </div>

      {/* Main Grid: Left Schedules + Right Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Classes + Assignments */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Today's Classes Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                Today's Classes
              </h3>
              <button 
                onClick={() => onNavigate('routine')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {todaysClasses.map((item, idx) => (
                <div 
                  key={item.id}
                  className="p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 flex items-center justify-between transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-10 rounded-full bg-blue-500" />
                    <div>
                      <div className="text-xs font-semibold text-slate-500">{item.time}</div>
                      <div className="text-sm font-bold text-slate-900">{item.course}</div>
                      <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                        <span>{item.room}</span> • <span>{item.teacher}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                    idx === 0 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {idx === 0 ? 'Upcoming' : 'Later'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Assignments Card */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-purple-600" />
                Upcoming Assignments
              </h3>
              <button 
                onClick={() => onNavigate('tasks')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {tasks.slice(0, 4).map((task) => (
                <div 
                  key={task.id}
                  className="p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 flex items-center justify-between transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-1.5 h-10 rounded-full ${
                      task.priority === 'High' ? 'bg-rose-500' : task.priority === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'
                    }`} />
                    <div>
                      <div className="text-sm font-bold text-slate-900">{task.title}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{task.courseName} • Due: {task.deadline}</div>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    task.priority === 'High' 
                      ? 'bg-rose-50 text-rose-600 border border-rose-200' 
                      : task.priority === 'Medium' 
                      ? 'bg-amber-50 text-amber-600 border border-amber-200' 
                      : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right 1 Column: Quick Actions + Attendance Overview */}
        <div className="space-y-6">
          
          {/* Quick Actions Grid */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            <h3 className="text-base font-bold text-slate-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={onOpenAddTask}
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-blue-50/50 hover:border-blue-200 transition-all text-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <Plus className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-700">Add Task</span>
              </button>

              <button 
                onClick={() => onNavigate('materials')}
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-purple-50/50 hover:border-purple-200 transition-all text-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-700">Add Note</span>
              </button>

              <button 
                onClick={() => onNavigate('routine')}
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-amber-50/50 hover:border-amber-200 transition-all text-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-700">View Routine</span>
              </button>

              <button 
                onClick={() => onNavigate('gpa')}
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-emerald-50/50 hover:border-emerald-200 transition-all text-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-700">Calculate GPA</span>
              </button>

              <button 
                onClick={onOpenTimer}
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-rose-50/50 hover:border-rose-200 transition-all text-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <Timer className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-700">Study Timer</span>
              </button>

              <button 
                onClick={() => onNavigate('materials')}
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-indigo-50/50 hover:border-indigo-200 transition-all text-center group"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <FolderOpen className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-slate-700">Browse Materials</span>
              </button>
            </div>
          </div>

          {/* Weekly Attendance Bars */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">Weekly Attendance</h3>
              <button 
                onClick={() => onNavigate('attendance')}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                View Details
              </button>
            </div>
            
            <div className="space-y-3.5">
              {courses.slice(0, 5).map((course) => {
                const total = course.attendance?.total || 20;
                const present = course.attendance?.present || 18;
                const percentage = Math.round((present / total) * 100);
                return (
                  <div key={course.id}>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-slate-700">{course.name}</span>
                      <span className="font-bold text-slate-900">{percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-500"
                        style={{ 
                          width: `${percentage}%`,
                          backgroundColor: percentage >= 85 ? '#10B981' : percentage >= 75 ? '#F59E0B' : '#EF4444' 
                        }}
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