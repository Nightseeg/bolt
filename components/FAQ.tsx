import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "Comment fonctionne votre assistant vocal ?",
    answer: "Notre assistant vocal utilise une technologie d'IA avancée pour gérer les appels de manière naturelle et professionnelle. Il peut comprendre le contexte, répondre aux questions et suivre des scénarios complexes."
  },
  {
    question: "Combien d'appels simultanés puis-je gérer ?",
    answer: "Selon votre forfait, vous pouvez gérer de 5 à 50 appels simultanés. Le plan Starter permet jusqu'à 5 appels, le plan Pro jusqu'à 10, et le plan Enterprise jusqu'à 50 appels simultanés."
  },
  {
    question: "Comment puis-je importer mes contacts ?",
    answer: "Vous pouvez facilement importer vos contacts via un fichier Google Sheets. Notre système synchronise automatiquement vos données et permet une gestion flexible de vos campagnes d'appels."
  },
  {
    question: "Les appels sont-ils enregistrés ?",
    answer: "Oui, tous les appels sont enregistrés et analysés pour assurer la qualité du service. Vous avez accès à des rapports détaillés et des statistiques pour chaque campagne."
  },
  {
    question: "Quelle est la qualité audio des appels ?",
    answer: "Nous utilisons une technologie HD Voice pour garantir une qualité audio optimale. Notre système s'adapte automatiquement à la qualité de la connexion pour maintenir la meilleure expérience possible."
  },
  {
    question: "Comment puis-je personnaliser les scénarios d'appels ?",
    answer: "Notre interface intuitive vous permet de créer et modifier vos scénarios d'appels facilement. Vous pouvez définir des réponses personnalisées, des conditions logiques et des actions spécifiques."
  }
];

const FAQItem = ({ faq, index }: { faq: typeof faqs[0], index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="border-b border-gray-200 last:border-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left"
      >
        <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="flex-shrink-0 ml-4"
        >
          {isOpen ? (
            <Minus className="w-5 h-5 text-primary-600" />
          ) : (
            <Plus className="w-5 h-5 text-primary-600" />
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
            <p className="pb-6 text-gray-600 leading-relaxed">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function FAQ() {
  return (
    <section id="faq" className="py-24 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center space-x-2 bg-primary-50 px-4 py-2 rounded-full text-primary-600 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <span className="font-semibold">FAQ</span>
          </motion.div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Questions fréquentes
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Tout ce que vous devez savoir sur notre assistant vocal intelligent
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}