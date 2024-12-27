import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes';
import CallStatus from './components/CallStatus';
import ErrorBoundary from './components/ErrorBoundary';
import AuthProvider from './components/AuthProvider';

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <div className="min-h-screen bg-dark-900 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <AnimatePresence mode="wait">
              <AppRoutes />
            </AnimatePresence>
          </main>
          <Footer />
          <CallStatus />
        </div>
      </AuthProvider>
    </ErrorBoundary>
  );
}