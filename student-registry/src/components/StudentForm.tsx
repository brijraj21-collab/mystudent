import React, { useState, useRef } from 'react';
import { Camera, Upload, X, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Student } from '../types';

interface StudentFormProps {
  onAdd: (student: Omit<Student, 'id' | 'createdAt'>) => void;
}

export default function StudentForm({ onAdd }: StudentFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [studentId, setStudentId] = useState('');
  const [grade, setGrade] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !studentId || !grade || !image) return;

    onAdd({
      name,
      email,
      studentId,
      grade,
      imageUrl: image,
    });

    // Reset form
    setName('');
    setEmail('');
    setStudentId('');
    setGrade('');
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
          <UserPlus size={20} />
        </div>
        <h2 className="text-xl font-semibold text-slate-900">Add New Student</h2>
      </div>

      <div className="flex flex-col items-center justify-center gap-4">
        <div 
          className="relative w-32 h-32 rounded-full bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden group cursor-pointer"
          onClick={() => fileInputRef.current?.click()}
        >
          {image ? (
            <>
              <img src={image} alt="Preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="text-white" size={24} />
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center text-slate-400">
              <Camera size={32} />
              <span className="text-xs mt-1 font-medium">Upload Photo</span>
            </div>
          )}
        </div>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleImageChange} 
          accept="image/*" 
          className="hidden" 
        />
        {image && (
          <button 
            type="button" 
            onClick={() => setImage(null)}
            className="text-xs text-red-500 font-medium hover:underline flex items-center gap-1"
          >
            <X size={12} /> Remove photo
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Full Name</label>
          <input
            required
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email Address</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@school.edu"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Student ID</label>
          <input
            required
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="STU-2024-001"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-mono text-sm"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Grade / Class</label>
          <select
            required
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all appearance-none"
          >
            <option value="">Select Grade</option>
            <option value="9th Grade">9th Grade</option>
            <option value="10th Grade">10th Grade</option>
            <option value="11th Grade">11th Grade</option>
            <option value="12th Grade">12th Grade</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="Graduate">Graduate</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={!name || !email || !studentId || !grade || !image}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
      >
        <Upload size={18} />
        Register Student
      </button>
    </form>
  );
}
