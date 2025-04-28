import { Education } from './education';
import { Experience } from './experience';

export interface Resume {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    linkedIn?: string;
    website?: string;
    summary: string;
    experience: Experience[];
    education: Education[];
    skills: string[];
    additionalInfo?: string;
}