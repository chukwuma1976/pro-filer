export interface Education {
    institution: string;
    city: string;
    state: string;
    degree: string;
    fieldOfStudy: string;
    graduationDate: string | Date;
    descriptionEdu?: string;
    awards?: string[];
}