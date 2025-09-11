AyurSutra – Local Setup Guide

Follow these steps to set up and run the project locally:

1. Create New React App

```bash
# Create a new Vite + React project
npm create vite@latest ayurSutra
# Select options:
# Framework: React
# Variant: JavaScript
cd ayurSutra
```

2. Install Dependencies

```bash
#Core Dependencies
npm install @clerk/clerk-react react-router-dom axios
#UI Components (shadcn/ui)
# Initialize shadcn
npx shadcn@latest init
# Choose base color → Neutral
# Add all shadcn/ui components
npx shadcn@latest add --all
#Additional UI Libraries
npm install class-variance-authority clsx cmdk date-fns embla-carousel-react input-otp lucide-react next-themes react-day-picker react-hook-form react-resizable-panels sonner tailwind-merge tailwindcss-animate vaul zod
#Tailwind CSS Setup
npm install tailwindcss @tailwindcss/vite
npm install -D @types/node
```

3. Environment Variables

```bash
#Create a .env file in the root directory and add your Clerk API key:
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
```

4. Run the Project

```bash
# Start the local development server
npm run dev
```

The app will be available at:
👉 http://localhost:5173/

You’re now ready to start building and running the project!
