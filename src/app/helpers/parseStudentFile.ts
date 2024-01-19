import { read, utils } from 'xlsx';
import { Student } from '../services/student/types';

export const parseStudentFile = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const workBook = read(arrayBuffer);
  const workSheet = workBook.Sheets[workBook.SheetNames[0]];
  const raw_data: string[][] = utils.sheet_to_json(workSheet, { header: 1 });

  if (raw_data.length == 0)
    throw Error('Tuščias arba netinkamai suformatuotas failas');

  const students: Student[] = [];
  for (let i = 0; i < raw_data.length; i++) {
    if (typeof raw_data[i][0] === 'string' && raw_data[i][0].length > 0) {
      students.push({ id: i + 1, fullName: raw_data[i][0] });
    }
  }

  if (students.length === 0)
    throw Error('Tuščias arba netinkamai suformatuotas failas');

  return students;
};
