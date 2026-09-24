import React, { useState } from 'react';
import { 
  Plus, 
  CheckCircle2, 
  Circle, 
  Clock, 
  Trash2, 
  X, 
  AlertCircle, 
  Calendar 
} from 'lucide-react';

export default function TasksView({
  tasks,
  courses,
  onAddTask,
  onToggleTask,
  onDeleteTask
}) {
  const [filterStatus, setFilterStatus] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [courseCode, setCourseCode] = useState(courses[0]?.code || 'CSE 101');
  const [deadline, setDeadline] = useState('2026-09-30');
  const [priority, setPriority] = useState('Medium');
  const [description, setDescription] = useState('');

  const toggleTaskStatus = (id) => {
    if (onToggleTask) {
      onToggleTask(id);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === 'All') return true;
    return task.status === filterStatus;
  });

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const matchedCourse = courses.find((c) => c.code === courseCode);
    const taskPayload = {
      title,
      courseId: matchedCourse?.id || 'c1',
      courseName: matchedCourse ? matchedCourse.name : courseCode,
      deadline,
      priority,
      description,
      status: 'Pending',
    };

    if (onAddTask) {
      onAddTask(taskPayload);
    }

    setTitle('');
    setDescription('');
    setShowAddModal(false);
  };

  const handleDeleteTask = (id) => {
    if (onDeleteTask) {
      onDeleteTask(id);
    }
  };

  const getPriorityStyle = (lvl) => {
    switch (lvl) {
      case 'High':
        return 'bg-rose-50 text-rose-600 border border-rose-200';
      case 'Medium':
        return 'bg-amber-50 text-amber-600 border border-amber-200';
      case 'Low':
        return 'bg-emerald-50 text-emerald-600 border border-emerald-200';
      default:
        return 'bg-slate-50 text-slate-600 border border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Assignments & Tasks</h2>
          <p className="text-sm text-slate-500 mt-0.5">Keep track of your coursework deadlines and submissions.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add Assignment</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        {['All', 'Pending', 'Completed'].map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filterStatus === status
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {status}
            <span className="ml-2 opacity-75 font-normal">
              ({status === 'All' ? tasks.length : tasks.filter((t) => t.status === status).length})
            </span>
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="space-y-3">
        {filteredTasks.length === 0 ? (
          <div className="bg-white border border-slate-200/80 rounded-2xl p-12 text-center text-slate-400">
            <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-emerald-400 stroke-[1.5]" />
            <p className="text-base font-bold text-slate-700">No tasks in this category</p>
            <p className="text-xs text-slate-400 mt-1">Everything looks clear and up to date.</p>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isDone = task.status === 'Completed';
            return (
              <div
                key={task.id}
                className={`bg-white border rounded-2xl p-4 transition-all flex items-start justify-between gap-4 group ${
                  isDone
                    ? 'border-slate-200/60 bg-slate-50/40 opacity-70'
                    : 'border-slate-200/80 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <button
                    onClick={() => toggleTaskStatus(task.id)}
                    className="mt-0.5 text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-50" />
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </button>

                  <div>
                    <h4
                      className={`text-sm font-bold text-slate-900 ${
                        isDone ? 'line-through text-slate-400' : ''
                      }`}
                    >
                      {task.title}
                    </h4>

                    {task.description && (
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {task.description}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-2 mt-2.5">
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                        {task.courseName}
                      </span>

                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${getPriorityStyle(task.priority)}`}>
                        {task.priority} Priority
                      </span>

                      <span className="text-[11px] text-slate-400 flex items-center gap-1 font-medium">
                        <Calendar className="w-3 h-3" />
                        Due {task.deadline}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg opacity-60 group-hover:opacity-100 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-slate-900">Add Assignment</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. C Programming Assignment 01"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Course</label>
                  <select
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.code}>
                        {c.code} – {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Deadline</label>
                <input
                  type="date"
                  required
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows="3"
                  placeholder="Additional notes, submission instructions..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs transition-colors"
                >
                  Save Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}