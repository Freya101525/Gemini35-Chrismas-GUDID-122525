
import React from 'react';
import { GUDIDRecord, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface GUDIDTableProps {
  data: GUDIDRecord[];
  language: Language;
}

export const GUDIDTable: React.FC<GUDIDTableProps> = ({ data, language }) => {
  const t = TRANSLATIONS[language];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-left">
        <thead className="bg-gray-50 dark:bg-gray-900">
          <tr className="text-[10px] font-black uppercase tracking-wider text-gray-400">
            <th className="px-4 py-3">Device ID</th>
            <th className="px-4 py-3">Brand</th>
            <th className="px-4 py-3">Description</th>
            <th className="px-4 py-3">Manufacturer</th>
            <th className="px-4 py-3">Class #</th>
            <th className="px-4 py-3">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {data.map((record, idx) => (
            <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors text-xs">
              <td className="px-4 py-4 font-mono font-bold text-gray-900 dark:text-gray-100">{record.device_id}</td>
              <td className="px-4 py-4 font-medium text-gray-600 dark:text-gray-300">{record.brand_name}</td>
              <td className="px-4 py-4 text-gray-500 dark:text-gray-400 max-w-xs truncate">{record.device_description}</td>
              <td className="px-4 py-4 text-gray-500 dark:text-gray-400">{record.manufacturer}</td>
              <td className="px-4 py-4 font-mono text-gray-400">{record.classification_number}</td>
              <td className="px-4 py-4">
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${
                  record.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-rose-100 text-rose-700'
                }`}>
                  {record.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
