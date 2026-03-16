# Coffee Shop Website

This project is a premium coffee shop landing page built with React, Vite, and Tailwind CSS.

## Deployment on Vercel

To deploy this project on Vercel, follow these steps:

1. **Push to GitHub**: Push your code to a GitHub repository.
2. **Import to Vercel**:
   - Go to [Vercel](https://vercel.com).
   - Click "Add New" -> "Project".
   - Import your GitHub repository.
3. **Configure Build Settings**:
   - Vercel should automatically detect **Vite**.
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
4. **Environment Variables**:
   - If you use any Gemini AI features, add `GEMINI_API_KEY` to the **Environment Variables** section in Vercel.
5. **Deploy**: Click "Deploy".

## Local Development

```bash
npm install
npm run dev
```

## Features

- Responsive design
- Animated transitions with Framer Motion
- Shopping cart functionality
- Testimonials slider
- Contact form
