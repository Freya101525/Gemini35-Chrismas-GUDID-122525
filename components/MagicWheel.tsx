
import React, { useState } from 'react';
import { PAINTER_STYLES, TRANSLATIONS } from '../constants';
import { PainterStyle, Language } from '../types';
import { Sparkles } from 'lucide-react';

interface MagicWheelProps {
  onSelect: (style: PainterStyle) => void;
  currentStyle: PainterStyle;
  language: Language;
}

export const MagicWheel: React.FC<MagicWheelProps> = ({ onSelect, currentStyle, language }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const t = TRANSLATIONS[language];

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * PAINTER_STYLES.length);
      onSelect(PAINTER_STYLES[randomIndex]);
      setIsSpinning(false);
    }, 1500);
  };

  return (
    <div className="relative group p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
      <div className="flex flex-col items-center gap-4">
        <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          🎨 {t.style}: {currentStyle.artist}
        </h3>
        
        <div className="flex gap-2 overflow-x-auto w-full pb-2 scrollbar-hide">
          {PAINTER_STYLES.map((style) => (
            <button
              key={style.id}
              onClick={() => onSelect(style)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                currentStyle.id === style.id 
                  ? 'bg-blue-600 text-white shadow-md scale-105' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              {style.artist}
            </button>
          ))}
        </div>

        <button
          onClick={spin}
          disabled={isSpinning}
          className={`w-full py-3 rounded-lg font-bold text-white transition-all duration-500 flex items-center justify-center gap-2 ${
            isSpinning ? 'bg-gray-400' : 'bg-gradient-to-r from-orange-400 to-rose-400 hover:from-orange-500 hover:to-rose-500'
          }`}
        >
          <Sparkles className={isSpinning ? 'animate-spin' : ''} size={18} />
          {isSpinning ? "..." : t.jackpot}
        </button>
      </div>
    </div>
  );
};
