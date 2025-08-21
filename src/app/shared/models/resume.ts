import { Education } from './education';
import { Experience } from './experience';

export interface Resume {
    id: string | number;
    firstName: string;
    lastName: string;
    title?: string;
    city?: string;
    state?: string;
    phoneNumber?: string;
    email: string;
    linkedIn?: string;
    website?: string;
    summary: string;
    experience: Experience[];
    education: Education[];
    skills: string[];
    certifications?: string[];
    projects?: string[];
    publications?: string[];
    volunteerExperience?: string[];
    additionalInfo?: string;
    shareWithOthers?: boolean;
    template?: string;
    userId?: string | number;
}