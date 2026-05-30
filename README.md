# internNEXT

**The smarter way to track your internship search.**

internNEXT is a full-stack web application that replaces messy spreadsheets with a purpose-built dashboard for tracking internship applications. Log every application, visualize your pipeline, compare resume performance, and make data-driven decisions about your job search — all in one place.

🔗 **Live at [internnext.com](https://internnext.com)**

---

## Why internNEXT?

Most students track applications in a Google Sheet or Notion table. That works until you hit 50+ applications and want to know your actual interview rate, which resume version performs best, or how your pipeline looks week over week. internNEXT gives you those answers automatically.

---

## Features

### Pipeline Funnel
A custom SVG visualization showing your application flow from Applied → Responded → Interview → Offer, with conversion percentages at each stage.

### Analytics Dashboard
Six real-time metrics computed from your data: total applications, response rate, interview conversion, offer percentage, average reply time, and rejection count.

### Resume Performance Tracking
Track which resume version gets the best results. internNEXT calculates interview+ rate per resume and highlights your top performer — so you know which version to keep using.

### Applications Per Week
A 10-week rolling bar chart showing your application volume over time, helping you stay consistent throughout recruiting season.

### Applications Per Interview
A single metric benchmarked against the industry average (~1 interview per 40 applications) so you can see how your interview rate compares.

### Inline-Editable Table
Add, edit, search, and filter applications without leaving the dashboard. 7 status categories (Applied, OA, Interview, Offer, Rejected, Ghosted) with color-coded badges, sortable columns, and paginated views.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, TypeScript, Tailwind CSS 4 |
| Routing | React Router DOM |
| Backend & Database | Supabase (PostgreSQL) |
| Authentication | Supabase Auth (Email/Password + Google OAuth) |
| UI Components | Radix UI, Lucide React |
| Build Tool | Vite |
| Deployment | Vercel |

---

## Architecture

```
src/
├── components/
│   ├── auth/               # RequireAuth, RedirectIfAuth, AuthLayout, GoogleButton
│   ├── dashboard/          # Navbar
│   ├── landing/            # Hero, Features, StatsBand, DashboardShowcase, SignUpCTA, Footer
│   ├── ui/                 # Button, Input, Label (reusable primitives)
│   ├── ApplicationStats.tsx
│   ├── ApplicationTable.tsx
│   ├── DashboardCharts.tsx
│   └── SearchBox.tsx
├── lib/
│   ├── AuthContext.tsx      # Session provider with auto-refresh
│   └── supabase.ts          # Supabase client configuration
├── pages/
│   ├── auth/               # Login, Signup, ForgotPassword, ResetPassword, VerifyEmail
│   ├── DashboardPage.tsx
│   ├── LandingPage.tsx
│   └── Terms.tsx
├── types/
│   └── application.ts       # Application type + helpers
└── App.tsx                   # Route definitions + auth guards
```

---
