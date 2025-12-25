
import { PainterStyle, Language, GUDIDRecord, AgentType, EMDNRecord } from './types';

export const PAINTER_STYLES: PainterStyle[] = [
  { id: 'vangogh', name: 'Starry Night', artist: 'Vincent van Gogh', colors: { primary: '#1a2a6c', secondary: '#b21f1f', accent: '#fdbb2d' } },
  { id: 'picasso', name: 'Cubism', artist: 'Pablo Picasso', colors: { primary: '#2c3e50', secondary: '#e74c3c', accent: '#ecf0f1' } },
  { id: 'monet', name: 'Water Lilies', artist: 'Claude Monet', colors: { primary: '#74ebd5', secondary: '#acb6e5', accent: '#ffffff' } },
  { id: 'dali', name: 'Surrealism', artist: 'Salvador Dalí', colors: { primary: '#d39d38', secondary: '#1e1e1e', accent: '#ff4d4d' } },
  { id: 'kandinsky', name: 'Abstract', artist: 'Wassily Kandinsky', colors: { primary: '#f39c12', secondary: '#8e44ad', accent: '#2ecc71' } },
  { id: 'mondrian', name: 'De Stijl', artist: 'Piet Mondrian', colors: { primary: '#e74c3c', secondary: '#3498db', accent: '#f1c40f' } },
  { id: 'kahlo', name: 'Self-Portrait', artist: 'Frida Kahlo', colors: { primary: '#27ae60', secondary: '#c0392b', accent: '#f39c12' } },
  { id: 'pollock', name: 'Drip Painting', artist: 'Jackson Pollock', colors: { primary: '#2c3e50', secondary: '#bdc3c7', accent: '#27ae60' } },
  { id: 'warhol', name: 'Pop Art', artist: 'Andy Warhol', colors: { primary: '#ff69b4', secondary: '#00ffff', accent: '#ffff00' } },
  { id: 'basquiat', name: 'Neo-Expressionism', artist: 'Jean-Michel Basquiat', colors: { primary: '#000000', secondary: '#ffcc00', accent: '#cc0000' } },
  { id: 'hokusai', name: 'Great Wave', artist: 'Katsushika Hokusai', colors: { primary: '#164a84', secondary: '#f8f4e3', accent: '#60a5fa' } },
  { id: 'vermeer', name: 'Girl with Pearl Earring', artist: 'Johannes Vermeer', colors: { primary: '#2b4d7a', secondary: '#e5c07b', accent: '#f0f0f0' } },
  { id: 'rembrandt', name: 'Chiaroscuro', artist: 'Rembrandt', colors: { primary: '#4b3621', secondary: '#8b4513', accent: '#ffd700' } },
  { id: 'matisse', name: 'Fauvism', artist: 'Henri Matisse', colors: { primary: '#ff5733', secondary: '#33ff57', accent: '#3357ff' } },
  { id: 'magritte', name: 'Surrealism Pipe', artist: 'René Magritte', colors: { primary: '#34495e', secondary: '#ecf0f1', accent: '#e74c3c' } },
  { id: 'botticelli', name: 'Venus', artist: 'Sandro Botticelli', colors: { primary: '#f5f5dc', secondary: '#cd853f', accent: '#ffb6c1' } },
  { id: 'klimt', name: 'The Kiss', artist: 'Gustav Klimt', colors: { primary: '#ffd700', secondary: '#8b0000', accent: '#000000' } },
  { id: 'da-vinci', name: 'Renaissance', artist: 'Leonardo da Vinci', colors: { primary: '#556b2f', secondary: '#d2b48c', accent: '#a0522d' } },
  { id: 'hopper', name: 'Nighthawks', artist: 'Edward Hopper', colors: { primary: '#2f4f4f', secondary: '#8b0000', accent: '#f0e68c' } },
  { id: 'seurat', name: 'Pointillism', artist: 'Georges Seurat', colors: { primary: '#add8e6', secondary: '#90ee90', accent: '#ffffed' } }
];

export const MOCK_GUDID_DATA: GUDIDRecord[] = [
  { device_id: '00887166110001', brand_name: 'Stent-A-Max', model_number: 'SAM-X10', manufacturer: 'Cardiac Core Inc.', status: 'Active', gudid_version: '2.1', created_at: '2023-10-15', device_description: 'Cobalt Chromium Coronary Stent System for vascular repair.', classification_number: '870.1025' },
  { device_id: '00123456789012', brand_name: 'ClearSight Lens', model_number: 'CSL-200', manufacturer: 'Optic Solutions', status: 'Active', gudid_version: '1.5', created_at: '2023-11-20', device_description: 'Single-piece foldable intraocular lens for cataract surgery.', classification_number: '886.3600' },
  { device_id: '00445566778899', brand_name: 'PulseMonitor', model_number: 'PM-V4', manufacturer: 'BioSync Tech', status: 'Discontinued', gudid_version: '3.0', created_at: '2024-01-05', device_description: 'Wrist-worn continuous heart rate monitoring device.', classification_number: '870.2300' },
  { device_id: '00778899001122', brand_name: 'BoneFix Screw', model_number: 'BFS-4mm', manufacturer: 'OrthoHeal', status: 'Active', gudid_version: '2.0', created_at: '2023-12-12', device_description: 'Titanium alloy compression screw for bone fracture fixation.', classification_number: '888.3040' },
  { device_id: '00554433221100', brand_name: 'FlowCatheter', model_number: 'FC-7F', manufacturer: 'VascularVisions', status: 'Pending', gudid_version: '1.2', created_at: '2024-02-18', device_description: '7 French diagnostic hydrophilic-coated catheter.', classification_number: '870.1200' }
];

export const RAW_DEFAULT_EMDN = `EMDN V2,,,,,
CATEGORY ,CATEGORY DESCRIPTION,CODE,TERM,LEVEL ,TERMINAL LEVEL YES/NO 
A,"DEVICES FOR ADMINISTRATION, WITHDRAWAL AND COLLECTION",A,"DEVICES FOR ADMINISTRATION, WITHDRAWAL AND COLLECTION",1,NO
A,"DEVICES FOR ADMINISTRATION, WITHDRAWAL AND COLLECTION",A01,NEEDLES,2,NO
A,"DEVICES FOR ADMINISTRATION, WITHDRAWAL AND COLLECTION",A0101,NEEDLES FOR INFUSION AND SAMPLING,3,NO
A,"DEVICES FOR ADMINISTRATION, WITHDRAWAL AND COLLECTION",A010101,HYPODERMIC NEEDLES,4,NO
A,"DEVICES FOR ADMINISTRATION, WITHDRAWAL AND COLLECTION",A01010101,HYPODERMIC SYRINGE NEEDLES,5,NO
A,"DEVICES FOR ADMINISTRATION, WITHDRAWAL AND COLLECTION",A0101010101,"HYPODERMIC SYRINGE NEEDLES, WITH SAFETY SYSTEMS ",6,YES
A,"DEVICES FOR ADMINISTRATION, WITHDRAWAL AND COLLECTION",A0101010102,"HYPODERMIC SYRINGE NEEDLES, W/O SAFETY SYSTEMS",6,YES
A,"DEVICES FOR ADMINISTRATION, WITHDRAWAL AND COLLECTION",A01010102,HYPODERMIC PEN NEEDLES,5,NO
A,"DEVICES FOR ADMINISTRATION, WITHDRAWAL AND COLLECTION",A0101010201,"HYPODERMIC PEN NEEDLES, WITH SAFETY SYSTEMS",6,YES
A,"DEVICES FOR ADMINISTRATION, WITHDRAWAL AND COLLECTION",A0101010202,"HYPODERMIC PEN NEEDLES, W/O SAFETY SYSTEMS",6,YES
A,"DEVICES FOR ADMINISTRATION, WITHDRAWAL AND COLLECTION",A01010199,HYPODERMIC NEEDLES - OTHER,5,YES
A,"DEVICES FOR ADMINISTRATION, WITHDRAWAL AND COLLECTION",A010102,BUTTERFLY NEEDLES,4,NO
A,"DEVICES FOR ADMINISTRATION, WITHDRAWAL AND COLLECTION",A01010201,"BUTTERFLY NEEDLES, WITH?SAFETY SYSTEMS",5,YES
A,"DEVICES FOR ADMINISTRATION, WITHDRAWAL AND COLLECTION",A01010202,"BUTTERFLY NEEDLES, W/O SAFETY SYSTEMS",5,YES
A,"DEVICES FOR ADMINISTRATION, WITHDRAWAL AND COLLECTION",A010103,NEEDLES AND KITS FOR IMPLANTABLE SYSTEMS (PORT),4,NO
A,"DEVICES FOR ADMINISTRATION, WITHDRAWAL AND COLLECTION",A01010301,"NEEDLES AND KITS FOR IMPLANTABLE SYSTEMS (PORT), WITH SAFETY SYSTEMS",5,YES
A,"DEVICES FOR ADMINISTRATION, WITHDRAWAL AND COLLECTION",A01010302,"NEEDLES AND KITS FOR IMPLANTABLE SYSTEMS (PORT), W/O SAFETY SYSTEMS",5,YES
A,"DEVICES FOR ADMINISTRATION, WITHDRAWAL AND COLLECTION",A010104,NEEDLES FOR VIAL COLLECTION  ,4,YES
A,"DEVICES FOR ADMINISTRATION, WITHDRAWAL AND COLLECTION",A010105,NEEDLES FOR COLLECTION UNDER VACUUM,4,NO
A,"DEVICES FOR ADMINISTRATION, WITHDRAWAL AND COLLECTION",A01010501,"NEEDLES FOR COLLECTION UNDER VACUUM, WITH SAFETY SYSTEMS",5,YES
A,"DEVICES FOR ADMINISTRATION, WITHDRAWAL AND COLLECTION",A01010502,"NEEDLES FOR COLLECTION UNDER VACCUM, W/O SAFETY SYSTEMS",5,YES
A,"DEVICES FOR ADMINISTRATION, WITHDRAWAL AND COLLECTION",A010106,NEEDLES AND KITS FOR RECONSTRUCTIVE FILLING,4,YES`;

export const TRANSLATIONS = {
  [Language.EN]: {
    title: 'FDA GUDID Agentic AI System',
    upload: 'Upload GUDID Dataset',
    summary: 'Dataset Summary',
    chat: 'Agent Chat',
    agents: 'Available Agents',
    style: 'Art Style Selector',
    preview: 'Data Preview',
    download: 'Download Dataset',
    mock: 'Use Mock Data',
    apiKeyPrompt: 'Please enter your Gemini API Key',
    saveKey: 'Save Key',
    processing: 'Processing...',
    followUp: 'Follow-up Questions',
    settings: 'Settings',
    language: 'Language',
    theme: 'Theme',
    model: 'Select Model',
    placeholder: 'Ask the agents about the GUDID data...',
    nlp_analyzer: 'NLP Entity Analyzer',
    anomaly_detector: 'Anomaly Detector',
    duplicate_checker: 'Duplicate Finder',
    label_matcher: 'Label Comparison',
    data_standardizer: 'Data Standardizer',
    adverse_event_linker: 'Adverse Events Linker',
    recall_manager: 'Recall Tracker',
    eifu_manager: 'eIFU Manager',
    customs_verifier: 'Customs Verification',
    international_connector: 'International Sync',
    notes: 'AI Note Keeper',
    emdn: 'EMDN Mapper',
    viz: 'Insights Dashboard',
    jackpot: 'Style Jackpot!',
    aiMagics: 'AI Magics',
    editMode: 'Edit Mode',
    previewMode: 'Preview Mode',
    transform: 'Transform Note',
    mapping: 'Run EMDN Mapping',
    description: 'Description',
    classification: 'Classification'
  },
  [Language.ZH]: {
    title: 'TFDA TUDID 智能代理系統',
    upload: '上傳 TUDID 數據集',
    summary: '數據摘要',
    chat: '代理對話',
    agents: '可用代理',
    style: '藝術風格選擇',
    preview: '數據預覽',
    download: '下載數據集',
    mock: '使用模擬數據',
    apiKeyPrompt: '請輸入您的 Gemini API 金鑰',
    saveKey: '保存金鑰',
    processing: '處理中...',
    followUp: '後續追蹤問題',
    settings: '設置',
    language: '語言',
    theme: '主題',
    model: '選擇模型',
    placeholder: '詢問代理關於 TUDID 數據的問題...',
    nlp_analyzer: 'NLP 實體分析',
    anomaly_detector: '異常檢測器',
    duplicate_checker: '重複項查找',
    label_matcher: '標籤比對',
    data_standardizer: '數據標準化',
    adverse_event_linker: '不良事件連結',
    recall_manager: '回收追蹤',
    eifu_manager: '電子說明書管理',
    customs_verifier: '海關查驗',
    international_connector: '國際同步',
    notes: 'AI 筆記助手',
    emdn: 'EMDN 對映',
    viz: '洞察儀表板',
    jackpot: '風格大抽獎！',
    aiMagics: 'AI 魔法',
    editMode: '編輯模式',
    previewMode: '預覽模式',
    transform: '轉換筆記',
    mapping: '運行 EMDN 對映',
    description: '描述',
    classification: '分類'
  }
};

export const AGENT_KEYWORDS: Record<AgentType, string[]> = {
  [AgentType.NLP_ANALYZER]: ['entity', 'nlp', 'text', 'analysis', '實體', '分析', '文字'],
  [AgentType.ANOMALY_DETECTOR]: ['anomaly', 'outlier', 'detect', 'check', '異常', '檢測', '異常值'],
  [AgentType.DUPLICATE_CHECKER]: ['duplicate', 'double', 'same', 'repeat', '重複', '相同'],
  [AgentType.LABEL_MATCHER]: ['label', 'compare', 'match', 'ocr', '標籤', '比對'],
  [AgentType.DATA_STANDARDIZER]: ['format', 'standard', 'normalize', '格式', '標準', '正規'],
  [AgentType.ADVERSE_EVENT_LINKER]: ['adverse', 'harm', 'injury', 'report', '不良', '傷害', '事故'],
  [AgentType.RECALL_MANAGER]: ['recall', 'safety', 'warning', 'withdraw', '回收', '警告', '撤回'],
  [AgentType.EIFU_MANAGER]: ['instruction', 'manual', 'eifu', 'document', '說明書', '操作'],
  [AgentType.CUSTOMS_VERIFIER]: ['customs', 'border', 'import', 'export', '海關', '進出口'],
  [AgentType.INTERNATIONAL_CONNECTOR]: ['global', 'sync', 'abroad', 'world', '全球', '同步', '國際']
};
