

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { User, AppState, UserRole, Student, Subject, SchoolClass, Mark, Term, ExamSession, StudentFormData, TeacherFormData, UserProfileFormData, Assignment, School, SchoolStatus, AssignmentType, TermCalculationMode } from './types';
import { 
    MOCK_USERS, MOCK_STUDENTS, MOCK_SUBJECTS, MOCK_CLASSES, MOCK_MARKS, 
    MOCK_SCHOOL_NAME_DISPLAY, MOCK_TERMS, MOCK_SCHOOLS,
    MOCK_ASSIGNMENTS, MOCK_EXAM_SESSIONS, DEFAULT_ACTIVE_SUBJECT_IDS
} from './constants';
import { LoginForm } from './components/AuthForm';
import { AppLayout } from './components/Layout';
import { SuspendedPage } from './components/SuspendedPage';
import { SuperadminMonitorPage, NewSchoolFormData } from './components/admin/SuperadminMonitorPage';
import { KeyIcon, EyeIcon, EyeSlashIcon } from './components/common/IconComponents';

// Import page components
import { AdminExamConfigPage } from './components/admin/AdminExamConfigPage';
import { DashboardPage } from './components/DashboardPage';
import { TeacherMarksEntryPage } from './components/TeacherMarksEntryPage';
import { AdminStudentsPage } from './components/admin/AdminStudentsPage';
import { AdminTeachersPage } from './components/admin/AdminTeachersPage';
import { ProfilePage } from './components/ProfilePage';
import { MeritListPage } from './components/MeritListPage';
import { AdminSchoolSettingsPage } from './components/admin/SchoolSettingsPage';
import { AdminExamAnalysisPage } from './components/admin/ExamAnalysisPage';
import { AdminClassBroadsheetPage } from './components/admin/ClassBroadsheetPage';
import { AdminMarkSheetsPage } from './components/admin/MarkSheetsPage';
import { AIInsightsPage } from './components/admin/AIInsightsPage';
import { AdminClassListPage } from './components/admin/AdminClassListPage';
import { AdminNotificationsPage } from './components/admin/AdminNotificationsPage';
import { GenerateReportsPage } from './components/GenerateReportsPage';
import { LearningResourcesPage } from './components/LearningResourcesPage';
import { AIExamGeneratorPage } from './components/teacher/AIExamGeneratorPage';


const imageToBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

const loadStateFromStorage = (): AppState => {
    const loadItem = <T,>(key: string, fallback: T): T => {
        const item = localStorage.getItem(key);
        if (item) { try { return JSON.parse(item); } catch (e) { console.error(`Failed to parse ${key}`, e); } }
        return fallback;
    };

    let schools = loadItem('appSchools', MOCK_SCHOOLS);
    let users = loadItem('appUsers', MOCK_USERS);
    let students = loadItem('appStudents', MOCK_STUDENTS);

    // Hydrate parent users if they don't exist
    const userSet = new Set(users.map(u => u.username.toLowerCase()));
    students.forEach(student => {
        if (!userSet.has(student.parentUsername.toLowerCase())) {
            users.push({
                id: `parent_${student.id}_${Date.now()}`, username: student.parentUsername, password: student.admissionNumber,
                roles: [UserRole.PARENT], name: `Parent of ${student.name.split(' ')[0]}`, studentId: student.id, schoolId: student.schoolId
            });
            userSet.add(student.parentUsername.toLowerCase());
        }
    });

    return {
        currentUser: null,
        schools,
        users,
        students,
        subjects: MOCK_SUBJECTS,
        classes: MOCK_CLASSES,
        terms: loadItem('appTerms', MOCK_TERMS),
        examSessions: loadItem('appExamSessions', MOCK_EXAM_SESSIONS),
        marks: loadItem('appMarks', MOCK_MARKS),
        assignments: loadItem('appAssignments', MOCK_ASSIGNMENTS),
        isLoading: false,
        error: null,
        schoolNameDisplay: MOCK_SCHOOL_NAME_DISPLAY,
        currentSchoolId: null,
        currentTermId: localStorage.getItem('currentTermId') || null,
        selectedComparisonTermId: null,
    };
};

export function App(): React.ReactElement | null {
  const [appState, setAppState] = useState<AppState>(loadStateFromStorage);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (localStorage.getItem('theme') as 'light' | 'dark') || 'light');
  const navigate = useNavigate();
  const location = useLocation();

  const [isPasswordResetModalOpen, setIsPasswordResetModalOpen] = useState(false);
  const [teacherForPasswordReset, setTeacherForPasswordReset] = useState<User | null>(null);
  const [newPasswordForReset, setNewPasswordForReset] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  useEffect(() => {
    const persistedUserString = localStorage.getItem('currentUser');
    if (persistedUserString) {
      try {
        const user: User = JSON.parse(persistedUserString);
        const validUser = appState.users.find(u => u.id === user.id && u.username === user.username);
        if (validUser) {
          const school = validUser.schoolId ? appState.schools.find(s => s.id === validUser.schoolId) : null;
          if (validUser.username === 'superadmin' || (school && school.status !== SchoolStatus.SUSPENDED)) {
            setAppState(prev => ({ ...prev, currentUser: validUser, currentSchoolId: validUser.schoolId || null }));
          } else {
             localStorage.removeItem('currentUser'); // Log out suspended user
          }
        } else {
          localStorage.removeItem('currentUser');
        }
      } catch (e) {
        localStorage.removeItem('currentUser');
      }
    }
  }, []); // Run only on initial load

  const handleLogin = useCallback((username: string, passwordParam: string) => {
    setAppState(prev => ({ ...prev, isLoading: true, error: null }));
    setTimeout(() => {
        let userToLogin = appState.users.find(u => u.username.toLowerCase() === username.toLowerCase());

        if (userToLogin) {
            const school = userToLogin.schoolId ? appState.schools.find(s => s.id === userToLogin!.schoolId) : null;

            if (userToLogin.username !== 'superadmin' && school?.status === SchoolStatus.SUSPENDED) {
                 setAppState(prev => ({ ...prev, error: 'This school account has been suspended. Please contact support.', isLoading: false }));
                 return;
            }

            if (userToLogin.password === passwordParam) {
                const currentSchoolId = userToLogin.schoolId || null;
                const schoolTerms = appState.terms.filter(t => t.schoolId === currentSchoolId);
                const newTermId = schoolTerms.length > 0 ? schoolTerms[0].id : null;

                setAppState(prev => ({ ...prev, currentUser: userToLogin, currentSchoolId, currentTermId: newTermId, isLoading: false, error: null }));
                localStorage.setItem('currentUser', JSON.stringify(userToLogin));
                if (newTermId) localStorage.setItem('currentTermId', newTermId);
                
                navigate('/dashboard');
            } else {
                setAppState(prev => ({ ...prev, error: 'Invalid username or password.', isLoading: false }));
            }
        } else {
            setAppState(prev => ({ ...prev, error: 'Invalid username or password.', isLoading: false }));
        }
    }, 500);
}, [appState.users, appState.schools, appState.terms, navigate]);

  const handleLogout = useCallback(() => {
    setAppState(prev => ({ ...prev, currentUser: null, currentSchoolId: null, error: null }));
    localStorage.removeItem('currentUser');
    navigate('/login');
  }, [navigate]);
  
  const handleTermChange = useCallback((termId: string) => {
    setAppState(prev => ({ ...prev, currentTermId: termId, selectedComparisonTermId: null }));
    localStorage.setItem('currentTermId', termId);
  }, []);

    const handleComparisonTermChange = useCallback((termId: string | null) => {
      setAppState(prev => ({...prev, selectedComparisonTermId: termId}));
  }, []);

  const handleSchoolStatusUpdate = useCallback((schoolId: string, newStatus: SchoolStatus, newMessage: string) => {
      setAppState(prev => {
          const updatedSchools = prev.schools.map(s => s.id === schoolId ? {...s, status: newStatus, cautionMessage: newMessage} : s);
          localStorage.setItem('appSchools', JSON.stringify(updatedSchools));
          return { ...prev, schools: updatedSchools };
      });
      alert("School status updated successfully!");
  }, []);

  const handleSchoolAdd = useCallback((formData: NewSchoolFormData) => {
    setAppState(prev => {
        if (prev.schools.some(s => s.domain.toLowerCase() === formData.domain.toLowerCase())) {
            alert(`Error: A school with the domain "${formData.domain}" already exists.`);
            return prev;
        }

        const newSchoolId = `school_${Date.now()}`;
        const newSchool: School = {
            id: newSchoolId,
            name: formData.schoolName,
            address: formData.address,
            motto: formData.motto,
            domain: formData.domain,
            badgeUrl: null,
            status: SchoolStatus.ACTIVE,
            cautionMessage: 'Welcome! Your school portal is active.',
            activeSubjectIds: DEFAULT_ACTIVE_SUBJECT_IDS,
        };

        const newPrincipal: User = {
            id: `user_${Date.now()}`,
            username: `${formData.principalUsernameLocal}@${formData.domain}`,
            password: formData.principalPassword_param,
            roles: [UserRole.ADMIN],
            name: formData.principalName,
            schoolId: newSchoolId,
        };
        
        const newTermId = `term_${Date.now()}`;
        const newTerm: Term = {
            id: newTermId,
            name: 'Term 1',
            year: new Date().getFullYear(),
            calculationMode: TermCalculationMode.WEIGHTED_AVERAGE,
            schoolId: newSchoolId,
        };

        const newSessions: ExamSession[] = [
            { id: `session_${Date.now()}_cat`, termId: newTermId, name: 'Term 1 CAT', weight: 30, schoolId: newSchoolId },
            { id: `session_${Date.now()}_end`, termId: newTermId, name: 'Term 1 EndTerm', weight: 70, schoolId: newSchoolId },
        ];
        
        const updatedSchools = [...prev.schools, newSchool];
        const updatedUsers = [...prev.users, newPrincipal];
        const updatedTerms = [...prev.terms, newTerm];
        const updatedExamSessions = [...prev.examSessions, ...newSessions];

        localStorage.setItem('appSchools', JSON.stringify(updatedSchools));
        localStorage.setItem('appUsers', JSON.stringify(updatedUsers));
        localStorage.setItem('appTerms', JSON.stringify(updatedTerms));
        localStorage.setItem('appExamSessions', JSON.stringify(updatedExamSessions));
        
        alert(`School "${newSchool.name}" created successfully!`);

        return {
            ...prev,
            schools: updatedSchools,
            users: updatedUsers,
            terms: updatedTerms,
            examSessions: updatedExamSessions,
        };
    });
}, []);
  
    const handleUpdateActiveSubjects = useCallback((schoolId: string, newActiveIds: string[]) => {
      setAppState(prev => {
          const updatedSchools = prev.schools.map(s => s.id === schoolId ? { ...s, activeSubjectIds: newActiveIds } : s);
          localStorage.setItem('appSchools', JSON.stringify(updatedSchools));
          alert("Subject configuration updated successfully!");
          return { ...prev, schools: updatedSchools };
      });
  }, []);

  const handleUpdateSchoolDetails = useCallback((schoolId: string, details: { name: string; domain: string; address: string; motto: string; badgeUrl: string | null; }) => {
      setAppState(prev => {
          const oldSchool = prev.schools.find(s => s.id === schoolId);
          if (!oldSchool) return prev;

          const oldDomain = oldSchool.domain;
          const newDomain = details.domain.trim();

          let updatedUsers = prev.users;
          let updatedStudents = prev.students;
          let updatedCurrentUser = prev.currentUser;

          if (oldDomain !== newDomain) {
              updatedUsers = prev.users.map(user => {
                  if (user.schoolId === schoolId && user.username !== 'superadmin' && user.username.endsWith(`@${oldDomain}`)) {
                      const localPart = user.username.split('@')[0];
                      return { ...user, username: `${localPart}@${newDomain}` };
                  }
                  return user;
              });
              
              updatedStudents = prev.students.map(student => {
                  if (student.schoolId === schoolId && student.parentUsername.endsWith(`@${oldDomain}`)) {
                      const localPart = student.parentUsername.split('@')[0];
                      return { ...student, parentUsername: `${localPart}@${newDomain}` };
                  }
                  return student;
              });

              if (updatedCurrentUser && updatedCurrentUser.schoolId === schoolId && updatedCurrentUser.username !== 'superadmin' && updatedCurrentUser.username.endsWith(`@${oldDomain}`)) {
                  const localPart = updatedCurrentUser.username.split('@')[0];
                  updatedCurrentUser = { ...updatedCurrentUser, username: `${localPart}@${newDomain}` };
                  localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));
              }

              localStorage.setItem('appUsers', JSON.stringify(updatedUsers));
              localStorage.setItem('appStudents', JSON.stringify(updatedStudents));
          }

          const updatedSchools = prev.schools.map(s => s.id === schoolId ? { ...s, ...details } : s);
          localStorage.setItem('appSchools', JSON.stringify(updatedSchools));
          alert("School details updated successfully!");

          return { ...prev, schools: updatedSchools, users: updatedUsers, students: updatedStudents, currentUser: updatedCurrentUser };
      });
  }, []);

    const handleConfigSave = useCallback((updatedTerms: Term[], updatedSessions: ExamSession[]) => {
        setAppState(prev => {
            const schoolId = prev.currentSchoolId;
            const otherTerms = prev.terms.filter(t => t.schoolId !== schoolId);
            const otherSessions = prev.examSessions.filter(s => s.schoolId !== schoolId);
            const newTerms = [...otherTerms, ...updatedTerms];
            const newSessions = [...otherSessions, ...updatedSessions];
            localStorage.setItem('appTerms', JSON.stringify(newTerms));
            localStorage.setItem('appExamSessions', JSON.stringify(newSessions));
            return {...prev, terms: newTerms, examSessions: newSessions};
        });
        alert("Configuration saved successfully!");
    }, []);

    const handleMarksSubmit = useCallback((updatedMarks: Mark[], examSessionId: string) => {
        setAppState(prev => {
            const existingMarksForSession = prev.marks.filter(m => m.examSessionId === examSessionId);
            const otherMarks = prev.marks.filter(m => m.examSessionId !== examSessionId);
            const marksToUpdate = new Map(existingMarksForSession.map(m => [`${m.studentId}-${m.subjectId}`, m]));
            updatedMarks.forEach(um => marksToUpdate.set(`${um.studentId}-${um.subjectId}`, um));
            const newMarks = [...otherMarks, ...Array.from(marksToUpdate.values())];
            localStorage.setItem('appMarks', JSON.stringify(newMarks));
            return { ...prev, marks: newMarks };
        });
         alert('Marks submitted successfully!');
    }, []);

    const handleStudentSave = async (studentData: StudentFormData) => {
        if (!appState.currentSchoolId) return;
        setAppState(prev => ({ ...prev, isLoading: true }));
        
        let profileImageUrl: string | undefined = studentData.id ? appState.students.find(s=>s.id === studentData.id)?.profileImageUrl : undefined;

        if (studentData.profileImageFile) {
            try {
                const base64 = await imageToBase64(studentData.profileImageFile);
                profileImageUrl = base64 as string;
            } catch (error) {
                console.error("Error converting image to base64:", error);
                alert("Failed to process image. Please try another image.");
                setAppState(prev => ({ ...prev, isLoading: false }));
                return;
            }
        } else if (studentData.profileImageFile === null) {
            profileImageUrl = undefined;
        }

        const finalStudentData = { ...studentData, profileImageUrl, schoolId: appState.currentSchoolId };
        delete (finalStudentData as any).profileImageFile;

        setAppState(prev => {
            let updatedStudents = [...prev.students];
            let updatedUsers = [...prev.users];
            const isEditing = !!finalStudentData.id;

            if (isEditing) {
                updatedStudents = updatedStudents.map(s => s.id === finalStudentData.id ? { ...s, ...finalStudentData } as Student : s);
            } else {
                const newStudentId = `S_${Date.now()}`;
                updatedStudents.push({ ...finalStudentData, id: newStudentId } as Student);
            }

            const studentBeingSaved = isEditing ? updatedStudents.find(s=>s.id === finalStudentData.id)! : updatedStudents[updatedStudents.length-1];
            const parentUsername = studentBeingSaved.parentUsername.toLowerCase();
            let parentUser = updatedUsers.find(u => u.username.toLowerCase() === parentUsername && u.roles.includes(UserRole.PARENT));
            if (!parentUser) {
                parentUser = {
                    id: `parent_${studentBeingSaved.id}_${Date.now()}`,
                    username: studentBeingSaved.parentUsername,
                    password: studentBeingSaved.admissionNumber, 
                    roles: [UserRole.PARENT],
                    name: `Parent of ${studentBeingSaved.name.split(' ')[0]}`,
                    studentId: studentBeingSaved.id,
                    schoolId: appState.currentSchoolId!,
                };
                updatedUsers.push(parentUser as User);
            }

            localStorage.setItem('appStudents', JSON.stringify(updatedStudents));
            localStorage.setItem('appUsers', JSON.stringify(updatedUsers));
            alert(`Student ${isEditing ? 'updated' : 'added'} successfully!`);
            return { ...prev, students: updatedStudents, users: updatedUsers, isLoading: false };
        });
    };

    const handleStudentDelete = (studentId: string) => {
        if (!window.confirm("Are you sure you want to delete this student? This will also remove their marks and potentially their parent's account if they have no other children registered.")) return;

        setAppState(prev => ({ ...prev, isLoading: true }));
        const studentToDelete = appState.students.find(s => s.id === studentId);
        if (!studentToDelete) {
            setAppState(prev => ({ ...prev, isLoading: false }));
            alert("Student not found.");
            return;
        }

        setAppState(prev => {
            const updatedStudents = prev.students.filter(s => s.id !== studentId);
            const updatedMarks = prev.marks.filter(m => m.studentId !== studentId);
            
            let updatedUsers = [...prev.users];
            const parentUser = updatedUsers.find(u => u.username.toLowerCase() === studentToDelete.parentUsername.toLowerCase() && u.roles.includes(UserRole.PARENT));
            if (parentUser) {
                const otherChildrenOfThisParent = updatedStudents.some(s => s.parentUsername.toLowerCase() === parentUser!.username.toLowerCase());
                if (!otherChildrenOfThisParent) { 
                    updatedUsers = updatedUsers.filter(u => u.id !== parentUser.id); 
                }
            }

            localStorage.setItem('appStudents', JSON.stringify(updatedStudents));
            localStorage.setItem('appMarks', JSON.stringify(updatedMarks));
            localStorage.setItem('appUsers', JSON.stringify(updatedUsers));
            alert("Student deleted successfully.");
            return { ...prev, students: updatedStudents, marks: updatedMarks, users: updatedUsers, isLoading: false };
        });
    };

    const handleTeacherSave = async (teacherData: TeacherFormData & {profileImageFile?: File | null; classSubjectAssignments?: { classId: string; subjectIds: string[] }[], signatureImageFile?: File | null}) => {
        if (!appState.currentSchoolId) return;
        setAppState(prev => ({ ...prev, isLoading: true }));

        let profileImageUrl: string | undefined = teacherData.id ? appState.users.find(u => u.id === teacherData.id)?.profileImageUrl : undefined;
        let signatureImageUrl: string | undefined = teacherData.id ? appState.users.find(u => u.id === teacherData.id)?.signatureImageUrl : undefined;

        if (teacherData.profileImageFile) profileImageUrl = await imageToBase64(teacherData.profileImageFile) as string;
        else if (teacherData.profileImageFile === null) profileImageUrl = undefined;

        if (teacherData.signatureImageFile) signatureImageUrl = await imageToBase64(teacherData.signatureImageFile) as string;
        else if (teacherData.signatureImageFile === null) signatureImageUrl = undefined;
        
        setAppState(prev => {
            let updatedUsers = [...prev.users];
            if (teacherData.id) { // Editing
                 updatedUsers = updatedUsers.map(u => u.id === teacherData.id ? {
                    ...u, ...teacherData, profileImageUrl, signatureImageUrl,
                    password: teacherData.password_param || u.password
                 } : u);
            } else { // Adding
                updatedUsers.push({
                    ...teacherData,
                    id: `user_${Date.now()}`,
                    password: teacherData.password_param || 'changeme',
                    profileImageUrl, signatureImageUrl,
                    schoolId: prev.currentSchoolId!,
                    roles: teacherData.roles || [UserRole.TEACHER], // Ensure roles is set
                } as User);
            }
            localStorage.setItem('appUsers', JSON.stringify(updatedUsers));
            alert(`User ${teacherData.id ? 'updated' : 'added'} successfully!`);
            return { ...prev, users: updatedUsers, isLoading: false };
        });
    };

    const handleTeacherDelete = (teacherId: string) => {
        if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
        const userToDelete = appState.users.find(u => u.id === teacherId);
        if (userToDelete?.username === 'superadmin') {
            alert("Cannot delete the superadmin account.");
            return;
        }
        setAppState(prev => {
            const updatedUsers = prev.users.filter(u => u.id !== teacherId);
            localStorage.setItem('appUsers', JSON.stringify(updatedUsers));
            return { ...prev, users: updatedUsers };
        });
        alert("User deleted successfully.");
    };

    const handleCurrentUserProfileUpdate = async (formData: UserProfileFormData) => {
        if (!appState.currentUser) return;
        
        let profileImageUrl = appState.currentUser.profileImageUrl;
        if (formData.profileImageFile) profileImageUrl = await imageToBase64(formData.profileImageFile) as string;
        else if (formData.profileImageFile === null) profileImageUrl = undefined;

        let signatureImageUrl = appState.currentUser.signatureImageUrl;
        if (formData.signatureImageFile) signatureImageUrl = await imageToBase64(formData.signatureImageFile) as string;
        else if (formData.signatureImageFile === null) signatureImageUrl = undefined;

        const updatedUser = {
            ...appState.currentUser,
            name: formData.name || appState.currentUser.name,
            password: formData.password || appState.currentUser.password,
            profileImageUrl,
            signatureImageUrl,
        };

        setAppState(prev => {
            const updatedUsers = prev.users.map(u => u.id === updatedUser.id ? updatedUser : u);
            localStorage.setItem('appUsers', JSON.stringify(updatedUsers));
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            return { ...prev, users: updatedUsers, currentUser: updatedUser };
        });
        alert("Profile updated successfully!");
    };
    
    type ResourceFormData = Partial<Omit<Assignment, 'teacherId' | 'createdAt' | 'schoolId'>> & { file?: File | null };
    
    const handleAssignmentSave = (data: ResourceFormData) => {
        if (!appState.currentUser || !appState.currentSchoolId) return;
    
        const finalData = { ...data };
    
        setAppState(prev => {
            let updatedAssignments = [...prev.assignments];
            const isEditing = !!finalData.id;
    
            if (isEditing) {
                updatedAssignments = updatedAssignments.map(a => 
                    a.id === finalData.id 
                    ? { ...a, ...finalData, dueDate: finalData.type === AssignmentType.ASSIGNMENT ? finalData.dueDate : undefined } as Assignment 
                    : a
                );
            } else {
                const newAssignment: Assignment = {
                    ...finalData,
                    id: `AS_${Date.now()}`,
                    createdAt: new Date().toISOString(),
                    teacherId: prev.currentUser!.id,
                    schoolId: prev.currentSchoolId!,
                    type: finalData.type || AssignmentType.MATERIAL,
                    content: finalData.content || '',
                    title: finalData.title || 'Untitled',
                    classId: finalData.classId || '',
                    subjectId: finalData.subjectId || '',
                    dueDate: finalData.type === AssignmentType.ASSIGNMENT ? finalData.dueDate : undefined,
                } as Assignment;
                updatedAssignments.push(newAssignment);
            }
            
            localStorage.setItem('appAssignments', JSON.stringify(updatedAssignments));
            alert(`Resource ${isEditing ? 'updated' : 'added'} successfully!`);
            return { ...prev, assignments: updatedAssignments };
        });
    };
    
    const handleAssignmentDelete = (id: string) => {
        if (!window.confirm("Are you sure you want to delete this resource? This action cannot be undone.")) return;
        setAppState(prev => {
            const updatedAssignments = prev.assignments.filter(a => a.id !== id);
            localStorage.setItem('appAssignments', JSON.stringify(updatedAssignments));
            alert("Resource deleted successfully.");
            return { ...prev, assignments: updatedAssignments };
        });
    };

    const openTeacherPasswordResetModal = (teacher: User) => {
        setTeacherForPasswordReset(teacher);
        setIsPasswordResetModalOpen(true);
        setNewPasswordForReset('');
    };

    const handleTeacherPasswordReset = () => {
        if (!teacherForPasswordReset || !newPasswordForReset) {
            alert("Please enter a new password.");
            return;
        }
        if (newPasswordForReset.length < 6) {
            alert("New password must be at least 6 characters long.");
            return;
        }

        setAppState(prev => {
            const updatedUsers = prev.users.map(u =>
                u.id === teacherForPasswordReset.id ? { ...u, password: newPasswordForReset } : u
            );
            localStorage.setItem('appUsers', JSON.stringify(updatedUsers));
            return { ...prev, users: updatedUsers };
        });
        alert(`Password for ${teacherForPasswordReset.name} has been reset successfully.`);
        setIsPasswordResetModalOpen(false);
        setTeacherForPasswordReset(null);
    };

    const currentSchool = useMemo(() => appState.schools.find(s => s.id === appState.currentSchoolId), [appState.schools, appState.currentSchoolId]);
    
    const activeSubjects = useMemo(() =>
        appState.subjects.filter(s => currentSchool?.activeSubjectIds.includes(s.id)),
        [appState.subjects, currentSchool]
    );

    const availableTerms = useMemo(() => appState.terms.filter(t => t.schoolId === appState.currentSchoolId), [appState.terms, appState.currentSchoolId]);

    const ProtectedRoute: React.FC<{ children: React.ReactNode; roles?: UserRole[] }> = ({ children, roles }) => {
        const { currentUser } = appState;
        if (!currentUser) return <Navigate to="/login" state={{ from: location }} replace />;
        if (roles && roles.length > 0 && !roles.some(role => currentUser.roles.includes(role))) {
            return <Navigate to="/dashboard" replace />;
        }
        if (currentUser.schoolId && currentUser.username !== 'superadmin') {
            const school = appState.schools.find(s => s.id === currentUser.schoolId);
            if (school?.status === SchoolStatus.SUSPENDED) {
                return <Navigate to="/suspended" replace />;
            }
        }
        return <>{children}</>;
    };

    const LoginPage: React.FC = () => {
        if (appState.currentUser) return <Navigate to="/dashboard" replace />;
        return <LoginForm onLogin={handleLogin} isLoading={appState.isLoading} error={appState.error} />
    };

    return (
        <AppLayout 
          currentUser={appState.currentUser} 
          onLogout={handleLogout}
          availableTerms={availableTerms}
          currentTermId={appState.currentTermId}
          onTermChange={handleTermChange}
          currentSchool={currentSchool}
          theme={theme}
          onToggleTheme={toggleTheme}
        >
            {isPasswordResetModalOpen && teacherForPasswordReset && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl w-full max-w-sm">
                        <div className="flex justify-between items-center">
                           <h3 className="text-lg font-semibold dark:text-slate-100">Reset Password</h3>
                           <button onClick={() => setIsPasswordResetModalOpen(false)} className="text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200">&times;</button>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-slate-300 mt-2">Resetting password for <strong className="font-semibold">{teacherForPasswordReset.name}</strong>.</p>
                        <div className="relative mt-4">
                           <KeyIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
                            <input 
                                type={showNewPassword ? 'text' : 'password'} 
                                value={newPasswordForReset} 
                                onChange={e => setNewPasswordForReset(e.target.value)} 
                                className="pl-10 pr-10 mt-1 block w-full p-2 border rounded-md dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200" 
                                placeholder="Enter new password"
                            />
                             <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                                {showNewPassword ? <EyeSlashIcon className="h-5 w-5"/> : <EyeIcon className="h-5 w-5"/>}
                            </button>
                        </div>
                        <div className="mt-4 flex justify-end space-x-2">
                            <button onClick={() => setIsPasswordResetModalOpen(false)} className="px-4 py-2 border rounded-md dark:border-slate-600 dark:text-slate-200">Cancel</button>
                            <button onClick={handleTeacherPasswordReset} className="px-4 py-2 bg-primary-600 text-white rounded-md">Reset</button>
                        </div>
                    </div>
                </div>
            )}
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/suspended" element={<SuspendedPage />} />
                <Route path="/" element={<Navigate to="/dashboard" />} />
                
                <Route path="/dashboard" element={<ProtectedRoute><DashboardPage {...appState} activeSubjects={activeSubjects} currentSchool={currentSchool} /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><ProfilePage currentUser={appState.currentUser} onProfileUpdate={handleCurrentUserProfileUpdate} /></ProtectedRoute>} />
                
                {/* Superadmin Route */}
                <Route path="/superadmin/monitor" element={<ProtectedRoute roles={[UserRole.ADMIN]}><SuperadminMonitorPage schools={appState.schools} onStatusUpdate={handleSchoolStatusUpdate} onAddSchool={handleSchoolAdd} /></ProtectedRoute>} />

                {/* Teacher & Admin Routes */}
                <Route path="/teacher/marks-entry" element={<ProtectedRoute roles={[UserRole.ADMIN, UserRole.TEACHER]}><TeacherMarksEntryPage {...appState} activeSubjects={activeSubjects} onMarksSubmit={handleMarksSubmit} /></ProtectedRoute>} />
                <Route path="/analysis/merit-list" element={<ProtectedRoute roles={[UserRole.ADMIN, UserRole.TEACHER]}><MeritListPage {...appState} activeSubjects={activeSubjects} onComparisonTermChange={handleComparisonTermChange} currentSchool={currentSchool} actualSchoolName={currentSchool?.name || ''} /></ProtectedRoute>} />
                <Route path="/analysis/class-broadsheet" element={<ProtectedRoute roles={[UserRole.ADMIN, UserRole.TEACHER]}><AdminClassBroadsheetPage {...appState} activeSubjects={activeSubjects} actualSchoolName={currentSchool?.name || ''} schoolBadgeUrl={currentSchool?.badgeUrl} schoolMotto={currentSchool?.motto} /></ProtectedRoute>} />
                <Route path="/analysis/exam-analysis" element={<ProtectedRoute roles={[UserRole.ADMIN, UserRole.TEACHER]}><AdminExamAnalysisPage {...appState} activeSubjects={activeSubjects} actualSchoolName={currentSchool?.name || ''} schoolBadgeUrl={currentSchool?.badgeUrl} schoolMotto={currentSchool?.motto} /></ProtectedRoute>} />
                <Route path="/teacher/ai-exam-generator" element={<ProtectedRoute roles={[UserRole.ADMIN, UserRole.TEACHER]}><AIExamGeneratorPage classes={appState.classes} activeSubjects={activeSubjects} actualSchoolName={currentSchool?.name || ''} /></ProtectedRoute>} />
                
                {/* Learning Resources Route - accessible to Teachers, Admins, and Parents */}
                <Route path="/learning-resources" element={<ProtectedRoute roles={[UserRole.ADMIN, UserRole.TEACHER, UserRole.PARENT]}><LearningResourcesPage {...appState} activeSubjects={activeSubjects} onSave={handleAssignmentSave} onDelete={handleAssignmentDelete} /></ProtectedRoute>} />

                {/* Admin-Only Routes */}
                <Route path="/reports/generate" element={<ProtectedRoute roles={[UserRole.ADMIN]}><GenerateReportsPage {...appState} activeSubjects={activeSubjects} actualSchoolName={currentSchool?.name || ''} schoolAddress={currentSchool?.address || ''} schoolBadgeUrl={currentSchool?.badgeUrl} schoolMotto={currentSchool?.motto} /></ProtectedRoute>} />
                <Route path="/admin/students" element={<ProtectedRoute roles={[UserRole.ADMIN]}><AdminStudentsPage students={appState.students} classes={appState.classes} schoolNameDomain={currentSchool?.domain || ''} onStudentSave={handleStudentSave} onStudentDelete={handleStudentDelete} activeSubjects={activeSubjects} /></ProtectedRoute>} />
                <Route path="/admin/class-lists" element={<ProtectedRoute roles={[UserRole.ADMIN]}><AdminClassListPage classes={appState.classes} students={appState.students} actualSchoolName={currentSchool?.name || ''} /></ProtectedRoute>} />
                <Route path="/admin/teachers" element={<ProtectedRoute roles={[UserRole.ADMIN]}><AdminTeachersPage users={appState.users} schoolNameDomain={currentSchool?.domain || ''} onTeacherSave={handleTeacherSave} onTeacherDelete={handleTeacherDelete} onPasswordReset={openTeacherPasswordResetModal} classes={appState.classes} activeSubjects={activeSubjects} /></ProtectedRoute>} />
                <Route path="/admin/ai-insights" element={<ProtectedRoute roles={[UserRole.ADMIN]}><AIInsightsPage {...appState} activeSubjects={activeSubjects} /></ProtectedRoute>} />
                <Route path="/admin/mark-sheets" element={<ProtectedRoute roles={[UserRole.ADMIN]}><AdminMarkSheetsPage {...appState} activeSubjects={activeSubjects} actualSchoolName={currentSchool?.name || ''} schoolBadgeUrl={currentSchool?.badgeUrl} schoolMotto={currentSchool?.motto} /></ProtectedRoute>} />
                <Route path="/admin/notifications" element={<ProtectedRoute roles={[UserRole.ADMIN]}><AdminNotificationsPage {...appState} activeSubjects={activeSubjects} actualSchoolName={currentSchool?.name || ''} /></ProtectedRoute>} />
                <Route path="/admin/exam-config" element={<ProtectedRoute roles={[UserRole.ADMIN]}><AdminExamConfigPage initialTerms={availableTerms} initialExamSessions={appState.examSessions.filter(s => s.schoolId === appState.currentSchoolId)} onConfigSave={handleConfigSave} currentSchoolId={appState.currentSchoolId!} /></ProtectedRoute>} />
                <Route path="/admin/school-settings" element={<ProtectedRoute roles={[UserRole.ADMIN]}><AdminSchoolSettingsPage currentSchool={currentSchool} onUpdateSchoolDetails={handleUpdateSchoolDetails} allSubjects={appState.subjects} onUpdateActiveSubjects={handleUpdateActiveSubjects} /></ProtectedRoute>} />

                <Route path="*" element={<Navigate to="/dashboard" />} />
            </Routes>
        </AppLayout>
    );
}