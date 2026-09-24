import React from 'react';
import { CheckCircle2, XCircle, AlertTriangle, ShieldCheck, TrendingUp } from 'lucide-react';

export default function AttendanceView({ courses = [], onMarkAttendance }) {
  const markAttendance = (courseId, isPresent) => {
    if (onMarkAttendance) {
      onMarkAttendance({ courseId, isPresent });
    }
  };

  // Safe Bunk / Shortage Calculator (Minimum threshold = 75%)
  const getAttendanceStatus = (present, total) => {
    if (total === 0) return { text: 'No classes held yet', safe: true, type: 'neutral' };
    const pct = (present / total) * 100;
    
    if (pct >= 75) {
      // How many classes can be safely skipped while staying >= 75%
      const canMiss = Math.floor((present - 0.75 * total) / 0.75);
      return {
        text: canMiss > 0 ? `You can safely miss ${canMiss} class${canMiss > 1 ? 'es' : ''}` : 'On the 75% margin — attend the next class!',
        safe: true,
        type: 'safe',
      };
    } else {
      // How many consecutive classes needed to get back to 75%
      const needToAttend = Math.ceil((0.75 * total - present) / 0.25);
      return {
        text: `Shortage warning: Attend next ${needToAttend} class${needToAttend > 1 ? 'es' : ''} continuously!`,
        safe: false,
        type: 'danger',
      };
    }
  };

  const totalClassesAll = courses.reduce((acc, c) => acc + (c.attendance?.total || 0), 0);
  const totalPresentAll = courses.reduce((acc, c) => acc + (c.attendance?.present || 0), 0);
  const overallPct = totalClassesAll > 0 ? Math.round((totalPresentAll / totalClassesAll) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Header & Aggregate Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Attendance Tracker</h2>
          <p className="text-sm text-slate-500 mt-0.5">Automated percentage and minimum 75% safe-class calculation.</p>
        </div>

        <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="text-right">
            <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">Overall</span>
            <span className="text-lg font-bold text-slate-900">{overallPct}%</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-base">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Courses Attendance Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {courses.map((course) => {
          const total = course.attendance?.total || 0;
          const present = course.attendance?.present || 0;
          const absent = Math.max(0, total - present);
          const percentage = total > 0 ? Math.round((present / total) * 100) : 0;
          const status = getAttendanceStatus(present, total);

          return (
            <div
              key={course.id}
              className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: course.color || '#3B82F6' }}
                    />
                    <h3 className="text-sm font-bold text-slate-900">{course.code} — {course.name}</h3>
                  </div>
                  <span className={`text-base font-extrabold ${
                    percentage >= 85 ? 'text-emerald-600' : percentage >= 75 ? 'text-amber-600' : 'text-rose-600'
                  }`}>
                    {percentage}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden mb-3">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(100, percentage)}%`,
                      backgroundColor: percentage >= 85 ? '#10B981' : percentage >= 75 ? '#F59E0B' : '#EF4444',
                    }}
                  />
                </div>

                {/* Details Counters */}
                <div className="grid grid-cols-3 gap-2 text-center py-2 bg-slate-50/70 rounded-xl border border-slate-100 text-xs mb-3">
                  <div>
                    <span className="text-slate-400 block text-[10px] font-semibold uppercase">Held</span>
                    <strong className="text-slate-800 text-sm">{total}</strong>
                  </div>
                  <div>
                    <span className="text-emerald-500 block text-[10px] font-semibold uppercase">Present</span>
                    <strong className="text-emerald-700 text-sm">{present}</strong>
                  </div>
                  <div>
                    <span className="text-rose-500 block text-[10px] font-semibold uppercase">Absent</span>
                    <strong className="text-rose-700 text-sm">{absent}</strong>
                  </div>
                </div>

                {/* Safety Badge / Bunk Advisor */}
                <div className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-medium ${
                  status.type === 'safe'
                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-800'
                    : status.type === 'danger'
                    ? 'bg-rose-50/80 border-rose-200 text-rose-800'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}>
                  {status.safe ? (
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                  <span>{status.text}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100">
                <button
                  onClick={() => markAttendance(course.id, true)}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mark Present</span>
                </button>
                <button
                  onClick={() => markAttendance(course.id, false)}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Mark Absent</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}