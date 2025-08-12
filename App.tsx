import React, { useState, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { CalculatorForm } from './components/CalculatorForm';
import { ResultsDisplay } from './components/ResultsDisplay';
import { FixtureSuggestions } from './components/FixtureSuggestions';
import { CalculationResult, FixtureSuggestion, Unit } from './types';
import { FEET_TO_METERS_SQUARE_FACTOR, ROOM_LUX_VALUES, FIXTURES_DATA } from './constants';

const App: React.FC = () => {
  const [roomType, setRoomType] = useState<string>('');
  const [length, setLength] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [customLux, setCustomLux] = useState<string>('300');
  const [unit, setUnit] = useState<Unit>('feet');
  
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [suggestions, setSuggestions] = useState<FixtureSuggestion[]>([]);
  const [lastCalculation, setLastCalculation] = useState<{result: CalculationResult, suggestions: FixtureSuggestion[]} | null>(null);

  const errors = useMemo(() => {
    const newErrors: { [key: string]: string } = {};
    const lenVal = parseFloat(length);
    const widVal = parseFloat(width);

    if (length && (isNaN(lenVal) || lenVal <= 0)) {
      newErrors.length = 'Must be a positive number.';
    }
    if (width && (isNaN(widVal) || widVal <= 0)) {
      newErrors.width = 'Must be a positive number.';
    }

    if (roomType === 'Custom') {
      const luxVal = parseFloat(customLux);
      if (customLux && (isNaN(luxVal) || luxVal < 50 || luxVal > 1000)) {
        newErrors.customLux = 'Must be 50-1000.';
      }
    }
    return newErrors;
  }, [length, width, customLux, roomType]);

  const isFormValid = useMemo(() => {
    if (!roomType || !length || !width) return false;
    if (roomType === 'Custom' && !customLux) return false;
    return Object.keys(errors).length === 0;
  }, [roomType, length, width, customLux, errors]);

  const handleCalculate = useCallback(() => {
    if (!isFormValid) return;

    const len = parseFloat(length);
    const wid = parseFloat(width);
    
    let areaFt: number;
    let areaM: number;

    if (unit === 'feet') {
      areaFt = len * wid;
      areaM = areaFt * FEET_TO_METERS_SQUARE_FACTOR;
    } else { // unit is 'meters'
      areaM = len * wid;
      areaFt = areaM / FEET_TO_METERS_SQUARE_FACTOR;
    }

    const requiredLux = roomType === 'Custom' ? parseFloat(customLux) : ROOM_LUX_VALUES[roomType];
    const totalLumens = Math.round(areaM * requiredLux);

    const newResult: CalculationResult = { areaFt, areaM, requiredLux, totalLumens };
    setResult(newResult);

    const newSuggestions = FIXTURES_DATA.map(fixture => {
      let quantity = Math.ceil(totalLumens / fixture.lumens);
      if (quantity > 1 && quantity % 2 !== 0) {
        quantity++; // Ensure quantity is even if greater than 1
      }
      
      return {
        ...fixture,
        quantity,
        totalLumens: quantity * fixture.lumens,
        totalCost: quantity * fixture.price,
        lumensPerRupee: fixture.lumens / fixture.price,
      };
    }).sort((a, b) => a.totalCost - b.totalCost);

    setSuggestions(newSuggestions);
    setLastCalculation({ result: newResult, suggestions: newSuggestions });

  }, [isFormValid, length, width, roomType, customLux, unit]);
  
  const handleReset = useCallback(() => {
    setRoomType('');
    setLength('');
    setWidth('');
    setCustomLux('300');
    setUnit('feet');
    setResult(null);
    setSuggestions([]);
    setLastCalculation(null);
  }, []);

  const handleDownloadReport = useCallback(() => {
    if (!lastCalculation) return;
    const { result: res, suggestions: sugg } = lastCalculation;

    const bestOption = sugg.length > 0 ? sugg[0] : null;
    const unitLabel = unit === 'feet' ? 'ft' : 'm';

    let reportContent = `Lumenator Lighting Calculation Report
=====================================

ROOM SPECIFICATIONS:
- Room Type: ${roomType === 'Custom' ? `Custom (${res.requiredLux} Lux)` : roomType}
- Dimensions: ${length} ${unitLabel} x ${width} ${unitLabel}
- Area: ${res.areaFt.toFixed(2)} sq ft (${res.areaM.toFixed(2)} sq m)

CALCULATION:
- Required Brightness: ${res.requiredLux} Lux
- Total Required Lumens: ${res.totalLumens} lumens

LIGHTING SUGGESTIONS:
-------------------------------------
`;

    sugg.forEach((s, index) => {
      reportContent += `
Option ${index + 1}: ${s.name} ${s === bestOption ? '(Best Value)' : ''}
- Quantity Needed: ${s.quantity}
- Total Lumens Provided: ${s.totalLumens}
- Estimated Cost: ₹${s.totalCost.toFixed(2)}
-------------------------------------`;
    });

    reportContent += `\nReport generated on: ${new Date().toLocaleString()}`;

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'lumenator-report.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [lastCalculation, roomType, length, width, unit]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300 print:bg-white">
      <Header />
      <main className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 print:grid-cols-1">
          <section className="print:hidden">
            <CalculatorForm 
              roomType={roomType} setRoomType={setRoomType}
              length={length} setLength={setLength}
              width={width} setWidth={setWidth}
              customLux={customLux} setCustomLux={setCustomLux}
              unit={unit} setUnit={setUnit}
              errors={errors}
              isFormValid={isFormValid}
              onCalculate={handleCalculate}
              onReset={handleReset}
            />
          </section>
          
          <div className={`space-y-8 lg:space-y-12 transition-opacity duration-700 ${result ? 'opacity-100' : 'opacity-0'}`}>
            <ResultsDisplay 
              result={result}
              roomType={roomType}
              length={length}
              width={width}
              unit={unit}
              onDownload={handleDownloadReport}
              canDownload={!!lastCalculation}
            />
            {result && <FixtureSuggestions suggestions={suggestions} />}
          </div>
        </div>
      </main>
      <footer className="text-center py-6 text-sm text-gray-400 dark:text-gray-600 print:hidden">
        <p>&copy; {new Date().getFullYear()} Lumenator. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;