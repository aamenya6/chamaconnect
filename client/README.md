# ChamaConnect Client

React frontend for the chama management platform. Built with Vite, React Router, and Tailwind CSS.

## Stack

- React 19 with Vite
- React Router v7
- Tailwind CSS
- Lucide Icons
- Axios

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env`:

   ```
   VITE_API_URL=http://localhost:5000/api
   ```

3. Run dev server:

   ```bash
   npm run dev
   ```

   Server runs on `http://localhost:5173`

4. Build for production:
   ```bash
   npm run build
   ```

## Folder Structure

- `src/pages/` - Page components (organized by auth/app/public)
- `src/components/` - Reusable components and layouts
- `src/lib/` - API client, auth helpers, theme utilities
- `src/assets/` - Images and static files

## Pages

**Public**

- Landing - Homepage

**Auth**

- Login
- Register

**App** (Protected routes)

- Dashboard - Overview
- Chamas - List user's groups
- CreateChama - Create new group
- JoinChama - Join via invite code
- ChamaDetails - View group details
- Contributions - Track member payments
- Members - Manage group members
- Meetings - Schedule and view meetings
- Notifications - View alerts
- Profile - User settings

## Components

**UI** (`src/components/ui/`)

- Button
- Input
- Textarea
- Card

**Layout**

- Sidebar (desktop nav)
- BottomNav (mobile nav)
- ThemeToggle (light/dark)

## Features

- Light/dark theme with system preference detection
- Responsive design (desktop + mobile)
- JWT authentication with auto token injection
- Protected routes
- Form validation and error handling

## Scripts

```bash
npm run dev      # dev server
npm run build    # production build
npm run preview  # preview build
npm run lint     # run linter
```

## Auth

Uses JWT tokens stored in localStorage. Auth flow:

1. Register or login to get token
2. Token auto-included in all API requests
3. Protected routes redirect to login if no token

## API

Communicates with backend at `http://localhost:5000/api` (configurable via `VITE_API_URL`).

## License

Copyright <2026> <ABEL NYARUNDA>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
