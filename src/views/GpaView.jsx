import React, { useState } from 'react';
import { Calculator, Award, TrendingUp, Plus, Trash2 } from 'lucide-react';

const GRADE_POINTS = {
  'A+': 4.00,
  'A':  3.75,
  'A-': 3.50,
  'B+': 3.25,
  'B':  3.00,
  'B-': 2.75,
  'C+': 2.50,
  'C':  2.25,
  'D':  2.00,
  'F':  0.00,
};

export default function GpaView({ courses }) {
  // Current semester course grade mappings
  const [courseGrades, setCourseGrades] = useState(
    courses.map((c) => ({
      id: c.id,
      name: c.name,
      code: c.code,
      credits: c.credits || 3,
      grade: 'A',
    }))
  );

  // Historical semesters for cumulative calculation
  const [pastSemesters, setPastSemesters] = useState([
    { id: 'sem1', name: 'Semester 1', gpa: 3.62, credits: 15 },
    { id: 'sem2', name: 'Semester 2', gpa: 3.75, credits: 18 },
  ]);

  // Compute current semester GPA
  const totalCurrentCredits = courseGrades.reduce((sum, item) => sum + Number(item.credits), 0);
  const totalWeightedPoints = courseGrades.reduce(
    (sum, item) => sum + Number(item.credits) * (GRADE_POINTS[item.grade] || 0),
    0
  );
  const currentGpa = totalCurrentCredits > 0 ? (totalWeightedPoints / totalCurrentCredits).toFixed(2) : '0.00';

  // Compute cumulative CGPA across history + current
  const pastCreditsSum = pastSemesters.reduce((sum, s) => sum + s.credits, 0);
  const pastPointsSum = pastSemesters.reduce((sum, s) => sum + s.credits * s.gpa, 0);
  const cumulativeCredits = pastCreditsSum + totalCurrentCredits;
  const overallCgpa = cumulativeCredits > 0
    ? ((pastPointsSum + totalWeightedPoints) / cumulativeCredits).toFixed(2)
    : currentGpa;

  const handleGradeChange = (id, newGrade) => {
    setCourseGrades(
      courseGrades.map((item) => (item.id === id ? { ...item, grade: newGrade } : item))
    );
  };

  const handleCreditsChange = (id, newCredits) => {
    setCourseGrades(
      courseGrades.map((item) => (item.id === id ? { ...item, credits: Number(newCredits) } : item))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">GPA & CGPA Calculator</h2>
        <p className="text-sm text-slate-500 mt-0.5">Simulate course grades and view cumulative academic progress.</p>
      </div>

      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 block uppercase">Semester GPA</span>
            <div className="text-2xl font-bold text-slate-900">{currentGpa}</div>
            <span className="text-[11px] text-slate-500 font-medium">{totalCurrentCredits} credits enrolled</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 block uppercase">Overall CGPA</span>
            <div className="text-2xl font-bold text-slate-900">{overallCgpa}</div>
            <span className="text-[11px] text-slate-500 font-medium">{cumulativeCredits} total credits</span>
          </div>
        </div>

        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 block uppercase">Academic Standing</span>
            <div className="text-lg font-bold text-slate-900">
              {Number(overallCgpa) >= 3.75 ? 'First Class Honours' : Number(overallCgpa) >= 3.5 ? 'Good Standing' : 'Satisfactory'}
            </div>
            <span className="text-[11px] text-slate-500 font-medium">Target: Maintain 3.75+</span>
          </div>
        </div>
      </div>

      {/* Main Form: Current Semester Course Grades */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-4">Current Semester Courses</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="pb-3">Course</th>
                <th className="pb-3 text-center">Credit Hours</th>
                <th className="pb-3 text-center">Expected Grade</th>
                <th className="pb-3 text-right">Grade Point</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {courseGrades.map((course) => (
                <tr key={course.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5">
                    <span className="font-bold text-slate-900 block">{course.code}</span>
                    <span className="text-xs text-slate-500">{course.name}</span>
                  </td>

                  <td className="py-3.5 text-center">
                    <input
                      type="number"
                      min="1"
                      max="6"
                      value={course.credits}
                      onChange={(e) => handleCreditsChange(course.id, e.target.value)}
                      className="w-16 px-2 py-1 text-center font-semibold text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </td>

                  <td className="py-3.5 text-center">
                    <select
                      value={course.grade}
                      onChange={(e) => handleGradeChange(course.id, e.target.value)}
                      className="px-3 py-1 font-bold text-xs border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      {Object.keys(GRADE_POINTS).map((g) => (
                        <option key={g} value={g}>
                          {g} ({GRADE_POINTS[g].toFixed(2)})
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="py-3.5 text-right font-bold text-slate-800">
                    {(course.credits * (GRADE_POINTS[course.grade] || 0)).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cumulative Semester History */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-4">Previous Semester Breakdown</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {pastSemesters.map((sem) => (
            <div key={sem.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
              <span className="text-xs font-semibold text-slate-400 block">{sem.name}</span>
              <div className="text-lg font-bold text-slate-900 mt-1">{sem.gpa.toFixed(2)} GPA</div>
              <span className="text-[11px] text-slate-500 mt-0.5 block">{sem.credits} Credits Completed</span>
            </div>
          ))}
          <div className="p-4 rounded-xl border border-blue-100 bg-blue-50/50">
            <span className="text-xs font-semibold text-blue-500 block">Current (Simulated)</span>
            <div className="text-lg font-bold text-blue-700 mt-1">{currentGpa} GPA</div>
            <span className="text-[11px] text-blue-600 mt-0.5 block">{totalCurrentCredits} Credits In Progress</span>
          </div>
        </div>
      </div>
    </div>
  );
}