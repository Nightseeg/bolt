import { FirebaseError } from 'firebase/app';
import { checkConnectivity } from './network';

export async function handleAuthError(error: FirebaseError): Promise<string> {
  // Check network connectivity first
  const isOnline = await checkConnectivity();
  if (!isOnline) {
    return 'Pas de connexion internet. Veuillez vérifier votre connexion et réessayer.';
  }

  switch (error.code) {
    case 'auth/network-request-failed':
      return 'La connexion au serveur a échoué. Veuillez réessayer.';
    case 'auth/email-already-in-use':
      return 'Cette adresse email est déjà utilisée. Veuillez vous connecter ou utiliser une autre adresse.';
    case 'auth/invalid-email':
      return 'Adresse email invalide. Veuillez vérifier votre saisie.';
    case 'auth/operation-not-allowed':
      return "L'inscription est temporairement désactivée. Veuillez réessayer plus tard.";
    case 'auth/weak-password':
      return 'Le mot de passe doit contenir au moins 6 caractères.';
    case 'auth/user-disabled':
      return 'Ce compte a été désactivé. Veuillez contacter le support.';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Email ou mot de passe incorrect.';
    case 'auth/too-many-requests':
      return 'Trop de tentatives. Veuillez réessayer plus tard.';
    case 'permission-denied':
      return "Erreur d'autorisation. Veuillez réessayer ou contacter le support.";
    default:
      console.error('Unhandled auth error:', error);
      return 'Une erreur est survenue. Veuillez réessayer.';
  }
}

export function validateEmail(email: string): string | null {
  if (!email) {
    return "L'adresse email est requise";
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "L'adresse email n'est pas valide";
  }
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) {
    return 'Le mot de passe est requis';
  }
  if (password.length < 6) {
    return 'Le mot de passe doit contenir au moins 6 caractères';
  }
  return null;
}