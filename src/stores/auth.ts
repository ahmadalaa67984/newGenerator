import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:3001/api'
axios.defaults.withCredentials = true

export interface User {
  id: string
  email: string
  name: string
}

export interface SignupData {
  email: string
  name: string
  password: string
}

export interface SigninData {
  email: string
  password: string
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!user.value)

  // Actions
  const signup = async (userData: SignupData): Promise<boolean> => {
    try {
      loading.value = true
      error.value = null

      const response = await axios.post('/auth/signup', userData)
      user.value = response.data.user
      
      return true
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Signup failed'
      return false
    } finally {
      loading.value = false
    }
  }

  const signin = async (credentials: SigninData): Promise<boolean> => {
    try {
      loading.value = true
      error.value = null

      const response = await axios.post('/auth/signin', credentials)
      user.value = response.data.user
      
      return true
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Signin failed'
      return false
    } finally {
      loading.value = false
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await axios.post('/auth/logout')
    } catch (err) {
      console.error('Logout error:', err)
    } finally {
      user.value = null
      error.value = null
    }
  }

  const checkAuth = async (): Promise<void> => {
    try {
      // Try to access a protected route to verify authentication
      const response = await axios.get('/app')
      // If we get here, the user is authenticated
      // We need to get user info from somewhere - for now, we'll store minimal info
      if (response.data) {
        // Since we don't have user info in the response, we'll need to handle this differently
        // For now, we'll just mark as authenticated but without full user data
        // In a real app, you might want to add an endpoint to get current user info
      }
    } catch (err) {
      user.value = null
    }
  }

  const clearError = (): void => {
    error.value = null
  }

  return {
    // State
    user,
    loading,
    error,
    // Getters
    isAuthenticated,
    // Actions
    signup,
    signin,
    logout,
    checkAuth,
    clearError,
  }
}) 