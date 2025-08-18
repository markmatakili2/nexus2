import React from 'react';
import { Student, StudentPerformanceDatapoint } from '../types';
import { XMarkIcon } from './common/IconComponents';

const StudentPerformanceTrendTable: React.FC<{ performanceHistory: StudentPerformanceDatapoint[] }> = ({ performanceHistory }) => {
  return (
    <div className="mt-6">
      <h4 className="text-md font-semibold text-gray-800 dark:text-slate-200 mb-2">Performance Trend (Table)</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-slate-700 border border-gray-300 dark:border-slate-600 text-sm">
          <thead className="bg-gray-100 dark:bg-slate-700">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 dark:text-slate-300 uppercase tracking-wider">Term</th>
              <th className="px-3 py-2 text-center text-xs font-medium text-gray-700 dark:text-slate-300 uppercase tracking-wider">Year</th>
              <th className="px-3 py-2 text-center text-xs font-medium text-gray-700 dark:text-slate-300 uppercase tracking-wider">Mean Score</th>
              <th className="px-3 py-2 text-center text-xs font-medium text-gray-700 dark:text-slate-300 uppercase tracking-wider">Mean Points</th>
              <th className="px-3 py-2 text-center text-xs font-medium text-gray-700 dark:text-slate-300 uppercase tracking-wider">Overall Grade</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-slate-700">
            {performanceHistory.map(data => (
              <tr key={data.termId}>
                <td className="px-3 py-2 whitespace-nowrap text-gray-900 dark:text-slate-200">{data.termName}</td>
                <td className="px-3 py-2 whitespace-nowrap text-center text-gray-900 dark:text-slate-200">{data.year}</td>
                <td className="px-3 py-2 whitespace-nowrap text-center text-gray-900 dark:text-slate-200">{data.meanWeightedScore !== null ? Math.round(data.meanWeightedScore) : '-'}</td>
                <td className="px-3 py-2 whitespace-nowrap text-center text-gray-900 dark:text-slate-200">{data.meanTermPoints?.toFixed(2) ?? '-'}</td>
                <td className="px-3 py-2 whitespace-nowrap text-center font-semibold text-gray-900 dark:text-slate-200">{data.overallTermGrade ?? '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PerformanceBarGraph: React.FC<{ performanceHistory: StudentPerformanceDatapoint[] }> = ({ performanceHistory }) => {
  const maxPoints = 12;
  const barWidth = 50;
  const spacing = 20;
  const chartHeight = 150;
  const bottomPadding = 20;
  const leftPadding = 30;

  return (
    <div className="mt-6 bar-graph-container">
      <h4 className="text-md font-semibold text-gray-800 dark:text-slate-200 mb-3">Performance Trend (Graph - Mean Points)</h4>
      <div className="overflow-x-auto pb-2">
        <svg 
          width={(barWidth + spacing) * performanceHistory.length + leftPadding} 
          height={chartHeight + bottomPadding}
          aria-label="Student Performance Trend Graph"
          role="img"
          className="bar-graph"
        >
          <title>Student Performance Trend Graph</title>
          {[0, 4, 8, 12].map(point => (
              <g key={`y-axis-${point}`}>
                  <line 
                      x1={leftPadding - 5} y1={chartHeight - (point / maxPoints) * chartHeight}
                      x2={(barWidth + spacing) * performanceHistory.length + leftPadding - spacing} y2={chartHeight - (point / maxPoints) * chartHeight}
                      className="stroke-gray-200 dark:stroke-slate-600" strokeDasharray="2,2"
                  />
                  <text 
                      x={leftPadding - 10} y={chartHeight - (point / maxPoints) * chartHeight + 4} 
                      textAnchor="end" fontSize="10" className="fill-gray-600 dark:fill-slate-300">
                      {point}
                  </text>
              </g>
          ))}
          
          {performanceHistory.map((data, index) => {
            const points = data.meanTermPoints || 0;
            const barHeight = (points / maxPoints) * chartHeight;
            const x = leftPadding + index * (barWidth + spacing);
            const y = chartHeight - barHeight;

            return (
              <g key={data.termId}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight > 0 ? barHeight : 0}
                  className={points >= 7 ? "fill-primary-500" : (points >= 4 ? "fill-yellow-400" : "fill-red-500")}
                  rx="3" ry="3"
                >
                  <title>{`${data.termName} ${data.year}: ${points.toFixed(2)} pts (${data.overallTermGrade})`}</title>
                </rect>
                <text
                  x={x + barWidth / 2}
                  y={y - 5 > 10 ? y - 5 : 10}
                  textAnchor="middle"
                  fontSize="10"
                  className="fill-gray-800 dark:fill-slate-100 font-semibold"
                >
                  {points.toFixed(1)}
                </text>
                <text
                  x={x + barWidth / 2}
                  y={chartHeight + 15}
                  textAnchor="middle"
                  fontSize="10"
                  className="fill-gray-600 dark:fill-slate-300"
                >
                  {data.termName.replace('Term ', 'T')}{String(data.year).slice(-2)}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};


interface StudentPerformanceModalProps {
    student: Student;
    performanceHistory: StudentPerformanceDatapoint[];
    onClose: () => void;
}

export const StudentPerformanceModal: React.FC<StudentPerformanceModalProps> = ({ student, performanceHistory, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 no-print" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="performance-modal-title">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4 pb-4 border-b dark:border-slate-700">
                    <h3 id="performance-modal-title" className="text-xl font-semibold text-gray-800 dark:text-slate-100">Performance Trend: {student.name}</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-slate-700" aria-label="Close modal">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>
                {performanceHistory.length > 0 ? (
                    <div>
                        <PerformanceBarGraph performanceHistory={performanceHistory} />
                        <StudentPerformanceTrendTable performanceHistory={performanceHistory} />
                    </div>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-gray-500 dark:text-slate-400">No performance history available for this student yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
};