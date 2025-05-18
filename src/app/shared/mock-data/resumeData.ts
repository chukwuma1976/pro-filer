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
                descriptionEdu: 'Graduated with honors.',
                awards: ['Dean\'s List', 'Best Student Journalist']
            }
        ],
        skills: ['Investigative Journalism', 'Writing', 'Editing', 'Public Speaking'],
        shareWithOthers: true,
        additionalInfo: 'Fluent in English and Spanish. Passionate about social justice and community service.'
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
                descriptionEdu: 'Graduated with distinction.',
                awards: ['Top of Class']
            }
        ],
        skills: ['Business Management', 'Leadership', 'Philanthropy'],
        shareWithOthers: false,
        additionalInfo: 'Passionate about technology and innovation. Active in various charitable organizations.'
    },
    {
        id: "3",
        firstName: "Chukwuma",
        lastName: "Anyadike",
        phoneNumber: "123456789",
        email: "chukwuma.anyadike@gmail.com",
        linkedIn: "www.linkedin.com/in/chukwumaanyadike/",
        website: "https://github.com/chukwuma1976",
        summary: "Software engineer with a surgical approach to software development. I build dynamic and immersive full stack applications using JavaScript, React, Angular, Ruby, Rails, Java, and Spring Boot.",
        experience: [
            {
                employer: "FDM",
                title: "Contractor",
                city: "Hayes",
                state: "Virginia",
                startDate: "2023-11-13T06:00:00.000Z",
                endDate: "2025-05-18T05:56:53.826Z",
                description: [
                    "Automation testing",
                    "UI coding"
                ]
            },
            {
                employer: "Norfolk State University",
                title: "Adjunct Professor",
                city: "Norfolk",
                state: "Virginia",
                startDate: "2019-09-3T06:00:00.000Z",
                endDate: "2025-05-18T05:59:10.717Z",
                description: [
                    "Taught Anatomy and Physiology to undergraduate students",
                    "Developed and implemented course materials and assessments",
                ]
            }
        ],
        education: [
            {
                institution: "Flatiron School",
                city: "Hayes",
                state: "Virginia",
                degree: "Certificate in Software Engineering",
                fieldOfStudy: "Software Engineering",
                graduationDate: "2023-06-12T05:00:00.000Z",
                descriptionEdu: "Built cool projects using JavaScript, React, Angular, Ruby, Rails, Java, and Spring Boot.",
                awards: [
                ]
            },
            {
                institution: "UVA",
                city: "Charlottesville",
                state: "Virginia",
                degree: "MD",
                fieldOfStudy: "Medicine",
                graduationDate: "2001-05-20T05:00:00.000Z",
                descriptionEdu: "",
                "awards": [
                ]
            },
            {
                institution: "Virginia Commonwealth University",
                city: "Richmond",
                state: "Virginia",
                degree: "BS",
                fieldOfStudy: "Biology",
                graduationDate: "1997-05-20T05:00:00.000Z",
                descriptionEdu: "",
                "awards": [
                    "Summa Cum Laude",
                    "Dean's List",
                    "Graduated with Honors"
                ]
            }
        ],
        skills: [
            "JavaScript",
            "React",
            "Angular",
            "TypeScript",
            "Java",
            "Spring Boot",
        ],
        additionalInfo: "I am a career changer",
        shareWithOthers: false
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

const admin: User = {
    id: '3',
    username: 'casmooth',
    email: 'noneof@yourbusiness.com',
    password: 'password789',
    resumes: [resumeData[2]] // Assign the second resume to the user
};

export const users: User[] = [clarkKent, bruceWayne, admin]; // Export the users array for use in the application
export const allResumes: Resume[] = resumeData; // Export all resumes for use in the application