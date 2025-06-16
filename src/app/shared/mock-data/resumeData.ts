// // This file contains mock data for the resume component.
// // It includes a sample resume object with personal information, experience, education, and skills.

// import { Resume } from '../models/resume';
// import { User } from '../models/user'; // Adjust the path as needed

// const resumeData: Resume[] = [
//     {
//         id: '1',
//         firstName: 'Clark',
//         lastName: 'Kent',
//         phoneNumber: '123-456-7890',
//         email: 'clark.kent@dailyplanet.com',
//         linkedIn: 'https://www.linkedin.com/in/clarkkent',
//         website: 'https://www.clarkkent.com',
//         summary: 'Experienced journalist with a passion for uncovering the truth and a knack for storytelling.',
//         experience: [
//             {
//                 employer: 'Daily Planet',
//                 title: 'Senior Reporter',
//                 city: 'Metropolis',
//                 state: 'NY',
//                 startDate: '2015-01-01',
//                 endDate: '2023-01-01',
//                 description: [
//                     'Investigated and reported on various local and national news stories.',
//                     'Collaborated with photographers and editors to produce high-quality articles.',
//                     'Conducted interviews with key figures in politics, business, and entertainment.'
//                 ]
//             },
//             {
//                 employer: 'Metropolis Gazette',
//                 title: 'Staff Writer',
//                 city: 'Metropolis',
//                 state: 'NY',
//                 startDate: '2010-01-01',
//                 endDate: '2014-12-31',
//                 description: [
//                     'Wrote articles covering local events, sports, and community issues.',
//                     'Assisted in the layout and design of the newspaper.'
//                 ]
//             }
//         ],
//         education: [
//             {
//                 institution: 'Metropolis University',
//                 city: 'Metropolis',
//                 state: 'NY',
//                 degree: 'Bachelor of Arts',
//                 fieldOfStudy: 'Journalism',
//                 graduationDate: '2009-05-15',
//                 descriptionEdu: 'Graduated with honors.',
//                 awards: ['Dean\'s List', 'Best Student Journalist']
//             }
//         ],
//         skills: ['Investigative Journalism', 'Writing', 'Editing', 'Public Speaking'],
//         shareWithOthers: true,
//         additionalInfo: 'Fluent in English and Spanish. Passionate about social justice and community service.'
//     },
//     {
//         id: '2',
//         firstName: 'Bruce',
//         lastName: 'Wayne',
//         phoneNumber: '987-654-3210',
//         email: 'BruceWayne@WayneEnterprises.com',
//         linkedIn: 'https://www.linkedin.com/in/brucewayne',
//         website: 'https://www.wayneenterprises.com',
//         summary: 'CEO of Wayne Enterprises with a strong background in business management and philanthropy.',
//         experience: [
//             {
//                 employer: 'Wayne Enterprises',
//                 title: 'CEO',
//                 city: 'Gotham',
//                 state: 'NJ',
//                 startDate: '2010-01-01',
//                 endDate: 'Present',
//                 description: [
//                     'Oversee all operations and strategic direction of the company.',
//                     'Lead philanthropic efforts to improve Gotham City.'
//                 ]
//             },
//             {
//                 employer: 'Wayne Foundation',
//                 title: 'Philanthropist',
//                 city: 'Gotham',
//                 state: 'NJ',
//                 startDate: '2005-01-01',
//                 endDate: '2009-12-31',
//                 description: [
//                     'Focused on charitable initiatives in education and healthcare.'
//                 ]

//             }
//         ],
//         education: [
//             {
//                 institution: 'Gotham University',
//                 city: 'Gotham',
//                 state: 'NJ',
//                 degree: 'Master of Business Administration',
//                 fieldOfStudy: 'Business Management',
//                 graduationDate: '2004-05-15',
//                 descriptionEdu: 'Graduated with distinction.',
//                 awards: ['Top of Class']
//             }
//         ],
//         skills: ['Business Management', 'Leadership', 'Philanthropy'],
//         shareWithOthers: false,
//         additionalInfo: 'Passionate about technology and innovation. Active in various charitable organizations.'
//     },
//     {
//         id: "3",
//         firstName: "Chukwuma",
//         lastName: "Anyadike",
//         phoneNumber: "123456789",
//         email: "chukwuma.anyadike@gmail.com",
//         linkedIn: "www.linkedin.com/in/chukwumaanyadike/",
//         website: "https://github.com/chukwuma1976",
//         summary: "Software engineer with a surgical approach to software development. I build dynamic and immersive full stack applications using JavaScript, React, Angular, Ruby, Rails, Java, and Spring Boot.",
//         experience: [
//             {
//                 employer: "FDM",
//                 title: "Contractor",
//                 city: "Dallas",
//                 state: "Texas",
//                 startDate: "2023-11-13T06:00:00.000Z",
//                 endDate: "Present",
//                 description: [
//                     "Automation testing",
//                     "UI coding"
//                 ]
//             },
//             {
//                 employer: "Norfolk State University",
//                 title: "Adjunct Professor",
//                 city: "Norfolk",
//                 state: "Virginia",
//                 startDate: "2019-05-18T05:59:10.717Z",
//                 endDate: "2025-05-18T05:59:10.717Z",
//                 description: [
//                     "Taught Anatomy and Physiology to undergraduate students",
//                     "Developed and implemented course materials and assessments",
//                 ]
//             }
//         ],
//         education: [
//             {
//                 institution: "Flatiron School",
//                 city: "Hayes",
//                 state: "Virginia",
//                 degree: "Certificate in Software Engineering",
//                 fieldOfStudy: "Software Engineering",
//                 graduationDate: "2023-06-12T05:00:00.000Z",
//                 descriptionEdu: "Built cool projects using JavaScript, React, Angular, Ruby, Rails, Java, and Spring Boot.",
//                 awards: [
//                 ]
//             },
//             {
//                 institution: "UVA",
//                 city: "Charlottesville",
//                 state: "Virginia",
//                 degree: "MD",
//                 fieldOfStudy: "Medicine",
//                 graduationDate: "2001-05-20T05:00:00.000Z",
//                 descriptionEdu: "",
//                 "awards": [
//                 ]
//             },
//             {
//                 institution: "Virginia Commonwealth University",
//                 city: "Richmond",
//                 state: "Virginia",
//                 degree: "BS",
//                 fieldOfStudy: "Biology",
//                 graduationDate: "1997-05-20T05:00:00.000Z",
//                 descriptionEdu: "",
//                 "awards": [
//                     "Summa Cum Laude",
//                     "Dean's List",
//                     "Graduated with Honors"
//                 ]
//             }
//         ],
//         skills: [
//             "JavaScript",
//             "React",
//             "Angular",
//             "TypeScript",
//             "Java",
//             "Spring Boot",
//         ],
//         additionalInfo: "I am a career changer",
//         shareWithOthers: false
//     },
//     {
//         id: "4",
//         firstName: "Chukwuma",
//         lastName: "Anyadike",
//         phoneNumber: "123456789",
//         email: "chukwuma.anyadike@gmail.com",
//         linkedIn: "www.linkedin.com/in/chukwumaanyadike/",
//         website: "",
//         summary: "Colorectal surgeon adept in laparoscopic and robotic techniques as well as traditional open surgery. I have a strong background in patient care, surgical procedures, and medical education.",
//         experience: [
//             {
//                 employer: "Maryland Colorectal Surgery",
//                 title: "Colorectal Surgeon",
//                 city: "Baltimore",
//                 state: "Maryland",
//                 startDate: "2010-11-13T06:00:00.000Z",
//                 endDate: "2017-05-18T05:56:53.826Z",
//                 description: [
//                     "Laparoscopic and robotic colorectal surgeries",
//                     "Training and mentoring surgical residents",
//                     "Conducting research in colorectal surgery techniques"
//                 ]
//             },
//             {
//                 employer: "University of Maryland Medical Center",
//                 title: "Surgical Resident",
//                 city: "Baltimore",
//                 state: "Maryland",
//                 startDate: "2001-05-18T05:59:10.717Z",
//                 endDate: "2009-05-18T05:59:10.717Z",
//                 description: [
//                     "Care of surgical patients",
//                     "Assisted in various surgical procedures",
//                     "Developed and implemented course materials and assessments for medical students",
//                 ]
//             }
//         ],
//         education: [
//             {
//                 institution: "University of Virginia School of Medicine",
//                 city: "Charlottesville",
//                 state: "Virginia",
//                 degree: "MD",
//                 fieldOfStudy: "Medicine",
//                 graduationDate: "2001-05-20T05:00:00.000Z",
//                 descriptionEdu: "",
//                 "awards": [
//                 ]
//             },
//             {
//                 institution: "Virginia Commonwealth University",
//                 city: "Richmond",
//                 state: "Virginia",
//                 degree: "BS",
//                 fieldOfStudy: "Biology",
//                 graduationDate: "1997-05-20T05:00:00.000Z",
//                 descriptionEdu: "",
//                 "awards": [
//                     "Summa Cum Laude",
//                     "Dean's List",
//                     "Graduated with Honors"
//                 ]
//             }
//         ],
//         skills: [
//             "Laparoscopic Surgery",
//             "Robotic Surgery",
//             "Advanced Anorectal Surgery",
//         ],
//         additionalInfo: "I am a fellow of the American College of Surgeons and a member of the Society of American Gastrointestinal and Endoscopic Surgeons.",
//         shareWithOthers: false
//     },
//     {
//         id: '5',
//         firstName: 'Clark',
//         lastName: 'Kent',
//         phoneNumber: '123-456-7890',
//         email: 'clark.kent@dailyplanet.com',
//         linkedIn: 'https://www.linkedin.com/in/clarkkent',
//         website: 'https://www.clarkkent.com',
//         summary: 'Experienced journalist with a passion for uncovering the truth and a knack for storytelling.  Also fight crime as a vigilante in my spare time.',
//         experience: [
//             {
//                 employer: 'Daily Planet',
//                 title: 'Senior Reporter',
//                 city: 'Metropolis',
//                 state: 'NY',
//                 startDate: '2015-01-01',
//                 endDate: '2023-01-01',
//                 description: [
//                     'Investigated and reported on various local and national news stories.',
//                     'Collaborated with photographers and editors to produce high-quality articles.',
//                     'Conducted interviews with key figures in politics, business, and entertainment.'
//                 ]
//             },
//             {
//                 employer: 'Metropolis Gazette',
//                 title: 'Staff Writer',
//                 city: 'Metropolis',
//                 state: 'NY',
//                 startDate: '2010-01-01',
//                 endDate: '2014-12-31',
//                 description: [
//                     'Wrote articles covering local events, sports, and community issues.',
//                     'Assisted in the layout and design of the newspaper.'
//                 ]
//             },
//             {
//                 employer: 'Justice League',
//                 title: 'Superhero',
//                 city: 'Various',
//                 state: 'N/A',
//                 startDate: '2010-01-01',
//                 endDate: 'Present',
//                 description: [
//                     'Fought crime and protected the world from various threats.',
//                     'Collaborated with other superheroes to maintain peace and justice.'
//                 ]
//             }
//         ],
//         education: [
//             {
//                 institution: 'Metropolis University',
//                 city: 'Metropolis',
//                 state: 'NY',
//                 degree: 'Bachelor of Arts',
//                 fieldOfStudy: 'Journalism',
//                 graduationDate: '2009-05-15',
//                 descriptionEdu: 'Graduated with honors.',
//                 awards: ['Dean\'s List', 'Best Student Journalist']
//             }
//         ],
//         skills: ['Investigative Journalism', 'Writing', 'Editing', 'Public Speaking', 'Flying', 'Heat Vision', 'Super Strength'],
//         shareWithOthers: true,
//         additionalInfo: 'Fluent in English and Spanish. Passionate about social justice and community service.'
//     },
//     {
//         id: '6',
//         firstName: 'Diana',
//         lastName: 'Prince',
//         phoneNumber: '321-654-0987',
//         email: 'Diana.Prince@gmail.com',
//         linkedIn: 'https://www.linkedin.com/in/dianaprince',
//         website: 'https://www.wonderwoman.com',
//         summary: 'Amazonian warrior princess with extensive combat training and a strong sense of justice. Skilled in diplomacy and conflict resolution.',
//         experience: [
//             {
//                 employer: 'Justice League',
//                 title: 'Superhero',
//                 city: 'Various',
//                 state: 'N/A',
//                 startDate: '2010-01-01',
//                 endDate: 'Present',
//                 description: [
//                     'Fought crime and protected the world from various threats.',
//                     'Collaborated with other superheroes to maintain peace and justice.'
//                 ]
//             },
//             {
//                 employer: 'Themyscira',
//                 title: 'Amazonian Warrior',
//                 city: 'Themyscira',
//                 state: 'N/A',
//                 startDate: '2000-01-01',
//                 endDate: '2009-12-31',
//                 description: [
//                     'Trained in various forms of combat and diplomacy.',
//                     'Led missions to protect Themyscira and its people.'
//                 ]
//             }
//         ],
//         education: [
//             {
//                 institution: 'Themyscira Academy',
//                 city: 'Themyscira',
//                 state: 'N/A',
//                 degree: 'Warrior Training',
//                 fieldOfStudy: 'Combat and Diplomacy',
//                 graduationDate: '2000-05-15',
//                 descriptionEdu: 'Graduated with honors in combat and diplomacy.',
//                 awards: ['Best Warrior', 'Diplomacy Excellence']
//             }
//         ],
//         skills: ['Combat', 'Diplomacy', 'Leadership', 'Super Strength', 'Flight', 'Lasso of Truth'],
//         shareWithOthers: true,
//         additionalInfo: 'Fluent in multiple languages. Passionate about equality and justice for all.'
//     },
//     {
//         id: '7',
//         firstName: 'Barry',
//         lastName: 'Allen',
//         phoneNumber: '456-789-1230',
//         email: 'Barry.Allen@centralcitypd.com',
//         linkedIn: 'https://www.linkedin.com/in/barryallen',
//         website: 'https://www.flash.com',
//         summary: 'Forensic scientist with super-speed abilities. Dedicated to solving crimes and protecting Central City.',
//         experience: [
//             {
//                 employer: 'Central City Police Department',
//                 title: 'Forensic Scientist',
//                 city: 'Central City',
//                 state: 'CA',
//                 startDate: '2015-01-01',
//                 endDate: 'Present',
//                 description: [
//                     'Analyzed crime scenes and collected evidence.',
//                     'Collaborated with law enforcement to solve cases.'
//                 ]
//             },
//             {
//                 employer: 'Star Labs',
//                 title: 'Research Scientist',
//                 city: 'Central City',
//                 state: 'CA',
//                 startDate: '2010-01-01',
//                 endDate: '2014-12-31',
//                 description: [
//                     'Conducted research on particle physics and its applications.',
//                     'Assisted in the development of advanced technology.'
//                 ]
//             }
//         ],
//         education: [
//             {
//                 institution: 'Central City University',
//                 city: 'Central City',
//                 state: 'CA',
//                 degree: 'Bachelor of Science',
//                 fieldOfStudy: 'Forensic Science',
//                 graduationDate: '2009-05-15',
//                 descriptionEdu: 'Graduated with honors in forensic science.',
//                 awards: ['Top of Class', 'Best Forensic Project']
//             }
//         ],
//         skills: ['Forensic Science', 'Crime Scene Investigation', 'Super Speed', 'Problem Solving'],
//         shareWithOthers: true,
//         additionalInfo: 'Fluent in English and Spanish. Passionate about using science to solve crimes and help others.'
//     },
//     {
//         id: '8',
//         firstName: 'Peter',
//         lastName: 'Parker',
//         phoneNumber: '555-123-4567',
//         email: 'Peter.Parker@ParkerIndustries.com',
//         linkedIn: 'https://www.linkedin.com/in/peterparker',
//         website: 'https://www.spiderman.com',
//         summary: 'Freelance photographer and superhero with spider-like abilities. Skilled in web-slinging and crime-fighting.',
//         experience: [
//             {
//                 employer: 'Freelance',
//                 title: 'Photographer',
//                 city: 'New York',
//                 state: 'NY',
//                 startDate: '2010-01-01',
//                 endDate: 'Present',
//                 description: [
//                     'Captured high-quality images for various publications.',
//                     'Specialized in action shots and candid photography.'
//                 ]
//             },
//             {
//                 employer: 'Daily Bugle',
//                 title: 'Staff Photographer',
//                 city: 'New York',
//                 state: 'NY',
//                 startDate: '2005-01-01',
//                 endDate: '2009-12-31',
//                 description: [
//                     'Provided photographic coverage of local events and news stories.',
//                     'Collaborated with reporters to enhance articles with visual content.'
//                 ]
//             }
//         ],
//         education: [
//             {
//                 institution: 'Empire State University',
//                 city: 'New York',
//                 state: 'NY',
//                 degree: 'Bachelor of Arts',
//                 fieldOfStudy: 'Photography',
//                 graduationDate: '2004-05-15',
//                 descriptionEdu: 'Graduated with honors in photography.',
//                 awards: ['Best Photography Portfolio', 'Top of Class']
//             }
//         ],
//         skills: ['Photography', 'Web-Slinging', 'Crime Fighting', 'Agility', 'Spider-Sense'],
//         shareWithOthers: true,
//     }
// ];

// const clarkKent: User = {
//     id: '1',
//     username: 'manofsteel',
//     email: 'clark.kent@dailyplanet.com',
//     password: 'password123',
//     resumes: [resumeData[0], resumeData[4]]
// }

// const bruceWayne: User = {
//     id: '2',
//     username: 'darkknight',
//     email: 'BruceWayne@WayneEnterprises.com',
//     password: 'password456',
//     resumes: [resumeData[1]]
// };

// const admin: User = {
//     id: '3',
//     username: 'casmooth',
//     email: 'noneof@yourbusiness.com',
//     password: 'password789',
//     resumes: [resumeData[2], resumeData[3]]
// };

// const dianaPrince: User = {
//     id: '4',
//     username: 'wonderwoman',
//     email: 'diana.prince@gmail.com',
//     password: 'password101112',
//     resumes: [resumeData[5]]
// };

// const barryAllen: User = {
//     id: '5',
//     username: 'theflash',
//     email: 'Barry.Allen@centralcitypd.com',
//     password: 'password131415',
//     resumes: [resumeData[6]]
// };

// const peterParker: User = {
//     id: '6',
//     username: 'spiderman',
//     email: 'Peter.Parker@ParkerIndustries.com',
//     password: 'password161718',
//     resumes: [resumeData[7]]
// };

// export const users: User[] = [clarkKent, bruceWayne, admin, dianaPrince, barryAllen, peterParker]; // Export the users array for use in the application
// export const allResumes: Resume[] = resumeData; // Export all resumes for use in the application