

import { UserRole, User, Student, Subject, SchoolClass, Mark, Term, ExamSession, TermCalculationMode, Gender } from './types';

export const MOCK_SCHOOL_NAME_DISPLAY = "NexusLearn"; // Brand name of the application
export const DEFAULT_SCHOOL_NAME = "My High School"; // Default actual name of the school
export const DEFAULT_SCHOOL_ADDRESS = "P.O. Box 12345 - 00100, Nairobi, Kenya";
export const DEFAULT_SCHOOL_DOMAIN = "myschool.ac.ke"; // Default school domain part
export const DEFAULT_SCHOOL_ID = 'school1';

export const ROLES = {
  ADMIN: UserRole.ADMIN,
  TEACHER: UserRole.TEACHER,
  PARENT: UserRole.PARENT,
};

// Unified KNEC Grading Scale, with granular grades from A to E.
// The scale is sorted from highest to lowest. The first match wins when checking score >= min.
export const UNIFIED_GRADING_SCALE: { min: number; grade: string; points: number }[] = [
  { min: 80, grade: 'A', points: 12 },
  { min: 75, grade: 'A-', points: 11 },
  { min: 70, grade: 'B+', points: 10 },
  { min: 65, grade: 'B', points: 9 },
  { min: 60, grade: 'B-', points: 8 },
  { min: 55, grade: 'C+', points: 7 },
  { min: 50, grade: 'C', points: 6 },
  { min: 45, grade: 'C-', points: 5 },
  { min: 40, grade: 'D+', points: 4 },
  { min: 35, grade: 'D', points: 3 },
  { min: 30, grade: 'D-', points: 2 },
  { min: 0, grade: 'E', points: 1 }
];

export const SCIENCE_MATH_SUBJECT_IDS = ['MAT', 'BIO', 'PHY', 'CHE'];

export const SCIENCE_MATH_GRADING_SCALE: { min: number; grade: string; points: number }[] = [
  { min: 75, grade: 'A', points: 12 },
  { min: 70, grade: 'A-', points: 11 },
  { min: 65, grade: 'B+', points: 10 },
  { min: 60, grade: 'B', points: 9 },
  { min: 55, grade: 'B-', points: 8 },
  { min: 50, grade: 'C+', points: 7 },
  { min: 45, grade: 'C', points: 6 },
  { min: 40, grade: 'C-', points: 5 },
  { min: 35, grade: 'D+', points: 4 },
  { min: 30, grade: 'D', points: 3 },
  { min: 25, grade: 'D-', points: 2 },
  { min: 0, grade: 'E', points: 1 }
];


export const MOCK_SUBJECTS: Subject[] = [
  // Group 1 (Compulsory)
  { id: 'ENG', name: 'English', group: 1 },
  { id: 'KIS', name: 'Kiswahili', group: 1 },
  { id: 'MAT', name: 'Mathematics (Alt A)', group: 1 },

  // Group 2 (Sciences)
  { id: 'BIO', name: 'Biology', group: 2 },
  { id: 'PHY', name: 'Physics', group: 2 },
  { id: 'CHE', name: 'Chemistry', group: 2 },

  // Group 3 (Humanities)
  { id: 'HIS', name: 'History and Government', group: 3 },
  { id: 'GEO', name: 'Geography', group: 3 },
  { id: 'CRE', name: 'C.R.E', group: 3 },
  { id: 'IRE', name: 'I.R.E', group: 3 },
  { id: 'HRE', name: 'H.R.E', group: 3 },

  // Group 4 (Applied/Technical)
  { id: 'HSCI', name: 'Home Science', group: 4 },
  { id: 'ART', name: 'Art and Design', group: 4 },
  { id: 'AGR', name: 'Agriculture', group: 4 },
  { id: 'COMP', name: 'Computer Studies', group: 4 },
  { id: 'AVIA', name: 'Aviation Technology', group: 4 },
  { id: 'ELEC', name: 'Electricity', group: 4 },
  { id: 'BCON', name: 'Building and Construction', group: 4 },
  { id: 'WOOD', name: 'Woodwork', group: 4 },
  { id: 'METAL', name: 'Metalwork', group: 4 },
  
  // Group 5 (Languages & Business)
  { id: 'FRE', name: 'French', group: 5 },
  { id: 'GER', name: 'German', group: 5 },
  { id: 'MUS', name: 'Music', group: 5 },
  { id: 'BUS', name: 'Business Studies', group: 5 }
];


// Default active subjects for a new school setup
export const DEFAULT_ACTIVE_SUBJECT_IDS = ['ENG', 'KIS', 'MAT', 'BIO', 'PHY', 'CHE', 'HIS', 'GEO', 'CRE', 'BUS', 'AGR', 'COMP', 'BCON', 'WOOD', 'METAL'];


export const MOCK_USERS: User[] = [
  { id: 'admin0', username: 'superadmin', password: 'superadminpass', roles: [ROLES.ADMIN], name: 'Super Admin (You)', phoneNumber: '+254700000000' },
  { id: 'admin1', username: `principal@${DEFAULT_SCHOOL_DOMAIN}`, password: 'password123', roles: [ROLES.ADMIN], name: 'Principal P. Mwangi', phoneNumber: '+254711111111', signatureImageUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgNjAiIHdpZHRoPSIyMDAiIGhlaWdodD0iNjAiPjxwYXRoIGQ9Ik0xMCA0MEExNSA4IDAgMSAxIDQwIDQwTTQwIDQwQzUwIDYwIDcwIDIwIDgwIDQwTTgwIDQwQzkwIDYwIDExMCAyMCAxMjAgNDBNMTMwIDQwQzE0MCAyMCAxNjAgNjAgMTcwIDQwIiBzdHJva2U9ImJsYWNrIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg==', schoolId: DEFAULT_SCHOOL_ID },
  { id: 'admin2', username: `deputy@${DEFAULT_SCHOOL_DOMAIN}`, password: 'password123', roles: [ROLES.ADMIN], name: 'Deputy D. Omondi', phoneNumber: '+254722222222', schoolId: DEFAULT_SCHOOL_ID },
  { id: 'admin3', username: `examcoord1@${DEFAULT_SCHOOL_DOMAIN}`, password: 'password123', roles: [ROLES.ADMIN], name: 'Exam Coordinator E. Kimani', phoneNumber: '+254733333333', schoolId: DEFAULT_SCHOOL_ID },
  { id: 'admin4', username: `examcoord2@${DEFAULT_SCHOOL_DOMAIN}`, password: 'password123', roles: [ROLES.ADMIN], name: 'Exam Coordinator F. Ali', phoneNumber: '+254744444444', schoolId: DEFAULT_SCHOOL_ID },
  { id: 'teacher1', username: `AliceWonder@${DEFAULT_SCHOOL_DOMAIN}`, password: 'teacherpass', roles: [ROLES.TEACHER], name: 'Alice Wonder', teacherId: 'T001', phoneNumber: '+254755555555', classSubjectAssignments: [{ classId: 'C02', subjectIds: ['ENG', 'KIS', 'MAT', 'PHY', 'CHE', 'BIO', 'HIS', 'GEO'] }], signatureImageUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMjAgNjAiIHdpZHRoPSIyMjAiIGhlaWdodD0iNjAiPjxwYXRoIGQ9Ik0xMCA0MEE1NSA1IDAgMSAxIDQ1IDQwQzUwIDYwIDY1IDI1IDc1IDQwQzg1IDU1IDEwMCAyNSAxMTAgNDBRMTE1IDUwIDEyNSA0MEExNSA4IDAgMSAwIDE1MCA0ME0xNjAgNDBDMTcwIDYwIDE4NSAyMCAxOTUgNDBDMjA1IDYwIDIyMCAyMCAyMjAgNDAiIHN0cm9rZT0iIzEwMTAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIyLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==', schoolId: DEFAULT_SCHOOL_ID },
  { id: 'teacher2', username: `BobBuilder@${DEFAULT_SCHOOL_DOMAIN}`, password: 'teacherpass', roles: [ROLES.TEACHER], name: 'Bob Builder', teacherId: 'T002', phoneNumber: '+254766666666', schoolId: DEFAULT_SCHOOL_ID }
  // Parent users will be dynamically derived or created if needed based on student data
];

export const MOCK_CLASSES: SchoolClass[] = [
  { id: 'C02', name: 'Form 2' },
  { id: 'C03', name: 'Form 3' },
  { id: 'C04', name: 'Form 4' }
];

export const MOCK_STUDENTS: Student[] = [
  { id: 'S001', admissionNumber: '2001', name: 'Charlie Brown', classId: 'C02', stream: 'North', parentUsername: `charlie@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.MALE, currentFeesBalance: 15000, nextTermFees: 45000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S002', admissionNumber: '2002', name: 'Daisy Duck', classId: 'C02', stream: 'North', parentUsername: `daisy@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.FEMALE, currentFeesBalance: 0, nextTermFees: 45000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S003', admissionNumber: '3001', name: 'Evan Almighty', classId: 'C03', stream: 'East', parentUsername: `evan@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.MALE, currentFeesBalance: 5000, nextTermFees: 52000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S004', admissionNumber: '3002', name: 'Fiona Gallagher', classId: 'C03', stream: 'East', parentUsername: `fiona@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.FEMALE, currentFeesBalance: 25000, nextTermFees: 52000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S005', admissionNumber: '4001', name: 'George Jetson', classId: 'C04', stream: 'West', parentUsername: `george@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.MALE, currentFeesBalance: 0, nextTermFees: 60000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S006', admissionNumber: '4002', name: 'Hannah Montana', classId: 'C04', stream: 'West', parentUsername: `hannah@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.FEMALE, currentFeesBalance: 7500, nextTermFees: 60000, schoolId: DEFAULT_SCHOOL_ID },
  // Expanded Form 2 North
  { id: 'S007', admissionNumber: '2003', name: 'Liam Smith', classId: 'C02', stream: 'North', parentUsername: `liam2003@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.MALE, currentFeesBalance: 12000, nextTermFees: 45000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S008', admissionNumber: '2004', name: 'Olivia Jones', classId: 'C02', stream: 'North', parentUsername: `olivia2004@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.FEMALE, currentFeesBalance: 0, nextTermFees: 45000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S009', admissionNumber: '2005', name: 'Noah Johnson', classId: 'C02', stream: 'North', parentUsername: `noah2005@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.MALE, currentFeesBalance: 3000, nextTermFees: 45000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S010', admissionNumber: '2006', name: 'Emma Williams', classId: 'C02', stream: 'North', parentUsername: `emma2006@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.FEMALE, currentFeesBalance: 22000, nextTermFees: 45000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S011', admissionNumber: '2007', name: 'Oliver Brown', classId: 'C02', stream: 'North', parentUsername: `oliver2007@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.MALE, currentFeesBalance: 0, nextTermFees: 45000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S012', admissionNumber: '2008', name: 'Ava Garcia', classId: 'C02', stream: 'North', parentUsername: `ava2008@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.FEMALE, currentFeesBalance: 9800, nextTermFees: 45000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S013', admissionNumber: '2009', name: 'Elijah Miller', classId: 'C02', stream: 'North', parentUsername: `elijah2009@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.MALE, currentFeesBalance: 0, nextTermFees: 45000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S014', admissionNumber: '2010', name: 'Charlotte Davis', classId: 'C02', stream: 'North', parentUsername: `charlotte2010@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.FEMALE, currentFeesBalance: 45000, nextTermFees: 45000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S015', admissionNumber: '2011', name: 'James Rodriguez', classId: 'C02', stream: 'North', parentUsername: `james2011@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.MALE, currentFeesBalance: 1000, nextTermFees: 45000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S016', admissionNumber: '2012', name: 'Sophia Martinez', classId: 'C02', stream: 'North', parentUsername: `sophia2012@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.FEMALE, currentFeesBalance: 0, nextTermFees: 45000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S017', admissionNumber: '2013', name: 'William Hernandez', classId: 'C02', stream: 'North', parentUsername: `william2013@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.MALE, currentFeesBalance: 8200, nextTermFees: 45000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S018', admissionNumber: '2014', name: 'Amelia Lopez', classId: 'C02', stream: 'North', parentUsername: `amelia2014@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.FEMALE, currentFeesBalance: 0, nextTermFees: 45000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S019', admissionNumber: '2015', name: 'Henry Gonzalez', classId: 'C02', stream: 'North', parentUsername: `henry2015@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.MALE, currentFeesBalance: 17500, nextTermFees: 45000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S020', admissionNumber: '2016', name: 'Isabella Wilson', classId: 'C02', stream: 'North', parentUsername: `isabella2016@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.FEMALE, currentFeesBalance: 2000, nextTermFees: 45000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S021', admissionNumber: '2017', name: 'Lucas Anderson', classId: 'C02', stream: 'North', parentUsername: `lucas2017@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.MALE, currentFeesBalance: 0, nextTermFees: 45000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S022', admissionNumber: '2018', name: 'Mia Thomas', classId: 'C02', stream: 'North', parentUsername: `mia2018@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.FEMALE, currentFeesBalance: 19000, nextTermFees: 45000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S023', admissionNumber: '2019', name: 'Benjamin Taylor', classId: 'C02', stream: 'North', parentUsername: `benjamin2019@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.MALE, currentFeesBalance: 0, nextTermFees: 45000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S024', admissionNumber: '2020', name: 'Evelyn Moore', classId: 'C02', stream: 'North', parentUsername: `evelyn2020@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.FEMALE, currentFeesBalance: 0, nextTermFees: 45000, schoolId: DEFAULT_SCHOOL_ID },
  // Expanded Form 3 East
  { id: 'S025', admissionNumber: '3003', name: 'Theodore Jackson', classId: 'C03', stream: 'East', parentUsername: `theodore3003@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.MALE, currentFeesBalance: 5000, nextTermFees: 52000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S026', admissionNumber: '3004', name: 'Harper Martin', classId: 'C03', stream: 'East', parentUsername: `harper3004@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.FEMALE, currentFeesBalance: 0, nextTermFees: 52000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S027', admissionNumber: '3005', name: 'Leo White', classId: 'C03', stream: 'East', parentUsername: `leo3005@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.MALE, currentFeesBalance: 11000, nextTermFees: 52000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S028', admissionNumber: '3006', name: 'Chloe Harris', classId: 'C03', stream: 'East', parentUsername: `chloe3006@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.FEMALE, currentFeesBalance: 0, nextTermFees: 52000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S029', admissionNumber: '3007', name: 'Jack Thompson', classId: 'C03', stream: 'East', parentUsername: `jack3007@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.MALE, currentFeesBalance: 30000, nextTermFees: 52000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S030', admissionNumber: '3008', name: 'Penelope Allen', classId: 'C03', stream: 'East', parentUsername: `penelope3008@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.FEMALE, currentFeesBalance: 0, nextTermFees: 52000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S031', admissionNumber: '3009', name: 'Levi King', classId: 'C03', stream: 'East', parentUsername: `levi3009@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.MALE, currentFeesBalance: 0, nextTermFees: 52000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S032', admissionNumber: '3010', name: 'Grace Wright', classId: 'C03', stream: 'East', parentUsername: `grace3010@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.FEMALE, currentFeesBalance: 100, nextTermFees: 52000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S033', admissionNumber: '3011', name: 'Mateo Scott', classId: 'C03', stream: 'East', parentUsername: `mateo3011@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.MALE, currentFeesBalance: 0, nextTermFees: 52000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S034', admissionNumber: '3012', name: 'Riley Green', classId: 'C03', stream: 'East', parentUsername: `riley3012@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.FEMALE, currentFeesBalance: 52000, nextTermFees: 52000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S035', admissionNumber: '3013', name: 'Daniel Baker', classId: 'C03', stream: 'East', parentUsername: `daniel3013@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.MALE, currentFeesBalance: 0, nextTermFees: 52000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S036', admissionNumber: '3014', name: 'Aubrey Adams', classId: 'C03', stream: 'East', parentUsername: `aubrey3014@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.FEMALE, currentFeesBalance: 0, nextTermFees: 52000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S037', admissionNumber: '3015', name: 'Michael Nelson', classId: 'C03', stream: 'East', parentUsername: `michael3015@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.MALE, currentFeesBalance: 6000, nextTermFees: 52000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S038', admissionNumber: '3016', name: 'Aria Carter', classId: 'C03', stream: 'East', parentUsername: `aria3016@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.FEMALE, currentFeesBalance: 0, nextTermFees: 52000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S039', admissionNumber: '3017', name: 'Ethan Hill', classId: 'C03', stream: 'East', parentUsername: `ethan3017@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.MALE, currentFeesBalance: 0, nextTermFees: 52000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S040', admissionNumber: '3018', name: 'Zoey Mitchell', classId: 'C03', stream: 'East', parentUsername: `zoey3018@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.FEMALE, currentFeesBalance: 0, nextTermFees: 52000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S041', admissionNumber: '3019', name: 'Alexander Perez', classId: 'C03', stream: 'East', parentUsername: `alexander3019@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.MALE, currentFeesBalance: 14000, nextTermFees: 52000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S042', admissionNumber: '3020', name: 'Lily Roberts', classId: 'C03', stream: 'East', parentUsername: `lily3020@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.FEMALE, currentFeesBalance: 0, nextTermFees: 52000, schoolId: DEFAULT_SCHOOL_ID },
  // Expanded Form 4 West
  { id: 'S043', admissionNumber: '4003', name: 'Jackson Turner', classId: 'C04', stream: 'West', parentUsername: `jackson4003@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.MALE, currentFeesBalance: 10000, nextTermFees: 60000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S044', admissionNumber: '4004', name: 'Madison Phillips', classId: 'C04', stream: 'West', parentUsername: `madison4004@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.FEMALE, currentFeesBalance: 0, nextTermFees: 60000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S045', admissionNumber: '4005', name: 'Logan Campbell', classId: 'C04', stream: 'West', parentUsername: `logan4005@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.MALE, currentFeesBalance: 60000, nextTermFees: 60000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S046', admissionNumber: '4006', name: 'Scarlett Parker', classId: 'C04', stream: 'West', parentUsername: `scarlett4006@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.FEMALE, currentFeesBalance: 0, nextTermFees: 60000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S047', admissionNumber: '4007', name: 'Sebastian Evans', classId: 'C04', stream: 'West', parentUsername: `sebastian4007@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.MALE, currentFeesBalance: 0, nextTermFees: 60000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S048', admissionNumber: '4008', name: 'Victoria Edwards', classId: 'C04', stream: 'West', parentUsername: `victoria4008@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.FEMALE, currentFeesBalance: 0, nextTermFees: 60000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S049', admissionNumber: '4009', name: 'Aiden Collins', classId: 'C04', stream: 'West', parentUsername: `aiden4009@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.MALE, currentFeesBalance: 5000, nextTermFees: 60000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S050', admissionNumber: '4010', name: 'Hazel Stewart', classId: 'C04', stream: 'West', parentUsername: `hazel4010@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.FEMALE, currentFeesBalance: 0, nextTermFees: 60000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S051', admissionNumber: '4011', name: 'Owen Morris', classId: 'C04', stream: 'West', parentUsername: `owen4011@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.MALE, currentFeesBalance: 0, nextTermFees: 60000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S052', admissionNumber: '4012', name: 'Aurora Rogers', classId: 'C04', stream: 'West', parentUsername: `aurora4012@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.FEMALE, currentFeesBalance: 12500, nextTermFees: 60000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S053', admissionNumber: '4013', name: 'Caleb Reed', classId: 'C04', stream: 'West', parentUsername: `caleb4013@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.MALE, currentFeesBalance: 0, nextTermFees: 60000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S054', admissionNumber: '4014', name: 'Nora Cook', classId: 'C04', stream: 'West', parentUsername: `nora4014@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.FEMALE, currentFeesBalance: 0, nextTermFees: 60000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S055', admissionNumber: '4015', name: 'Ryan Morgan', classId: 'C04', stream: 'West', parentUsername: `ryan4015@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.MALE, currentFeesBalance: 0, nextTermFees: 60000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S056', admissionNumber: '4016', name: 'Bella Bailey', classId: 'C04', stream: 'West', parentUsername: `bella4016@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.FEMALE, currentFeesBalance: 33000, nextTermFees: 60000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S057', admissionNumber: '4017', name: 'Luke Cooper', classId: 'C04', stream: 'West', parentUsername: `luke4017@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.MALE, currentFeesBalance: 0, nextTermFees: 60000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S058', admissionNumber: '4018', name: 'Eleanor Richardson', classId: 'C04', stream: 'West', parentUsername: `eleanor4018@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.FEMALE, currentFeesBalance: 0, nextTermFees: 60000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S059', admissionNumber: '4019', name: 'Gabriel Cox', classId: 'C04', stream: 'West', parentUsername: `gabriel4019@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.MALE, currentFeesBalance: 0, nextTermFees: 60000, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'S060', admissionNumber: '4020', name: 'Violet Howard', classId: 'C04', stream: 'West', parentUsername: `violet4020@${DEFAULT_SCHOOL_DOMAIN}`, gender: Gender.FEMALE, currentFeesBalance: 10000, nextTermFees: 60000, schoolId: DEFAULT_SCHOOL_ID }
];

// Initialize parent users from student data
MOCK_STUDENTS.forEach(student => {
    const parentExists = MOCK_USERS.find(u => u.username.toLowerCase() === student.parentUsername.toLowerCase());
    if (!parentExists) {
        MOCK_USERS.push({
            id: `parent_${student.id}`,
            username: student.parentUsername,
            password: student.admissionNumber, // Default password for parent
            roles: [UserRole.PARENT],
            name: `Parent of ${student.name.split(' ')[0]}`,
            studentId: student.id,
            schoolId: student.schoolId
        });
    }
});


export const MOCK_TERMS: Term[] = [
  { id: 'TERM01', name: 'Term 1', year: 2025, calculationMode: TermCalculationMode.WEIGHTED_AVERAGE, closingDate: '2025-04-11', openingDate: '2025-05-02', schoolId: DEFAULT_SCHOOL_ID },
  { id: 'TERM02', name: 'Term 2', year: 2025, calculationMode: TermCalculationMode.WEIGHTED_AVERAGE, closingDate: '2025-08-08', openingDate: '2025-09-01', schoolId: DEFAULT_SCHOOL_ID },
  { id: 'TERM03', name: 'Term 3', year: 2025, calculationMode: TermCalculationMode.WEIGHTED_AVERAGE, closingDate: '2025-11-21', openingDate: '2026-01-05', schoolId: DEFAULT_SCHOOL_ID }
];

export const MOCK_EXAM_SESSIONS: ExamSession[] = [
  { id: 'ES001', termId: 'TERM01', name: 'Term 1 CAT', weight: 30, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'ES002', termId: 'TERM01', name: 'Term 1 EndTerm', weight: 70, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'ES003', termId: 'TERM02', name: 'Term 2 CAT', weight: 30, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'ES004', termId: 'TERM02', name: 'Term 2 EndTerm', weight: 70, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'ES005', termId: 'TERM03', name: 'Term 3 CAT', weight: 30, schoolId: DEFAULT_SCHOOL_ID },
  { id: 'ES006', termId: 'TERM03', name: 'Term 3 EndTerm', weight: 70, schoolId: DEFAULT_SCHOOL_ID }
];

const STATIC_MOCK_MARKS: Mark[] = [
  // --- TERM 1 2025 DATA ---
  // S001 (Charlie Brown, Form 2) - Gradual Improvement Profile
  { studentId: 'S001', subjectId: 'MAT', examSessionId: 'ES001', score: 55, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S001', subjectId: 'MAT', examSessionId: 'ES002', score: 61, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S001', subjectId: 'ENG', examSessionId: 'ES001', score: 60, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S001', subjectId: 'ENG', examSessionId: 'ES002', score: 62, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S001', subjectId: 'KIS', examSessionId: 'ES001', score: 65, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S001', subjectId: 'KIS', examSessionId: 'ES002', score: 68, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S001', subjectId: 'PHY', examSessionId: 'ES001', score: 40, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S001', subjectId: 'PHY', examSessionId: 'ES002', score: 45, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S001', subjectId: 'CHE', examSessionId: 'ES001', score: 50, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S001', subjectId: 'CHE', examSessionId: 'ES002', score: 57, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S001', subjectId: 'BIO', examSessionId: 'ES001', score: 58, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S001', subjectId: 'BIO', examSessionId: 'ES002', score: 62, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S001', subjectId: 'HIS', examSessionId: 'ES001', score: 55, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S001', subjectId: 'HIS', examSessionId: 'ES002', score: 60, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S001', subjectId: 'GEO', examSessionId: 'ES001', score: 62, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S001', subjectId: 'GEO', examSessionId: 'ES002', score: 65, schoolId: DEFAULT_SCHOOL_ID },

  // S002 (Daisy Duck, Form 2) - High Performer, Stable Profile
  { studentId: 'S002', subjectId: 'MAT', examSessionId: 'ES001', score: 85, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S002', subjectId: 'MAT', examSessionId: 'ES002', score: 90, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S002', subjectId: 'ENG', examSessionId: 'ES001', score: 80, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S002', subjectId: 'ENG', examSessionId: 'ES002', score: 82, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S002', subjectId: 'KIS', examSessionId: 'ES001', score: 78, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S002', subjectId: 'KIS', examSessionId: 'ES002', score: 80, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S002', subjectId: 'PHY', examSessionId: 'ES001', score: 82, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S002', subjectId: 'PHY', examSessionId: 'ES002', score: 85, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S002', subjectId: 'CHE', examSessionId: 'ES001', score: 81, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S002', subjectId: 'CHE', examSessionId: 'ES002', score: 84, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S002', subjectId: 'BIO', examSessionId: 'ES001', score: 79, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S002', subjectId: 'BIO', examSessionId: 'ES002', score: 81, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S002', subjectId: 'GEO', examSessionId: 'ES001', score: 88, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S002', subjectId: 'GEO', examSessionId: 'ES002', score: 91, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S002', subjectId: 'BUS', examSessionId: 'ES001', score: 84, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S002', subjectId: 'BUS', examSessionId: 'ES002', score: 86, schoolId: DEFAULT_SCHOOL_ID },
  
  // S003 (Evan Almighty, Form 3) - Performance Drop Profile
  { studentId: 'S003', subjectId: 'MAT', examSessionId: 'ES001', score: 70, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S003', subjectId: 'MAT', examSessionId: 'ES002', score: 72, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S003', subjectId: 'ENG', examSessionId: 'ES001', score: 68, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S003', subjectId: 'ENG', examSessionId: 'ES002', score: 70, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S003', subjectId: 'KIS', examSessionId: 'ES001', score: 65, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S003', subjectId: 'KIS', examSessionId: 'ES002', score: 68, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S003', subjectId: 'PHY', examSessionId: 'ES001', score: 75, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S003', subjectId: 'PHY', examSessionId: 'ES002', score: 78, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S003', subjectId: 'CHE', examSessionId: 'ES001', score: 72, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S003', subjectId: 'CHE', examSessionId: 'ES002', score: 75, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S003', subjectId: 'HIS', examSessionId: 'ES001', score: 78, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S003', subjectId: 'HIS', examSessionId: 'ES002', score: 80, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S003', subjectId: 'BUS', examSessionId: 'ES001', score: 80, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S003', subjectId: 'BUS', examSessionId: 'ES002', score: 82, schoolId: DEFAULT_SCHOOL_ID },
  
  // S004 (Fiona Gallagher, Form 3) - Average but Improving
  { studentId: 'S004', subjectId: 'MAT', examSessionId: 'ES001', score: 52, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S004', subjectId: 'MAT', examSessionId: 'ES002', score: 58, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S004', subjectId: 'ENG', examSessionId: 'ES001', score: 60, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S004', subjectId: 'ENG', examSessionId: 'ES002', score: 65, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S004', subjectId: 'KIS', examSessionId: 'ES001', score: 55, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S004', subjectId: 'KIS', examSessionId: 'ES002', score: 60, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S004', subjectId: 'BIO', examSessionId: 'ES001', score: 58, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S004', subjectId: 'BIO', examSessionId: 'ES002', score: 62, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S004', subjectId: 'CHE', examSessionId: 'ES001', score: 54, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S004', subjectId: 'CHE', examSessionId: 'ES002', score: 59, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S004', subjectId: 'GEO', examSessionId: 'ES001', score: 62, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S004', subjectId: 'GEO', examSessionId: 'ES002', score: 68, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S004', subjectId: 'AGR', examSessionId: 'ES001', score: 50, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S004', subjectId: 'AGR', examSessionId: 'ES002', score: 55, schoolId: DEFAULT_SCHOOL_ID },

  // S005 (George Jetson, Form 4) - Consistently Excellent
  { studentId: 'S005', subjectId: 'MAT', examSessionId: 'ES001', score: 88, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S005', subjectId: 'MAT', examSessionId: 'ES002', score: 92, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S005', subjectId: 'ENG', examSessionId: 'ES001', score: 85, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S005', subjectId: 'ENG', examSessionId: 'ES002', score: 88, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S005', subjectId: 'KIS', examSessionId: 'ES001', score: 82, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S005', subjectId: 'KIS', examSessionId: 'ES002', score: 85, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S005', subjectId: 'PHY', examSessionId: 'ES001', score: 90, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S005', subjectId: 'PHY', examSessionId: 'ES002', score: 93, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S005', subjectId: 'CHE', examSessionId: 'ES001', score: 87, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S005', subjectId: 'CHE', examSessionId: 'ES002', score: 90, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S005', subjectId: 'BIO', examSessionId: 'ES001', score: 84, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S005', subjectId: 'BIO', examSessionId: 'ES002', score: 88, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S005', subjectId: 'HIS', examSessionId: 'ES001', score: 92, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S005', subjectId: 'HIS', examSessionId: 'ES002', score: 95, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S005', subjectId: 'COMP', examSessionId: 'ES001', score: 91, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S005', subjectId: 'COMP', examSessionId: 'ES002', score: 94, schoolId: DEFAULT_SCHOOL_ID },
  
  // S006 (Hannah Montana, Form 4) - Fluctuating Performance
  { studentId: 'S006', subjectId: 'MAT', examSessionId: 'ES001', score: 75, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S006', subjectId: 'MAT', examSessionId: 'ES002', score: 78, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S006', subjectId: 'ENG', examSessionId: 'ES001', score: 80, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S006', subjectId: 'ENG', examSessionId: 'ES002', score: 82, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S006', subjectId: 'KIS', examSessionId: 'ES001', score: 72, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S006', subjectId: 'KIS', examSessionId: 'ES002', score: 75, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S006', subjectId: 'BIO', examSessionId: 'ES001', score: 78, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S006', subjectId: 'BIO', examSessionId: 'ES002', score: 80, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S006', subjectId: 'CHE', examSessionId: 'ES001', score: 70, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S006', subjectId: 'CHE', examSessionId: 'ES002', score: 73, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S006', subjectId: 'GEO', examSessionId: 'ES001', score: 82, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S006', subjectId: 'GEO', examSessionId: 'ES002', score: 85, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S006', subjectId: 'BUS', examSessionId: 'ES001', score: 77, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S006', subjectId: 'BUS', examSessionId: 'ES002', score: 80, schoolId: DEFAULT_SCHOOL_ID },

  // --- TERM 2 2025 DATA ---
  // S001 (Charlie Brown) - Improved
  { studentId: 'S001', subjectId: 'MAT', examSessionId: 'ES003', score: 65, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S001', subjectId: 'MAT', examSessionId: 'ES004', score: 70, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S001', subjectId: 'ENG', examSessionId: 'ES003', score: 68, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S001', subjectId: 'ENG', examSessionId: 'ES004', score: 72, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S001', subjectId: 'KIS', examSessionId: 'ES003', score: 70, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S001', subjectId: 'KIS', examSessionId: 'ES004', score: 75, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S001', subjectId: 'PHY', examSessionId: 'ES003', score: 50, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S001', subjectId: 'PHY', examSessionId: 'ES004', score: 55, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S001', subjectId: 'CHE', examSessionId: 'ES003', score: 60, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S001', subjectId: 'CHE', examSessionId: 'ES004', score: 65, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S001', subjectId: 'BIO', examSessionId: 'ES003', score: 65, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S001', subjectId: 'BIO', examSessionId: 'ES004', score: 68, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S001', subjectId: 'HIS', examSessionId: 'ES003', score: 62, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S001', subjectId: 'HIS', examSessionId: 'ES004', score: 66, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S001', subjectId: 'GEO', examSessionId: 'ES003', score: 68, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S001', subjectId: 'GEO', examSessionId: 'ES004', score: 72, schoolId: DEFAULT_SCHOOL_ID },

  // S003 (Evan Almighty) - Dropped
  { studentId: 'S003', subjectId: 'MAT', examSessionId: 'ES003', score: 65, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S003', subjectId: 'MAT', examSessionId: 'ES004', score: 60, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S003', subjectId: 'ENG', examSessionId: 'ES003', score: 62, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S003', subjectId: 'ENG', examSessionId: 'ES004', score: 58, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S003', subjectId: 'KIS', examSessionId: 'ES003', score: 60, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S003', subjectId: 'KIS', examSessionId: 'ES004', score: 55, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S003', subjectId: 'PHY', examSessionId: 'ES003', score: 70, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S003', subjectId: 'PHY', examSessionId: 'ES004', score: 65, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S003', subjectId: 'CHE', examSessionId: 'ES003', score: 68, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S003', subjectId: 'CHE', examSessionId: 'ES004', score: 62, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S003', subjectId: 'HIS', examSessionId: 'ES003', score: 72, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S003', subjectId: 'HIS', examSessionId: 'ES004', score: 68, schoolId: DEFAULT_SCHOOL_ID },
  { studentId: 'S003', subjectId: 'BUS', examSessionId: 'ES003', score: 75, schoolId: DEFAULT_SCHOOL_ID }, { studentId: 'S003', subjectId: 'BUS', examSessionId: 'ES004', score: 70, schoolId: DEFAULT_SCHOOL_ID },
];

const GENERATED_MOCK_MARKS: Mark[] = (() => {
    const marks: Mark[] = [];
    const studentData = MOCK_STUDENTS.filter(s => !STATIC_MOCK_MARKS.some(m => m.studentId === s.id));

    studentData.forEach((student, index) => {
        const performance = index % 3; // 0: good, 1: average, 2: weak
        const minScore = performance === 0 ? 65 : (performance === 1 ? 45 : 25);
        const maxScore = performance === 0 ? 95 : (performance === 1 ? 75 : 55);

        const generateScore = () => Math.floor(Math.random() * (maxScore - minScore + 1)) + minScore;

        MOCK_TERMS.forEach(term => {
            const sessions = MOCK_EXAM_SESSIONS.filter(es => es.termId === term.id);
            sessions.forEach(session => {
                DEFAULT_ACTIVE_SUBJECT_IDS.forEach(subjectId => {
                    // Check if student has specific subjects, otherwise use default active
                    if (!student.subjects || student.subjects.length === 0 || student.subjects.includes(subjectId)) {
                       marks.push({
                           studentId: student.id,
                           subjectId: subjectId,
                           examSessionId: session.id,
                           score: generateScore(),
                           schoolId: student.schoolId
                       });
                    }
                });
            });
        });
    });

    return marks;
})();


export const MOCK_MARKS: Mark[] = [...STATIC_MOCK_MARKS, ...GENERATED_MOCK_MARKS];
export const DEFAULT_TERM_ID = MOCK_TERMS[0]?.id || '';