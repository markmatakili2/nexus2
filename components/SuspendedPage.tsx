import React from 'react';
import { LockClosedIcon } from './common/IconComponents';

export const SuspendedPage: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-slate-900 p-4">
            <div className="bg-white dark:bg-slate-800 p-8 md:p-12 rounded-xl shadow-2xl w-full max-w-lg text-center">
                <LockClosedIcon className="w-20 h-20 text-red-500 dark:text-red-400 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-gray-800 dark:text-slate-100">Account Suspended</h1>
                <p className="text-gray-600 dark:text-slate-300 mt-4">
                    This school portal has been temporarily suspended due to a pending account issue.
                </p>
                <p className="text-gray-500 dark:text-slate-400 mt-2">
                    Please have your school administrator contact NexusLearn support for assistance.
                </p>
            </div>
        </div>
    );
};
