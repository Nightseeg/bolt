import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Bot, ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import ErrorMessage from '@/components/auth/ErrorMessage';
import { authService } from '@/services/authService';
import { validateEmail, validatePassword } from '@/lib/utils/auth';
import { useAuthStore } from '@/store/authStore';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function Register() {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const emailError = validateEmail(formData.email);
    if (emailError) {
      setError(emailError);
      return;
    }

    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const user = await authService.register(formData.email, formData.password, {
        name: formData.name,
        company: formData.company
      });

      setUser(user);
      navigate('/dashboard'); // Redirection vers le tableau de bord
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen pt-20">
      <AnimatedBackground />
      <Container>
        <div className="max-w-md mx-auto">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link to="/" className="inline-flex items-center space-x-2 text-white mb-8">
              <Bot className="w-8 h-8" />
              <span className="text-xl font-bold">IA-26</span>
            </Link>
            <h1 className="text-3xl font-bold text-white mb-2">Créez votre compte</h1>
            <p className="text-white/60">Commencez à automatiser vos appels dès aujourd'hui</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8"
          >
            <AnimatePresence>
              {error && <ErrorMessage message={error} />}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                  Nom complet
                </label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-white/80 mb-2">
                  Entreprise
                </label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                  Email professionnel
                </label>
                <Input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                  Mot de passe
                </label>
                <Input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  minLength={6}
                />
                <p className="mt-1 text-sm text-white/40">
                  Au moins 6 caractères avec un chiffre
                </p>
              </div>

              <Button
                type="submit"
                isLoading={isLoading}
                className="w-full"
              >
                Créer mon compte
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white/60">
                Déjà un compte ?{' '}
                <Link to="/login" className="text-primary-400 hover:text-primary-300">
                  Se connecter
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </main>
  );
}
