import { Student } from './student.model';

export interface Class {
    name: string;
    year: number;
    department: string;
    students: Student[];
}
