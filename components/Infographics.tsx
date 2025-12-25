
import React from 'react';
import { AnalysisResult, PainterStyle } from '../types';

interface InfographicsProps {
  data: AnalysisResult['chartData'];
  style: PainterStyle;
}

export const Infographics: React.FC<InfographicsProps> = ({ data, style }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.map((chart, idx) => (
        <div key={idx} className="p-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden">
          <h4 className="text-sm font-bold mb-4" style={{ color: style.colors.primary }}>{chart.title}</h4>
          <div className="flex flex-col gap-2">
            {chart.labels.map((label, i) => {
              const percentage = (chart.values[i] / Math.max(...chart.values)) * 100;
              return (
                <div key={i} className="group">
                  <div className="flex justify-between text-[10px] mb-1 text-gray-500 dark:text-gray-400 font-medium">
                    <span>{label}</span>
                    <span>{chart.values[i]}</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full transition-all duration-1000 group-hover:brightness-110" 
                      style={{ 
                        width: `${percentage}%`, 
                        backgroundColor: i % 2 === 0 ? style.colors.primary : style.colors.secondary 
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};
