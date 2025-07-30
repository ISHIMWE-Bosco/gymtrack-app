# BeFit Backend API

A robust Node.js/Express backend API for the BeFit workout tracking application, designed for Docker deployment and Azure hosting.

## 🚀 Features

- **RESTful API** with Express.js and TypeScript
- **PostgreSQL** database with connection pooling
- **JWT Authentication** with secure token handling
- **Docker Support** with multi-stage builds
- **Azure Ready** with proper configuration
- **Comprehensive Logging** with Winston
- **Error Handling** with detailed error responses
- **Rate Limiting** and security middleware
- **Health Checks** for container orchestration

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL 12+
- Docker (optional)
- Azure CLI (for Azure deployment)

## 🛠️ Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
```bash
cp .env.example .env
# Edit .env with your database credentials
```

### 3. Database Setup
```bash
# Create database
createdb befit_db

# Run migrations
npm run db:migrate

# Seed with exercise data
npm run db:seed
```

### 4. Start Development Server
```bash
npm run dev
```

The API will be available at `http://localhost:3001`

## 🐳 Docker Deployment

### Build and Run with Docker
```bash
# Build image
docker build -t befit-backend .

# Run container
docker run -p 3001:3001 -e DATABASE_URL="your-db-url" befit-backend
```

### Using Docker Compose
```bash
# Start all services (app + database)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## ☁️ Azure Deployment

### 1. Create Azure Resources
```bash
# Login to Azure
az login

# Create resource group
az group create --name befit-rg --location eastus

# Create App Service plan
az appservice plan create --name befit-plan --resource-group befit-rg --sku B1 --is-linux

# Create web app
az webapp create --resource-group befit-rg --plan befit-plan --name befit-backend-app --runtime "NODE|18-lts"
```

### 2. Configure Environment Variables
```bash
az webapp config appsettings set --resource-group befit-rg --name befit-backend-app --settings \
  NODE_ENV=production \
  DATABASE_URL="your-azure-postgresql-connection-string" \
  JWT_SECRET="your-jwt-secret" \
  FRONTEND_URL="https://your-frontend-app.azurewebsites.net"
```

### 3. Deploy Application
```bash
# Build the application
npm run build

# Deploy to Azure
az webapp deployment source config-zip --resource-group befit-rg --name befit-backend-app --src dist.zip
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### Workouts
- `GET /api/workouts` - Get user workouts
- `POST /api/workouts` - Create new workout
- `DELETE /api/workouts/:id` - Delete workout

### Exercises
- `GET /api/exercises` - Get all exercises
- `GET /api/exercises/categories` - Get exercise categories

### System
- `GET /health` - Health check endpoint
- `GET /` - API information

## 🔒 Security Features

- **Helmet.js** for security headers
- **CORS** configuration for cross-origin requests
- **Rate limiting** to prevent abuse
- **Input validation** with express-validator
- **JWT token** authentication
- **Password hashing** with bcryptjs
- **SQL injection** prevention with parameterized queries

## 📝 Logging

The application uses Winston for comprehensive logging:
- **Console logging** in development
- **File logging** in production
- **Error tracking** with stack traces
- **Request logging** with Morgan

Log files are stored in the `logs/` directory:
- `error.log` - Error level logs
- `combined.log` - All logs

## 🧪 Testing

```bash
# Run tests
npm test

# Run with coverage
npm run test:coverage

# Lint code
npm run lint
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `JWT_SECRET` | Secret key for JWT tokens | Required |
| `PORT` | Server port | 3001 |
| `NODE_ENV` | Environment (development/production) | development |
| `FRONTEND_URL` | Frontend application URL | http://localhost:5173 |
| `LOG_LEVEL` | Logging level | info |

### Database Configuration

For Azure PostgreSQL, use this connection string format:
```
postgresql://username@servername:password@servername.postgres.database.azure.com:5432/database?sslmode=require
```

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check DATABASE_URL format
   - Ensure PostgreSQL is running
   - Verify firewall settings for Azure

2. **Port Already in Use**
   - Change PORT environment variable
   - Kill existing processes on port 3001

3. **JWT Token Issues**
   - Ensure JWT_SECRET is set
   - Check token expiration settings

4. **CORS Errors**
   - Verify FRONTEND_URL is correct
   - Check CORS configuration in server.ts

### Health Check

The `/health` endpoint provides system status:
```json
{
  "status": "OK",
  "timestamp": "2024-01-20T10:30:00.000Z",
  "service": "BeFit API",
  "version": "1.0.0",
  "environment": "production"
}
```

## 📈 Performance

- **Connection pooling** for database efficiency
- **Compression** middleware for response optimization
- **Rate limiting** to prevent overload
- **Graceful shutdown** handling
- **Health checks** for container orchestration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.