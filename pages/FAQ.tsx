import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, MessageCircle } from 'lucide-react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import PageHeader from '@/components/PageHeader';
import Button from '@/components/ui/Button';
import BackToTop from '@/components/BackToTop';
import AnimatedBackground from '@/components/AnimatedBackground';

const faqs = [
  {
    category: "Général",
    questions: [
      {
        question: "Comment fonctionne l'assistant vocal IA-26 ?",
        answer: "Notre assistant vocal utilise une technologie d'IA avancée spécialement conçue pour les restaurants. Il gère les appels entrants, comprend les demandes de réservation et peut répondre aux questions fréquentes sur votre établissement."
      },
      {
        question: "Quels types de restaurants peuvent utiliser IA-26 ?",
        answer: "IA-26 est adapté à tous les types de restaurants : traditionnels, gastronomiques, bistrots, brasseries, etc. Notre solution s'ajuste à vos besoins spécifiques et à votre volume d'activité."
      }
    ]
  },
  {
    category: "Réservations",
    questions: [
      {
        question: "Comment sont gérées les réservations ?",
        answer: "L'assistant vocal prend les réservations en tenant compte de vos paramètres (capacité, horaires, tables disponibles). Les réservations sont automatiquement synchronisées avec votre agenda et peuvent être confirmées par SMS/email."
      },
      {
        question: "Que se passe-t-il en cas de restaurant complet ?",
        answer: "L'assistant en informe le client et propose automatiquement d'autres créneaux disponibles ou de l'inscrire sur liste d'attente. Vous gardez le contrôle total sur la gestion des disponibilités."
      }
    ]
  },
  {
    category: "Technique",
    questions: [
      {
        question: "Comment intégrer IA-26 à mon système actuel ?",
        answer: "L'intégration est simple et rapide. Nous nous occupons de la configuration technique et proposons des connecteurs avec les principaux logiciels de gestion de restaurant."
      },
      {
        question: "Mes données sont-elles sécurisées ?",
        answer: "Absolument. Nous utilisons un chiffrement de bout en bout et respectons strictement le RGPD. Vos données sont stockées en France et ne sont jamais partagées avec des tiers."
      }
    ]
  },
  {
    category: "Tarification",
    questions: [
      {
        question: "L'essai gratuit est-il sans engagement ?",
        answer: "Oui, vous bénéficiez de 14 jours d'essai gratuit sans engagement. Vous pouvez tester toutes les fonctionnalités et annuler à tout moment."
      },
      {
        question: "Y a-t-il des frais cachés ?",
        answer: "Non, nos tarifs sont transparents et incluent toutes les fonctionnalités mentionnées. Pas de surprise ni de coûts additionnels."
      }
    ]
  }
];

function FAQItem({ faq, index }: { faq: { question: string; answer: string }, index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="border-b border-white/10 last:border-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left"
      >
        <span className="text-lg font-semibold text-white">{faq.question}</span>
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="flex-shrink-0 ml-4"
        >
          {isOpen ? (
            <Minus className="w-5 h-5 text-primary-400" />
          ) : (
            <Plus className="w-5 h-5 text-primary-400" />
          )}
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-white/60 leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  return (
    <main className="relative pt-20">
      <AnimatedBackground />
      
      <Container>
        <PageHeader
          title="FAQ"
          description="Trouvez rapidement des réponses à vos questions sur notre assistant vocal intelligent pour restaurants."
        />

        <Section>
          {faqs.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 last:mb-0"
            >
              <h2 className="text-2xl font-bold text-white mb-6">{category.category}</h2>
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-8">
                <div className="space-y-6">
                  {category.questions.map((faq, index) => (
                    <FAQItem 
                      key={index} 
                      faq={faq} 
                      index={categoryIndex + index} 
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </Section>

        <Section className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary-400/20 to-primary-400/5 rounded-3xl p-12 backdrop-blur-xl border border-primary-400/10"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Vous avez d'autres questions ?
            </h2>
            <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
              Notre équipe est là pour vous aider
            </p>
            <Button size="lg">
              <MessageCircle className="w-5 h-5 mr-2" />
              Contactez-nous
            </Button>
          </motion.div>
        </Section>
      </Container>

      <BackToTop />
    </main>
  );
}