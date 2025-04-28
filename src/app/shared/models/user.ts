import { Resume } from './resume'; // Adjust the path as needed

export interface User {
    id: string;
    username: string;
    email: string;
    password?: string;
    resumes?: Resume[];
}