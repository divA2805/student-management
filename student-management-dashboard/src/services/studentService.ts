import { Student, StudentInput } from "../types/student";

const key = "students";

export async function getStudents(): Promise<Student[]> {
    const savedStudents = localStorage.getItem(key);

    if (!savedStudents) {
        return [];
    }

    try {
        return JSON.parse(savedStudents) as Student[];
    } catch {
        throw new Error("Unable to load students.");
    }
}

export async function getStudentById(id: number): Promise<Student | undefined> {
    const students = await getStudents();

    return students.find((student) => student.id === id);
}

export async function createStudent(data: StudentInput): Promise<Student> {
    const students = await getStudents();

    const newStudent: Student = {
        id: Date.now(),
        ...data,
        status: "Active",
        score: 0,
        pendingAssignments: 0,
    };

    students.push(newStudent);

    localStorage.setItem(
        key,JSON.stringify(students)
    );

    return newStudent;
}

export async function updateStudent(id: number, data: StudentInput): Promise<Student> {
    const students = await getStudents();

    const studentIndex = students.findIndex(
        (student) => student.id === id
    );

    if (studentIndex === -1) {
        throw new Error("Student not found.");
    }

    const updatedStudent: Student = {
        ...students[studentIndex],
        ...data,
        id,
    };

    students[studentIndex] = updatedStudent;

    localStorage.setItem(
        key,
        JSON.stringify(students)
    );

    return updatedStudent;
}

export async function deleteStudent(id: number): Promise<void> {
    const students = await getStudents();

    const remainingStudents = students.filter(
        (student) => student.id !== id
    );

    localStorage.setItem(key, JSON.stringify(remainingStudents)
    );
}