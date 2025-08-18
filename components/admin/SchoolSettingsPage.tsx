
import React, { useState, useEffect, useRef } from 'react';
import { PageWrapper } from '../Layout';
import { AcademicCapIcon, CameraIcon, TrashIcon, XMarkIcon } from '../common/IconComponents';
import { Subject, School } from '../../types';

interface AdminSchoolSettingsPageProps {
    currentSchool: School | null;
    onUpdateSchoolDetails: (schoolId: string, details: { name: string; domain: string; address: string; motto: string; badgeUrl: string | null; }) => void;
    allSubjects: Subject[];
    onUpdateActiveSubjects: (schoolId: string, newActiveIds: string[]) => void;
}

const imageToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export const AdminSchoolSettingsPage: React.FC<AdminSchoolSettingsPageProps> = ({ 
    currentSchool, onUpdateSchoolDetails,
    allSubjects, onUpdateActiveSubjects
}) => {
    const [schoolName, setSchoolName] = useState('');
    const [address, setAddress] = useState('');
    const [domain, setDomain] = useState('');
    const [motto, setMotto] = useState('');
    const [badgeUrl, setBadgeUrl] = useState<string | null>(null);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const [editableActiveIds, setEditableActiveIds] = useState<Set<string>>(new Set());

    useEffect(() => {
        if (currentSchool) {
            setSchoolName(currentSchool.name);
            setAddress(currentSchool.address);
            setDomain(currentSchool.domain);
            setMotto(currentSchool.motto || '');
            setBadgeUrl(currentSchool.badgeUrl || null);
            setPreviewUrl(currentSchool.badgeUrl || null);
            setEditableActiveIds(new Set(currentSchool.activeSubjectIds));
        }
    }, [currentSchool]);

    if (!currentSchool) {
        return <PageWrapper title="School Settings"><p>School data not available.</p></PageWrapper>;
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        const file = event.target.files?.[0];
        if (file) {
            if (!['image/png', 'image/jpeg', 'image/svg+xml', 'image/gif'].includes(file.type)) {
                setError('Invalid file type. Please upload a PNG, JPG, GIF, or SVG image.');
                if (fileInputRef.current) fileInputRef.current.value = "";
                return;
            }
            if (file.size > 1 * 1024 * 1024) { // 1MB limit
                setError('File is too large. Maximum size is 1MB.');
                 if (fileInputRef.current) fileInputRef.current.value = "";
                return;
            }
            setSelectedFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) return;
        setIsUploading(true);
        setError(null);
        try {
            const base64String = await imageToBase64(selectedFile);
            setBadgeUrl(base64String);
            alert("Badge preview updated. Click 'Save School Details' to finalize.");
            setSelectedFile(null);
        } catch (err) {
            setError('Failed to process image.');
        } finally {
            setIsUploading(false);
        }
    };
    
    const handleRemoveBadge = () => {
        setBadgeUrl(null);
        setPreviewUrl(null);
        setSelectedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        alert("Badge preview removed. Click 'Save School Details' to finalize.");
    };


    const handleSubjectToggle = (subjectId: string) => {
        setEditableActiveIds(prev => {
            const newSet = new Set(prev);
            newSet.has(subjectId) ? newSet.delete(subjectId) : newSet.add(subjectId);
            return newSet;
        });
    };

    const handleSubjectSave = () => {
        onUpdateActiveSubjects(currentSchool.id, Array.from(editableActiveIds));
        alert("Subject configuration saved!");
    };
    
    const handleSchoolDetailsSave = () => {
        if (!schoolName.trim() || !domain.trim() || !address.trim()) {
            alert("School Name, Domain, and Address cannot be empty.");
            return;
        }
        onUpdateSchoolDetails(currentSchool.id, { name: schoolName, domain, address, motto, badgeUrl });
        alert("School details saved!");
    };


    return (
        <PageWrapper title="School Settings">
            <div className="max-w-4xl mx-auto space-y-12">
                 <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border dark:border-slate-700">
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-slate-200 mb-4">School Details & Branding</h3>
                    <div className="space-y-4">
                         <div>
                            <label className="block text-sm font-medium">Official School Name</label>
                            <input type="text" value={schoolName} onChange={e => setSchoolName(e.target.value)} className="mt-1 block w-full input-style"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">School Address</label>
                            <input type="text" value={address} onChange={e => setAddress(e.target.value)} className="mt-1 block w-full input-style" placeholder="P.O. Box 123, Town"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">School Motto</label>
                            <input type="text" value={motto} onChange={e => setMotto(e.target.value)} className="mt-1 block w-full input-style" placeholder="e.g., Striving for Excellence"/>
                        </div>
                        <div>
                            <label className="block text-sm font-medium">School Domain</label>
                            <input type="text" value={domain} onChange={e => setDomain(e.target.value)} className="mt-1 block w-full input-style" placeholder="e.g., myschool.ac.ke"/>
                        </div>
                         <div className="pt-4 border-t dark:border-slate-700">
                            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">School Badge</label>
                            <div className="mt-2 flex items-center gap-6">
                               {previewUrl ? <img src={previewUrl} alt="Badge Preview" className="w-24 h-24 rounded-full object-contain border-2 p-1" /> : <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed"><AcademicCapIcon className="w-16 h-16 text-gray-400" /></div>}
                                <div>
                                    <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"/>
                                    <div className="mt-2 flex gap-2">
                                        {selectedFile && <button onClick={handleUpload} disabled={isUploading} className="btn-sm btn-secondary">{isUploading ? 'Processing...' : 'Preview Change'}</button>}
                                        {previewUrl && <button onClick={handleRemoveBadge} className="btn-sm btn-danger-outline">Remove Badge</button>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 text-right">
                        <button onClick={handleSchoolDetailsSave} className="btn btn-primary">Save School Details</button>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border dark:border-slate-700">
                    <h3 className="text-xl font-semibold">Subject Configuration</h3>
                    <p className="text-sm text-gray-600 dark:text-slate-400 mb-4">Select subjects offered at your school.</p>
                     <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3">
                        {allSubjects.map(subject => (
                            <div key={subject.id} className="relative flex items-start">
                                <div className="flex items-center h-5">
                                    <input id={`subject-${subject.id}`} type="checkbox" checked={editableActiveIds.has(subject.id)} onChange={() => handleSubjectToggle(subject.id)} className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded"/>
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor={`subject-${subject.id}`} className="font-medium text-gray-700 dark:text-slate-300">{subject.name}</label>
                                </div>
                            </div>
                        ))}
                     </div>
                      <div className="mt-6 text-right">
                        <button onClick={handleSubjectSave} className="btn btn-primary">Save Subject Configuration</button>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};
