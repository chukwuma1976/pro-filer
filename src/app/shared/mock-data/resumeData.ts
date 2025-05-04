// This file contains mock data for the resume component.
// It includes a sample resume object with personal information, experience, education, and skills.

import { Resume } from '../models/resume';
import { User } from '../models/user'; // Adjust the path as needed

const resumeData: Resume[] = [
    {
        id: '1',
        firstName: 'Clark',
        lastName: 'Kent',
        phoneNumber: '123-456-7890',
        email: 'clark.kent@dailyplanet.com',
        linkedIn: 'https://www.linkedin.com/in/clarkkent',
        website: 'https://www.clarkkent.com',
        summary: 'Experienced journalist with a passion for uncovering the truth and a knack for storytelling.',
        experience: [
            {
                employer: 'Daily Planet',
                title: 'Senior Reporter',
                city: 'Metropolis',
                state: 'NY',
                startDate: '2015-01-01',
                endDate: '2023-01-01',
                description: [
                    'Investigated and reported on various local and national news stories.',
                    'Collaborated with photographers and editors to produce high-quality articles.',
                    'Conducted interviews with key figures in politics, business, and entertainment.'
                ]
            },
            {
                employer: 'Metropolis Gazette',
                title: 'Staff Writer',
                city: 'Metropolis',
                state: 'NY',
                startDate: '2010-01-01',
                endDate: '2014-12-31',
                description: [
                    'Wrote articles covering local events, sports, and community issues.',
                    'Assisted in the layout and design of the newspaper.'
                ]
            }
        ],
        education: [
            {
                institution: 'Metropolis University',
                city: 'Metropolis',
                state: 'NY',
                degree: 'Bachelor of Arts',
                fieldOfStudy: 'Journalism',
                graduationDate: '2009-05-15',
                description: 'Graduated with honors.',
                awards: ['Dean\'s List', 'Best Student Journalist']
            }
        ],
        skills: ['Investigative Journalism', 'Writing', 'Editing', 'Public Speaking'],
    },
    {
        id: '2',
        firstName: 'Bruce',
        lastName: 'Wayne',
        phoneNumber: '987-654-3210',
        email: 'BruceWayne@WayneEnterprises.com',
        linkedIn: 'https://www.linkedin.com/in/brucewayne',
        website: 'https://www.wayneenterprises.com',
        summary: 'CEO of Wayne Enterprises with a strong background in business management and philanthropy.',
        experience: [
            {
                employer: 'Wayne Enterprises',
                title: 'CEO',
                city: 'Gotham',
                state: 'NJ',
                startDate: '2010-01-01',
                endDate: 'Present',
                description: [
                    'Oversee all operations and strategic direction of the company.',
                    'Lead philanthropic efforts to improve Gotham City.'
                ]
            },
            {
                employer: 'Wayne Foundation',
                title: 'Philanthropist',
                city: 'Gotham',
                state: 'NJ',
                startDate: '2005-01-01',
                endDate: '2009-12-31',
                description: [
                    'Focused on charitable initiatives in education and healthcare.'
                ]

            }
        ],
        education: [
            {
                institution: 'Gotham University',
                city: 'Gotham',
                state: 'NJ',
                degree: 'Master of Business Administration',
                fieldOfStudy: 'Business Management',
                graduationDate: '2004-05-15',
                description: 'Graduated with distinction.',
                awards: ['Top of Class']
            }
        ],
        skills: ['Business Management', 'Leadership', 'Philanthropy'],
    }
];

const clarkKent: User = {
    id: '1',
    username: 'manofsteel',
    email: 'clark.kent@dailyplanet.com',
    password: 'password123',
    resumes: [resumeData[0]] // Assign the first resume to the user
}

const bruceWayne: User = {
    id: '2',
    username: 'darkknight',
    email: 'BruceWayne@WayneEnterprises.com',
    password: 'password456',
    resumes: [resumeData[1]] // Assign the second resume to the user
};

export const users: User[] = [clarkKent, bruceWayne]; // Export the users array for use in the application
export const allResumes: Resume[] = resumeData; // Export all resumes for use in the application