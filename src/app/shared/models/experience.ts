export interface Experience {
    employer: string;
    title: string;
    city: string;
    state: string;
    startDate: string | Date;
    endDate?: string | Date;
    description: string[];
}