import React from 'react';
import { PageWrapper } from './Layout';
import { BookOpenIcon } from './common/IconComponents';

export const LearningResourcesPage: React.FC = () => {
    return (
        <PageWrapper title="Learning Resources">
            <div className="text-center py-12 text-gray-500 dark:text-slate-400 bg-gray-50 dark:bg-slate-800/50 rounded-lg">
                <BookOpenIcon className="w-12 h-12 mx-auto mb-4" />
                <p>This feature is currently under development and has been temporarily disabled.</p>
            </div>
        </PageWrapper>
    );
};
