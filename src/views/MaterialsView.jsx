import React, { useState, useEffect } from 'react';
import { FolderLock, FileText, Download, Star, Trash2, Plus, Search, Filter } from 'lucide-react';

export default function MaterialsView({
  courses = [],
  materials = [],
  onAddMaterial,
  onDeleteMaterial
}) {
  const [localMaterials, setLocalMaterials] = useState(materials || []);
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Sync state when props update from the backend
  useEffect(() => {
    if (Array.isArray(materials)) {
      setLocalMaterials(materials);
    }
  }, [materials]);

  const toggleFavorite = (id) => {
    setLocalMaterials((prev) =>
      prev.map((m) => (m.id === id ? { ...m, favorite: !m.favorite } : m))
    );
  };

  const handleDelete = (id) => {
    if (onDeleteMaterial) {
      onDeleteMaterial(id);
    }
    setLocalMaterials((prev) => prev.filter((m) => m.id !== id));
  };

  const handleUploadMock = (e) => {
    e.preventDefault();
    const title = prompt('Enter material title (e.g. Chapter 03 Notes):');
    if (!title || !title.trim()) return;

    const fallbackCode = courses && courses.length > 0 ? courses[0].code : 'CSE 101';
    const courseCode = selectedCourse === 'All' ? fallbackCode : selectedCourse;

    const newMat = {
      title: title.trim(),
      courseCode,
      type: 'PDF',
      fileSize: '2.4 MB',
      link: '#',
      uploadDate: new Date().toISOString().split('T')[0],
      favorite: false,
    };

    if (onAddMaterial) {
      onAddMaterial(newMat);
    } else {
      setLocalMaterials((prev) => [newMat, ...prev]);
    }
  };

  // Safe filtering
  const safeMaterials = Array.isArray(localMaterials) ? localMaterials : [];
  const filteredMaterials = safeMaterials.filter((item) => {
    if (!item) return false;
    const matchesCourse = selectedCourse === 'All' || item.courseCode === selectedCourse;
    const matchesQuery = !searchQuery || (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCourse && matchesQuery;
  });

  return (
    <div className="p-8 space-y-6 overflow-y-auto max-h-[calc(100vh-4rem)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Study Materials</h1>
          <p className="text-sm text-slate-500">Access and manage lecture slides, notes, and course resources.</p>
        </div>
        <button
          onClick={handleUploadMock}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl shadow-sm transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Material</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search resources by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-800"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700"
          >
            <option value="All">All Courses</option>
            {(courses || []).map((c) => (
              <option key={c.id || c.code} value={c.code}>
                {c.code}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Materials List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMaterials.length === 0 ? (
          <div className="col-span-full py-16 text-center bg-white border border-dashed border-slate-200 rounded-2xl">
            <FolderLock className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-medium text-slate-600">No study materials found</p>
            <p className="text-xs text-slate-400 mt-1">Upload files or pick a different filter.</p>
          </div>
        ) : (
          filteredMaterials.map((mat) => (
            <div
              key={mat.id || mat.title}
              className="bg-white border border-slate-200 rounded-2xl p-5 hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="p-2.5 bg-blue-50 rounded-xl text-blue-600">
                    <FileText className="w-6 h-6" />
                  </div>
                  <button
                    onClick={() => toggleFavorite(mat.id)}
                    className="text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    <Star
                      className={`w-5 h-5 ${mat.favorite ? 'text-amber-400 fill-amber-400' : ''}`}
                    />
                  </button>
                </div>
                <h3 className="font-semibold text-slate-900 mt-3 line-clamp-1">{mat.title}</h3>
                <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                  <span className="font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                    {mat.courseCode}
                  </span>
                  <span>•</span>
                  <span>{mat.fileSize || 'PDF'}</span>
                  <span>•</span>
                  <span>{mat.uploadDate}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-5 pt-4 border-t border-slate-100">
                <a
                  href={mat.link || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </a>
                <button
                  onClick={() => handleDelete(mat.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}