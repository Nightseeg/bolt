import { motion } from 'framer-motion';
import { Bot, Zap, Lock, Globe, Headphones, Clock, Phone, ArrowRight } from 'lucide-react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import PageHeader from '@/components/PageHeader';
import Button from '@/components/ui/Button';
import AnimatedBackground from '@/components/AnimatedBackground';

const solutions = [
  {
    title: "Service Client",
    description: "Automatisez vos réponses aux questions fréquentes et gérez efficacement les réclamations.",
    metrics: [
      { label: "Réduction du temps d'attente", value: "60%" },
      { label: "Satisfaction client", value: "95%" }
    ],
    icon: Headphones
  },
  {
    title: "Centre d'Appels",
    description: "Optimisez vos opérations avec une gestion intelligente des appels entrants et sortants.",
    metrics: [
      { label: "Augmentation de la productivité", value: "40%" },
      { label: "Taux de résolution", value: "85%" }
    ],
    icon: Phone
  },
  {
    title: "Support Technique",
    description: "Diagnostiquez et résolvez rapidement les problèmes techniques courants.",
    metrics: [
      { label: "Temps de résolution", value: "-45%" },
      { label: "Problèmes résolus", value: "78%" }
    ],
    icon: Bot
  }
];

export default function Solutions() {
  return (
    <main className="relative pt-20">
      <AnimatedBackground />
      
      <Container>
        <PageHeader
          title="Solutions"
          description="Découvrez comment IA-26 peut transformer votre communication client avec des solutions sur mesure pour chaque secteur."
        />

        <Section>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <div className="p-3 bg-primary-400/20 rounded-xl w-fit">
                    <solution.icon className="w-6 h-6 text-primary-400" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mt-6 mb-4">
                    {solution.title}
                  </h3>
                  
                  <p className="text-white/60 mb-6">
                    {solution.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {solution.metrics.map((metric, idx) => (
                      <div key={idx} className="p-4 bg-white/5 rounded-xl">
                        <div className="text-2xl font-bold text-primary-400">
                          {metric.value}
                        </div>
                        <div className="text-sm text-white/60">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button variant="secondary" className="w-full">
                    En savoir plus
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary-400/20 to-primary-400/5 rounded-3xl p-12 backdrop-blur-xl border border-primary-400/10"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Prêt à commencer ?</h2>
            <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
              Rejoignez les entreprises qui font confiance à IA-26 pour leur communication client
            </p>
            <Button size="lg">
              Essayer gratuitement
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </Section>
      </Container>
    </main>
  );
}