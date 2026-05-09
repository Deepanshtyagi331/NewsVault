# NewsVault - Hacker News Scraper

NewsVault is a full-stack MERN (MongoDB, Express, React, Node.js) application that automatically scrapes the top stories from Hacker News and provides a secure, polished interface for users to browse, search, and bookmark their favorite stories.

## Features

- **Automated Scraping**: Scrapes top 10 stories from Hacker News on server start.
- **Manual Trigger**: Endpoint to manually trigger scraping via `POST /api/scrape`.
- **JWT Authentication**: Secure user registration and login.
- **Story Feed**: Browse stories with points, author, and timestamp.
- **Bookmarks**: Logged-in users can toggle bookmarks that persist in the database.
- **Pagination**: Supports paginated story fetching for optimal performance.
- **Responsive Design**: Premium dark-mode UI built with vanilla CSS.

## Tech Stack

- **Frontend**: React (Vite), Axios, React Context API, React Router.
- **Backend**: Node.js, Express, Cheerio (Scraping), JWT (Auth), Bcrypt.
- **Database**: MongoDB (Mongoose).

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (running locally or via Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Deepanshtyagi331/NewsVault.git
   cd NewsVault
   ```

2. Install Backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install Frontend dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

### Configuration

Create a `.env` file in the `backend` directory:
```env
MONGODB_URI=mongodb://localhost:27017/newsvault
PORT=5000
JWT_SECRET=your_jwt_secret
```

Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

### Running Locally

1. Start the Backend server:
   ```bash
   cd backend
   npm start
   ```

2. Start the Frontend development server:
   ```bash
   cd frontend
   npm run dev
   ```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Stories
- `GET /api/stories` - Get all stories (paginated)
- `GET /api/stories/:id` - Get single story details
- `POST /api/stories/:id/bookmark` - Toggle bookmark (requires JWT)
- `GET /api/stories/bookmarks` - Get user bookmarks (requires JWT)

### Scraper
- `POST /api/scrape` - Manually trigger Hacker News scraping
