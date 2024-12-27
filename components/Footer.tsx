import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MessageCircle,
  ArrowRight,
  Bot,
  CreditCard,
  Lock
} from 'lucide-react';
import Input from './ui/Input';
import Button from './ui/Button';

const quickLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Tarifs', href: '/pricing' },
  { label: 'FAQ', href: '/faq' },
  { label: 'À propos', href: '/about' },
  { label: 'Blog', href: '/blog' },
];

const supportLinks = [
  { label: 'Support technique', href: '/support' },
  { label: 'Centre d\'aide', href: '/help' },
  { label: 'Documentation', href: '/docs' },
  { label: 'Statut système', href: '/status' },
];

const legalLinks = [
  { label: 'Mentions légales', href: '/legal' },
  { label: 'Politique de confidentialité', href: '/privacy' },
  { label: 'Conditions générales', href: '/terms' },
  { label: 'Cookies', href: '/cookies' },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
];

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setEmail('');
  };

  return (
    <footer className="relative bg-gradient-to-b from-dark-900 to-dark-950 border-t border-white/5">
      <div className="absolute inset-0 bg-gradient-mesh opacity-5" />
      
      <div className="relative max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-6">
              <Bot className="w-6 h-6 text-primary-400" />
              <span className="text-xl font-bold text-white">IA-26</span>
            </div>
            <nav className="grid grid-cols-2 gap-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-white/60 hover:text-primary-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>

          {/* Support */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold text-white mb-6">Support</h3>
            <div className="space-y-4">
              {supportLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block text-white/60 hover:text-primary-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4">
                <div className="flex items-center space-x-2 text-white/60 mb-2">
                  <Phone className="w-4 h-4" />
                  <span>01 23 45 67 89</span>
                </div>
                <div className="flex items-center space-x-2 text-white/60">
                  <Mail className="w-4 h-4" />
                  <span>contact@ia-26.com</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-white mb-6">Informations légales</h3>
            <div className="space-y-4">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block text-white/60 hover:text-primary-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 flex items-center space-x-4">
                <CreditCard className="w-6 h-6 text-white/40" />
                <Lock className="w-6 h-6 text-white/40" />
              </div>
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-white mb-6">Newsletter</h3>
            <p className="text-white/60 mb-4">
              Recevez nos dernières actualités et offres exclusives
            </p>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre email"
                required
              />
              <Button variant="primary" className="w-full">
                S'inscrire
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>
            <div className="flex items-center space-x-4 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-white/60 hover:text-primary-400 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/40 text-sm">
              © {new Date().getFullYear()} IA-26. Tous droits réservés.
            </p>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-white/60 hover:text-primary-400 transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">Chat en direct</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}