import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './ui/Button';
import ParallaxBackground from './ParallaxBackground';
import PhoneCallTest from './PhoneCallTest';

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4 overflow-hidden">
      <ParallaxBackground />
      
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-6xl mx-auto"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="inline-flex items-center space-x-2 bg-primary-400/20 px-4 py-2 rounded-full text-primary-400"
            >
              <Bot className="w-5 h-5" />
              <span className="text-sm font-medium">Assistant Vocal Intelligent</span>
            </motion.div>

            <motion.h1
              className="text-5xl lg:text-6xl font-bold leading-tight text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              Automatisez vos appels avec{' '}
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
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              Solution professionnelle d'automatisation d'appels par intelligence artificielle.
              Optimisez votre communication client avec notre technologie de pointe.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <Link to="/register">
                <Button size="lg" pulse glowEffect>
                  Commencer maintenant
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
              <Link to="/demo">
                <Button variant="secondary" size="lg">
                  Voir la démo
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-full max-w-md mx-auto"
          >
            <PhoneCallTest />
          </motion.div>
        </div>
      </motion.div>

      {/* Mouse scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.4 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/20 rounded-full p-1"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <motion.div 
            className="w-full h-2 bg-primary-400 rounded-full"
            animate={{
              y: [0, 24, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}