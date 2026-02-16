import { Student } from '@/types';
import { demoStudents } from '@/data/demoData';

export const authenticateStudent = (
  studentId: string,
  password: string
): Student | null => {
  const student = demoStudents.find(
    (s) => s.id === studentId && s.password === password
  );
  return student || null;
};

export const saveStudentToSession = (student: Student) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('currentStudent', JSON.stringify(student));
  }
};

export const getStudentFromSession = (): Student | null => {
  if (typeof window !== 'undefined') {
    const data = sessionStorage.getItem('currentStudent');
    return data ? JSON.parse(data) : null;
  }
  return null;
};

export const updateStudentProgress = (updatedStudent: Student) => {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('currentStudent', JSON.stringify(updatedStudent));
    
    // Update in localStorage for leaderboard persistence
    const allStudents = getAllStudents();
    const index = allStudents.findIndex(s => s.id === updatedStudent.id);
    if (index !== -1) {
      allStudents[index] = updatedStudent;
      localStorage.setItem('allStudents', JSON.stringify(allStudents));
    }
  }
};

export const clearStudentSession = () => {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('currentStudent');
  }
};

export const initializeStudents = () => {
  if (typeof window !== 'undefined') {
    const existing = localStorage.getItem('allStudents');
    if (!existing) {
      localStorage.setItem('allStudents', JSON.stringify(demoStudents));
    }
  }
};

export const getAllStudents = (): Student[] => {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('allStudents');
    return data ? JSON.parse(data) : demoStudents;
  }
  return demoStudents;
};
