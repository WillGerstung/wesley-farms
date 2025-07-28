// Client configuration
// This file contains all client-specific settings including PowerBI reports, links, and branding

export interface ClientConfig {
  id: string;
  name: string;
  logo?: string;
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
  };
  reports: Array<{
    id: string;
    name: string;
    description: string;
    reportId: string; // PowerBI Report ID
    workspaceId: string; // PowerBI Workspace ID
    category?: string;
  }>;
  dataApps: Array<{
    name: string;
    description: string;
    link: string;
    icon: string;
    category: string;
  }>;
  quickLinks?: Array<{
    name: string;
    url: string;
    icon?: string;
  }>;
}

// Example configuration for Wesley Farm Supply
export const wesleyFarmConfig: ClientConfig = {
  id: "wesley-farm-supply",
  name: "Wesley Farm Supply",
  theme: {
    primaryColor: "#2b2d42",
    secondaryColor: "#8b8c89",
  },
  reports: [
    {
      id: "sales-dashboard",
      name: "Sales Dashboard",
      description: "Monthly sales performance and analytics",
      reportId: "YOUR_ACTUAL_REPORT_ID_HERE", // Replace with your report ID
      workspaceId: "YOUR_ACTUAL_WORKSPACE_ID_HERE", // Replace with your workspace ID
      category: "Sales",
    },
    {
      id: "inventory-report",
      name: "Inventory Report",
      description: "Current inventory levels and trends",
      reportId: "YOUR_ACTUAL_REPORT_ID_HERE_2", // Replace with your report ID
      workspaceId: "YOUR_ACTUAL_WORKSPACE_ID_HERE", // Replace with your workspace ID
      category: "Operations",
    },
    {
      id: "financial-overview",
      name: "Financial Overview",
      description: "Financial metrics and KPIs",
      reportId: "YOUR_ACTUAL_REPORT_ID_HERE_3", // Replace with your report ID
      workspaceId: "YOUR_ACTUAL_WORKSPACE_ID_HERE", // Replace with your workspace ID
      category: "Finance",
    },
  ],
  dataApps: [
    {
      name: "Sales Analytics Dashboard",
      description: "Interactive dashboard for analyzing sales trends and performance",
      link: "https://your-sales-app.com",
      icon: "📊",
      category: "Analytics",
    },
    {
      name: "Inventory Management System",
      description: "Real-time inventory tracking and management application",
      link: "https://your-inventory-app.com",
      icon: "📦",
      category: "Operations",
    },
    {
      name: "Customer Insights Portal",
      description: "Comprehensive customer data analysis and segmentation",
      link: "https://your-customer-app.com",
      icon: "👥",
      category: "CRM",
    },
    {
      name: "Financial Forecasting Tool",
      description: "Advanced financial modeling and forecasting application",
      link: "https://your-finance-app.com",
      icon: "💰",
      category: "Finance",
    },
  ],
  quickLinks: [
    {
      name: "Power BI Desktop",
      url: "https://powerbi.microsoft.com/desktop/",
      icon: "📊",
    },
    {
      name: "Report Documentation",
      url: "/docs/reports",
      icon: "📚",
    },
    {
      name: "Refresh Schedule",
      url: "/schedule",
      icon: "🔄",
    },
  ],
};

// You can add more client configurations here
export const clientConfigs: Record<string, ClientConfig> = {
  "wesley-farm-supply": wesleyFarmConfig,
  // Add more clients as needed
};

// Helper function to get client config
export function getClientConfig(clientId: string): ClientConfig | null {
  return clientConfigs[clientId] || null;
}
