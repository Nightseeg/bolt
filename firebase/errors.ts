import type { FirebaseError } from 'firebase/app';

export type AuthErrorCode = 
  | 'auth/email-already-in-use'
  | 'auth/invalid-email'
  | 'auth/operation-not-allowed'
  | 'auth/weak-password'
  | 'auth/user-disabled'
  | 'auth/user-not-found'
  | 'auth/wrong-password'
  | 'auth/too-many-requests'
  | 'permission-denied';

export function getAuthErrorMessage(error: FirebaseError): string {
  switch (error.code as AuthErrorCode) {
    case 'auth/email-already-in-use':
      return 'Cette adresse email est déjà utilisée';
    case 'auth/invalid-email':
      return 'Adresse email invalide';
    case 'auth/operation-not-allowed':
      return 'Opération non autorisée';
    case 'auth/weak-password':
      return 'Le mot de passe est trop faible';
    case 'auth/user-disabled':
      return 'Ce compte a été désactivé';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Email ou mot de passe incorrect';
    case 'auth/too-many-requests':
      return 'Trop de tentatives, veuillez réessayer plus tard';
    case 'permission-denied':
      return 'Accès refusé. Veuillez réessayer.';
    default:
      console.error('Unhandled auth error:', error);
      return 'Une erreur est survenue. Veuillez réessayer.';
  }
}