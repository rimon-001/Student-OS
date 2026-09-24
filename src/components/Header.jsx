import React from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';

export default function Header({ 
  user, 
  userRole, 
  setUserRole, 
  onOpenSearch, 
  onOpenProfile 
}) {
  return (
    <header className="h-16 bg-white border-b border-slate-200/80 px-8 flex items-center justify-between sticky top-0 z-20">
      {/* Global Search Bar Trigger */}
      <div className="flex-1 max-w-lg">
        <button
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between px-3.5 py-2 text-sm text-slate-400 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl transition-all"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-slate-400" />
            <span>Search courses, notes, assignments...</span>
          </div>
          <kbd className="text-[11px] font-semibold bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs text-slate-500">
            ⌘ K
          </kbd>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
            3
          </span>
        </button>

        {/* User Role Switcher Dropdown */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-3 p-1.5 hover:bg-slate-50 rounded-xl transition-colors text-left"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-500/20"
            />
            <div className="hidden md:block">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-800 leading-tight">
                  {user.name}
                </span>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                  userRole === 'ADMIN' 
                    ? 'bg-purple-100 text-purple-700' 
                    : userRole === 'TEACHER' 
                    ? 'bg-emerald-100 text-emerald-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {userRole}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight mt-0.5">
                {user.department} • {user.semester}
              </p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>
    </header>
  );
}