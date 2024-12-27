import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './config';
import { retry } from '@/lib/utils/retry';
import type { User } from '@/lib/models/user';

export async function createUserWithProfile(
  email: string, 
  password: string, 
  userData: Partial<User>
): Promise<User> {
  try {
    // Create Firebase auth user with retry
    const userCredential = await retry(() => 
      createUserWithEmailAndPassword(auth, email, password)
    );
    
    // Create user profile in Firestore
    const user: User = {
      id: userCredential.user.uid,
      email,
      name: userData.name || '',
      restaurant: userData.restaurant || {
        name: '',
        role: 'owner'
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      isPremium: false,
      isTrialActive: true,
      trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
    };

    const userRef = doc(db, 'users', user.id);
    await retry(() => 
      setDoc(userRef, {
        ...user,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
    );

    return user;
  } catch (error: any) {
    console.error('Registration error:', error);
    throw error;
  }
}

export async function getUserProfile(firebaseUser: FirebaseUser): Promise<User> {
  try {
    const userRef = doc(db, 'users', firebaseUser.uid);
    const userDoc = await retry(() => getDoc(userRef));
    
    if (!userDoc.exists()) {
      const defaultProfile: User = {
        id: firebaseUser.uid,
        email: firebaseUser.email || '',
        name: firebaseUser.displayName || '',
        restaurant: {
          name: '',
          role: 'owner'
        },
        createdAt: new Date(),
        updatedAt: new Date(),
        isPremium: false,
        isTrialActive: true,
        trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
      };

      await retry(() => 
        setDoc(userRef, {
          ...defaultProfile,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        })
      );

      return defaultProfile;
    }

    const data = userDoc.data();
    return {
      ...data,
      id: firebaseUser.uid,
      createdAt: data.createdAt?.toDate() || new Date(),
      updatedAt: data.updatedAt?.toDate() || new Date(),
      trialEndsAt: data.trialEndsAt?.toDate() || null
    } as User;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
}

export async function signInUser(email: string, password: string) {
  try {
    return await retry(() => signInWithEmailAndPassword(auth, email, password));
  } catch (error: any) {
    console.error('Login error:', error);
    throw error;
  }
}

export async function signOutUser() {
  try {
    await retry(() => signOut(auth));
  } catch (error: any) {
    console.error('Logout error:', error);
    throw error;
  }
}