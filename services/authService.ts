import type { User, CreateUserData } from '@/lib/models/user';

export const authService = {
  async register(email: string, password: string, userData: Omit<CreateUserData, 'email'>): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create mock user
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: userData.name,
      restaurant: userData.restaurant,
      isPremium: false,
      isTrialActive: true,
      trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    };

    // Store in localStorage for persistence
    localStorage.setItem('user', JSON.stringify(user));
    
    return user;
  },

  async login(email: string, password: string): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Create mock user
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: email.split('@')[0],
      isPremium: false,
      isTrialActive: true,
      trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    };

    // Store in localStorage for persistence
    localStorage.setItem('user', JSON.stringify(user));

    return user;
  },

  async logout(): Promise<void> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Clear stored user data
    localStorage.removeItem('user');
  },

  getCurrentUser(): User | null {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return null;

    const user = JSON.parse(storedUser);
    // Convert date strings back to Date objects
    if (user.trialEndsAt) {
      user.trialEndsAt = new Date(user.trialEndsAt);
    }
    
    return user;
  }
};