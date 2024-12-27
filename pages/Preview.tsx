import { motion } from 'framer-motion';
import { Bot, Phone, FileSpreadsheet } from 'lucide-react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import { H1, Lead } from '@/components/ui/Typography';
import FeaturePreview from '@/components/FeaturePreview';
import TrialBanner from '@/components/TrialBanner';
import PhoneCallForm from '@/components/PhoneCallForm';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function Preview() {
  return (
    <main className="relative pt-20">
      <AnimatedBackground />
      
      <Container>
        <Section className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto space-y-8"
          >
            <H1>Découvrez nos fonctionnalités</H1>
            <Lead>
              Testez gratuitement notre assistant vocal et explorez toutes nos fonctionnalités.
            </Lead>
          </motion.div>
        </Section>

        <TrialBanner />

        <Section>
          <div className="grid md:grid-cols-2 gap-8">
            <FeaturePreview
              title="Assistant Vocal"
              description="Testez notre assistant vocal en direct"
              icon={<Bot />}
              requiredPlan="free"
            >
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
                <h3 className="text-xl font-bold text-white mb-6">
                  Démo de l'Assistant
                </h3>
                <PhoneCallForm />
              </div>
            </FeaturePreview>

            <FeaturePreview
              title="Statistiques"
              description="Accédez aux statistiques détaillées"
              icon={<FileSpreadsheet />}
              requiredPlan="pro"
            >
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
                <h3 className="text-xl font-bold text-white mb-6">
                  Statistiques d'appels
                </h3>
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-xl">
                    <p className="text-sm text-white/60">Appels aujourd'hui</p>
                    <p className="text-2xl font-bold text-white">0</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl">
                    <p className="text-sm text-white/60">Durée moyenne</p>
                    <p className="text-2xl font-bold text-white">0:00</p>
                  </div>
                </div>
              </div>
            </FeaturePreview>

            <FeaturePreview
              title="Gestion des appels"
              description="Gérez vos appels en temps réel"
              icon={<Phone />}
              requiredPlan="pro"
            >
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
                <h3 className="text-xl font-bold text-white mb-6">
                  Appels en cours
                </h3>
                <div className="text-center py-8 text-white/40">
                  Aucun appel en cours
                </div>
              </div>
            </FeaturePreview>
          </div>
        </Section>
      </Container>
    </main>
  );
}