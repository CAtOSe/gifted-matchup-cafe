import { Injectable } from '@angular/core';
import { STORE_KEY_STUDENTS } from './constants';
import { Student } from './types';
import { Observable, of, tap } from 'rxjs';
import { parseStudentFile } from '../../helpers/parseStudentFile';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor() {}

  getAllStudents(): Observable<Student[]> {
    const students = this.loadStudentData();
    return of(students);
  }

  async uploadStudents(file: File): Promise<Student[]> {
    const studentData = await parseStudentFile(file);
    window.localStorage.setItem(
      STORE_KEY_STUDENTS,
      JSON.stringify(studentData),
    );
    return studentData;
  }

  private loadStudentData(): Student[] {
    const studentsString = window.localStorage.getItem(STORE_KEY_STUDENTS);
    return studentsString ? JSON.parse(studentsString) : [];
  }
}
