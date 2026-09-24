import React, { useState } from 'react';
import { ShieldCheck, Users, GraduationCap, BellRing, Plus, Trash2 } from 'lucide-react';

export default function AdminView() {
  const [students, setStudents] = useState([
    { id: '10231', name: 'Md. Jahid Hasan Rimon', dept: 'Software Engineering', status: 'Active' },
    { id: '10232', name: 'Rahim Chowdhury', dept: 'CSE', status: 'Active' },
    { id: '10233', name: 'Karim Ullah', dept: 'Software Engineering', status: 'Suspended' },
  ]);

  const [notices, setNotices] = useState([
    { id: 1, title: 'Mid-term Exam Routine Published', date: '2026-09-24', priority: 'High' },
    { id: 2, title: 'Campus IT Network Maintenance this Weekend', date: '2026-09-22', priority: 'Medium' },
  ]);

  const handleAddStudent = () => {
    const name = prompt('Student Name:');
    if (!name) return;
    const dept = prompt('Department:', 'Software Engineering');
    const newStudent = {
      id: String(Math.floor(10000 + Math.random() * 90000)),
      name,
      dept: dept || 'Software Engineering',
      status: 'Active',
    };
    setStudents([...students, newStudent]);
  };

  const handleRemoveStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-purple-600" />
            University Admin Console
          </h2>
          <p className="text-sm text-slate-500 mt-0.5">Manage students, faculties, notices, and academic permissions.</p>
        </div>
      </div>

      {/* Admin Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 block uppercase">Total Students</span>
            <div className="text-2xl font-bold text-slate-900">{students.length}</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 block uppercase">Active Teachers</span>
            <div className="text-2xl font-bold text-slate-900">42</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <BellRing className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 block uppercase">Live Notices</span>
            <div className="text-2xl font-bold text-slate-900">{notices.length}</div>
          </div>
        </div>
      </div>

      {/* Student Registry Table */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900">Enrolled Students</h3>
          <button
            onClick={handleAddStudent}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Student</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                <th className="pb-3">Student ID</th>
                <th className="pb-3">Name</th>
                <th className="pb-3">Department</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3 font-semibold text-slate-900">{s.id}</td>
                  <td className="py-3 font-bold text-slate-800">{s.name}</td>
                  <td className="py-3 text-slate-500">{s.dept}</td>
                  <td className="py-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        s.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => handleRemoveStudent(s.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}