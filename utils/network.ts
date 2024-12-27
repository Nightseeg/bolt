export async function checkConnectivity(): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    const response = await fetch('https://www.google.com/favicon.ico', {
      mode: 'no-cors',
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    return response.type === 'opaque' || response.status === 200;
  } catch (error) {
    return false;
  }
}

export function getNetworkErrorMessage(error: any): string {
  if (error.code === 'auth/network-request-failed') {
    return 'La connexion au serveur a échoué. Veuillez vérifier votre connexion internet et réessayer.';
  }
  return error.message || 'Une erreur est survenue. Veuillez réessayer.';
}