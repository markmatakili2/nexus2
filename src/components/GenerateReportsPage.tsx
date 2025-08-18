import React, { useState, useMemo, useEffect } from 'react';
import { PageWrapper } from './Layout';
import { ReportDisplay } from './ReportDisplay';
import { PrintIcon, UserCircleIcon } from './common/IconComponents';
import { User, Student, Term, SchoolClass, Mark, ExamSession, Subject, StudentReport, StudentPerformanceDatapoint, UserRole } from '../types';
import { generateStudentReport, getStudentPerformanceHistory } from '../utils/examLogic';

interface GenerateReportsPageProps {
    currentUser: User | null;
    users: User[];
    students: Student[];
    currentTermId: string | null;
    terms: Term[];
    classes: SchoolClass[];
    activeSubjects: Subject[];
    marks: Mark[];
    examSessions: ExamSession[];
    actualSchoolName: string;
    schoolAddress: string;
    subjects: Subject[];
    schoolBadgeUrl?: string | null;
    schoolMotto?: string;
}

type ReportData = {
    report: StudentReport;
    performanceHistory: StudentPerformanceDatapoint[];
} | null;


export const GenerateReportsPage: React.FC<GenerateReportsPageProps> = (props) => {
    const { students, terms, currentTermId, classes, schoolBadgeUrl, currentUser, schoolMotto } = props;
    
    const activeTerm = useMemo(() => terms.find(t => t.id === currentTermId), [terms, currentTermId]);

    const [selectedClassId, setSelectedClassId] = useState<string>(classes[0]?.id || '');
    const [selectedStream, setSelectedStream] = useState<string>('all');
    const [previewStudentId, setPreviewStudentId] = useState<string | null>(null);

    const classStreams = useMemo(() => selectedClassId 
        ? ['all', ...Array.from(new Set(students.filter(s => s.classId === selectedClassId).map(s => s.stream).filter(Boolean)))]
        : ['all'], [students, selectedClassId]);

    const filteredStudents = useMemo(() => students.filter(s => 
        s.classId === selectedClassId && (selectedStream === 'all' || s.stream === selectedStream)
    ).sort((a,b) => a.admissionNumber.localeCompare(b.admissionNumber, undefined, { numeric: true })), [students, selectedClassId, selectedStream]);
    
    useEffect(() => {
        setSelectedStream('all');
        setPreviewStudentId(null); 
    }, [selectedClassId]);

    useEffect(() => {
        setPreviewStudentId(null);
    }, [selectedStream])


    const allReportsData = useMemo((): (ReportData | null)[] => {
        if (!activeTerm) return [];
        return filteredStudents.map(student => {
            const report = generateStudentReport(student, activeTerm, props.classes, props.activeSubjects, props.marks, props.examSessions, props.students, props.users, props.subjects);
            if (!report) return null;
            const performanceHistory = getStudentPerformanceHistory(student.id, props.students, props.terms, props.classes, props.activeSubjects, props.marks, props.examSessions, props.users, props.subjects);
            return { report, performanceHistory };
        });
    }, [filteredStudents, activeTerm, props]);

    const previewReportData: ReportData = useMemo(() => {
        if (!previewStudentId) return null;
        return allReportsData.find(data => data?.report.student.id === previewStudentId) || null;
    }, [previewStudentId, allReportsData]);

    const handlePrint = () => window.print();

    return (
        <PageWrapper title="Generate Report Cards" isPrintable={true} titleControls={
            <button
                onClick={handlePrint}
                disabled={filteredStudents.length === 0}
                className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-md inline-flex items-center disabled:opacity-50"
            >
                <PrintIcon className="w-5 h-5 mr-2" />
                Print All Reports for this Class
            </button>
        }>
            {/* Controls for screen view */}
            <div className="mb-6 flex flex-wrap items-end gap-4 no-print">
                <div>
                    <label htmlFor="classSelectReports" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Select Class</label>
                    <select
                        id="classSelectReports"
                        value={selectedClassId}
                        onChange={e => setSelectedClassId(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md shadow-sm dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"
                    >
                        <option value="">-- Select Class --</option>
                        {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>
                <div>
                    <label htmlFor="streamSelectReports" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Select Stream</label>
                    <select
                        id="streamSelectReports"
                        value={selectedStream}
                        onChange={e => setSelectedStream(e.target.value)}
                        disabled={!selectedClassId || classStreams.length <= 1}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md shadow-sm disabled:bg-gray-100 dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 dark:disabled:bg-slate-700/50"
                    >
                        {classStreams.map(s => <option key={s} value={s}>{s === 'all' ? 'All Streams' : s}</option>)}
                    </select>
                </div>
            </div>

            {!activeTerm && <p className="text-center text-gray-500 dark:text-slate-400 py-8">Please select a term from the header to generate reports.</p>}
            
            {activeTerm && !selectedClassId && <p className="text-center text-gray-500 dark:text-slate-400 py-8">Please select a class.</p>}

            {activeTerm && selectedClassId && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Student List - Screen Only */}
                    <div className="lg:col-span-1 no-print">
                         <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-200 mb-2">Students ({filteredStudents.length})</h3>
                        <div className="max-h-[60vh] overflow-y-auto border dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800">
                             {filteredStudents.length > 0 ? (
                                <ul className="divide-y divide-gray-200 dark:divide-slate-700">
                                    {filteredStudents.map(student => (
                                        <li key={student.id}>
                                            <button 
                                                onClick={() => setPreviewStudentId(student.id)}
                                                className={`w-full text-left p-3 flex items-center gap-3 transition-colors ${previewStudentId === student.id ? 'bg-primary-100 dark:bg-primary-900/40' : 'hover:bg-gray-50 dark:hover:bg-slate-700/50'}`}
                                            >
                                                {student.profileImageUrl ? (
                                                    <img src={student.profileImageUrl} alt={student.name} className="w-9 h-9 rounded-full object-cover flex-shrink-0"/>
                                                ) : (
                                                    <UserCircleIcon className="w-9 h-9 text-gray-400 dark:text-slate-500 flex-shrink-0"/>
                                                )}
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900 dark:text-slate-200">{student.name}</p>
                                                    <p className="text-xs text-gray-500 dark:text-slate-400">Adm: {student.admissionNumber}</p>
                                                </div>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                 <p className="text-center text-sm text-gray-500 dark:text-slate-400 p-6">No students in this section.</p>
                            )}
                        </div>
                    </div>
                    
                    {/* Report Preview - Screen Only */}
                    <div className="lg:col-span-2 screen-only">
                        {previewStudentId && previewReportData ? (
                            <ReportDisplay 
                                report={previewReportData.report} 
                                performanceHistory={previewReportData.performanceHistory} 
                                actualSchoolName={props.actualSchoolName}
                                schoolAddress={props.schoolAddress}
                                userRoles={currentUser?.roles}
                                schoolBadgeUrl={schoolBadgeUrl}
                                schoolMotto={schoolMotto}
                            />
                        ) : (
                             <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-slate-800/50 rounded-lg border-2 border-dashed dark:border-slate-700">
                                <p className="text-gray-500 dark:text-slate-400">Select a student from the list to preview their report.</p>
                             </div>
                        )}
                    </div>
                </div>
            )}

            {/* Hidden container for printing all reports */}
            <div className="print-only">
                {allReportsData.map(data => 
                    data ? (
                        <div key={data.report.student.id} className="printable-report-wrapper">
                            <ReportDisplay
                                report={data.report}
                                performanceHistory={data.performanceHistory}
                                actualSchoolName={props.actualSchoolName}
                                schoolAddress={props.schoolAddress}
                                userRoles={currentUser?.roles}
                                schoolBadgeUrl={schoolBadgeUrl}
                                schoolMotto={schoolMotto}
                            />
                        </div>
                    ) : null
                )}
            </div>
        </PageWrapper>
    );
};