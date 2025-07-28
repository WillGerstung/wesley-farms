"use client";

interface PowerBIEmbedProps {
  embedUrl: string;
  height?: string;
  width?: string;
}

export default function PowerBIEmbed({ 
  embedUrl, 
  height = "600px", 
  width = "100%" 
}: PowerBIEmbedProps) {
  // Note: This is a simplified version. For production, you'll need to implement
  // proper PowerBI authentication using the PowerBI JavaScript SDK
  
  return (
    <div className="powerbi-container">
      <div className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center" style={{ height, width }}>
        <div className="text-center p-8">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            PowerBI Report Placeholder
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            To embed PowerBI reports, you'll need to:
          </p>
          <ol className="text-sm text-gray-500 dark:text-gray-500 text-left mt-2 space-y-1">
            <li>1. Install the PowerBI client library</li>
            <li>2. Configure authentication</li>
            <li>3. Update this component with your embed token</li>
          </ol>
        </div>
      </div>
      
      {/* This is where the actual iframe would go once configured */}
      {/* <iframe
        src={embedUrl}
        style={{ height, width }}
        frameBorder="0"
        allowFullScreen
        className="rounded-lg"
      /> */}
    </div>
  );
}
