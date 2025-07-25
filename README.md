# NestJS Authentication Backend

A production-ready authentication API built with NestJS, TypeScript, Prisma, and MongoDB.

## 🏗️ Architecture

- **Feature-based modules** with clean separation of concerns
- **Dependency injection** throughout the application
- **TypeScript** with strict typing
- **Prisma ORM** for type-safe database operations
- **JWT authentication** with passport strategies
- **Validation pipes** for input sanitization
- **Swagger documentation** for API exploration

## 📁 Project Structure

```
backend/
├── src/
│   ├── auth/                    # Authentication module
│   │   ├── dto/                # Data Transfer Objects
│   │   │   ├── signup.dto.ts   # Signup validation
│   │   │   └── signin.dto.ts   # Signin validation
│   │   ├── guards/             # Authentication guards
│   │   │   └── jwt-auth.guard.ts
│   │   ├── strategies/         # Passport strategies
│   │   │   ├── jwt.strategy.ts
│   │   │   └── local.strategy.ts
│   │   ├── auth.controller.ts  # Auth endpoints
│   │   ├── auth.service.ts     # Business logic
│   │   └── auth.module.ts      # Module configuration
│   ├── prisma/                 # Database module
│   │   ├── prisma.service.ts   # Database service
│   │   └── prisma.module.ts    # Database module
│   ├── app.controller.ts       # Main app controller
│   ├── app.service.ts          # Main app service
│   ├── app.module.ts           # Root module
│   └── main.ts                 # Application bootstrap
├── prisma/
│   └── schema.prisma           # Database schema
├── .env.example                # Environment template
└── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB instance
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your configuration

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Start development server
npm run start:dev
```

## 🔧 Available Scripts

```bash
# Development
npm run start:dev          # Start with hot reload
npm run start:debug        # Start with debug mode

# Production
npm run build              # Build the application
npm run start:prod         # Start production server

# Testing
npm run test               # Run unit tests
npm run test:watch         # Run tests in watch mode
npm run test:cov           # Run tests with coverage
npm run test:e2e           # Run end-to-end tests

# Code Quality
npm run lint               # Run ESLint
npm run format             # Format code with Prettier
```

## 📋 API Endpoints

### Authentication Routes (`/api/auth`)

#### POST `/api/auth/signup`
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "name": "John Doe",
  "password": "MyPassword123!"
}
```

**Validation Rules:**
- `email`: Valid email format
- `name`: Minimum 3 characters
- `password`: 
  - Minimum 8 characters
  - At least 1 letter
  - At least 1 number
  - At least 1 special character

**Response:**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### POST `/api/auth/signin`
Authenticate an existing user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "MyPassword123!"
}
```

**Response:**
```json
{
  "message": "Signed in successfully",
  "user": {
    "id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### POST `/api/auth/logout`
Clear authentication cookie.

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

### Protected Routes

#### GET `/api/app`
Returns welcome message for authenticated users.

**Headers:**
- `Authorization: Bearer <jwt-token>` (optional, uses cookie by default)

**Response:**
```json
{
  "message": "Welcome to the application"
}
```

## 🔒 Security Features

### Password Security
- **bcrypt hashing** with 12 salt rounds
- **Strong password policy** enforced on both frontend and backend

### JWT Implementation
- **HTTP-only cookies** for secure token storage
- **Configurable expiration** (default: 7 days)
- **Cookie extraction** with fallback to Authorization header
- **Automatic token validation** on protected routes

### Input Validation
- **class-validator** decorators for DTO validation
- **Transform pipes** for data sanitization
- **Global validation pipes** with whitelist protection

## 🛠️ Database Schema

### User Model
```prisma
model User {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  email     String   @unique
  name      String
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}
```

### Database Operations
```bash
# View data in Prisma Studio
npx prisma studio

# Reset database
npx prisma migrate reset

# Deploy schema changes
npx prisma db push

# Generate client after schema changes
npx prisma generate
```

## 📊 Monitoring & Logging

### Built-in Logging
- **Winston logger** integration
- **Request/response logging**
- **Error tracking** with stack traces
- **Database connection status** logging

### Health Checks
The application logs:
- ✅ Successful database connection
- 🚀 Server startup with port information
- 📚 Swagger documentation URL
- 📤 Database disconnection on shutdown

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | MongoDB connection string | `mongodb://localhost:27017/auth_app` |
| `JWT_SECRET` | Secret key for JWT signing | `your-super-secret-jwt-key` |
| `JWT_EXPIRES_IN` | Token expiration time | `7d` |
| `PORT` | Server port | `3001` |
| `NODE_ENV` | Environment mode | `development` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:5173` |

### CORS Configuration
Automatically configured based on `FRONTEND_URL` with:
- Credentials support
- Specific origin allowlist
- Standard HTTP methods
- Content-Type and Authorization headers

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

### Manual API Testing
Use the Swagger documentation at `http://localhost:3001/api/docs` to test endpoints interactively.

## 🚀 Production Deployment

### Environment Setup
1. Set `NODE_ENV=production`
2. Configure production MongoDB connection
3. Set secure `JWT_SECRET`
4. Update `FRONTEND_URL` for production
5. Configure reverse proxy (nginx recommended)

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "run", "start:prod"]
```

### Performance Considerations
- Enable **response compression**
- Configure **rate limiting**
- Set up **health check endpoints**
- Use **connection pooling** for database
- Implement **caching** for frequently accessed data

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Verify MongoDB is running
   - Check connection string format
   - Ensure network connectivity

2. **JWT Token Issues**
   - Verify JWT_SECRET is set
   - Check token expiration settings
   - Validate cookie configuration

3. **CORS Errors**
   - Confirm FRONTEND_URL matches client URL
   - Check browser network tab for preflight requests

4. **Validation Errors**
   - Review DTO definitions
   - Check class-validator decorators
   - Verify request payload format

### Debug Mode
Set `NODE_ENV=development` for detailed error messages and stack traces.

---

**Built with ❤️ using NestJS, TypeScript, and Prisma** 