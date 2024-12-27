export function validateEmail(email: string): string | null {
  if (!email) {
    return 'L\'adresse email est requise';
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'L\'adresse email n\'est pas valide';
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
  
  if (!/\d/.test(password)) {
    return 'Le mot de passe doit contenir au moins un chiffre';
  }
  
  if (!/[a-z]/.test(password)) {
    return 'Le mot de passe doit contenir au moins une lettre minuscule';
  }
  
  if (!/[A-Z]/.test(password)) {
    return 'Le mot de passe doit contenir au moins une lettre majuscule';
  }
  
  return null;
}