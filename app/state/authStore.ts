import { create } from 'zustand'
import getUserData from '../actions/getUserData'
import signIn from '../actions/signIn'
import signOut from '../actions/signOut'
import signUp from '../actions/signUp'

interface User {
  email?: string
  user_metadata?: {
    displayName?: string
  }
}

interface AuthState {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  signUp: (
    email: string,
    password: string,
    displayName: string,
    phone: string
  ) => Promise<void>
  fetchUserData: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,

  login: async (email, password) => {
    set({ isLoading: true })
    try {
      await signIn({ email, password })
      const userData = await getUserData()
      set({ user: userData, isLoading: false })
    } catch (error) {
      console.error('Login failed:', error)
      set({ isLoading: false })
    }
  },

  logout: async () => {
    set({ isLoading: true })
    try {
      await signOut()
      set({ user: null, isLoading: false })
    } catch (error) {
      console.error('Logout failed:', error)
      set({ isLoading: false })
    }
  },

  signUp: async (email, password, displayName, phone) => {
    set({ isLoading: true })
    try {
      await signUp({ email, password, displayName, phone })
      const userData = await getUserData()
      set({ user: userData, isLoading: false })
    } catch (error) {
      console.error('Sign up failed:', error)
      set({ isLoading: false })
    }
  },

  fetchUserData: async () => {
    set({ isLoading: true })
    try {
      const userData = await getUserData()
      set({ user: userData, isLoading: false })
    } catch (error) {
      console.error('Failed to fetch user data:', error)
      set({ isLoading: false })
    }
  },
}))
