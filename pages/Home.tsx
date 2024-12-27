import { motion } from 'framer-motion';
import { ArrowRight, Bot, Phone, ChefHat, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import RevealSection from '@/components/RevealSection';
import SectionSeparator from '@/components/SectionSeparator';
import { restaurantFeatures } from '@/lib/constants/features';

const stats = [
  {
    title: "Appels gérés",
    value: "500K+",
    description: "Réservations automatisées"
  },
  {
    title: "Restaurants",
    value: "1000+",
    description: "Nous font confiance"
  },
  {
    title: "Temps économisé",
    value: "15h",
    description: "Par semaine en moyenne"
  }
];

export default function Home() {
  return (
    <main className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-950" />
        
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-primary-400/20 px-4 py-2 rounded-full text-primary-400"
              >
                <ChefHat className="w-5 h-5" />
                <span className="text-sm font-medium">Solution pour Restaurateurs</span>
              </motion.div>

              <motion.h1
                className="text-5xl lg:text-6xl font-bold leading-tight text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Automatisez vos réservations avec{' '}
                <motion.span
                  className="bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  IA-26
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-xl text-white/80 leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Assistant vocal intelligent dédié aux restaurateurs. Gérez vos réservations, 
                optimisez votre temps et augmentez votre chiffre d'affaires.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Link to="/register">
                  <Button size="lg" pulse glowEffect>
                    Essai gratuit 14 jours
                    <motion.div
                      className="ml-2"
                      animate={{
                        x: [0, 5, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </Button>
                </Link>
                <Button variant="secondary">
                  <Phone className="w-5 h-5 mr-2" />
                  Démonstration
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <div className="aspect-video rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1000&q=80"
                  alt="Restaurant moderne"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      <SectionSeparator variant="wave" />

      {/* Stats Section */}
      <RevealSection className="py-20">
        <Container>
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8 hover:border-primary-400/50 transition-all duration-300"
              >
                <h3 className="text-4xl font-bold text-white mb-2">{stat.value}</h3>
                <p className="text-lg font-semibold text-white mb-2">{stat.title}</p>
                <p className="text-white/60">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </RevealSection>

      <SectionSeparator variant="dots" />

      {/* Features Section */}
      <RevealSection className="py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Solution complète pour votre restaurant
            </h2>
            <p className="text-xl text-white/60 max-w-2xl mx-auto">
              Optimisez votre gestion quotidienne avec nos outils spécialisés
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {restaurantFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8"
              >
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-white/60 mb-6">{feature.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-primary-400">{feature.metrics.label}</span>
                  <span className="font-bold text-white">{feature.metrics.value}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </RevealSection>

      {/* CTA Section */}
      <RevealSection className="py-20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary-400/20 to-primary-400/5 rounded-3xl p-12 backdrop-blur-xl border border-primary-400/10 text-center"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Prêt à moderniser votre restaurant ?
            </h2>
            <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
              Rejoignez les restaurateurs qui font confiance à IA-26
            </p>
            <Link to="/register">
              <Button 
                size="lg"
                pulse
                glowEffect
              >
                Commencer maintenant
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </Container>
      </RevealSection>
    </main>
  );
}