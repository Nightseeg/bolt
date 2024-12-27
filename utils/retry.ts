export interface RetryOptions {
  maxAttempts?: number;
  delay?: number;
  shouldRetry?: (error: any) => boolean;
}

const defaultOptions: Required<RetryOptions> = {
  maxAttempts: 3,
  delay: 1000,
  shouldRetry: (error: any) => {
    const retryableCodes = [
      'auth/network-request-failed',
      'unavailable',
      'failed-precondition'
    ];
    return retryableCodes.includes(error.code);
  }
};

export async function retry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const { maxAttempts, delay, shouldRetry } = { ...defaultOptions, ...options };
  let lastError: any;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      lastError = error;
      
      if (attempt === maxAttempts || !shouldRetry(error)) {
        throw error;
      }
      
      await new Promise(resolve => setTimeout(resolve, delay * attempt));
    }
  }
  
  throw lastError;
}