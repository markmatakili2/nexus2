import React, { useState } from 'react';
import { PageWrapper } from '../Layout';
import { SchoolClass, Subject } from '../../types';
import { SparklesIcon, PrintIcon } from '../common/IconComponents';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface AIExamGeneratorPageProps {
  classes: SchoolClass[];
  activeSubjects: Subject[];
  actualSchoolName: string;
}

export const AIExamGeneratorPage: React.FC<AIExamGeneratorPageProps> = ({ classes, activeSubjects, actualSchoolName }) => {
  const [selectedClassId, setSelectedClassId] = useState<string>(classes[0]?.id || '');
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(activeSubjects[0]?.id || '');
  const [topics, setTopics] = useState<string>('');
  const [includeMCQ, setIncludeMCQ] = useState(true);
  const [includeShortAnswer, setIncludeShortAnswer] = useState(true);
  const [includeEssay, setIncludeEssay] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedExam, setGeneratedExam] = useState<string>('');
  
  const handlePrint = () => {
      window.print();
  };
  
  const handleGenerateExam = async () => {
    if (!selectedClassId || !selectedSubjectId) {
        setError("Please select both a class and a subject.");
        return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedExam('');

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

        const className = classes.find(c => c.id === selectedClassId)?.name || '';
        const subjectName = activeSubjects.find(s => s.id === selectedSubjectId)?.name || '';
        const questionTypes = [
            includeMCQ && 'Multiple Choice Questions',
            includeShortAnswer && 'Short Answer Questions',
            includeEssay && 'Essay Questions'
        ].filter(Boolean).join(', ');
        
        if (!questionTypes) {
            setError("Please select at least one question type.");
            setIsLoading(false);
            return;
        }

        const prompt = `
You are an expert exam creator for the Kenyan secondary school curriculum. Your task is to generate a high-quality exam paper based on the following specifications.

**Specifications:**
- **Curriculum:** Kenyan Secondary School Curriculum (8-4-4).
- **Class:** ${className}
- **Subject:** ${subjectName}
- **Topics to Cover:** ${topics || `General syllabus for ${subjectName} in ${className}.`}
- **Question Types:** Include sections for ${questionTypes}.
- **Total Marks:** The exam should total 100 marks. Distribute the marks appropriately across the sections, clearly indicating the marks for each question.
- **Instructions:** Include clear instructions for students at the beginning of the exam and for each section.
- **Marking Scheme:** After the entire exam paper, provide a detailed marking scheme under a clear heading "MARKING SCHEME".

**Header Requirement:**
VERY IMPORTANT: The exam paper MUST start with a professional header. The first line must be "${actualSchoolName}". The header must also include the subject "${subjectName}", the class "${className}", and a title like "End of Term Examination".

**Formatting Requirement:**
Your entire response MUST be raw markdown text, suitable for direct rendering. Do not wrap your response in a code fence (e.g., \`\`\`markdown ... \`\`\`). Use markdown for headings, lists, bold text, etc., to structure the exam paper and marking scheme clearly.
`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt
        });

        setGeneratedExam(response.text);

    } catch (err) {
      console.error("Error generating exam:", err);
      setError("An error occurred while communicating with the AI. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper title="AI Exam Generator">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-1 no-print">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg border dark:border-slate-700 space-y-6">
                    <div>
                        <label htmlFor="classId" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Class</label>
                        <select id="classId" value={selectedClassId} onChange={e => setSelectedClassId(e.target.value)} className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm dark:bg-slate-700 dark:border-slate-600">
                            {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="subjectId" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Subject</label>
                        <select id="subjectId" value={selectedSubjectId} onChange={e => setSelectedSubjectId(e.target.value)} className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm dark:bg-slate-700 dark:border-slate-600">
                            {activeSubjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="topics" className="block text-sm font-medium text-gray-700 dark:text-slate-300">Specific Topics (Optional)</label>
                        <textarea id="topics" value={topics} onChange={e => setTopics(e.target.value)} rows={3} className="mt-1 block w-full p-2 border-gray-300 rounded-md shadow-sm dark:bg-slate-700 dark:border-slate-600" placeholder="e.g., Photosynthesis, Cell Division, Ecology"></textarea>
                    </div>
                    
                    <fieldset>
                      <legend className="text-sm font-medium text-gray-700 dark:text-slate-300">Question Types</legend>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center"><input type="checkbox" id="mcq" checked={includeMCQ} onChange={e => setIncludeMCQ(e.target.checked)} className="h-4 w-4 text-primary-600 border-gray-300 rounded" /><label htmlFor="mcq" className="ml-2 text-sm text-gray-600 dark:text-slate-400">Multiple Choice</label></div>
                        <div className="flex items-center"><input type="checkbox" id="short" checked={includeShortAnswer} onChange={e => setIncludeShortAnswer(e.target.checked)} className="h-4 w-4 text-primary-600 border-gray-300 rounded" /><label htmlFor="short" className="ml-2 text-sm text-gray-600 dark:text-slate-400">Short Answer</label></div>
                        <div className="flex items-center"><input type="checkbox" id="essay" checked={includeEssay} onChange={e => setIncludeEssay(e.target.checked)} className="h-4 w-4 text-primary-600 border-gray-300 rounded" /><label htmlFor="essay" className="ml-2 text-sm text-gray-600 dark:text-slate-400">Essay Questions</label></div>
                      </div>
                    </fieldset>

                    <button onClick={handleGenerateExam} disabled={isLoading} className="w-full bg-primary-600 text-white font-bold py-3 px-4 rounded-lg inline-flex items-center justify-center disabled:opacity-50 hover:bg-primary-700 transition-colors shadow-lg">
                        <SparklesIcon className="w-5 h-5 mr-2" />
                        {isLoading ? 'Generating Exam...' : 'Generate Exam'}
                    </button>
                </div>
            </div>

            {/* Display Section */}
            <div className="lg:col-span-2">
                 {isLoading && (
                    <div className="flex justify-center items-center flex-col h-full p-8 bg-gray-50 dark:bg-slate-800/50 rounded-lg">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                        <p className="mt-4 text-gray-600 dark:text-slate-300 font-semibold">AI is crafting your exam...</p>
                    </div>
                 )}
                 {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg dark:bg-red-900/20 dark:text-red-300" role="alert">
                        <p className="font-bold">Error</p>
                        <p>{error}</p>
                    </div>
                 )}
                 {generatedExam && (
                    <>
                        <div className="flex justify-end mb-4 no-print">
                            <button onClick={handlePrint} className="bg-secondary-500 hover:bg-secondary-600 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                                <PrintIcon className="w-5 h-5 mr-2" /> Print Exam
                            </button>
                        </div>
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                            {/* Editor Column */}
                            <div className="no-print">
                                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-slate-200">Edit Exam (Markdown)</h3>
                                <textarea
                                    value={generatedExam}
                                    onChange={(e) => setGeneratedExam(e.target.value)}
                                    className="w-full p-4 border rounded-md font-mono text-sm bg-gray-50 dark:bg-slate-900 dark:border-slate-600 dark:text-slate-200 focus:ring-primary-500 focus:border-primary-500 shadow-inner"
                                    style={{ height: '70vh' }}
                                    aria-label="Editable exam content"
                                />
                            </div>

                            {/* Preview Column */}
                            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg border dark:border-slate-700">
                                <div className="p-4 border-b dark:border-slate-700 no-print">
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-200">Live Preview</h3>
                                </div>
                                <div 
                                    className="p-8 prose max-w-none dark:prose-invert printable-exam overflow-y-auto"
                                    style={{ height: '70vh' }}
                                >
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{generatedExam}</ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    </>
                 )}
                 {!isLoading && !error && !generatedExam && (
                     <div className="h-full flex items-center justify-center bg-gray-50 dark:bg-slate-800/50 rounded-lg border-2 border-dashed dark:border-slate-700 text-center p-8">
                        <p className="text-gray-500 dark:text-slate-400">Your generated exam will appear here. Fill out the form on the left and click "Generate Exam" to begin.</p>
                     </div>
                 )}
            </div>
        </div>
    </PageWrapper>
  );
};