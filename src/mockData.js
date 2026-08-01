// Enhanced Mock Data for Cellcard Enterprise Platform

export const INITIAL_DASHBOARD_STATS = {
  "Last 7 Days": {
    totalConsents: "45,230",
    totalTrend: "19.6%",
    totalIsUp: true,
    optInRate: "67.4%",
    optInTrend: "19.6%",
    optInIsUp: false,
    optOutRate: "32.6%",
    optOutTrend: "19.6%",
    optOutIsUp: true,
    activeConsents: "30,485",
    activeTrend: "19.6%",
    activeIsUp: false,
    chartData: [
      { category: "Connectivity", optIn: 2150, optOut: 980 },
      { category: "Location Insight", optIn: 1520, optOut: 1750 },
      { category: "Web/App Insight", optIn: 1530, optOut: 1640 }
    ],
    timelineData: [
      { day: "Mon", optIn: 4100, optOut: 1900 },
      { day: "Tue", optIn: 5200, optOut: 2100 },
      { day: "Wed", optIn: 6800, optOut: 2400 },
      { day: "Thu", optIn: 5900, optOut: 2200 },
      { day: "Fri", optIn: 7400, optOut: 2800 },
      { day: "Sat", optIn: 8200, optOut: 3100 },
      { day: "Sun", optIn: 7600, optOut: 2900 }
    ],
    regionalData: [
      { region: "Phnom Penh", percentage: 54, count: "24,424" },
      { region: "Siem Reap", percentage: 18, count: "8,141" },
      { region: "Battambang", percentage: 14, count: "6,332" },
      { region: "Sihanoukville", percentage: 9, count: "4,070" },
      { region: "Kampong Cham", percentage: 5, count: "2,263" }
    ]
  },
  "Last 30 Days": {
    totalConsents: "184,910",
    totalTrend: "24.2%",
    totalIsUp: true,
    optInRate: "71.2%",
    optInTrend: "12.4%",
    optInIsUp: true,
    optOutRate: "28.8%",
    optOutTrend: "12.4%",
    optOutIsUp: false,
    activeConsents: "131,655",
    activeTrend: "18.9%",
    activeIsUp: true,
    chartData: [
      { category: "Connectivity", optIn: 8900, optOut: 3600 },
      { category: "Location Insight", optIn: 6400, optOut: 5100 },
      { category: "Web/App Insight", optIn: 7200, optOut: 4800 }
    ],
    timelineData: [
      { day: "Week 1", optIn: 28000, optOut: 11000 },
      { day: "Week 2", optIn: 34000, optOut: 13000 },
      { day: "Week 3", optIn: 39000, optOut: 14000 },
      { day: "Week 4", optIn: 41000, optOut: 15000 }
    ],
    regionalData: [
      { region: "Phnom Penh", percentage: 52, count: "96,153" },
      { region: "Siem Reap", percentage: 20, count: "36,982" },
      { region: "Battambang", percentage: 13, count: "24,038" },
      { region: "Sihanoukville", percentage: 10, count: "18,491" },
      { region: "Kampong Cham", percentage: 5, count: "9,246" }
    ]
  },
  "Last 90 Days": {
    totalConsents: "520,400",
    totalTrend: "31.0%",
    totalIsUp: true,
    optInRate: "69.5%",
    optInTrend: "5.1%",
    optInIsUp: true,
    optOutRate: "30.5%",
    optOutTrend: "5.1%",
    optOutIsUp: false,
    activeConsents: "361,678",
    activeTrend: "22.5%",
    activeIsUp: true,
    chartData: [
      { category: "Connectivity", optIn: 24500, optOut: 11200 },
      { category: "Location Insight", optIn: 18900, optOut: 14600 },
      { category: "Web/App Insight", optIn: 21000, optOut: 13900 }
    ],
    timelineData: [
      { day: "Month 1", optIn: 110000, optOut: 48000 },
      { day: "Month 2", optIn: 125000, optOut: 52000 },
      { day: "Month 3", optIn: 138000, optOut: 57000 }
    ],
    regionalData: [
      { region: "Phnom Penh", percentage: 55, count: "286,220" },
      { region: "Siem Reap", percentage: 17, count: "88,468" },
      { region: "Battambang", percentage: 14, count: "72,856" },
      { region: "Sihanoukville", percentage: 9, count: "46,836" },
      { region: "Kampong Cham", percentage: 5, count: "26,020" }
    ]
  }
};

export const INITIAL_PENDING_COMPANIES = [
  {
    id: "COMP-P1",
    fullName: "Makara Chan",
    companyName: "Wing Bank",
    companyEmail: "chan.makara@wing.com.kh",
    industry: "Financial",
    companyPhone: "+855 23 456 456",
    companyAddress: "#23, Street 327, Phnom Penh",
    status: "Pending",
    registeredDate: "2026-07-28",
    taxId: "K002-901827461",
    apiKeys: []
  },
  {
    id: "COMP-P2",
    fullName: "Kolab Sros",
    companyName: "Wat Phnom Shop",
    companyEmail: "sroskolab@watphnom.com",
    industry: "Food & Beverage",
    companyPhone: "+855 23 456 121",
    companyAddress: "#19, Street 21, Siem Reap",
    status: "Pending",
    registeredDate: "2026-07-30",
    taxId: "K009-881273615",
    apiKeys: []
  }
];

export const INITIAL_REGISTERED_COMPANIES = [
  {
    id: "COMP-R1",
    fullName: "Sophea Nguon",
    companyName: "Acleda Bank Plc",
    companyEmail: "sophea.n@acledabank.com.kh",
    industry: "Banking & Finance",
    companyPhone: "+855 23 999 000",
    companyAddress: "#61, Preah Monivong Blvd, Phnom Penh",
    status: "Registered",
    registeredDate: "2026-01-15",
    taxId: "K001-102938475",
    apiKeys: [
      { id: "key-1", name: "Production Key", key: "cellcard_live_9a8f7e6d5c4b3a21", created: "2026-01-16", status: "Active" },
      { id: "key-2", name: "Sandbox Testing", key: "cellcard_test_1122334455667788", created: "2026-01-16", status: "Active" }
    ]
  },
  {
    id: "COMP-R2",
    fullName: "Rithy Vong",
    companyName: "Chip Mong Group",
    companyEmail: "vong.rithy@chipmong.com",
    industry: "Retail & Construction",
    companyPhone: "+855 23 888 111",
    companyAddress: "#137B, Mao Tse Toung Blvd, Phnom Penh",
    status: "Registered",
    registeredDate: "2026-02-10",
    taxId: "K004-556677889",
    apiKeys: [
      { id: "key-3", name: "Main API Key", key: "cellcard_live_f8e7d6c5b4a39281", created: "2026-02-11", status: "Active" }
    ]
  },
  {
    id: "COMP-R3",
    fullName: "Vannak Sok",
    companyName: "Smart Axiata Co.",
    companyEmail: "sok.vannak@smart.com.kh",
    industry: "Telecommunications",
    companyPhone: "+855 10 200 300",
    companyAddress: "#464A, Monivong Blvd, Phnom Penh",
    status: "Registered",
    registeredDate: "2026-03-04",
    taxId: "K003-334455667",
    apiKeys: [
      { id: "key-4", name: "Telco Interconnect Key", key: "cellcard_live_77889900aabbccdd", created: "2026-03-05", status: "Active" }
    ]
  },
  {
    id: "COMP-R4",
    fullName: "Borey Chea",
    companyName: "Prince Bank Plc",
    companyEmail: "chea.borey@princebank.com.kh",
    industry: "Banking & Finance",
    companyPhone: "+855 23 999 888",
    companyAddress: "#175, Norodom Blvd, Phnom Penh",
    status: "Registered",
    registeredDate: "2026-04-12",
    taxId: "K008-998877665",
    apiKeys: [
      { id: "key-5", name: "Payment Gateway Key", key: "cellcard_live_1234567890abcdef", created: "2026-04-13", status: "Active" }
    ]
  },
  {
    id: "COMP-R5",
    fullName: "Chanta Heng",
    companyName: "Canadia Bank Plc",
    companyEmail: "heng.chanta@canadiabank.com.kh",
    industry: "Banking & Finance",
    companyPhone: "+855 23 215 888",
    companyAddress: "#315, Ang Duong St, Phnom Penh",
    status: "Registered",
    registeredDate: "2026-05-20",
    taxId: "K005-443322110",
    apiKeys: [
      { id: "key-6", name: "Live Primary Key", key: "cellcard_live_fedcba0987654321", created: "2026-05-21", status: "Active" }
    ]
  },
  {
    id: "COMP-R6",
    fullName: "Dara Meng",
    companyName: "Metfone (Viettel)",
    companyEmail: "meng.dara@metfone.com.kh",
    industry: "Telecommunications",
    companyPhone: "+855 97 700 800",
    companyAddress: "#199, Mao Tse Toung Blvd, Phnom Penh",
    status: "Registered",
    registeredDate: "2026-06-01",
    taxId: "K007-112233445",
    apiKeys: [
      { id: "key-7", name: "Sms Sync API Key", key: "cellcard_live_abc123xyz890qwerty", created: "2026-06-02", status: "Active" }
    ]
  }
];

export const INITIAL_AUDIT_LOGS = [
  { id: "LOG-1001", timestamp: "2026-08-01 13:24:10", phone: "+855 12 *** 456", category: "Connectivity", action: "Opt-In Granted", channel: "Cellcard App", company: "Wing Bank", ip: "175.100.12.44" },
  { id: "LOG-1002", timestamp: "2026-08-01 13:20:05", phone: "+855 92 *** 881", category: "Location Insight", action: "Opt-In Granted", channel: "Web Portal", company: "Acleda Bank Plc", ip: "175.100.18.99" },
  { id: "LOG-1003", timestamp: "2026-08-01 13:15:42", phone: "+855 77 *** 302", category: "Web/App Insight", action: "Opt-Out Revoked", channel: "USSD / SMS", company: "Chip Mong Group", ip: "203.189.16.12" },
  { id: "LOG-1004", timestamp: "2026-08-01 12:58:30", phone: "+855 17 *** 914", category: "Connectivity", action: "Opt-In Granted", channel: "Cellcard App", company: "Smart Axiata Co.", ip: "175.100.14.02" },
  { id: "LOG-1005", timestamp: "2026-08-01 12:45:11", phone: "+855 89 *** 552", category: "3rd Party Financial", action: "Opt-In Granted", channel: "Partner API", company: "Prince Bank Plc", ip: "119.82.252.18" },
  { id: "LOG-1006", timestamp: "2026-08-01 12:30:00", phone: "+855 61 *** 773", category: "Location Insight", action: "Opt-Out Revoked", channel: "Cellcard App", company: "Canadia Bank Plc", ip: "175.100.19.41" },
  { id: "LOG-1007", timestamp: "2026-08-01 11:55:19", phone: "+855 12 *** 888", category: "Web/App Insight", action: "Opt-In Granted", channel: "Web Portal", company: "Metfone", ip: "203.189.11.05" },
  { id: "LOG-1008", timestamp: "2026-08-01 11:40:22", phone: "+855 95 *** 129", category: "Connectivity", action: "Opt-In Granted", channel: "USSD / SMS", company: "Wing Bank", ip: "175.100.12.80" }
];
