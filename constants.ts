

import { UserRole, User, Student, Subject, SchoolClass, Mark, Term, ExamSession, TermCalculationMode, Gender, Assignment, AssignmentType, School, SchoolStatus } from './types';

export const MOCK_SCHOOL_NAME_DISPLAY = "NexusLearn"; // Brand name of the application

// --- SCHOOL DEFINITIONS ---
const SCHOOL_1_ID = 'school1';
const SCHOOL_2_ID = 'school2';

export const MOCK_SCHOOLS: School[] = [
    {
        id: SCHOOL_1_ID,
        name: "Thinu High School",
        address: "P.O. Box 12345 - 00100, Nairobi, Kenya",
        motto: "Striving for Excellence",
        domain: "thinuhigh.ac.ke",
        badgeUrl: null,
        status: SchoolStatus.ACTIVE,
        cautionMessage: "This is a default caution message.",
        activeSubjectIds: ['ENG', 'KIS', 'MAT', 'BIO', 'PHY', 'CHE', 'HIS', 'GEO', 'CRE', 'BUS', 'AGR', 'COMP'],
    },
    {
        id: SCHOOL_2_ID,
        name: "Summit Academy",
        address: "P.O. Box 54321 - 00200, City Square",
        motto: "Veni, Vidi, Vici",
        domain: "summitacademy.ac.ke",
        badgeUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBkPSJNNTAsMi41QzI1LDIuNSAyLjUsMjUgMi41LDUwczIyLjUsNDcuNSA0Ny41LDQ3LjVzNDcuNS0yMi41IDQ3LjUtNDcuNVM3NSwyLjUgNTAsMi41ek01MCw4Ny41Yy0yMC43LDAtMzcuNS0xNi44LTM3LjUtMzcuNVMxMi41LDI1IDM3LjUsMjVzMzcuNSwxNi44IDM3LjUsMzcuNVM3MC43LDg3LjUgNTAsODcuNXoiIGZpbGw9IiMwMDMiLz48cGF0aCBkPSJNNTAsMTcuNWwtMTUsMjVsMTUsMjVsMTUtMjV6IiBmaWxsPSIjMDY5Ii8+PHBhdGggZD0iTTUwLDYyLjVsLTE1LDEwdi0yMGwxNSwxMHoiIGZpbGw9IiMwMDMiLz48cGF0aCBkPSJNNTAsNjIuNWwxNSwxMHYtMjBsLTE1LDEweiIgZmlsbD0iIzAwMyIvPjwvc3ZnPg==',
        status: SchoolStatus.ACTIVE,
        cautionMessage: "This is a default caution message for Summit Academy.",
        activeSubjectIds: ['ENG', 'KIS', 'MAT', 'BIO', 'CHE', 'HIS', 'GEO', 'FRE', 'MUS', 'BUS'],
    }
];
// --- END SCHOOL DEFINITIONS ---

export const ROLES = {
  ADMIN: UserRole.ADMIN,
  TEACHER: UserRole.TEACHER,
  PARENT: UserRole.PARENT,
  BOARD_MEMBER: UserRole.BOARD_MEMBER,
};

// Unified KNEC Grading Scale
export const UNIFIED_GRADING_SCALE: { min: number; grade: string; points: number }[] = [
  { min: 80, grade: 'A', points: 12 }, { min: 75, grade: 'A-', points: 11 },
  { min: 70, grade: 'B+', points: 10 }, { min: 65, grade: 'B', points: 9 },
  { min: 60, grade: 'B-', points: 8 }, { min: 55, grade: 'C+', points: 7 },
  { min: 50, grade: 'C', points: 6 }, { min: 45, grade: 'C-', points: 5 },
  { min: 40, grade: 'D+', points: 4 }, { min: 35, grade: 'D', points: 3 },
  { min: 30, grade: 'D-', points: 2 }, { min: 0, grade: 'E', points: 1 }
];

export const SCIENCE_MATH_SUBJECT_IDS = ['MAT', 'BIO', 'PHY', 'CHE'];
export const SCIENCE_MATH_GRADING_SCALE: { min: number; grade: string; points: number }[] = [
  { min: 75, grade: 'A', points: 12 }, { min: 70, grade: 'A-', points: 11 },
  { min: 65, grade: 'B+', points: 10 }, { min: 60, grade: 'B', points: 9 },
  { min: 55, grade: 'B-', points: 8 }, { min: 50, grade: 'C+', points: 7 },
  { min: 45, grade: 'C', points: 6 }, { min: 40, grade: 'C-', points: 5 },
  { min: 35, grade: 'D+', points: 4 }, { min: 30, grade: 'D', points: 3 },
  { min: 25, grade: 'D-', points: 2 }, { min: 0, grade: 'E', points: 1 }
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
  { id: 'WOOD', name: 'Woodwork', group: 4 },
  { id: 'METAL', name: 'Metalwork', group: 4 },
  { id: 'BCON', name: 'Building Construction', group: 4 },
  { id: 'PMECH', name: 'Power Mechanics', group: 4 },
  { id: 'ELEC', name: 'Electricity', group: 4 },
  { id: 'D&D', name: 'Drawing and Design', group: 4 },
  { id: 'AVIA', name: 'Aviation Technology', group: 4 },
  { id: 'COMP', name: 'Computer Studies', group: 4 },
  
  // Group 5 (Languages & Business)
  { id: 'FRE', name: 'French', group: 5 },
  { id: 'GER', name: 'German', group: 5 },
  { id: 'ARA', name: 'Arabic', group: 5 },
  { id: 'KSL', name: 'Kenyan Sign Language', group: 5 },
  { id: 'MUS', name: 'Music', group: 5 },
  { id: 'BUS', name: 'Business Studies', group: 5 }
];

export const DEFAULT_ACTIVE_SUBJECT_IDS = ['ENG', 'KIS', 'MAT', 'BIO', 'PHY', 'CHE', 'HIS', 'GEO', 'CRE', 'BUS', 'AGR', 'COMP'];

export const MOCK_USERS: User[] = [
  // Superadmin - no schoolId
  { id: 'admin0', username: 'superadmin', password: 'superadminpass', roles: [ROLES.ADMIN], name: 'Super Admin (You)', phoneNumber: '+254700000000' },
  
  // School 1 Users
  { id: 'admin1', username: `principal@${MOCK_SCHOOLS[0].domain}`, password: 'password123', roles: [ROLES.ADMIN, ROLES.TEACHER, ROLES.BOARD_MEMBER], name: 'Principal P. Mwangi', phoneNumber: '+254711111111', schoolId: SCHOOL_1_ID, signatureImageUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgNjAiIHdpZHRoPSIyMDAiIGhlaWdodD0iNjAiPjxwYXRoIGQ9Ik0xMCA0MEExNSA4IDAgMSAxIDQwIDQwTTQwIDQwQzUwIDYwIDcwIDIwIDgwIDQwTTgwIDQwQzkwIDYwIDExMCAyMCAxMjAgNDBNMTMwIDQwQzE0MCAyMCAxNjAgNjAgMTcwIDQwIiBzdHJva2U9ImJsYWNrIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvc3ZnPg==', isBoardMember: true, classSubjectAssignments: [{ classId: 'C04', subjectIds: ['HIS', 'GEO'] }] },
  { id: 'admin2', username: `deputy@${MOCK_SCHOOLS[0].domain}`, password: 'password123', roles: [ROLES.ADMIN, ROLES.BOARD_MEMBER], name: 'Deputy D. Omondi', phoneNumber: '+254722222222', schoolId: SCHOOL_1_ID, isBoardMember: true },
  { id: 'teacher1', username: `AliceWonder@${MOCK_SCHOOLS[0].domain}`, password: 'teacherpass', roles: [ROLES.TEACHER], name: 'Alice Wonder', teacherId: 'T001', schoolId: SCHOOL_1_ID, phoneNumber: '+254755555555', classSubjectAssignments: [{ classId: 'C02', subjectIds: ['ENG', 'KIS'] }, {classId: 'C03', subjectIds: ['ENG', 'KIS'] }, {classId: 'C04', subjectIds: ['ENG', 'KIS'] }], signatureImageUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMjAgNjAiIHdpZHRoPSIyMjAiIGhlaWdodD0iNjAiPjxwYXRoIGQ9Ik0xMCA0MEE1NSA1IDAgMSAxIDQ1IDQwQzUwIDYwIDY1IDI1IDc1IDQwQzg1IDU1IDEwMCAyNSAxMTAgNDBRMTE1IDUwIDEyNSA0MEExNSA4IDAgMSAwIDE1MCA0ME0xNjAgNDBDMTcwIDYwIDE4NSAyMCAxOTUgNDBDMjA1IDYwIDIyMCAyMCAyMjAgNDAiIHN0cm9rZT0iIzEwMTAxMCIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIyLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjwvc3ZnPg==' },
  { id: 'teacher3', username: `BobBuilder@${MOCK_SCHOOLS[0].domain}`, password: 'teacherpass', roles: [ROLES.TEACHER], name: 'Bob Builder', teacherId: 'T003', schoolId: SCHOOL_1_ID, phoneNumber: '+254766666666', classSubjectAssignments: [{ classId: 'C02', subjectIds: ['MAT', 'PHY'] }, {classId: 'C03', subjectIds: ['MAT', 'PHY'] }, {classId: 'C04', subjectIds: ['MAT', 'PHY'] }] },
  { id: 'board1', username: `board.member@${MOCK_SCHOOLS[0].domain}`, password: 'password123', roles: [ROLES.BOARD_MEMBER], name: 'B. Memberton', phoneNumber: '+254788888888', schoolId: SCHOOL_1_ID, isBoardMember: true },

  // School 2 Users
  { id: 'admin3', username: `head@${MOCK_SCHOOLS[1].domain}`, password: 'password123', roles: [ROLES.ADMIN, ROLES.BOARD_MEMBER], name: 'Director J. Doe', phoneNumber: '+254733333333', schoolId: SCHOOL_2_ID, isBoardMember: true },
  { id: 'teacher2', username: `BenCarter@${MOCK_SCHOOLS[1].domain}`, password: 'teacherpass', roles: [ROLES.TEACHER], name: 'Ben Carter', teacherId: 'T002', schoolId: SCHOOL_2_ID, phoneNumber: '+254777777777', classSubjectAssignments: [{ classId: 'C02', subjectIds: ['ENG', 'FRE', 'MUS'] }, {classId: 'C04', subjectIds: ['FRE', 'MUS'] }] }
];

export const MOCK_CLASSES: SchoolClass[] = [
  { id: 'C02', name: 'Form 2' }, { id: 'C03', name: 'Form 3' }, { id: 'C04', name: 'Form 4' }
];

export const MOCK_STUDENTS: Student[] = [
  // School 1: Thinu High School (30 Students)
  { id: 'S001', admissionNumber: '2001', name: 'Charlie Brown', classId: 'C02', stream: 'North', parentUsername: `charlie@${MOCK_SCHOOLS[0].domain}`, gender: Gender.MALE, currentFeesBalance: 15000, nextTermFees: 45000, schoolId: SCHOOL_1_ID },
  { id: 'S002', admissionNumber: '2002', name: 'Daisy Duck', classId: 'C02', stream: 'North', parentUsername: `daisy@${MOCK_SCHOOLS[0].domain}`, gender: Gender.FEMALE, currentFeesBalance: 0, nextTermFees: 45000, schoolId: SCHOOL_1_ID },
  { id: 'S003', admissionNumber: '3001', name: 'Evan Almighty', classId: 'C03', stream: 'East', parentUsername: `evan@${MOCK_SCHOOLS[0].domain}`, gender: Gender.MALE, currentFeesBalance: 5000, nextTermFees: 52000, schoolId: SCHOOL_1_ID },
  { id: 'S004', admissionNumber: '3002', name: 'Fiona Gallagher', classId: 'C03', stream: 'East', parentUsername: `fiona@${MOCK_SCHOOLS[0].domain}`, gender: Gender.FEMALE, currentFeesBalance: 25000, nextTermFees: 52000, schoolId: SCHOOL_1_ID },
  { id: 'S005', admissionNumber: '4001', name: 'George Jetson', classId: 'C04', stream: 'West', parentUsername: `george@${MOCK_SCHOOLS[0].domain}`, gender: Gender.MALE, currentFeesBalance: 0, nextTermFees: 60000, schoolId: SCHOOL_1_ID },
  { id: 'S006', admissionNumber: '4002', name: 'Hannah Montana', classId: 'C04', stream: 'West', parentUsername: `hannah@${MOCK_SCHOOLS[0].domain}`, gender: Gender.FEMALE, currentFeesBalance: 7500, nextTermFees: 60000, schoolId: SCHOOL_1_ID },
  { id: 'S007', admissionNumber: '2003', name: 'Liam Smith', classId: 'C02', stream: 'North', parentUsername: `liam2003@${MOCK_SCHOOLS[0].domain}`, gender: Gender.MALE, currentFeesBalance: 12000, nextTermFees: 45000, schoolId: SCHOOL_1_ID },
  { id: 'S008', admissionNumber: '2004', name: 'Olivia Jones', classId: 'C02', stream: 'North', parentUsername: `olivia2004@${MOCK_SCHOOLS[0].domain}`, gender: Gender.FEMALE, currentFeesBalance: 0, nextTermFees: 45000, schoolId: SCHOOL_1_ID },
  { id: 'S009', admissionNumber: '2005', name: 'Noah Johnson', classId: 'C02', stream: 'North', parentUsername: `noah2005@${MOCK_SCHOOLS[0].domain}`, gender: Gender.MALE, currentFeesBalance: 3000, nextTermFees: 45000, schoolId: SCHOOL_1_ID },
  { id: 'S010', admissionNumber: '2006', name: 'Emma Williams', classId: 'C02', stream: 'South', parentUsername: `emma2006@${MOCK_SCHOOLS[0].domain}`, gender: Gender.FEMALE, currentFeesBalance: 22000, nextTermFees: 45000, schoolId: SCHOOL_1_ID },
  { id: 'S011', admissionNumber: '2007', name: 'Oliver Brown', classId: 'C02', stream: 'South', parentUsername: `oliver2007@${MOCK_SCHOOLS[0].domain}`, gender: Gender.MALE, currentFeesBalance: 0, nextTermFees: 45000, schoolId: SCHOOL_1_ID },
  { id: 'S012', admissionNumber: '2008', name: 'Ava Garcia', classId: 'C02', stream: 'South', parentUsername: `ava2008@${MOCK_SCHOOLS[0].domain}`, gender: Gender.FEMALE, currentFeesBalance: 9800, nextTermFees: 45000, schoolId: SCHOOL_1_ID },
  { id: 'S013', admissionNumber: '3003', name: 'Elijah Miller', classId: 'C03', stream: 'East', parentUsername: `elijah3003@${MOCK_SCHOOLS[0].domain}`, gender: Gender.MALE, currentFeesBalance: 0, nextTermFees: 52000, schoolId: SCHOOL_1_ID },
  { id: 'S014', admissionNumber: '3004', name: 'Charlotte Davis', classId: 'C03', stream: 'East', parentUsername: `charlotte3004@${MOCK_SCHOOLS[0].domain}`, gender: Gender.FEMALE, currentFeesBalance: 45000, nextTermFees: 52000, schoolId: SCHOOL_1_ID },
  { id: 'S015', admissionNumber: '3005', name: 'James Rodriguez', classId: 'C03', stream: 'Central', parentUsername: `james3005@${MOCK_SCHOOLS[0].domain}`, gender: Gender.MALE, currentFeesBalance: 1000, nextTermFees: 52000, schoolId: SCHOOL_1_ID },
  { id: 'S016', admissionNumber: '3006', name: 'Sophia Martinez', classId: 'C03', stream: 'Central', parentUsername: `sophia3006@${MOCK_SCHOOLS[0].domain}`, gender: Gender.FEMALE, currentFeesBalance: 0, nextTermFees: 52000, schoolId: SCHOOL_1_ID },
  { id: 'S017', admissionNumber: '4003', name: 'William Hernandez', classId: 'C04', stream: 'West', parentUsername: `william4003@${MOCK_SCHOOLS[0].domain}`, gender: Gender.MALE, currentFeesBalance: 8200, nextTermFees: 60000, schoolId: SCHOOL_1_ID },
  { id: 'S018', admissionNumber: '4004', name: 'Amelia Lopez', classId: 'C04', stream: 'West', parentUsername: `amelia4004@${MOCK_SCHOOLS[0].domain}`, gender: Gender.FEMALE, currentFeesBalance: 0, nextTermFees: 60000, schoolId: SCHOOL_1_ID },
  { id: 'S019', admissionNumber: '4005', name: 'Henry Gonzalez', classId: 'C04', stream: 'West', parentUsername: `henry4005@${MOCK_SCHOOLS[0].domain}`, gender: Gender.MALE, currentFeesBalance: 17500, nextTermFees: 60000, schoolId: SCHOOL_1_ID },
  { id: 'S020', admissionNumber: '4006', name: 'Isabella Wilson', classId: 'C04', stream: 'West', parentUsername: `isabella4006@${MOCK_SCHOOLS[0].domain}`, gender: Gender.FEMALE, currentFeesBalance: 2000, nextTermFees: 60000, schoolId: SCHOOL_1_ID },
  { id: 'S021', admissionNumber: '2009', name: 'Lucas Anderson', classId: 'C02', stream: 'South', parentUsername: `lucas2009@${MOCK_SCHOOLS[0].domain}`, gender: Gender.MALE, currentFeesBalance: 0, nextTermFees: 45000, schoolId: SCHOOL_1_ID },
  { id: 'S022', admissionNumber: '2010', name: 'Mia Thomas', classId: 'C02', stream: 'South', parentUsername: `mia2010@${MOCK_SCHOOLS[0].domain}`, gender: Gender.FEMALE, currentFeesBalance: 19000, nextTermFees: 45000, schoolId: SCHOOL_1_ID },
  { id: 'S023', admissionNumber: '3007', name: 'Benjamin Taylor', classId: 'C03', stream: 'Central', parentUsername: `benjamin3007@${MOCK_SCHOOLS[0].domain}`, gender: Gender.MALE, currentFeesBalance: 0, nextTermFees: 52000, schoolId: SCHOOL_1_ID },
  { id: 'S024', admissionNumber: '3008', name: 'Evelyn Moore', classId: 'C03', stream: 'Central', parentUsername: `evelyn3008@${MOCK_SCHOOLS[0].domain}`, gender: Gender.FEMALE, currentFeesBalance: 0, nextTermFees: 52000, schoolId: SCHOOL_1_ID },
  { id: 'S025', admissionNumber: '4007', name: 'Theodore Jackson', classId: 'C04', stream: 'West', parentUsername: `theodore4007@${MOCK_SCHOOLS[0].domain}`, gender: Gender.MALE, currentFeesBalance: 5000, nextTermFees: 60000, schoolId: SCHOOL_1_ID },
  { id: 'S026', admissionNumber: '4008', name: 'Harper Martin', classId: 'C04', stream: 'West', parentUsername: `harper4008@${MOCK_SCHOOLS[0].domain}`, gender: Gender.FEMALE, currentFeesBalance: 0, nextTermFees: 60000, schoolId: SCHOOL_1_ID },
  { id: 'S027', admissionNumber: '2011', name: 'Leo White', classId: 'C02', stream: 'North', parentUsername: `leo2011@${MOCK_SCHOOLS[0].domain}`, gender: Gender.MALE, currentFeesBalance: 11000, nextTermFees: 45000, schoolId: SCHOOL_1_ID },
  { id: 'S028', admissionNumber: '2012', name: 'Chloe Harris', classId: 'C02', stream: 'North', parentUsername: `chloe2012@${MOCK_SCHOOLS[0].domain}`, gender: Gender.FEMALE, currentFeesBalance: 0, nextTermFees: 45000, schoolId: SCHOOL_1_ID },
  { id: 'S029', admissionNumber: '3009', name: 'Jack Thompson', classId: 'C03', stream: 'East', parentUsername: `jack3009@${MOCK_SCHOOLS[0].domain}`, gender: Gender.MALE, currentFeesBalance: 30000, nextTermFees: 52000, schoolId: SCHOOL_1_ID },
  { id: 'S030', admissionNumber: '3010', name: 'Penelope Allen', classId: 'C03', stream: 'East', parentUsername: `penelope3010@${MOCK_SCHOOLS[0].domain}`, gender: Gender.FEMALE, currentFeesBalance: 0, nextTermFees: 52000, schoolId: SCHOOL_1_ID },

  // School 2: Summit Academy (30 Students)
  { id: 'S101', admissionNumber: 'SA101', name: 'Peter Pan', classId: 'C02', stream: 'Alpha', parentUsername: `pan@${MOCK_SCHOOLS[1].domain}`, gender: Gender.MALE, currentFeesBalance: 1000, nextTermFees: 65000, schoolId: SCHOOL_2_ID },
  { id: 'S102', admissionNumber: 'SA102', name: 'Wendy Darling', classId: 'C02', stream: 'Alpha', parentUsername: `darling@${MOCK_SCHOOLS[1].domain}`, gender: Gender.FEMALE, currentFeesBalance: 0, nextTermFees: 65000, schoolId: SCHOOL_2_ID },
  { id: 'S103', admissionNumber: 'SA103', name: 'John Smith', classId: 'C02', stream: 'Alpha', parentUsername: `john.s@${MOCK_SCHOOLS[1].domain}`, gender: Gender.MALE, currentFeesBalance: 500, nextTermFees: 65000, schoolId: SCHOOL_2_ID },
  { id: 'S104', admissionNumber: 'SA104', name: 'Pocahontas', classId: 'C02', stream: 'Alpha', parentUsername: `pocahontas@${MOCK_SCHOOLS[1].domain}`, gender: Gender.FEMALE, currentFeesBalance: 12000, nextTermFees: 65000, schoolId: SCHOOL_2_ID },
  { id: 'S105', admissionNumber: 'SA105', name: 'Mulan Fa', classId: 'C03', stream: 'Bravo', parentUsername: `mulan@${MOCK_SCHOOLS[1].domain}`, gender: Gender.FEMALE, currentFeesBalance: 0, nextTermFees: 70000, schoolId: SCHOOL_2_ID },
  { id: 'S106', admissionNumber: 'SA106', name: 'Li Shang', classId: 'C03', stream: 'Bravo', parentUsername: `shang@${MOCK_SCHOOLS[1].domain}`, gender: Gender.MALE, currentFeesBalance: 3000, nextTermFees: 70000, schoolId: SCHOOL_2_ID },
  { id: 'S107', admissionNumber: 'SA107', name: 'Aladdin', classId: 'C04', stream: 'Charlie', parentUsername: `aladdin@${MOCK_SCHOOLS[1].domain}`, gender: Gender.MALE, currentFeesBalance: 0, nextTermFees: 75000, schoolId: SCHOOL_2_ID },
  { id: 'S108', admissionNumber: 'SA108', name: 'Jasmine', classId: 'C04', stream: 'Charlie', parentUsername: `jasmine@${MOCK_SCHOOLS[1].domain}`, gender: Gender.FEMALE, currentFeesBalance: 8000, nextTermFees: 75000, schoolId: SCHOOL_2_ID },
  { id: 'S109', admissionNumber: 'SA109', name: 'Hercules', classId: 'C04', stream: 'Charlie', parentUsername: `hercules@${MOCK_SCHOOLS[1].domain}`, gender: Gender.MALE, currentFeesBalance: 0, nextTermFees: 75000, schoolId: SCHOOL_2_ID },
  { id: 'S110', admissionNumber: 'SA110', name: 'Megara', classId: 'C04', stream: 'Charlie', parentUsername: `megara@${MOCK_SCHOOLS[1].domain}`, gender: Gender.FEMALE, currentFeesBalance: 2500, nextTermFees: 75000, schoolId: SCHOOL_2_ID },
  { id: 'S111', admissionNumber: 'SA111', name: 'Tarzan', classId: 'C02', stream: 'Delta', parentUsername: `tarzan@${MOCK_SCHOOLS[1].domain}`, gender: Gender.MALE, currentFeesBalance: 0, nextTermFees: 65000, schoolId: SCHOOL_2_ID },
  { id: 'S112', admissionNumber: 'SA112', name: 'Jane Porter', classId: 'C02', stream: 'Delta', parentUsername: `jane.p@${MOCK_SCHOOLS[1].domain}`, gender: Gender.FEMALE, currentFeesBalance: 1500, nextTermFees: 65000, schoolId: SCHOOL_2_ID },
  { id: 'S113', admissionNumber: 'SA113', name: 'Kuzco', classId: 'C03', stream: 'Bravo', parentUsername: `kuzco@${MOCK_SCHOOLS[1].domain}`, gender: Gender.MALE, currentFeesBalance: 0, nextTermFees: 70000, schoolId: SCHOOL_2_ID },
  { id: 'S114', admissionNumber: 'SA114', name: 'Pacha', classId: 'C03', stream: 'Bravo', parentUsername: `pacha@${MOCK_SCHOOLS[1].domain}`, gender: Gender.MALE, currentFeesBalance: 0, nextTermFees: 70000, schoolId: SCHOOL_2_ID },
  { id: 'S115', admissionNumber: 'SA115', name: 'Tiana', classId: 'C04', stream: 'Echo', parentUsername: `tiana@${MOCK_SCHOOLS[1].domain}`, gender: Gender.FEMALE, currentFeesBalance: 10000, nextTermFees: 75000, schoolId: SCHOOL_2_ID },
  { id: 'S116', admissionNumber: 'SA116', name: 'Naveen', classId: 'C04', stream: 'Echo', parentUsername: `naveen@${MOCK_SCHOOLS[1].domain}`, gender: Gender.MALE, currentFeesBalance: 0, nextTermFees: 75000, schoolId: SCHOOL_2_ID },
  { id: 'S117', admissionNumber: 'SA117', name: 'Rapunzel', classId: 'C02', stream: 'Delta', parentUsername: `rapunzel@${MOCK_SCHOOLS[1].domain}`, gender: Gender.FEMALE, currentFeesBalance: 5000, nextTermFees: 65000, schoolId: SCHOOL_2_ID },
  { id: 'S118', admissionNumber: 'SA118', name: 'Flynn Rider', classId: 'C02', stream: 'Delta', parentUsername: `flynn@${MOCK_SCHOOLS[1].domain}`, gender: Gender.MALE, currentFeesBalance: 0, nextTermFees: 65000, schoolId: SCHOOL_2_ID },
  { id: 'S119', admissionNumber: 'SA119', name: 'Merida', classId: 'C03', stream: 'Foxtrot', parentUsername: `merida@${MOCK_SCHOOLS[1].domain}`, gender: Gender.FEMALE, currentFeesBalance: 0, nextTermFees: 70000, schoolId: SCHOOL_2_ID },
  { id: 'S120', admissionNumber: 'SA120', name: 'Anna', classId: 'C03', stream: 'Foxtrot', parentUsername: `anna@${MOCK_SCHOOLS[1].domain}`, gender: Gender.FEMALE, currentFeesBalance: 7000, nextTermFees: 70000, schoolId: SCHOOL_2_ID },
  { id: 'S121', admissionNumber: 'SA121', name: 'Elsa', classId: 'C04', stream: 'Echo', parentUsername: `elsa@${MOCK_SCHOOLS[1].domain}`, gender: Gender.FEMALE, currentFeesBalance: 0, nextTermFees: 75000, schoolId: SCHOOL_2_ID },
  { id: 'S122', admissionNumber: 'SA122', name: 'Kristoff', classId: 'C04', stream: 'Echo', parentUsername: `kristoff@${MOCK_SCHOOLS[1].domain}`, gender: Gender.MALE, currentFeesBalance: 0, nextTermFees: 75000, schoolId: SCHOOL_2_ID },
  { id: 'S123', admissionNumber: 'SA123', name: 'Moana', classId: 'C02', stream: 'Alpha', parentUsername: `moana@${MOCK_SCHOOLS[1].domain}`, gender: Gender.FEMALE, currentFeesBalance: 11000, nextTermFees: 65000, schoolId: SCHOOL_2_ID },
  { id: 'S124', admissionNumber: 'SA124', name: 'Maui', classId: 'C02', stream: 'Alpha', parentUsername: `maui@${MOCK_SCHOOLS[1].domain}`, gender: Gender.MALE, currentFeesBalance: 0, nextTermFees: 65000, schoolId: SCHOOL_2_ID },
  { id: 'S125', admissionNumber: 'SA125', name: 'Simba', classId: 'C03', stream: 'Foxtrot', parentUsername: `simba@${MOCK_SCHOOLS[1].domain}`, gender: Gender.MALE, currentFeesBalance: 0, nextTermFees: 70000, schoolId: SCHOOL_2_ID },
  { id: 'S126', admissionNumber: 'SA126', name: 'Nala', classId: 'C03', stream: 'Foxtrot', parentUsername: `nala@${MOCK_SCHOOLS[1].domain}`, gender: Gender.FEMALE, currentFeesBalance: 0, nextTermFees: 70000, schoolId: SCHOOL_2_ID },
  { id: 'S127', admissionNumber: 'SA127', name: 'Ariel', classId: 'C04', stream: 'Charlie', parentUsername: `ariel@${MOCK_SCHOOLS[1].domain}`, gender: Gender.FEMALE, currentFeesBalance: 9500, nextTermFees: 75000, schoolId: SCHOOL_2_ID },
  { id: 'S128', admissionNumber: 'SA128', name: 'Eric', classId: 'C04', stream: 'Charlie', parentUsername: `eric@${MOCK_SCHOOLS[1].domain}`, gender: Gender.MALE, currentFeesBalance: 0, nextTermFees: 75000, schoolId: SCHOOL_2_ID },
  { id: 'S129', admissionNumber: 'SA129', name: 'Belle', classId: 'C02', stream: 'Delta', parentUsername: `belle@${MOCK_SCHOOLS[1].domain}`, gender: Gender.FEMALE, currentFeesBalance: 0, nextTermFees: 65000, schoolId: SCHOOL_2_ID },
  { id: 'S130', admissionNumber: 'SA130', name: 'Adam Beast', classId: 'C02', stream: 'Delta', parentUsername: `adam.b@${MOCK_SCHOOLS[1].domain}`, gender: Gender.MALE, currentFeesBalance: 0, nextTermFees: 65000, schoolId: SCHOOL_2_ID },
];

MOCK_STUDENTS.forEach(student => {
    const parentExists = MOCK_USERS.find(u => u.username.toLowerCase() === student.parentUsername.toLowerCase());
    if (!parentExists) {
        MOCK_USERS.push({
            id: `parent_${student.id}`, username: student.parentUsername, password: student.admissionNumber,
            roles: [UserRole.PARENT], name: `Parent of ${student.name.split(' ')[0]}`, studentId: student.id, schoolId: student.schoolId
        });
    }
});

export const MOCK_TERMS: Term[] = [
  // School 1 Terms
  { id: 'TERM01', name: 'Term 1', year: 2025, calculationMode: TermCalculationMode.WEIGHTED_AVERAGE, closingDate: '2025-04-11', openingDate: '2025-05-02', schoolId: SCHOOL_1_ID },
  { id: 'TERM02', name: 'Term 2', year: 2025, calculationMode: TermCalculationMode.WEIGHTED_AVERAGE, closingDate: '2025-08-08', openingDate: '2025-09-01', schoolId: SCHOOL_1_ID },
  // School 2 Terms
  { id: 'TERM11', name: 'Term 1', year: 2025, calculationMode: TermCalculationMode.SIMPLE_AVERAGE, closingDate: '2025-04-18', openingDate: '2025-05-05', schoolId: SCHOOL_2_ID },
];

export const MOCK_EXAM_SESSIONS: ExamSession[] = [
  // School 1 Sessions
  { id: 'ES001', termId: 'TERM01', name: 'Term 1 CAT', weight: 30, schoolId: SCHOOL_1_ID },
  { id: 'ES002', termId: 'TERM01', name: 'Term 1 EndTerm', weight: 70, schoolId: SCHOOL_1_ID },
  { id: 'ES003', termId: 'TERM02', name: 'Term 2 CAT', weight: 30, schoolId: SCHOOL_1_ID },
  { id: 'ES004', termId: 'TERM02', name: 'Term 2 EndTerm', weight: 70, schoolId: SCHOOL_1_ID },
  // School 2 Sessions
  { id: 'ES011', termId: 'TERM11', name: 'Mid-Term', weight: 0, schoolId: SCHOOL_2_ID },
  { id: 'ES012', termId: 'TERM11', name: 'Final Exam', weight: 0, schoolId: SCHOOL_2_ID },
];

const STATIC_MOCK_MARKS: Mark[] = [
  { studentId: 'S001', subjectId: 'MAT', examSessionId: 'ES001', score: 55, schoolId: SCHOOL_1_ID }, { studentId: 'S001', subjectId: 'MAT', examSessionId: 'ES002', score: 61, schoolId: SCHOOL_1_ID },
  { studentId: 'S001', subjectId: 'ENG', examSessionId: 'ES001', score: 60, schoolId: SCHOOL_1_ID }, { studentId: 'S001', subjectId: 'ENG', examSessionId: 'ES002', score: 62, schoolId: SCHOOL_1_ID },
  { studentId: 'S002', subjectId: 'MAT', examSessionId: 'ES001', score: 85, schoolId: SCHOOL_1_ID }, { studentId: 'S002', subjectId: 'MAT', examSessionId: 'ES002', score: 90, schoolId: SCHOOL_1_ID },
  { studentId: 'S101', subjectId: 'ENG', examSessionId: 'ES011', score: 78, schoolId: SCHOOL_2_ID }, { studentId: 'S101', subjectId: 'ENG', examSessionId: 'ES012', score: 82, schoolId: SCHOOL_2_ID },
  { studentId: 'S102', subjectId: 'ENG', examSessionId: 'ES011', score: 90, schoolId: SCHOOL_2_ID }, { studentId: 'S102', subjectId: 'ENG', examSessionId: 'ES012', score: 88, schoolId: SCHOOL_2_ID },
];

const GENERATED_MOCK_MARKS: Mark[] = (() => {
    const marks: Mark[] = [];
    const studentData = MOCK_STUDENTS.filter(s => !STATIC_MOCK_MARKS.some(m => m.studentId === s.id));

    const subjectProfiles = [
        { subjects: ['ENG', 'KIS', 'MAT', 'PHY', 'CHE', 'HIS', 'GEO', 'BUS'], performance: 'good' },
        { subjects: ['ENG', 'KIS', 'MAT', 'BIO', 'CHE', 'GEO', 'CRE', 'AGR'], performance: 'average' },
        { subjects: ['ENG', 'KIS', 'MAT', 'BIO', 'PHY', 'HIS', 'BUS', 'COMP'], performance: 'weak' },
    ];

    studentData.forEach((student, index) => {
        const profile = subjectProfiles[index % subjectProfiles.length];
        const minScore = profile.performance === 'good' ? 65 : (profile.performance === 'average' ? 45 : 25);
        const maxScore = profile.performance === 'good' ? 95 : (profile.performance === 'average' ? 75 : 55);
        const generateScore = () => Math.floor(Math.random() * (maxScore - minScore + 1)) + minScore;

        const schoolTerms = MOCK_TERMS.filter(t => t.schoolId === student.schoolId);
        
        schoolTerms.forEach(term => {
            const schoolSessions = MOCK_EXAM_SESSIONS.filter(es => es.termId === term.id);
            schoolSessions.forEach(session => {
                const schoolSubjects = (MOCK_SCHOOLS.find(s => s.id === student.schoolId)?.activeSubjectIds || []);
                const subjectsToMark = profile.subjects.filter(s => schoolSubjects.includes(s));
                
                subjectsToMark.forEach(subjectId => {
                    marks.push({ studentId: student.id, subjectId: subjectId, examSessionId: session.id, score: generateScore(), schoolId: student.schoolId });
                });
            });
        });
    });

    return marks;
})();

export const MOCK_MARKS: Mark[] = [...STATIC_MOCK_MARKS, ...GENERATED_MOCK_MARKS];

export const MOCK_ASSIGNMENTS: Assignment[] = [
    {
        id: 'AS001', title: 'Photosynthesis Lab Report', content: 'Submit your lab report.', teacherId: 'teacher1',
        classId: 'C02', subjectId: 'BIO', dueDate: '2025-03-15', createdAt: '2025-03-01', type: AssignmentType.ASSIGNMENT,
        schoolId: SCHOOL_1_ID, fileName: "lab_procedure.txt", fileType: "text/plain", fileUrl: "data:text/plain;base64,U3RlcCAxOiBHYXRoZXIgbWF0ZXJpYWxzLiBTdGVwIDI6IFNldCB1cCB0aGUgZXhwZXJpbWVudC4="
    },
    {
        id: 'AS002', title: 'French Verb Conjugation Practice', content: 'Complete the attached worksheet on verb conjugations.', teacherId: 'teacher2',
        classId: 'C02', subjectId: 'FRE', dueDate: '2025-03-20', createdAt: '2025-03-05', type: AssignmentType.ASSIGNMENT,
        schoolId: SCHOOL_2_ID
    },
];

export const DEFAULT_TERM_ID = MOCK_TERMS[0]?.id || '';
