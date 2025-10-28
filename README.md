# Municipal Fintrack 2.0

A comprehensive municipal financial tracking and Disbursement Voucher (DV) Management System built with Laravel, React, and Tailwind CSS.

## Features

- 📊 **Dashboard** - Overview of financial statistics and quick actions
- 📋 **DV Management** - Create, view, and manage disbursement vouchers
- 👥 **User Management** - Role-based access control (Admin, Accountant, Reviewer)
- 🔐 **Authentication** - Secure login and session management
- 🔍 **Search & Filters** - Filter DVs by status and search functionality
- ✅ **Approval Workflow** - Submit, approve, and disapprove DVs

## Tech Stack

### Backend
- Laravel 10
- MySQL Database
- Sanctum for API authentication
- RESTful API

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router
- Axios for API calls

## Installation

### Prerequisites
- PHP 8.1+
- Composer
- Node.js 18+
- MySQL 8+
- npm or yarn

### Local Development Setup

#### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install PHP dependencies:
```bash
composer install
```

3. Copy environment file:
```bash
cp .env.example .env
```

4. Generate application key:
```bash
php artisan key:generate
```

5. Configure database in `.env`:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=municipal_fintrack
DB_USERNAME=root
DB_PASSWORD=
```

6. Run migrations:
```bash
php artisan migrate
```

7. Start the Laravel server:
```bash
php artisan serve
```

The backend API will be available at `http://localhost:8000`

#### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Deployment

### Railway (Backend) Deployment

1. **Create Railway Account**
   - Go to [Railway.app](https://railway.app)
   - Sign up with GitHub

2. **Deploy Backend**
   - Connect your GitHub repository
   - Select the `backend` folder as the root directory
   - Railway will automatically detect the Dockerfile

3. **Configure Environment Variables**
   - In Railway dashboard, go to Variables tab
   - Add the following environment variables:
   ```
   APP_NAME="Municipal Fintrack"
   APP_ENV=production
   APP_KEY=base64:your-generated-key
   APP_DEBUG=false
   APP_URL=https://your-app-name.railway.app
   
   DB_CONNECTION=mysql
   DB_HOST=your-mysql-host
   DB_PORT=3306
   DB_DATABASE=your-database-name
   DB_USERNAME=your-username
   DB_PASSWORD=your-password
   
   FRONTEND_URL=https://your-app-name.netlify.app
   CORS_ALLOWED_ORIGINS=https://your-app-name.netlify.app
   ```

4. **Add MySQL Database**
   - In Railway dashboard, click "New" → "Database" → "MySQL"
   - Railway will provide connection details automatically

5. **Deploy**
   - Railway will automatically build and deploy using the Dockerfile
   - The API will be available at `https://your-app-name.railway.app`

### Netlify (Frontend) Deployment

1. **Create Netlify Account**
   - Go to [Netlify.com](https://netlify.com)
   - Sign up with GitHub

2. **Deploy Frontend**
   - Connect your GitHub repository
   - Set build settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`
     - **Base directory**: `frontend`

3. **Configure Environment Variables**
   - In Netlify dashboard, go to Site settings → Environment variables
   - Add the following variables:
   ```
   VITE_API_URL=https://your-app-name.railway.app/api/v1
   VITE_APP_NAME="Municipal Fintrack"
   VITE_APP_ENV=production
   ```

4. **Deploy**
   - Netlify will automatically build and deploy
   - The frontend will be available at `https://your-app-name.netlify.app`

### Deployment Checklist

- [ ] Railway backend deployed and accessible
- [ ] MySQL database connected and migrations run
- [ ] Environment variables configured in Railway
- [ ] Netlify frontend deployed
- [ ] Environment variables configured in Netlify
- [ ] CORS settings allow frontend domain
- [ ] Test login and DV creation functionality

## API Endpoints

### Authentication
- `POST /api/v1/register` - Register a new user
- `POST /api/v1/login` - Login user
- `POST /api/v1/logout` - Logout user
- `GET /api/v1/me` - Get current user

### Disbursement Vouchers
- `GET /api/v1/dvs` - List all DVs (with filters)
- `POST /api/v1/dvs` - Create a new DV
- `GET /api/v1/dvs/{id}` - Get DV details
- `PUT /api/v1/dvs/{id}` - Update a DV
- `DELETE /api/v1/dvs/{id}` - Delete a DV
- `POST /api/v1/dvs/{id}/approve` - Approve a DV
- `POST /api/v1/dvs/{id}/disapprove` - Disapprove a DV

## Project Structure

```
municipal-fintrack/
├── backend/                  # Laravel API
│   ├── app/
│   │   ├── Http/
│   │   │   └── Controllers/
│   │   │       └── Api/     # API controllers
│   │   └── Models/          # Eloquent models
│   ├── database/
│   │   └── migrations/      # Database migrations
│   └── routes/
│       └── api.php          # API routes
│
└── frontend/                # React application
    ├── src/
    │   ├── components/      # Reusable components
    │   ├── context/         # React context
    │   ├── pages/           # Page components
    │   └── App.jsx          # Main app component
    └── public/              # Static assets
```

## User Roles

- **Admin** - Full access to all features
- **Accountant** - Can create and manage DVs
- **Reviewer** - Can approve/disapprove DVs
- **User** - Basic access

## Database Schema

### users
- id, name, email, password, role, office_code, designation

### dvs
- id, dv_number, dv_date, payee, particulars, amount
- status, office_code, created_by, approved_by
- voucher_number, account_code, remarks

## Development

### Running the Application

1. Start the Laravel backend:
```bash
cd backend && php artisan serve
```

2. Start the React frontend:
```bash
cd frontend && npm run dev
```

3. Visit `http://localhost:3000` in your browser

### Default Login (After seeding)

Create a user via the register endpoint or seed data:
- Email: admin@municipal.gov
- Password: password

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License

## Support

For issues and feature requests, please use the GitHub issue tracker.

