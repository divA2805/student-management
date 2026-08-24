"use client";

import { useEffect, useState } from "react";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../services/studentService";

import { Student, StudentInput } from "../types/student";

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    try {
      setLoading(true);
      setError(null);

      const data = await getStudents();

      setStudents(data);
    } catch (err) {
      setError("Unable to load students.");
    } finally {
      setLoading(false);
    }
  }

  async function addStudent(data: StudentInput) {
    try {
      setError(null);

      const newStudent = await createStudent(data);

      setStudents((prevStudents) => [
        ...prevStudents,newStudent]);

      return newStudent;
    } catch (err) {
      setError("Unable to add student.");
      throw err;
    }
  }

  async function updateStudentData(
    id: number,
    data: StudentInput
  ) {
    try {
      setError(null);

      const updatedStudent = await updateStudent(id, data);

      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === id ? updatedStudent : student
        )
      );

      return updatedStudent;
    } catch (err) {
      setError("Unable to update student.");
      throw err;
    }
  }

  async function removeStudent(id: number) {
    try {
      setError(null);

      await deleteStudent(id);

      setStudents((prevStudents) =>
        prevStudents.filter((student) => student.id !== id)
      );
    } catch (err) {
      setError("Unable to delete student.");
      throw err;
    }
  }

  return {
    students,
    loading,
    error,
    loadStudents,
    addStudent,
    updateStudent: updateStudentData,
    deleteStudent: removeStudent,
  };
}