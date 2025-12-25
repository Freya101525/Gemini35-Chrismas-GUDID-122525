
export enum Language {
  EN = 'en',
  ZH = 'zh'
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark'
}

export enum AgentType {
  NLP_ANALYZER = 'nlp_analyzer',
  ANOMALY_DETECTOR = 'anomaly_detector',
  DUPLICATE_CHECKER = 'duplicate_checker',
  LABEL_MATCHER = 'label_matcher',
  DATA_STANDARDIZER = 'data_standardizer',
  ADVERSE_EVENT_LINKER = 'adverse_event_linker',
  RECALL_MANAGER = 'recall_manager',
  EIFU_MANAGER = 'eifu_manager',
  CUSTOMS_VERIFIER = 'customs_verifier',
  INTERNATIONAL_CONNECTOR = 'international_connector'
}

export interface PainterStyle {
  id: string;
  name: string;
  artist: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export interface GUDIDRecord {
  device_id: string;
  brand_name: string;
  model_number: string;
  manufacturer: string;
  status: string;
  gudid_version: string;
  created_at: string;
  device_description: string;
  classification_number: string;
}

export interface EMDNRecord {
  category: string;
  description: string;
  code: string;
  term: string;
  level: string;
  terminal: string;
}

export interface EMDNMappingResult extends GUDIDRecord {
  emdn_item: string;
  emdn_code: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  agent?: AgentType;
  timestamp: string;
}

export interface AnalysisResult {
  summary: string;
  followUpQuestions: string[];
  chartData: {
    labels: string[];
    values: number[];
    title: string;
    type: 'bar' | 'pie' | 'line';
  }[];
}

export interface AINote {
  rawText: string;
  processedMarkdown: string;
  id: string;
  title: string;
  updatedAt: string;
}
