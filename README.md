﻿# To-Do-List
## 🚀 Quick Start

### Backend Setup
```bash
cd server
npm install
echo "MONGO_URI=mongodb://localhost:27017/todolist
JWT_SECRET=your_secret_here
CLIENT_URL=http://localhost:5173" > .env
npm start
```

### Frontend Setup
```bash
cd client
npm install
npm run dev
```

## 🌐 API Endpoints
| Method | Endpoint           | Description          |
|--------|--------------------|----------------------|
| POST   | /auth/register     | Register user        |
| POST   | /auth/login        | Login user           |
| GET    | /tasks             | Get all tasks        |
| POST   | /tasks             | Create task          |

## 📁 Project Structure
```
.
todolist/
├── client/               # Frontend code
│   ├── public/
│   ├── src/
│   └── vite.config.ts
├── server/               # Backend code
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
└── README.md
```

## 🔧 Environment Variables
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret for JWT tokens
- `CLIENT_URL`: Frontend URL (for CORS)
