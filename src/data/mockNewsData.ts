export interface IData_TagItem {
  value: string;
  count: number;
}

export interface IData_TrafficItem {
  value: string;
  count: number;
}

export interface IData_SnippetNews {
  ID: number;
  TI: string;
  URL: string;
  DOM: string;
  DP: string; 
  LANG: string;
  REACH: number;
  KW: IData_TagItem[];
  AU: string[];
  CNTR: string;
  CNTR_CODE: string;
  SENT: string; 
  TRAFFIC: IData_TrafficItem[];
  FAV?: string;
  HIGHLIGHTS: string[]; 
  DUPLICATES?: number;
}

export const mockData: IData_SnippetNews = {
  ID: 260855433,
  TI: "Antivirus leggero: i migliori e più efficaci (free e a pagamento) 2024",
  URL: "#",
  DOM: "punto-info.it",
  DP: "2024-06-18T21:00:00", 
  LANG: "en",
  REACH: 211000, 
  KW: [
    { value: "AutoPilot 5000", count: 5 },
    { value: "InnovTech", count: 5 },
    { value: "autonomous driving", count: 5 },
    { value: "key word", count: 3 },
    { value: "security", count: 7 },
    { value: "software", count: 4 },
    { value: "technology", count: 6 },
    { value: "Kaspersky", count: 1 }, 
  ],
  AU: ["Emily C.", "Taormina A.", "John D.", "Maria S."], 
  CNTR: "Austria",
  CNTR_CODE: "at", 
  SENT: "positive",
  TRAFFIC: [
    { value: "Austria", count: 0.38 },
    { value: "USA", count: 0.12 },
    { value: "Italian", count: 0.08 },
    { value: "Germany", count: 0.05 },
    { value: "France", count: 0.03 },
  ],
  FAV: "#", 
  HIGHLIGHTS: [
    "...leading innovator in <kw>InnovTech</kw> in <kw>autonomous driving</kw> technology...",
    "This next-generation <kw>autonomous driving</kw> solution promises to revolutionize the way...",
    "The <kw>AutoPilot 5000</kw> utilizes advanced artificial intelligence and machine learning...",
    "Early testing has shown remarkable results, with the <kw>AutoPilot 5000</kw> demonstr...",
    "InnovTech believes the <kw>AutoPilot 5000</kw> represents a significant leap...",
    "This is a longer piece of text to demonstrate the 'Show more' functionality. It should contain enough content to trigger the expansion and show more highlighted words, allowing for a better representation of the full news snippet." 
  ],
  DUPLICATES: 192,
};
