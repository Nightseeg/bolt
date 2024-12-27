import { motion, useInView } from 'framer-motion';
import { Bot, Zap, Lock, Globe, Headphones, Clock } from 'lucide-react';
import { useRef } from 'react';
import RevealSection from './RevealSection';
import Container from './ui/Container';
import Card from './ui/Card';
import AnimatedIcon from './AnimatedIcon';

const features = [
  {
    icon: Bot,
    title: "IA Avancée",
    description: "Compréhension naturelle du langage grâce à des algorithmes de pointe"
  },
  {
    icon: Headphones,
    title: "Qualité Audio",
    description: "Reconnaissance vocale haute fidélité pour une précision maximale"
  },
  {
    icon: Zap,
    title: "Ultra Rapide",
    description: "Réponses instantanées grâce à notre infrastructure optimisée"
  },
  {
    icon: Lock,
    title: "Sécurisé",
    description: "Vos données sont chiffrées et protégées en permanence"
  },
  {
    icon: Globe,
    title: "Multilingue",
    description: "Support de plusieurs langues pour une communication sans frontières"
  },
  {
    icon: Clock,
    title: "24/7",
    description: "Disponible à tout moment, où que vous soyez"
  }
];

export default function Features() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <RevealSection className="py-24">
      <Container>
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-primary-400/20 px-4 py-2 rounded-full text-primary-400 mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <span className="font-semibold">Fonctionnalités</span>
          </motion.div>
          <h2 className="text-4xl font-bold text-white mb-4">
            Une solution complète
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Découvrez comment notre IA révolutionne la communication client
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1,
              }}
            >
              <Card hover>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  className="w-12 h-12 bg-primary-400/20 rounded-xl flex items-center justify-center mb-6"
                >
                  <AnimatedIcon icon={feature.icon} className="w-6 h-6 text-primary-400" />
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed">{feature.description}</p>

                {/* Hover effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-400/10 to-transparent rounded-2xl opacity-0"
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </RevealSection>
  );
}