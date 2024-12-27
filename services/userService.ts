import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { User, CreateUserData } from '@/lib/models/user';

const COLLECTION = 'users';

export const userService = {
  async createUser(userId: string, data: CreateUserData): Promise<User> {
    const userRef = doc(db, COLLECTION, userId);
    
    const userData = {
      id: userId,
      email: data.email,
      name: data.name,
      company: data.company,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      isPremium: false,
      isTrialActive: true,
      trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days
    };

    await setDoc(userRef, userData);
    return userData as User;
  },

  async getUser(userId: string): Promise<User | null> {
    const userRef = doc(db, COLLECTION, userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      return null;
    }

    return userSnap.data() as User;
  },

  async updateUser(userId: string, data: Partial<User>): Promise<void> {
    const userRef = doc(db, COLLECTION, userId);
    await updateDoc(userRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  }
};