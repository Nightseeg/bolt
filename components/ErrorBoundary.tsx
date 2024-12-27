import React, { Component, ErrorInfo } from 'react';
import { Bot } from 'lucide-react';
import Button from './ui/Button';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Bot className="w-8 h-8 text-primary-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-4">
              Oups ! Une erreur est survenue
            </h1>
            <p className="text-white/60 mb-8 max-w-md mx-auto">
              Nous nous excusons pour ce désagrément. Veuillez rafraîchir la page ou réessayer plus tard.
            </p>
            <Button onClick={this.handleRetry}>
              Réessayer
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}