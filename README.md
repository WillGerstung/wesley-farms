# Wesley Farm Supply Data Platform

A modern, enterprise-grade Next.js application for hosting PowerBI reports and providing access to data applications, templates, and training resources. Built with TypeScript, Tailwind CSS, and shadcn/ui components.

![Next.js](https://img.shields.io/badge/Next.js-15.4.4-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-Latest-black)

## 🚀 Features

- **🎯 Client-Specific Dashboards**: Customized portals for each client with their own reports and branding
- **📊 PowerBI Integration**: Secure embedding with preserved Row-Level Security (RLS)
- **📱 Fully Responsive**: Beautiful on desktop, tablet, and mobile devices
- **🎨 Modern UI**: Professional design using shadcn/ui components
- **🔒 Enterprise Security**: Azure AD integration with role-based access
- **⚡ High Performance**: Built with Next.js 15 and optimized for speed
- **🌓 Dark Mode**: Automatic theme switching based on system preferences

## 📸 Screenshots

### Home Dashboard
- Clean navigation cards with hover effects
- Real-time statistics and metrics
- Featured report preview

### Reports Page
- Sidebar navigation for report selection
- Full PowerBI embedding support
- Quick actions and resource links

### Data Applications
- Categorized app listings with search
- Usage statistics and feature badges
- Direct links to external applications

## 🛠️ Tech Stack

- **Framework**: Next.js 15.4.4 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Authentication**: Azure AD (for PowerBI)
- **PowerBI**: powerbi-client-react
- **Icons**: Lucide React
- **Components**: Radix UI primitives

## 📋 Prerequisites

- Node.js 18.0 or higher
- npm or yarn
- PowerBI Pro/Premium license (for embedding)
- Azure AD access (for authentication)

## 🚀 Quick Start

1. **Clone the repository**
```bash
git clone [your-repo-url]
cd wesley-farms
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file:
```env
# PowerBI Configuration
POWERBI_CLIENT_ID=your-client-id
POWERBI_CLIENT_SECRET=your-client-secret
POWERBI_TENANT_ID=your-tenant-id
POWERBI_WORKSPACE_ID=your-workspace-id

# Optional: API Keys
NEXT_PUBLIC_API_URL=your-api-url
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 PowerBI Security

The platform maintains all PowerBI security features:

- ✅ **Row-Level Security (RLS)** is preserved
- ✅ **Workspace permissions** are enforced
- ✅ **Dataset security** remains intact
- ✅ **User context** is properly passed through

See [PowerBI Setup Guide](./docs/POWERBI_SETUP.md) for detailed configuration.

## 🏗️ Project Structure

```
wesley-farms/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes
│   │   └── powerbi/         # PowerBI token generation
│   ├── config/              # Client configurations
│   ├── reports/             # Reports page
│   ├── data-apps/           # Data applications page
│   ├── templates/           # Templates page
│   ├── training/            # Training page
│   ├── support/             # Support page
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Home page
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── site-header.tsx      # Main navigation
│   └── powerbi-embed.tsx    # PowerBI wrapper
├── lib/                     # Utilities
├── docs/                    # Documentation
└── public/                  # Static assets
```

## 🎨 UI Components

The application uses shadcn/ui components for a consistent, professional look:

- **Button**: Various styles (default, outline, ghost, destructive)
- **Card**: Content containers with headers and actions
- **Badge**: Status indicators and labels
- **Tabs**: Content organization
- **Progress**: Visual progress indicators
- **Navigation Menu**: Responsive navigation
- **Separator**: Visual dividers

## 🔧 Configuration

### Client Setup

Edit `app/config/clients.ts`:

```typescript
export const clientConfig: ClientConfig = {
  id: "client-id",
  name: "Client Name",
  theme: {
    primaryColor: "#2b2d42",
    secondaryColor: "#8b8c89",
  },
  reports: [
    {
      name: "Sales Dashboard",
      embedUrl: "powerbi-embed-url",
      description: "Monthly sales metrics",
    }
  ],
  dataApps: [
    {
      name: "Analytics Tool",
      link: "https://app-url.com",
      category: "Analytics",
    }
  ]
};
```

### PowerBI Authentication Modes

1. **App-Only Authentication** (Recommended for internal apps)
   - Service principal authentication
   - No user context required
   - Best for trusted environments

2. **User-Based Authentication**
   - Individual user authentication
   - Respects PowerBI permissions
   - RLS based on user identity

3. **Master User Authentication**
   - Single account for all embeds
   - Programmatic RLS application
   - Best for customer-facing apps

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm ci --only=production
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Environment Variables for Production
- Set all `.env.local` variables in your hosting platform
- Enable HTTPS for secure PowerBI embedding
- Configure CORS for API endpoints

## 🧪 Testing

```bash
# Run linting
npm run lint

# Type checking
npm run type-check

# Build test
npm run build
```

## 📈 Performance Optimization

- Images optimized with Next.js Image component
- Lazy loading for heavy components
- PowerBI reports load on-demand
- Static generation where possible
- Edge runtime for API routes

## 🔒 Security Best Practices

1. **Never expose credentials in client code**
2. **Use environment variables for secrets**
3. **Implement proper CORS policies**
4. **Rotate Azure AD secrets regularly**
5. **Monitor access logs**
6. **Use HTTPS in production**

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 Code Style

- Follow TypeScript best practices
- Use ESLint and Prettier configurations
- Component files use PascalCase
- Utility files use camelCase
- Keep components small and focused

## 🐛 Troubleshooting

### Common Issues

**PowerBI Not Loading**
- Check Azure AD app permissions
- Verify workspace access rights
- Ensure embed tokens are valid
- Check browser console for errors

**Authentication Errors**
- Verify environment variables
- Check Azure AD configuration
- Ensure admin consent is granted
- Review CORS settings

**Build Errors**
- Clear `.next` directory
- Delete `node_modules` and reinstall
- Check for TypeScript errors
- Verify all imports are correct

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [PowerBI Developer Docs](https://docs.microsoft.com/en-us/power-bi/developer/)
- [Azure AD Authentication](https://docs.microsoft.com/en-us/azure/active-directory/develop/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🎯 Roadmap

- [ ] Add user authentication system
- [ ] Implement favorite reports feature
- [ ] Add report scheduling capabilities
- [ ] Create mobile app version
- [ ] Add multi-language support
- [ ] Implement advanced analytics tracking
- [ ] Add AI-powered insights
- [ ] Create admin dashboard

## 📄 License

This project is proprietary and confidential. All rights reserved.

## 💬 Support

For support, email support@wesleyfarm.com or use the in-app support center.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Powered by [Vercel](https://vercel.com/)

---

<p align="center">Made with ❤️ by Wesley Farm Supply IT Team</p>
