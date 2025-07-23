# Vue 3 Authentication Frontend

A modern, responsive authentication interface built with Vue 3, TypeScript, Pinia, and TailwindCSS.

## 🎨 Features

- **Vue 3** with Composition API and `<script setup>` syntax
- **TypeScript** for type safety throughout the application
- **Pinia** for reactive state management
- **TailwindCSS** for utility-first styling
- **Vue Router** with navigation guards
- **Real-time form validation** with visual feedback
- **Password strength indicators**
- **Loading states** and error handling
- **Responsive design** for all devices
- **HTTP-only cookie** authentication

## 📁 Project Structure

```
frontend/
├── public/                     # Static assets
├── src/
│   ├── views/                 # Page components
│   │   ├── SignupPage.vue     # User registration
│   │   ├── SigninPage.vue     # User authentication
│   │   └── ApplicationPage.vue # Protected dashboard
│   ├── stores/               # Pinia stores
│   │   └── auth.ts           # Authentication state
│   ├── router/               # Vue Router configuration
│   │   └── index.ts          # Routes and guards
│   ├── App.vue               # Root component
│   ├── main.ts               # Application entry point
│   └── style.css             # Global styles
├── index.html                # HTML template
├── vite.config.ts            # Vite configuration
├── tailwind.config.js        # TailwindCSS configuration
└── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- Running backend API (see backend README)

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 🔧 Available Scripts

```bash
# Development
npm run dev                    # Start development server
npm run preview               # Preview production build

# Building
npm run build                 # Build for production
npm run type-check            # TypeScript type checking

# Code Quality
npm run lint                  # Run ESLint
npm run format                # Format with Prettier
```

## 🗂️ Pages & Components

### SignupPage (`/signup`)
User registration form with comprehensive validation:

**Features:**
- Real-time email validation
- Name length validation (min 3 characters)
- Password strength requirements with visual indicators:
  - ✅ Minimum 8 characters
  - ✅ At least 1 letter
  - ✅ At least 1 number  
  - ✅ At least 1 special character
- Form submission with loading states
- Error handling and display
- Link to signin page

**Validation Rules:**
- Email must be valid format
- Name minimum 3 characters
- Password must meet security requirements
- All fields required

### SigninPage (`/signin`)
User authentication form:

**Features:**
- Email and password input
- Form validation
- Loading states during authentication
- Error message display
- Link to signup page
- Automatic redirect on success

### ApplicationPage (`/app`)
Protected dashboard for authenticated users:

**Features:**
- Welcome message
- User profile information display
- Logout functionality
- Responsive navigation bar
- Protected route (requires authentication)

## 🛡️ Authentication Flow

### State Management (Pinia)
The authentication store manages:
- User authentication state
- Loading states
- Error handling
- JWT token management via cookies

```typescript
interface AuthStore {
  user: User | null
  loading: boolean
  error: string | null
  isAuthenticated: boolean
  signup(userData: SignupData): Promise<boolean>
  signin(credentials: SigninData): Promise<boolean>
  logout(): Promise<void>
  checkAuth(): Promise<void>
}
```

### Route Guards
Navigation guards automatically:
- Redirect unauthenticated users to signin
- Redirect authenticated users away from auth pages
- Check authentication status on app initialization

```typescript
// Protected routes require authentication
meta: { requiresAuth: true }

// Guest routes redirect if already authenticated  
meta: { requiresGuest: true }
```

### HTTP Client Configuration
Axios is configured with:
- Base URL pointing to backend API
- Automatic cookie inclusion
- Response/error interceptors

## 🎨 UI/UX Design

### Design System
- **Color Palette**: Primary blue with semantic colors (green, red, gray)
- **Typography**: System font stack with clear hierarchy
- **Spacing**: Consistent TailwindCSS spacing scale
- **Components**: Reusable form elements and buttons

### Responsive Breakpoints
```css
sm: 640px    /* Small tablets */
md: 768px    /* Large tablets */  
lg: 1024px   /* Laptops */
xl: 1280px   /* Desktops */
```

### Loading States
All forms include:
- Disabled buttons during submission
- Loading spinners
- Visual feedback for user actions

### Error Handling
- Field-level validation errors
- Form-level error messages
- Network error handling
- User-friendly error messages

## 🔧 Configuration

### Environment Variables
No environment variables required for development. The frontend automatically connects to `http://localhost:3001/api`.

For production, update the API base URL in `src/stores/auth.ts`:
```typescript
axios.defaults.baseURL = 'https://your-api-domain.com/api'
```

### Vite Configuration
The Vite config includes:
- Vue 3 plugin
- Path aliases (`@` → `src/`)
- Development server on port 5173

### TailwindCSS Configuration
Custom configuration includes:
- Extended color palette
- Custom primary colors
- Responsive design utilities

## 🧪 Testing

### Manual Testing Checklist

#### Signup Flow
- [ ] Form validation works for all fields
- [ ] Password strength indicator updates correctly
- [ ] Error messages display for invalid input
- [ ] Success redirects to application page
- [ ] Existing user error handling

#### Signin Flow  
- [ ] Email validation works
- [ ] Password field is required
- [ ] Invalid credentials show error
- [ ] Success redirects to application page
- [ ] Loading states work correctly

#### Application Page
- [ ] Protected route requires authentication
- [ ] User information displays correctly
- [ ] Logout button works
- [ ] Logout redirects to signin page

#### Navigation & Routing
- [ ] Route guards work correctly
- [ ] Authenticated users can't access auth pages
- [ ] Unauthenticated users can't access app page
- [ ] Browser back/forward works correctly

#### Responsive Design
- [ ] Mobile layout works (< 640px)
- [ ] Tablet layout works (640px - 1024px)
- [ ] Desktop layout works (> 1024px)
- [ ] Forms are usable on all screen sizes

## 🚀 Production Build

### Building for Production
```bash
npm run build
```

The build generates:
- Optimized JavaScript bundles
- Minified CSS
- Static assets in `dist/` folder

### Deployment
1. Build the application
2. Upload `dist/` folder to web server
3. Configure server for SPA routing
4. Update API base URL for production

### Server Configuration
For proper SPA routing, configure your web server to serve `index.html` for all routes:

#### Nginx
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

#### Apache
```apache
RewriteEngine On
RewriteRule ^(?!.*\.).*$ /index.html [L]
```

## 🔍 Performance Optimization

### Bundle Analysis
The build uses:
- **Code splitting** for route-based chunks
- **Tree shaking** to remove unused code  
- **Asset optimization** for images and fonts

### Best Practices Implemented
- Lazy loading for route components
- Reactive state management with Pinia
- Efficient re-rendering with Vue 3
- Optimized TailwindCSS with purging

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Errors**
   - Verify backend is running on port 3001
   - Check CORS configuration in backend
   - Inspect browser network tab

2. **Authentication Not Persisting**
   - Verify cookies are being sent
   - Check browser cookie settings
   - Ensure backend cookie configuration

3. **Build Errors**
   - Run `npm run type-check` for TypeScript errors
   - Clear `node_modules` and reinstall
   - Check for import path issues

4. **Styling Issues**
   - Verify TailwindCSS is imported in `style.css`
   - Check for class name typos
   - Ensure build process includes CSS

### Development Tips
- Use Vue DevTools for component inspection
- Enable Vue 3 DevTools for Pinia state
- Check browser console for errors
- Use network tab to debug API calls

---

**Built with 💙 using Vue 3, TypeScript, and TailwindCSS** 