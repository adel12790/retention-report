# Salon Retention Report

A full-stack application for analyzing client retention in salon businesses. The application consists of a Node.js/Express backend with TypeScript and an Angular frontend.

## Prerequisites

- Node.js v22.12.0 (use nvm for version management)
- npm or yarn package manager
- SQLite3 (included with Node.js dependencies)

## Project Structure

```
retention-report/
├── backend/           # Node.js/Express API server
├── frontend/          # Angular web application
└── README.md         # This file
```

## Getting Started

### 1. Backend Setup

Navigate to the backend directory and follow these steps:

```bash
cd backend
```

#### Install Dependencies

```bash
npm install
```

#### Environment Configuration (Optional)

Create a `.env` file in the backend directory if you want to customize settings:

```bash
# Optional environment variables
PORT=3000
DB_PATH=./salon.sqlite
NODE_ENV=development
```

#### Development Mode

Start the backend server in development mode with hot reload:

```bash
npm run dev
```

The server will start on `http://localhost:3000`

#### Production Mode

To build and run in production:

```bash
npm run build
npm start
```

#### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run test` - Run tests with Vitest
- `npm run type-check` - Type check without compilation

### 2. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

#### Install Dependencies

```bash
npm install
```

#### Development Mode

Start the Angular development server:

```bash
npm start
```

The application will be available at `http://localhost:4200`

#### Production Build

To build for production:

```bash
npm run build
```

#### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run watch` - Build and watch for changes

## API Endpoints

The backend provides the following API endpoints:

### Base URL
```
http://localhost:3000/api
```

### Endpoints

- `GET /api` - API information and available endpoints
- `GET /api/retention?referenceMonth=YYYY-MM&monthsToTrack=3` - Get retention report data

#### Example API Usage

```bash
# Get retention data for March 2024, tracking 3 months
curl "http://localhost:3000/api/retention?referenceMonth=2024-03&monthsToTrack=3"
```

## Application Features

- **Client Retention Analysis**: Track client return patterns over specified time periods
- **Flexible Date Ranges**: Configure reference month and tracking duration
- **Modern UI**: Angular Material-based interface with responsive design
- **Real-time Data**: Live updates with backend API integration

## Development Workflow

1. **Start Backend First**: Always start the backend server before the frontend
2. **Check API Connection**: Verify the backend is running on port 3000
3. **Start Frontend**: Launch the Angular development server
4. **Development**: Both servers support hot reload for rapid development

## Troubleshooting

### Backend Issues

- **Port already in use**: Change the PORT in `.env` or kill the existing process
- **Database errors**: Ensure `salon.sqlite` exists and has proper permissions
- **TypeScript errors**: Run `npm run type-check` to identify issues

### Frontend Issues

- **API connection errors**: Verify backend is running on `http://localhost:3000`
- **Node version mismatch**: Use `nvm use` to switch to Node.js v22.12.0
- **Module not found**: Run `npm install` to ensure all dependencies are installed

### Common Solutions

1. **Clear node_modules**: Delete `node_modules` and `package-lock.json`, then run `npm install`
2. **Check Node version**: Use `node --version` to verify you're using v22.12.0
3. **Port conflicts**: Use different ports if 3000 or 4200 are occupied

## Technology Stack

### Backend
- Node.js v22.12.0
- Express.js
- TypeScript
- SQLite3
- CORS, Helmet, Morgan middleware
- Vitest for testing

### Frontend
- Angular 20
- Angular Material
- TypeScript
- SCSS
- RxJS
- Jasmine/Karma for testing

