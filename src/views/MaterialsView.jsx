import React, { useState } from 'react';
import { FolderLock, FileText, Download, Star, Trash2, Plus, Search, Filter } from 'lucide-react';
import { INITIAL_MATERIALS } from '../data/initialData';

export default function MaterialsView({ courses }) {
  const [materials, setMaterials] = useState(() => {
    const saved = localStorage.getItem('studentos_materials');
    return saved ? JSON.parse(saved) : INITIAL_MATERIALS;
  });
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFavorite = (id) => {
    const updated = materials.map((m) =>
      m.id === id ? { ...m, favorite: !m.favorite } : m
    );
    setMaterials(updated);
    localStorage.setItem('studentos_materials', JSON.stringify(updated));
  };

  const handleDelete = (id) => {
    const updated = materials.filter((m) => m.id !== id);
    setMaterials(updated);
    localStorage.setItem('studentos_materials', JSON.stringify(updated));
  };

  const handleUploadMock = (e) => {
    e.preventDefault();
    const title = prompt('Enter material title (e.g. Chapter 03 Notes):');
    if (!title) return;
    const course = prompt('Enter Course Code (e.g. CSE 101):', courses[0]?.code || 'CSE 101');
    const newDoc = {
      id: 'm_' + Date.now(),
      title,
      courseCode: course,
      type: 'PDF',
      size: '1.8 MB',
      favorite: false,
    };
    const updated = [newDoc, ...materials];
    setMaterials(updated);
    localStorage.setItem('studentos_materials', JSON.stringify(updated));
  };

  const filteredMaterials = materials.filter((item) => {
    const matchesCourse = selectedCourse === 'All' || item.courseCode === selectedCourse;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.courseCode.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCourse && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Study Materials</h2>
          <p className="text-sm text-slate-500 mt-0.5">Lecture slides, PDF notes, and practice sheets.</p>
        </div>
        <button
          onClick={handleUploadMock}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Material</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search notes, chapters, slides..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200/80 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {['All', ...courses.map((c) => c.code)].map((code) => (
            <button
              key={code}
              onClick={() => setSelectedCourse(code)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCourse === code
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {code}
            </button>
          ))}
        </div>
      </div>

      {/* Materials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMaterials.map((doc) => (
          <div
            key={doc.id}
            className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex items-center justify-between group hover:border-slate-300 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{doc.title}</h4>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                  <span className="font-semibold text-blue-600">{doc.courseCode}</span>
                  <span>•</span>
                  <span>{doc.type}</span>
                  <span>•</span>
                  <span>{doc.size}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => toggleFavorite(doc.id)}
                className={`p-2 rounded-lg transition-colors ${
                  doc.favorite ? 'text-amber-500' : 'text-slate-300 hover:text-amber-500'
                }`}
              >
                <Star className={`w-4 h-4 ${doc.favorite ? 'fill-amber-400' : ''}`} />
              </button>
              <button
                onClick={() => alert(`Downloading "${doc.title}.${doc.type.toLowerCase()}"...`)}
                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
                title="Download"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(doc.id)}
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}