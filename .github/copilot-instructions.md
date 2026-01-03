# AI Coding Agent Instructions for Academic Portfolio Project

## Project Overview
This is a React-based academic portfolio website that dynamically loads faculty information from Google Sheets. Built with TypeScript, Vite, and Tailwind CSS, featuring a modern glassmorphism design with emerald/teal theming.

## Architecture & Data Flow
- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom emerald/teal color palette and glassmorphism effects
- **Data Source**: Google Sheets exported as CSV via Papa Parse
- **Animations**: Framer Motion for smooth transitions
- **Build Tool**: Vite with TypeScript compilation

### Key Components
- `App.tsx`: Main orchestrator, handles data loading and section filtering
- `Hero.tsx`: Landing section with profile photo, stats, and social links
- `Section.tsx`: Generic table component for displaying sheet data
- `ResearchPublications.tsx`: Specialized component combining journals, conferences, books, and projects
- `usePortfolioData.ts`: Custom hook for parallel data fetching from multiple sheets

### Data Management
- Sheet configurations in `src/config/sheets.ts` with IDs and display titles
- Parallel fetching of 18+ sheets using Promise.all
- Automatic filtering of empty sections (no data or all empty rows)
- Type-safe data handling with `PortfolioData` interface

## Development Workflow
```bash
npm install          # Install dependencies
npm run dev         # Start dev server (http://localhost:5173)
npm run build       # Production build
npm run lint        # ESLint checking
npx tsc --noEmit    # TypeScript type checking
```

## Coding Patterns & Conventions

### Component Structure
- Functional components with TypeScript interfaces for props
- Framer Motion `motion.div` for animations with consistent easing
- Responsive design using Tailwind's mobile-first approach
- Glassmorphism cards with `glass-card` class for consistent styling

### Data Handling
- All data fetched as `Record<string, string>[]` from CSV parsing
- Empty row filtering: `rows.filter(r => Object.values(r).some(v => v))`
- Safe property access with optional chaining and fallbacks
- Parallel data loading with error handling

### Styling Approach
- Custom emerald/teal color palette defined in `tailwind.config.js`
- CSS custom properties for gradients, shadows, and glass effects
- Utility classes like `btn-premium`, `glass-card`, `mesh-gradient`
- Inter font family for body text, Playfair Display for headings

### Sheet Integration
- Google Sheets must be publicly accessible ("Anyone with link can view")
- CSV export URL format: `https://docs.google.com/spreadsheets/d/{SHEET_ID}/export?format=csv`
- Sheet IDs configured in `SHEET_IDS` object
- Display titles in `SECTION_TITLES` with same keys

## Common Tasks

### Adding New Sections
1. Add sheet ID to `SHEET_IDS` in `src/config/sheets.ts`
2. Add display title to `SECTION_TITLES` (same key)
3. Optionally exclude from `sectionsToRender` in `App.tsx` if handled specially
4. Update `PortfolioData` type automatically inferred from `SHEET_IDS`

### Modifying Publication Stats
- Edit `publicationStats` object in `App.tsx` Hero props
- Add new publication types to `Hero.tsx` interface and display logic
- Ensure corresponding sheet exists in configuration

### Styling Updates
- Colors defined in `tailwind.config.js` and CSS custom properties
- Glass effects use backdrop-filter with consistent blur values
- Animations use `duration: 0.8, ease: "easeOut"` pattern

## Error Handling
- Data loading errors show full-screen error UI with retry button
- Empty data states gracefully hide sections
- Network failures logged to console with fallback to empty arrays
- TypeScript strict mode prevents runtime errors

## Performance Considerations
- Parallel sheet fetching reduces load time
- Lazy loading not implemented (small app, all data needed)
- Images use Google Drive thumbnail URLs for optimization
- Minimal bundle with tree-shaking enabled

## Deployment
- Built for static hosting (Vercel, Netlify, etc.)
- No server-side rendering required
- Environment variables not used (all config in code)
- Google Sheets must remain publicly accessible