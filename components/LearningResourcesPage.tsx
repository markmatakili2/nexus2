import React, { useState, useMemo, useEffect } from 'react';
import { PageWrapper } from './Layout';
import { PlusIcon, PencilIcon, TrashIcon, XMarkIcon, EyeIcon, PaperClipIcon } from './common/IconComponents';
import { Assignment, AssignmentType, SchoolClass, Subject, User, UserRole } from '../types';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Helper to convert file to base64
const fileToBase64 = (file: File): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

// Type for the form data, which is a partial Assignment
type ResourceFormData = Partial<Omit<Assignment, 'teacherId' | 'createdAt' | 'schoolId'>> & { file?: File | null };

// Form Modal Component
const ResourceFormModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: ResourceFormData) => void;
    resource?: Assignment | null;
    classes: SchoolClass[];
    subjects: Subject[];
}> = ({ isOpen, onClose, onSave, resource, classes, subjects }) => {
    const [formData, setFormData] = useState<ResourceFormData>({});
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        if (resource) {
            setFormData({
                id: resource.id,
                title: resource.title,
                content: resource.content,
                classId: resource.classId,
                subjectId: resource.subjectId,
                type: resource.type,
                dueDate: resource.dueDate ? resource.dueDate.split('T')[0] : undefined,
                fileName: resource.fileName,
                fileType: resource.fileType,
                fileUrl: resource.fileUrl,
            });
        } else {
            setFormData({ title: '', content: '', classId: classes[0]?.id || '', subjectId: subjects[0]?.id || '', type: AssignmentType.MATERIAL, dueDate: undefined });
        }
        setSelectedFile(null); // Reset file input on open
    }, [resource, isOpen, classes, subjects]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTypeChange = (type: AssignmentType) => {
        setFormData(prev => ({ ...prev, type, dueDate: type === AssignmentType.MATERIAL ? undefined : prev.dueDate }));
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                alert("File size cannot exceed 2MB.");
                return;
            }
            setSelectedFile(file);
            setFormData(prev => ({ ...prev, fileName: file.name }));
        }
    };
    
    const handleRemoveFile = () => {
        setSelectedFile(null);
        setFormData(prev => ({ ...prev, fileName: undefined, fileType: undefined, fileUrl: undefined }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!formData.title || !formData.classId || !formData.subjectId || !formData.content) {
            alert("Please fill all required fields.");
            return;
        }

        let dataToSave: ResourceFormData = { ...formData };
        if (selectedFile) {
            try {
                const fileUrl = await fileToBase64(selectedFile);
                dataToSave.fileUrl = fileUrl as string;
                dataToSave.fileName = selectedFile.name;
                dataToSave.fileType = selectedFile.type;
            } catch (error) {
                console.error("Error converting file:", error);
                alert("Could not process the file. Please try again.");
                return;
            }
        }
        
        onSave(dataToSave);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold dark:text-slate-100">{resource ? 'Edit Resource' : 'Create New Resource'}</h3>
                    <button onClick={onClose}><XMarkIcon className="w-6 h-6 text-gray-500 hover:text-gray-800 dark:text-slate-400 dark:hover:text-slate-200" /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Resource Type</label>
                        <div className="mt-2 flex space-x-4">
                            <button type="button" onClick={() => handleTypeChange(AssignmentType.MATERIAL)} className={`px-4 py-2 text-sm rounded-md ${formData.type === AssignmentType.MATERIAL ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-slate-700'}`}>Material</button>
                            <button type="button" onClick={() => handleTypeChange(AssignmentType.ASSIGNMENT)} className={`px-4 py-2 text-sm rounded-md ${formData.type === AssignmentType.ASSIGNMENT ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-slate-700'}`}>Assignment</button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div>
                            <label htmlFor="classId" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Class</label>
                            <select name="classId" id="classId" value={formData.classId} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200">
                                <option value="">Select a Class</option>
                                {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="subjectId" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Subject</label>
                            <select name="subjectId" id="subjectId" value={formData.subjectId} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200">
                                <option value="">Select a Subject</option>
                                {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                        </div>
                    </div>
                    
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Title</label>
                        <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"/>
                    </div>
                    
                    {formData.type === AssignmentType.ASSIGNMENT && (
                         <div>
                            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Due Date</label>
                            <input type="date" name="dueDate" id="dueDate" value={formData.dueDate || ''} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"/>
                        </div>
                    )}

                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Content (Markdown supported)</label>
                        <textarea name="content" id="content" value={formData.content} onChange={handleChange} required rows={8} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200"></textarea>
                    </div>

                     <div>
                        <label htmlFor="file" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Attachment (Optional)</label>
                        {formData.fileName && !selectedFile ? (
                             <div className="mt-1 flex items-center justify-between p-2 border rounded-md bg-gray-50 dark:bg-slate-700/50 dark:border-slate-600">
                                <span className="text-sm text-gray-700 dark:text-slate-300">{formData.fileName}</span>
                                <button type="button" onClick={handleRemoveFile} className="text-red-500 hover:text-red-700 text-sm">Remove</button>
                             </div>
                        ) : (
                             <input type="file" name="file" id="file" onChange={handleFileChange} className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 dark:file:bg-slate-700 dark:file:text-primary-300 dark:hover:file:bg-slate-600" accept=".pdf,.doc,.docx,.txt" />
                        )}
                         <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">PDF, DOC, DOCX, TXT. Max 2MB.</p>
                    </div>


                    <div className="pt-5 flex justify-end space-x-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 border rounded-md dark:border-slate-600 dark:hover:bg-slate-700">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">Save Resource</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


// View Modal Component
const ResourceViewModal: React.FC<{
    resource: Assignment | null;
    onClose: () => void;
    teacherName: string;
    className: string;
    subjectName: string;
}> = ({ resource, onClose, teacherName, className, subjectName }) => {
    if (!resource) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50" onClick={onClose}>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                 <div className="flex justify-between items-start mb-4 pb-4 border-b dark:border-slate-700">
                    <div>
                        <h3 className="text-2xl font-bold dark:text-slate-100">{resource.title}</h3>
                        <div className="text-sm text-gray-500 dark:text-slate-400 mt-1 space-x-4">
                            <span><strong>Class:</strong> {className}</span>
                            <span><strong>Subject:</strong> {subjectName}</span>
                            <span><strong>By:</strong> {teacherName}</span>
                             {resource.type === AssignmentType.ASSIGNMENT && resource.dueDate && (
                                <span><strong>Due:</strong> {new Date(resource.dueDate  + 'T00:00:00').toLocaleDateString()}</span>
                            )}
                        </div>
                    </div>
                    <button onClick={onClose}><XMarkIcon className="w-6 h-6 text-gray-500 hover:text-gray-800 dark:text-slate-400 dark:hover:text-slate-200" /></button>
                </div>
                 {resource.fileName && resource.fileUrl && (
                    <div className="mb-4">
                        <a href={resource.fileUrl} download={resource.fileName} className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-500 text-white rounded-md shadow-sm hover:bg-secondary-600 transition-colors">
                            <PaperClipIcon className="w-4 h-4" />
                            Download "{resource.fileName}"
                        </a>
                    </div>
                 )}
                <div className="prose max-w-none dark:prose-invert">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{resource.content}</ReactMarkdown>
                </div>
            </div>
        </div>
    );
};


// Main Page Component
interface LearningResourcesPageProps {
    assignments: Assignment[];
    currentUser: User | null;
    classes: SchoolClass[];
    activeSubjects: Subject[];
    users: User[];
    onSave: (data: ResourceFormData) => void;
    onDelete: (id: string) => void;
}

export const LearningResourcesPage: React.FC<LearningResourcesPageProps> = ({ assignments, currentUser, classes, activeSubjects, users, onSave, onDelete }) => {
    const [selectedClassId, setSelectedClassId] = useState<string>('all');
    const [selectedSubjectId, setSelectedSubjectId] = useState<string>('all');
    const [modalState, setModalState] = useState<{ mode: 'edit' | 'create' | null, resource: Assignment | null }>({ mode: null, resource: null });
    const [viewingResource, setViewingResource] = useState<Assignment | null>(null);

    const filteredResources = useMemo(() => {
        return assignments.filter(a => 
            (selectedClassId === 'all' || a.classId === selectedClassId) &&
            (selectedSubjectId === 'all' || a.subjectId === selectedSubjectId)
        ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }, [assignments, selectedClassId, selectedSubjectId]);
    
    const getTeacherName = (teacherId: string) => users.find(u => u.teacherId === teacherId || u.id === teacherId)?.name || 'Unknown Teacher';
    const getClassName = (classId: string) => classes.find(c => c.id === classId)?.name || 'Unknown';
    const getSubjectName = (subjectId: string) => activeSubjects.find(s => s.id === subjectId)?.name || 'Unknown';
    
    const handleSaveResource = (data: ResourceFormData) => {
        const saveData = {
            ...data,
            // Ensure dueDate is handled correctly
            dueDate: data.type === AssignmentType.ASSIGNMENT && data.dueDate ? data.dueDate : undefined,
        }
        onSave(saveData);
        setModalState({ mode: null, resource: null });
    };

    return (
        <PageWrapper title="Learning Resources" titleControls={
            <button onClick={() => setModalState({ mode: 'create', resource: null })} className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md shadow-sm hover:bg-primary-700">
                <PlusIcon className="w-5 h-5 mr-2" />Create New Resource
            </button>
        }>
            {/* Filters */}
            <div className="mb-6 flex flex-wrap items-end gap-4 p-4 bg-gray-50 dark:bg-slate-800/50 rounded-lg border dark:border-slate-700">
                <div>
                    <label htmlFor="classFilter" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Filter by Class</label>
                    <select id="classFilter" value={selectedClassId} onChange={e => setSelectedClassId(e.target.value)} className="mt-1 p-2 border-gray-300 rounded-md dark:bg-slate-700 dark:border-slate-600 w-full sm:w-auto">
                        <option value="all">All Classes</option>
                        {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>
                 <div>
                    <label htmlFor="subjectFilter" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Filter by Subject</label>
                    <select id="subjectFilter" value={selectedSubjectId} onChange={e => setSelectedSubjectId(e.target.value)} className="mt-1 p-2 border-gray-300 rounded-md dark:bg-slate-700 dark:border-slate-600 w-full sm:w-auto">
                        <option value="all">All Subjects</option>
                        {activeSubjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                    </select>
                </div>
            </div>

            {/* Resources List */}
            <div className="space-y-4">
                {filteredResources.length > 0 ? filteredResources.map(resource => (
                    <div key={resource.id} className="bg-white dark:bg-slate-800/50 p-4 rounded-lg shadow-sm border dark:border-slate-700 flex flex-wrap justify-between items-center gap-4">
                        <div className="flex-grow">
                             <span className={`px-2 py-1 text-xs font-semibold rounded-full ${resource.type === AssignmentType.ASSIGNMENT ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300' : 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'}`}>{resource.type}</span>
                            <h4 className="font-bold text-lg mt-1 text-gray-800 dark:text-slate-100 flex items-center gap-2">
                                {resource.title}
                                {resource.fileName && <PaperClipIcon className="w-4 h-4 text-gray-500" />}
                            </h4>
                            <div className="text-xs text-gray-500 dark:text-slate-400 mt-1 space-x-3">
                                <span>{getClassName(resource.classId)} - {getSubjectName(resource.subjectId)}</span>
                                <span>By: {getTeacherName(resource.teacherId)}</span>
                                {resource.type === AssignmentType.ASSIGNMENT && resource.dueDate && <span>Due: {new Date(resource.dueDate + 'T00:00:00').toLocaleDateString()}</span>}
                            </div>
                        </div>
                        <div className="flex-shrink-0 flex items-center gap-2">
                             <button onClick={() => setViewingResource(resource)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-full dark:text-slate-300 dark:hover:bg-slate-700" aria-label="View Resource"><EyeIcon className="w-5 h-5"/></button>
                            {(currentUser?.id === resource.teacherId || currentUser?.roles.includes(UserRole.ADMIN)) && (
                                <>
                                    <button onClick={() => setModalState({ mode: 'edit', resource })} className="p-2 text-primary-600 hover:bg-gray-100 rounded-full dark:text-primary-400 dark:hover:bg-slate-700" aria-label="Edit Resource"><PencilIcon className="w-5 h-5"/></button>
                                    <button onClick={() => onDelete(resource.id)} className="p-2 text-red-600 hover:bg-gray-100 rounded-full dark:text-red-400 dark:hover:bg-slate-700" aria-label="Delete Resource"><TrashIcon className="w-5 h-5"/></button>
                                </>
                            )}
                        </div>
                    </div>
                )) : (
                    <div className="text-center py-12 text-gray-500 dark:text-slate-400">No resources found for the selected filters.</div>
                )}
            </div>
            
            <ResourceFormModal 
                isOpen={modalState.mode === 'create' || modalState.mode === 'edit'}
                onClose={() => setModalState({ mode: null, resource: null })}
                onSave={handleSaveResource}
                resource={modalState.resource}
                classes={classes}
                subjects={activeSubjects}
            />

            <ResourceViewModal 
                resource={viewingResource}
                onClose={() => setViewingResource(null)}
                teacherName={getTeacherName(viewingResource?.teacherId || '')}
                className={getClassName(viewingResource?.classId || '')}
                subjectName={getSubjectName(viewingResource?.subjectId || '')}
            />
        </PageWrapper>
    );
};
