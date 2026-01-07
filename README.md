# Credit Application Simulator

A complete, production-style demo web application for simulating credit applications at a bank. Built with Node.js, TypeScript, Express, React, and Vite.

## 🎯 Features

- **Credit Application Form**: Submit credit applications with personal and financial information
- **Automatic Credit Evaluation**: Smart algorithm that evaluates applications based on:
  - Credit score calculation
  - Debt-to-income ratio
  - Employment stability
  - Purpose of credit
- **Application Management**: View all submitted applications with detailed information
- **Statistics Dashboard**: Real-time analytics and visualizations of application data
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🏗️ Tech Stack

### Backend
- **Node.js** with **TypeScript**
- **Express** - REST API framework
- **In-memory storage** - No database required for demo purposes

### Frontend
- **React** with **TypeScript**
- **Vite** - Fast build tool and dev server
- **Plain CSS** - No frameworks, clean custom styling

## 📋 Prerequisites

- Node.js (v18 or higher recommended)
- npm (comes with Node.js)

## 🚀 Quick Start

### 1. Install Dependencies

From the root directory, install all dependencies for both backend and frontend:

```bash
npm run install:all
```

Or install manually:

```bash
# Root dependencies
npm install

# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

### 2. Start the Application

From the root directory, start both backend and frontend servers:

```bash
npm run dev
```

This will start:
- **Backend API**: http://localhost:3000
- **Frontend App**: http://localhost:5173

### 3. Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

## 📁 Project Structure

```
credit-app-simulator/
├── backend/                 # Backend API
│   ├── src/
│   │   ├── index.ts        # Express server entry point
│   │   ├── routes.ts       # API routes
│   │   ├── types.ts        # TypeScript interfaces
│   │   ├── dataStore.ts    # In-memory data storage
│   │   └── creditEvaluator.ts  # Credit evaluation logic
│   ├── package.json
│   └── tsconfig.json
├── frontend/               # Frontend React app
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── ApplicationForm.tsx
│   │   │   ├── ApplicationList.tsx
│   │   │   └── Statistics.tsx
│   │   ├── App.tsx         # Main app component
│   │   ├── main.tsx        # Entry point
│   │   ├── api.ts          # API client
│   │   └── types.ts        # TypeScript interfaces
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── package.json            # Root package for running both servers
└── README.md
```

## 🔌 API Endpoints

### Applications

- `GET /api/applications` - Get all applications
- `GET /api/applications/:id` - Get specific application
- `POST /api/applications` - Create new application
- `PATCH /api/applications/:id` - Update application status
- `DELETE /api/applications/:id` - Delete application

### Statistics

- `GET /api/statistics` - Get application statistics

### Health Check

- `GET /api/health` - Health check endpoint

## 💡 Usage Examples

### Submitting a Credit Application

1. Navigate to the "Apply for Credit" tab
2. Fill in all required fields:
   - Personal information (name, email, phone)
   - Financial details (requested amount, monthly income, employment years)
   - Purpose of credit
3. Click "Submit Application"
4. View instant approval/rejection decision with details

### Credit Evaluation Logic

The system evaluates applications based on:

- **Credit Score** (300-850): Calculated from income, employment years, debt-to-income ratio, and purpose
- **Minimum Requirements**:
  - Credit score ≥ 600
  - Debt-to-income ratio ≤ 40%
- **Interest Rates**:
  - 750+: 4.5%
  - 700-749: 6.5%
  - 650-699: 8.5%
  - 600-649: 11.5%

### Test Scenarios

**High Approval Chance:**
- Name: Jane Smith
- Monthly Income: $8,000
- Requested Amount: $30,000
- Employment Years: 5
- Purpose: Home

**Low Approval Chance:**
- Name: John Doe
- Monthly Income: $3,000
- Requested Amount: $50,000
- Employment Years: 1
- Purpose: Personal

## 🛠️ Development

### Running Backend Only

```bash
cd backend
npm run dev
```

The API will be available at http://localhost:3000

### Running Frontend Only

```bash
cd frontend
npm run dev
```

The app will be available at http://localhost:5173

### Building for Production

**Backend:**
```bash
cd backend
npm run build
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm run preview
```

## 🧪 Testing the API

Using curl:

```bash
# Health check
curl http://localhost:3000/api/health

# Create application
curl -X POST http://localhost:3000/api/applications \
  -H "Content-Type: application/json" \
  -d '{
    "applicantName": "Test User",
    "email": "test@example.com",
    "phone": "+1234567890",
    "requestedAmount": 25000,
    "monthlyIncome": 5000,
    "employmentYears": 3,
    "purpose": "car"
  }'

# Get all applications
curl http://localhost:3000/api/applications

# Get statistics
curl http://localhost:3000/api/statistics
```

## 📝 Notes

- **Data Persistence**: All data is stored in-memory and will be lost when the server restarts
- **Demo Purpose**: This is a demonstration application designed for local development
- **CORS**: The backend allows all origins for development purposes
- **Automatic Evaluation**: Credit applications are automatically evaluated upon submission

## 🎨 Features Showcase

- ✅ TypeScript for type safety
- ✅ RESTful API design
- ✅ Responsive UI with pure CSS
- ✅ Real-time statistics and visualizations
- ✅ Form validation
- ✅ Error handling
- ✅ Clean code architecture
- ✅ Easy to extend and customize

## 🔮 Future Enhancements

Potential improvements for production use:

- Add database integration (PostgreSQL, MongoDB)
- Implement authentication and authorization
- Add comprehensive test suites
- Implement rate limiting
- Add email notifications
- Create admin dashboard
- Add document upload functionality
- Implement workflow management

## 📄 License

MIT License - Feel free to use this project for learning and demonstration purposes.

## 👥 Author

Created for Jira/ROVO Dev demonstration purposes.

---

**Happy coding! 🚀**
