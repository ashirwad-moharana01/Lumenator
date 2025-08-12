import React from 'react';
import { CalculationResult, Unit } from '../types';
import { SunIcon } from './icons/SunIcon';
import { AreaIcon } from './icons/AreaIcon';
import { BulbIcon } from './icons/BulbIcon';

interface ResultsDisplayProps {
  result: CalculationResult | null;
  roomType: string;
  length: string;
  width: string;
  unit: Unit;
  onDownload: () => void;
  canDownload: boolean;
}

const ResultItem: React.FC<{ icon: React.ReactNode; label: string; value: React.ReactNode; subtext?: string; isPrimary?: boolean; }> = ({ icon, label, value, subtext, isPrimary = false }) => (
  <div className={`flex items-start space-x-4 p-4 rounded-lg ${isPrimary ? 'bg-amber-50 dark:bg-amber-900/50 col-span-1 sm:col-span-2' : 'bg-gray-100 dark:bg-gray-800/50'}`}>
    <div className={`flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg ${isPrimary ? 'bg-amber-100 dark:bg-amber-800/50 text-amber-600 dark:text-amber-300' : 'bg-gray-200 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300'}`}>
      {icon}
    </div>
    <div>
      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{label}</dt>
      <dd className={`mt-1 text-2xl font-semibold ${isPrimary ? 'text-amber-600 dark:text-amber-400' : 'text-gray-900 dark:text-gray-100'}`}>{value}</dd>
      {subtext && <p className="text-xs text-gray-400 dark:text-gray-500">{subtext}</p>}
    </div>
  </div>
);

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, roomType, length, width, unit, onDownload, canDownload }) => {
  const showResults = result !== null;
  const unitLabel = unit === 'feet' ? 'ft' : 'm';

  return (
    <div 
      className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 print:shadow-none print:border-none print:p-0"
      aria-live="polite"
    >
      <div className="flex justify-between items-start">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Results
        </h2>
        <button 
          onClick={onDownload} 
          disabled={!canDownload}
          className="print:hidden text-xs font-medium text-amber-600 hover:text-amber-800 dark:text-amber-400 dark:hover:text-amber-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
          aria-label="Download report"
        >
          Download Report
        </button>
      </div>

      <div className="mt-4 print:mt-2">
        {showResults ? (
          <>
            <div className="print:block hidden mb-2">
              <p className="text-sm">Report for: {roomType === 'Custom' ? 'Custom' : roomType} ({length}{unitLabel} x {width}{unitLabel})</p>
            </div>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ResultItem icon={<BulbIcon isPrimary />} label="Total Lumens Required" value={result.totalLumens.toLocaleString()} subtext="rounded to nearest integer" isPrimary />
              <ResultItem icon={<SunIcon />} label="Required Brightness" value={result.requiredLux.toLocaleString()} subtext="lux" />
              <ResultItem icon={<AreaIcon />} label="Room Area" value={result.areaFt.toFixed(2) + ' sq ft'} subtext={`${result.areaM.toFixed(2)} sq m`} />
            </dl>
          </>
        ) : (
          <div className="text-center py-10 px-4 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/30">
            <div className="animate-pulse">
                <BulbIcon className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" />
            </div>
            <h3 className="mt-4 text-sm font-medium text-gray-900 dark:text-gray-100">Awaiting calculation</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Fill in the form to see your lighting needs.</p>
          </div>
        )}
      </div>
    </div>
  );
};