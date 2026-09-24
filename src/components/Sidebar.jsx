import React from 'react';
import { 
  GraduationCap, 
  LayoutDashboard, 
  BookOpen, 
  CalendarDays, 
  CheckSquare, 
  BarChart3, 
  Calculator, 
  FolderLock, 
  ShieldCheck, 
  Settings, 
  LogOut 
} from 'lucide-react';

export default function Sidebar({ 
  currentTab, 
  setCurrentTab, 
  userRole, 
  user,
  onLogout 
}) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'routine', label: 'Class Routine', icon: CalendarDays },
    { id: 'tasks', label: 'Assignments & Tasks', icon: CheckSquare },
    { id: 'attendance', label: 'Attendance', icon: BarChart3 },
    { id: 'gpa', label: 'GPA / CGPA', icon: Calculator },
    { id: 'materials', label: 'Study Materials', icon: FolderLock },
  ];

  if (userRole === 'ADMIN') {
    menuItems.push({ id: 'admin', label: 'Admin Panel', icon: ShieldCheck, badge: 'ADMIN' });
  }

  return (
    <aside className="w-64 bg-[#0F172A] text-slate-300 flex flex-col justify-between p-4 shrink-0 min-h-screen">
      <div>
        {/* Brand Logo */}
        <div className="flex items-center gap-3 px-2 py-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-1">
              Student<span className="text-blue-500">OS</span>
            </h1>
            <p className="text-xs text-slate-400">Your University Assistant</p>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/25'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-900/60 text-blue-300 border border-blue-500/30">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer & Settings */}
      <div className="pt-4 border-t border-slate-800/80 space-y-1">
        <button
          onClick={() => setCurrentTab('settings')}
          className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
            currentTab === 'settings'
              ? 'bg-blue-600 text-white font-semibold'
              : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </button>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>

        {/* Motivational Card */}
        <div className="mt-4 p-3.5 rounded-xl bg-gradient-to-br from-slate-900 to-slate-800/80 border border-slate-800 text-left relative overflow-hidden">
          <p className="text-xs text-slate-300 font-medium leading-relaxed z-10 relative">
            Small steps every day lead to big results.
          </p>
          <span className="block text-[11px] text-blue-400 mt-1 font-semibold z-10 relative">
            — Keep going, Rimon!
          </span>
        </div>
      </div>
      {/* User Profile & Sign Out */}
      <div className="p-4 border-t border-slate-800 flex items-center justify-between mt-auto">
        <div className="flex flex-col truncate pr-2">
          <span className="text-xs font-semibold text-slate-200 truncate">
            {user?.name || 'User'}
          </span>
          <span className="text-[10px] text-slate-400 capitalize">
            {userRole || 'Student'}
          </span>
        </div>
        <button
          type="button"
          onClick={onLogout}
          title="Sign Out"
          className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-rose-400 hover:text-white hover:bg-rose-600/30 border border-rose-500/40 rounded-lg transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit</span>
        </button>
      </div>
    </aside>
  );
}