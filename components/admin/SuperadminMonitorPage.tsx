import React, { useState } from 'react';
import { PageWrapper } from '../Layout';
import { School, SchoolStatus, UserRole } from '../../types';
import { ShieldCheckIcon, PlusIcon, XMarkIcon, EyeIcon, EyeSlashIcon } from '../common/IconComponents';

export type NewSchoolFormData = {
    schoolName: string;
    address: string;
    motto: string;
    domain: string;
    principalName: string;
    principalUsernameLocal: string;
    principalPassword_param: string;
};

const AddSchoolModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: NewSchoolFormData) => void;
    existingDomains: string[];
}> = ({ isOpen, onClose, onSave, existingDomains }) => {
    const [formData, setFormData] = useState<NewSchoolFormData>({
        schoolName: '', address: '', motto: '', domain: '', principalName: '', principalUsernameLocal: '', principalPassword_param: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    
    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const isFormValid = formData.schoolName && formData.address && formData.domain && formData.principalName && formData.principalUsernameLocal && formData.principalPassword_param.length >= 6;
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) {
            alert("Please fill all required fields. Password must be at least 6 characters.");
            return;
        }
        if (existingDomains.includes(formData.domain.toLowerCase())) {
            alert(`The domain "${formData.domain}" is already in use. Please choose a unique one.`);
            return;
        }
        onSave(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold dark:text-slate-100">Add New School</h3>
                    <button onClick={onClose}><XMarkIcon className="w-6 h-6 text-gray-500 hover:text-gray-800 dark:text-slate-400 dark:hover:text-slate-200" /></button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <fieldset className="border p-4 rounded-md dark:border-slate-600">
                        <legend className="px-2 font-semibold dark:text-slate-200">School Details</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div><label className="block text-sm font-medium">School Name *</label><input type="text" name="schoolName" value={formData.schoolName} onChange={handleChange} required className="mt-1 block w-full input-style"/></div>
                             <div><label className="block text-sm font-medium">School Address *</label><input type="text" name="address" value={formData.address} onChange={handleChange} required className="mt-1 block w-full input-style"/></div>
                             <div><label className="block text-sm font-medium">School Motto</label><input type="text" name="motto" value={formData.motto} onChange={handleChange} className="mt-1 block w-full input-style"/></div>
                             <div><label className="block text-sm font-medium">School Domain *</label><input type="text" name="domain" value={formData.domain} onChange={handleChange} required className="mt-1 block w-full input-style" placeholder="e.g., myschool.ac.ke"/><p className="text-xs text-gray-500 mt-1">Unique domain for user accounts.</p></div>
                        </div>
                    </fieldset>
                    <fieldset className="border p-4 rounded-md dark:border-slate-600">
                        <legend className="px-2 font-semibold dark:text-slate-200">Initial Principal Account</legend>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div><label className="block text-sm font-medium">Principal's Full Name *</label><input type="text" name="principalName" value={formData.principalName} onChange={handleChange} required className="mt-1 block w-full input-style"/></div>
                            <div>
                                <label className="block text-sm font-medium">Principal's Username *</label>
                                <div className="flex items-center">
                                    <input type="text" name="principalUsernameLocal" value={formData.principalUsernameLocal} onChange={handleChange} required className="mt-1 block w-full rounded-r-none input-style" placeholder="e.g., principal"/>
                                    <span className="inline-flex items-center px-3 mt-1 text-sm text-gray-500 bg-gray-50 border border-l-0 border-gray-300 rounded-r-md dark:bg-slate-700 dark:text-slate-400 dark:border-slate-600 h-10">@{formData.domain || '...'}</span>
                                </div>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium">Initial Password *</label>
                                <div className="relative">
                                    <input type={showPassword ? 'text' : 'password'} name="principalPassword_param" value={formData.principalPassword_param} onChange={handleChange} required minLength={6} className="mt-1 block w-full input-style pr-10"/>
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                                        {showPassword ? <EyeSlashIcon className="h-5 w-5"/> : <EyeIcon className="h-5 w-5"/>}
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Minimum 6 characters.</p>
                            </div>
                        </div>
                    </fieldset>
                    <div className="pt-5 flex justify-end space-x-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 border rounded-md dark:border-slate-600 dark:hover:bg-slate-700">Cancel</button>
                        <button type="submit" disabled={!isFormValid} className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50">Save School</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

interface SuperadminMonitorPageProps {
    schools: School[];
    onStatusUpdate: (schoolId: string, newStatus: SchoolStatus, newMessage: string) => void;
    onAddSchool: (formData: NewSchoolFormData) => void;
}

export const SuperadminMonitorPage: React.FC<SuperadminMonitorPageProps> = ({ schools, onStatusUpdate, onAddSchool }) => {
    const [localStatuses, setLocalStatuses] = useState<Record<string, SchoolStatus>>(() => 
        schools.reduce((acc, school) => ({ ...acc, [school.id]: school.status }), {})
    );
    const [localMessages, setLocalMessages] = useState<Record<string, string>>(() => 
        schools.reduce((acc, school) => ({ ...acc, [school.id]: school.cautionMessage }), {})
    );
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleStatusSave = (schoolId: string) => {
        const newStatus = localStatuses[schoolId];
        const newMessage = localMessages[schoolId];
        if (newStatus === SchoolStatus.CAUTION && !newMessage.trim()) {
            alert("A caution message is required for this school when setting the status to 'Caution'.");
            return;
        }
        onStatusUpdate(schoolId, newStatus, newMessage);
    };

    return (
        <PageWrapper 
            title="Superadmin Monitoring Panel"
            titleControls={
                <button onClick={() => setIsModalOpen(true)} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Add New School
                </button>
            }
        >
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="bg-primary-50 dark:bg-slate-700/30 border-l-4 border-primary-500 text-primary-800 dark:text-primary-300 p-4 rounded-r-lg" role="alert">
                    <div className="flex">
                        <div className="py-1"><ShieldCheckIcon className="w-6 h-6 mr-4" /></div>
                        <div>
                            <p className="font-bold">Multi-School Operational Control</p>
                            <p className="text-sm">
                                Manage the operational status for each school individually. Changes take effect immediately for all users of the specified school.
                            </p>
                        </div>
                    </div>
                </div>

                {schools.map(school => (
                    <div key={school.id} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border dark:border-slate-700">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-slate-100 mb-1">{school.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">Domain: {school.domain}</p>

                        <div className="space-y-3 mb-4">
                           <div onClick={() => setLocalStatuses(s => ({...s, [school.id]: SchoolStatus.ACTIVE}))} className={`p-3 border rounded-lg cursor-pointer transition-all ${localStatuses[school.id] === SchoolStatus.ACTIVE ? 'bg-green-50 border-green-400 ring-2 ring-green-300 dark:bg-green-900/30 dark:border-green-600' : 'bg-gray-50 dark:bg-slate-700/50 dark:border-slate-700'}`}>
                                <label className="flex items-center"><input type="radio" name={`status-${school.id}`} checked={localStatuses[school.id] === SchoolStatus.ACTIVE} onChange={()=>{}} className="h-4 w-4 text-green-600"/>
                                <span className="ml-3"><span className="font-bold text-green-800 dark:text-green-300">Active:</span> <span className="text-sm text-gray-600 dark:text-slate-400">Fully functional.</span></span></label>
                            </div>
                            <div onClick={() => setLocalStatuses(s => ({...s, [school.id]: SchoolStatus.CAUTION}))} className={`p-3 border rounded-lg cursor-pointer transition-all ${localStatuses[school.id] === SchoolStatus.CAUTION ? 'bg-yellow-50 border-yellow-400 ring-2 ring-yellow-300 dark:bg-yellow-900/30 dark:border-yellow-600' : 'bg-gray-50 dark:bg-slate-700/50 dark:border-slate-700'}`}>
                                <label className="flex items-center"><input type="radio" name={`status-${school.id}`} checked={localStatuses[school.id] === SchoolStatus.CAUTION} onChange={()=>{}} className="h-4 w-4 text-yellow-600"/>
                                <span className="ml-3"><span className="font-bold text-yellow-800 dark:text-yellow-300">Caution:</span> <span className="text-sm text-gray-600 dark:text-slate-400">Display warning banner.</span></span></label>
                            </div>
                            <div onClick={() => setLocalStatuses(s => ({...s, [school.id]: SchoolStatus.SUSPENDED}))} className={`p-3 border rounded-lg cursor-pointer transition-all ${localStatuses[school.id] === SchoolStatus.SUSPENDED ? 'bg-red-50 border-red-400 ring-2 ring-red-300 dark:bg-red-900/30 dark:border-red-600' : 'bg-gray-50 dark:bg-slate-700/50 dark:border-slate-700'}`}>
                                <label className="flex items-center"><input type="radio" name={`status-${school.id}`} checked={localStatuses[school.id] === SchoolStatus.SUSPENDED} onChange={()=>{}} className="h-4 w-4 text-red-600"/>
                                <span className="ml-3"><span className="font-bold text-red-800 dark:text-red-300">Suspended:</span> <span className="text-sm text-gray-600 dark:text-slate-400">Lock out all school users.</span></span></label>
                            </div>
                        </div>

                        {localStatuses[school.id] === SchoolStatus.CAUTION && (
                            <div className="mt-4">
                                <label htmlFor={`message-${school.id}`} className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Caution Message for {school.name}</label>
                                <textarea id={`message-${school.id}`} value={localMessages[school.id]} onChange={e => setLocalMessages(m => ({...m, [school.id]: e.target.value}))} rows={2} className="w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200" />
                            </div>
                        )}
                        <div className="text-right mt-4">
                            <button onClick={() => handleStatusSave(school.id)} className="px-5 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors shadow">
                                Update {school.name}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {isModalOpen && (
                 <AddSchoolModal 
                    isOpen={isModalOpen} 
                    onClose={() => setIsModalOpen(false)}
                    onSave={onAddSchool}
                    existingDomains={schools.map(s => s.domain.toLowerCase())}
                />
            )}
        </PageWrapper>
    );
};
