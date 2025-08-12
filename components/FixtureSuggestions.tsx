import React, { useMemo } from 'react';
import { FixtureSuggestion } from '../types';

interface FixtureSuggestionsProps {
  suggestions: FixtureSuggestion[];
}

const FixtureCard: React.FC<{ suggestion: FixtureSuggestion; isBestValue: boolean; }> = ({ suggestion, isBestValue }) => (
    <li className={`relative overflow-hidden bg-white dark:bg-gray-800/50 p-4 rounded-lg border transition-all duration-300 ${isBestValue ? 'border-amber-400 dark:border-amber-500 shadow-lg shadow-amber-900/10' : 'border-gray-200 dark:border-gray-700'}`}>
    {isBestValue && (
        <div 
            className="absolute -right-10 top-2.5 w-32 text-center transform rotate-45 bg-amber-400 py-1 text-xs font-bold uppercase text-amber-900 shadow-md"
        >
            Best Value
        </div>
    )}
    <h4 className="font-semibold text-gray-800 dark:text-gray-200">{suggestion.name}</h4>
    <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
      <div>
        <p className="text-gray-500 dark:text-gray-400">Quantity</p>
        <p className="font-medium text-gray-900 dark:text-gray-100">{suggestion.quantity}</p>
      </div>
      <div>
        <p className="text-gray-500 dark:text-gray-400">Total Lumens</p>
        <p className="font-medium text-gray-900 dark:text-gray-100">{suggestion.totalLumens.toLocaleString()}</p>
      </div>
      <div>
        <p className="text-gray-500 dark:text-gray-400">Total Cost</p>
        <p className="font-medium text-gray-900 dark:text-gray-100">₹{suggestion.totalCost.toFixed(2)}</p>
      </div>
      <div>
        <p className="text-gray-500 dark:text-gray-400">Efficiency</p>
        <p className="font-medium text-gray-900 dark:text-gray-100">{suggestion.lumensPerRupee.toFixed(1)} lm/₹</p>
      </div>
    </div>
  </li>
);

export const FixtureSuggestions: React.FC<FixtureSuggestionsProps> = ({ suggestions }) => {
  const bestValueSuggestionId = useMemo(() => {
    if (suggestions.length === 0) return null;
    // The list is already sorted by cost, so the first one is the best value.
    return suggestions[0].id;
  }, [suggestions]);

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div className="print:mt-4">
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">Lighting Suggestions</h3>
      <ul className="space-y-4">
        {suggestions.map(s => (
          <FixtureCard key={s.id} suggestion={s} isBestValue={s.id === bestValueSuggestionId} />
        ))}
      </ul>
    </div>
  );
};
