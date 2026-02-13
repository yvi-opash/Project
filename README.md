# Admin Panel

A React + TypeScript admin panel application with user management, authentication, and analytics dashboard.

## Features

- **Authentication System**
  - User login/signup with role-based access (Admin/User)
  - Separate dashboards for Admin and User roles

- **Admin Dashboard**
  - User statistics and analytics
  - Age group distribution charts (Bar & Pie charts)
  - Real-time user count tracking

- **User Management**
  - View all registered users
  - Search/filter users by name, email, age, city, country, or role
  - Edit user information inline
  - Delete users
  - Real-time search with instant results

- **Responsive UI**
  - Material-UI components
  - Custom styled forms and tables
  - Fixed header and footer

## Tech Stack

- React 19
- TypeScript
- Vite
- Material-UI (MUI)
- React Router DOM
- Chart.js & React-Chartjs-2
- Local Storage for data persistence

## Installation

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

## Build for Production

```bash
npm run build
```

## Project Structure

```
src/
├── Pages/
│   ├── Login.tsx          # Login page
│   ├── Signup.tsx         # User registration
│   ├── Admin_Home.tsx     # Admin dashboard with charts
│   ├── User_Home.tsx      # User dashboard
│   └── Userlist.tsx       # User management table
├── components/
│   ├── Header.tsx         # Navigation header
│   └── Footer.tsx         # Footer component
├── App.tsx                # Main app with routing
└── main.tsx              # Entry point
```

## Routes

- `/` - Login page
- `/signup` - Registration page
- `/admin-home` - Admin dashboard
- `/user-home` - User dashboard
- `/users` - User management (Admin only)

## Default Credentials

Create an account with role selection during signup.

## Features in Detail

### Search Functionality
- Real-time search across all user fields
- Clear button to reset search
- "No results" message for empty searches

### User Editing
- Click "Edit" to modify user details
- Save or Cancel changes
- Updates persist in localStorage

### Analytics Dashboard
- Total users and admins count
- Age group distribution bar chart
- User vs Admin pie chart
- System status indicator

## License

MIT
