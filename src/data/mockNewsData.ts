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
  AB: string;
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
  TI: "Mobile bankers left vulnerable: 47% of UK consumers manage finances on insecure smartphones",
  AB: "Mobile bankers left vulnerable: 47% of UK consumers manage finances on insecure smartphones\nAugust 2020 by Kaspersky\nNew research has revealed that UK consumers carry out online banking on smartphones and devices that are potentially vulnerable to a security breach, despite making sure they keep their desktop or laptop computers safe. In a study commissioned by Kaspersky, nearly half (47%) of smartphone owners who use a banking app don't protect their mobile device with antivirus or security software...",
  URL: "https://www.globalsecuritymag.com/Mobile-bankers-left-vulnerable-47,20200819,101944.html",
  DP: "2025-03-06T21:00:00",
  DOM: "globalsecuritymag.com",
  SENT: "negative",
  LANG: "en",
  AU: ["Emily C.", "Taormina A."],
  FAV: "/favicon.png", 
  KW: [
    { value: "antivirus", count: 10 },
    { value: "kaspersky", count: 5 },
    { value: "security", count: 8 },
    { value: "banking", count: 3 },
  ],
  HIGHLIGHTS: [
    "...20 by <kw>Kaspersky</kw> research has revealed that UK consumers carry out online banking on smartphones...",
    "...with <kw>antivirus</kw> or security software. More than half (52%) of UK smartphone owners...",
  ],
  REACH: 2392,
  CNTR: "France",
  CNTR_CODE: "fr",
  TRAFFIC: [
    { value: "India", count: 0.779 },
    { value: "United States", count: 0.101 },
    { value: "Mexico", count: 0.036 },
  ],
  DUPLICATES: 192,
};