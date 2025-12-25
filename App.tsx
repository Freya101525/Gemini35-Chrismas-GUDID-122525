
import React, { useState, useEffect, useRef } from 'react';
import { 
  Language, Theme, PainterStyle, GUDIDRecord, AgentType, ChatMessage, AnalysisResult, EMDNRecord, EMDNMappingResult 
} from './types';
import { 
  PAINTER_STYLES, MOCK_GUDID_DATA, TRANSLATIONS, AGENT_KEYWORDS, RAW_DEFAULT_EMDN 
} from './constants';
import { analyzeGUDIDData, chatWithAgent, mapEMDN } from './services/gemini';
import { MagicWheel } from './components/MagicWheel';
import { GUDIDTable } from './components/GUDIDTable';
import { Infographics } from './components/Infographics';
import { AINoteKeeper } from './components/AINoteKeeper';
import { 
  Settings, Moon, Sun, Globe, MessageSquare, PieChart, Database, FileUp, Search, Download, Bot, Send, HelpCircle, ShieldCheck, ListOrdered
} from 'lucide-react';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(Language.EN);
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);
  const [style, setStyle] = useState<PainterStyle>(PAINTER_STYLES[0]);
  const [apiKey, setApiKey] = useState<string>(process.env.API_KEY || '');
  const [showApiKeyInput, setShowApiKeyInput] = useState<boolean>(!process.env.API_KEY);
  const [selectedModel, setSelectedModel] = useState<string>('gemini-3-flash-preview');
  const [activeTab, setActiveTab] = useState<'data' | 'emdn' | 'notes'>('data');

  const [dataset, setDataset] = useState<GUDIDRecord[]>([]);
  const [emdnCatalog, setEmdnCatalog] = useState<EMDNRecord[]>([]);
  const [mappingResults, setMappingResults] = useState<EMDNMappingResult[]>([]);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState<string>('');
  const [activeAgent, setActiveAgent] = useState<AgentType>(AgentType.NLP_ANALYZER);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === Theme.DARK);
  }, [theme]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const rows = RAW_DEFAULT_EMDN.split('\n').slice(2);
    const parsed = rows.map(r => {
      const parts = r.split(',');
      return { category: parts[0], description: parts[1], code: parts[2], term: parts[3], level: parts[4], terminal: parts[5] };
    }).filter(e => e.code);
    setEmdnCatalog(parsed);
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'gudid' | 'emdn') => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (type === 'gudid') {
        const rows = content.split('\n').slice(1);
        const parsed = rows.map(row => {
          const cols = row.split(',');
          return {
            device_id: cols[0] || 'N/A', brand_name: cols[1] || 'N/A', model_number: cols[2] || 'N/A', manufacturer: cols[3] || 'N/A',
            status: cols[4] || 'N/A', gudid_version: cols[5] || '1.0', created_at: cols[6] || new Date().toISOString(),
            device_description: cols[7] || 'No description', classification_number: cols[8] || 'N/A'
          };
        }).filter(r => r.device_id !== 'N/A');
        setDataset(parsed);
      } else {
        const rows = content.split('\n').slice(2);
        const parsed = rows.map(r => {
          const parts = r.split(',');
          return { category: parts[0], description: parts[1], code: parts[2], term: parts[3], level: parts[4], terminal: parts[5] };
        }).filter(e => e.code);
        setEmdnCatalog(parsed);
      }
    };
    reader.readAsText(file);
  };

  const runAnalysis = async () => {
    if (!apiKey || dataset.length === 0) return;
    setIsLoading(true);
    try {
      const result = await analyzeGUDIDData(apiKey, dataset, selectedModel);
      setAnalysis(result);
    } catch (error) { alert("Analysis failed."); }
    setIsLoading(false);
  };

  const runMapping = async () => {
    if (!apiKey || dataset.length === 0) return;
    setIsLoading(true);
    try {
      const results = await mapEMDN(apiKey, dataset, emdnCatalog, selectedModel);
      setMappingResults(results);
      setActiveTab('emdn');
    } catch (error) { alert("Mapping failed."); }
    setIsLoading(false);
  };

  const sendMessage = async (overrideText?: string) => {
    const text = overrideText || inputText;
    if (!text.trim() || !apiKey) return;
    const newUserMsg: ChatMessage = { role: 'user', content: text, timestamp: new Date().toLocaleTimeString() };
    setMessages(prev => [...prev, newUserMsg]);
    setInputText('');
    setIsLoading(true);
    try {
      const response = await chatWithAgent(apiKey, messages.map(m => ({ role: m.role, content: m.content })), text, dataset, activeAgent, selectedModel);
      setMessages(prev => [...prev, { role: 'assistant', content: response, agent: activeAgent, timestamp: new Date().toLocaleTimeString() }]);
    } catch (error) { alert("Chat failed."); }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-white dark:bg-slate-950">
      <header className="sticky top-0 z-50 border-b flex items-center justify-between px-6 py-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-rose-600 rounded-lg shadow-lg shadow-rose-500/20">
            <ShieldCheck className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-black tracking-tight dark:text-white uppercase">{t.title}</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
            {(['data', 'emdn', 'notes'] as const).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === tab ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-600' : 'text-gray-500'}`}>{t[tab]}</button>
            ))}
          </nav>
          <button onClick={() => setLang(l => l === Language.EN ? Language.ZH : Language.EN)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300"><Globe size={20} /></button>
          <button onClick={() => setTheme(t => t === Theme.LIGHT ? Theme.DARK : Theme.LIGHT)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300">{theme === Theme.LIGHT ? <Moon size={20} /> : <Sun size={20} />}</button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-4 flex flex-col gap-8">
          {showApiKeyInput && (
            <div className="p-4 bg-rose-50 dark:bg-rose-900/20 border border-rose-100 rounded-2xl">
              <label className="block text-[10px] font-black uppercase text-rose-800 dark:text-rose-200 mb-2">{t.apiKeyPrompt}</label>
              <div className="flex gap-2">
                <input type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} className="flex-1 p-2 bg-white dark:bg-gray-800 border rounded-xl text-xs" />
                <button onClick={() => setShowApiKeyInput(false)} className="px-4 py-2 bg-rose-600 text-white text-[10px] font-black rounded-xl">{t.saveKey}</button>
              </div>
            </div>
          )}

          <section className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl space-y-6">
            <h2 className="text-sm font-black uppercase tracking-widest text-gray-400">Inventory & Mapping</h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400">GUDID Source</label>
                <div className="flex gap-2">
                  <button onClick={() => setDataset(MOCK_GUDID_DATA)} className="flex-1 p-2 text-[10px] font-bold bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200">{t.mock}</button>
                  <label className="flex-1 p-2 text-[10px] font-bold bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 text-center cursor-pointer">
                    {t.upload} <input type="file" className="hidden" onChange={e => handleFileUpload(e, 'gudid')} />
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400">EMDN Catalog</label>
                <label className="block w-full p-2 text-[10px] font-bold bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 text-center cursor-pointer">
                  Upload EMDN (Optional) <input type="file" className="hidden" onChange={e => handleFileUpload(e, 'emdn')} />
                </label>
              </div>

              <button onClick={runMapping} disabled={isLoading || !dataset.length} className="w-full p-3 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-indigo-500/30">{t.mapping}</button>
              <button onClick={runAnalysis} disabled={isLoading || !dataset.length} className="w-full p-3 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-500/30">Generate {t.viz}</button>
            </div>
          </section>

          <MagicWheel currentStyle={style} onSelect={setStyle} language={lang} />
        </aside>

        <div className="lg:col-span-8 flex flex-col gap-8">
          {activeTab === 'notes' ? (
            <AINoteKeeper apiKey={apiKey} language={lang} style={style} />
          ) : activeTab === 'emdn' ? (
            <section className="bg-white dark:bg-slate-900 rounded-3xl border shadow-2xl p-6 overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-black text-lg uppercase tracking-tight">{t.emdn} Results</h3>
                <button onClick={() => {}} className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg"><Download size={16}/></button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr className="uppercase font-black text-gray-400">
                      <th className="p-3">Device ID</th><th className="p-3">Brand</th><th className="p-3">Description</th><th className="p-3">Classification</th><th className="p-3 text-indigo-500">EMDN Item</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mappingResults.map((r, i) => (
                      <tr key={i} className="border-t border-gray-50 dark:border-gray-800 hover:bg-gray-50/50">
                        <td className="p-3 font-mono">{r.device_id}</td><td className="p-3 font-bold">{r.brand_name}</td><td className="p-3 max-w-xs truncate">{r.device_description}</td>
                        <td className="p-3">{r.classification_number}</td><td className="p-3 font-bold text-indigo-600 dark:text-indigo-400">{r.emdn_item} ({r.emdn_code})</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ) : (
            <div className="space-y-8">
              {analysis && (
                <section className="space-y-6">
                  <div className="p-6 bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xl">
                    <h3 className="font-black text-lg uppercase mb-4" style={{ color: style.colors.primary }}>{t.summary}</h3>
                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">{analysis.summary}</p>
                  </div>
                  <Infographics data={analysis.chartData} style={style} />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {analysis.followUpQuestions.map((q, i) => (
                      <button key={i} onClick={() => sendMessage(q)} className="text-left p-3 text-[10px] bg-gray-50 dark:bg-gray-900 hover:bg-white dark:hover:bg-gray-800 border rounded-xl font-bold text-gray-500">{i + 1}. {q}</button>
                    ))}
                  </div>
                </section>
              )}
              {dataset.length > 0 && !analysis && (
                <section className="bg-white dark:bg-slate-900 rounded-3xl border p-6 shadow-xl">
                  <GUDIDTable data={dataset.slice(0, 10)} language={lang} />
                </section>
              )}
            </div>
          )}

          <section className="flex flex-col bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden h-[500px]">
            <div className="px-6 py-4 border-b flex items-center justify-between bg-gray-50/50 dark:bg-gray-800/50">
              <div className="flex items-center gap-2 font-black uppercase text-xs"><Bot className="text-blue-500" size={16}/> {t.chat}</div>
              <div className="text-[10px] font-black px-2 py-1 bg-blue-100 text-blue-700 rounded uppercase">Active: {t[activeAgent]}</div>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-3xl text-xs font-medium ${m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-gray-100 dark:bg-gray-800 dark:text-white rounded-tl-none border border-gray-200 dark:border-gray-700'}`}>
                    {m.agent && <div className="text-[9px] font-black uppercase opacity-60 mb-2">@{t[m.agent]}</div>}
                    <div className="whitespace-pre-wrap">{m.content}</div>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <div className="p-4 bg-gray-50/50 dark:bg-gray-800/20 border-t">
              <div className="flex gap-2 bg-white dark:bg-gray-900 rounded-2xl p-2 border shadow-inner">
                <input type="text" value={inputText} onChange={e => setInputText(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()} placeholder={t.placeholder} className="flex-1 bg-transparent px-3 outline-none text-xs" />
                <button onClick={() => sendMessage()} className="p-2 bg-blue-600 text-white rounded-xl"><Send size={16}/></button>
              </div>
            </div>
          </section>
        </div>
      </main>
      <footer className="p-6 text-center text-[10px] font-black text-gray-300 uppercase tracking-[0.4em]">&copy; 2024 FDA AGENTIC SYSTEM v2.0</footer>
    </div>
  );
};

export default App;
