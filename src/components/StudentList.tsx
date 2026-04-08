import React from 'react';
import { Trash2, Mail, Hash, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Student } from '../types';

interface StudentListProps {
  students: Student[];
  onDelete: (id: string) => void;
}

export default function StudentList({ students, onDelete }: StudentListProps) {
  if (students.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
        <div className="p-4 bg-white rounded-full shadow-sm mb-4">
          <GraduationCap size={40} className="text-slate-300" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900">No students registered</h3>
        <p className="text-slate-500 text-sm mt-1">Add your first student using the form.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <AnimatePresence mode="popLayout">
        {students.map((student) => (
          <motion.div
            key={student.id}
            layout
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group relative overflow-hidden"
          >
            <div className="flex items-start gap-4">
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                <img 
                  src={student.imageUrl} 
                  alt={student.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-900 truncate">{student.name}</h3>
                <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-1">
                  <GraduationCap size={14} />
                  <span className="font-medium">{student.grade}</span>
                </div>
              </div>
              <button
                onClick={() => onDelete(student.id)}
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <div className="p-1.5 bg-slate-50 rounded-md">
                  <Mail size={14} className="text-slate-400" />
                </div>
                <span className="truncate">{student.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <div className="p-1.5 bg-slate-50 rounded-md">
                  <Hash size={14} className="text-slate-400" />
                </div>
                <span className="font-mono text-xs">{student.studentId}</span>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-500 transform translate-y-full group-hover:translate-y-0 transition-transform" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
