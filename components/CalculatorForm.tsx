import React from 'react';
import { ROOM_TYPES } from '../constants';
import { Unit } from '../types';
import { DimensionIcon } from './icons/DimensionIcon';
import { SunIcon } from './icons/SunIcon';

interface CalculatorFormProps {
  roomType: string;
  setRoomType: (value: string) => void;
  length: string;
  setLength: (value: string) => void;
  width: string;
  setWidth: (value: string) => void;
  customLux: string;
  setCustomLux: (value: string) => void;
  unit: Unit;
  setUnit: (unit: Unit) => void;
  errors: { [key: string]: string };
  isFormValid: boolean;
  onCalculate: () => void;
  onReset: () => void;
}

const InputField: React.FC<{
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  unit?: string;
  error?: string;
  icon?: React.ReactNode;
}> = ({ id, label, value, onChange, type = 'number', placeholder, unit, error, icon }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </label>
    <div className="mt-1 relative rounded-md shadow-sm">
      {icon && <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">{icon}</div>}
      <input
        type={type}
        name={id}
        id={id}
        value={value}
        onChange={onChange}
        className={`block w-full sm:text-sm rounded-md transition-colors duration-200
                    bg-white dark:bg-gray-800 
                    border ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} 
                    focus:ring-amber-500 focus:border-amber-500 
                    placeholder-gray-400 dark:placeholder-gray-500
                    ${icon ? 'pl-10' : 'pl-3'}`}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {unit && <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500 sm:text-sm">{unit}</div>}
    </div>
    {error && <p className="mt-1 text-xs text-red-500 transition-opacity duration-300" id={`${id}-error`}>{error}</p>}
  </div>
);

export const CalculatorForm: React.FC<CalculatorFormProps> = ({
  roomType, setRoomType, length, setLength, width, setWidth,
  customLux, setCustomLux, unit, setUnit, errors, 
  isFormValid, onCalculate, onReset
}) => {
  const unitConfig = {
    feet: { label: 'ft', placeholder: 'e.g., 12' },
    meters: { label: 'm', placeholder: 'e.g., 4' },
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Room Details</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="roomType" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Room Type</label>
          <select
            id="roomType"
            name="roomType"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md bg-white dark:bg-gray-800 transition-colors duration-200"
          >
            <option value="">Select a room type...</option>
            {ROOM_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Units</label>
          <div className="mt-1 grid grid-cols-2 gap-1 rounded-lg bg-gray-100 dark:bg-gray-800 p-1">
            {(['feet', 'meters'] as Unit[]).map(u => (
              <button
                key={u}
                type="button"
                onClick={() => setUnit(u)}
                className={`w-full px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
                  unit === u
                    ? 'bg-white dark:bg-gray-950 text-amber-600 dark:text-amber-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700/50'
                }`}
              >
                {u.charAt(0).toUpperCase() + u.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${roomType === 'Custom' ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className={roomType === 'Custom' ? 'pt-2' : ''}>
          <InputField id="customLux" label="Custom Brightness (Lux)" value={customLux} onChange={e => setCustomLux(e.target.value)} placeholder="e.g., 300" unit="lux" error={errors.customLux} icon={<SunIcon />}/>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <InputField id="length" label="Room Length" value={length} onChange={e => setLength(e.target.value)} placeholder={unitConfig[unit].placeholder} unit={unitConfig[unit].label} error={errors.length} icon={<DimensionIcon />}/>
        <InputField id="width" label="Room Width" value={width} onChange={e => setWidth(e.target.value)} placeholder={unitConfig[unit].placeholder} unit={unitConfig[unit].label} error={errors.width} icon={<DimensionIcon />}/>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          onClick={onCalculate}
          disabled={!isFormValid}
          className="w-full inline-flex justify-center items-center px-4 py-3 border border-transparent text-sm font-semibold rounded-md shadow-sm text-white bg-gradient-to-br from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:from-gray-400 disabled:to-gray-400 dark:disabled:from-gray-600 dark:disabled:to-gray-600 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300"
        >
          Calculate Lumens
        </button>
        <button
          onClick={onReset}
          className="w-full inline-flex justify-center items-center px-4 py-3 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-200"
        >
          Reset
        </button>
      </div>
    </div>
  );
};