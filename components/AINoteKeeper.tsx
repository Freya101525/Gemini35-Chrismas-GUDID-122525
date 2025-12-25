
import React, { useState } from 'react';
import { TRANSLATIONS } from '../constants';
import { Language, Theme, PainterStyle } from '../types';
import { Wand2, Edit3, Eye, Send } from 'lucide-react';
import { processAINote } from '../services/gemini';

interface AINoteKeeperProps {
  apiKey: string;
  language: Language;
  style: PainterStyle;
}

const MAGICS = [
  { id: 'format', label: 'AI Format', icon: <Wand2 size={14}/> },
  { id: 'summary', label: 'Summarize', icon: <Edit3 size={14}/> },
  { id: 'entities', label: 'Extract Entities', icon: <Wand2 size={14}/> },
  { id: 'action', label: 'Action Items', icon: <Eye size={14}/> },
  { id: 'tone', label: 'Pro Tone', icon: <Send size={14}/> }
];

export const AINoteKeeper: React.FC<AINoteKeeperProps> = ({ apiKey, language, style }) => {
  const [text, setText] = useState('');
  const [output, setOutput] = useState('');
  const [view, setView] = useState<'edit' | 'preview'>('edit');
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gemini-2.5-flash');
  const t = TRANSLATIONS[language];

  const handleMagic = async (magicId: string) => {
    if (!text || !apiKey) return;
    setLoading(true);
    try {
      const result = await processAINote(apiKey, text, magicId, selectedModel);
      setOutput(result);
      setView('preview');
    } catch (err) {
      alert('Note processing failed.');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden shadow-lg">
      <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex flex-wrap gap-4 items-center justify-between bg-gray-50/50 dark:bg-gray-900/30">
        <div className="flex items-center gap-2">
          <Edit3 className="text-rose-500" />
          <span className="font-bold">{t.notes}</span>
        </div>
        <div className="flex gap-2">
          <select 
            value={selectedModel}
            onChange={e => setSelectedModel(e.target.value)}
            className="text-[10px] p-1.5 rounded border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800"
          >
            <option value="gemini-2.5-flash">Gemini 2.5 Flash</option>
            <option value="gemini-3-flash-preview">Gemini 3 Flash</option>
          </select>
          <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
            <button onClick={() => setView('edit')} className={`px-3 py-1 text-xs ${view === 'edit' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800'}`}>{t.editMode}</button>
            <button onClick={() => setView('preview')} className={`px-3 py-1 text-xs ${view === 'preview' ? 'bg-blue-600 text-white' : 'bg-white dark:bg-gray-800'}`}>{t.previewMode}</button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-hidden flex flex-col gap-4">
        {view === 'edit' ? (
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your notes here..."
            className="flex-1 p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 outline-none resize-none text-sm font-mono"
          />
        ) : (
          <div 
            className="flex-1 p-4 rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 overflow-y-auto text-sm prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: output.replace(/\n/g, '<br/>') }}
          />
        )}

        <div className="flex flex-wrap gap-2 pt-2">
          {MAGICS.map(m => (
            <button
              key={m.id}
              onClick={() => handleMagic(m.id)}
              disabled={loading}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-[10px] font-bold hover:border-rose-400 transition-colors shadow-sm"
              style={{ color: style.colors.primary }}
            >
              {m.icon} {m.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
