import { motion } from 'framer-motion';
import { Check, ArrowRight, Bot, ChefHat, Phone } from 'lucide-react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import PageHeader from '@/components/PageHeader';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import AnimatedBackground from '@/components/AnimatedBackground';
import { pricingPlans } from '@/lib/constants/features';

const comparisons = [
  {
    category: "Réservations",
    features: [
      { name: "Gestion des réservations", starter: true, pro: true, enterprise: true },
      { name: "Assistant vocal IA", starter: true, pro: true, enterprise: true },
      { name: "Multi-canaux", starter: false, pro: true, enterprise: true },
      { name: "Personnalisation avancée", starter: false, pro: true, enterprise: true }
    ]
  },
  {
    category: "Gestion",
    features: [
      { name: "Tableau de bord", starter: true, pro: true, enterprise: true },
      { name: "Rapports détaillés", starter: false, pro: true, enterprise: true },
      { name: "Multi-établissements", starter: false, pro: false, enterprise: true },
      { name: "API personnalisée", starter: false, pro: false, enterprise: true }
    ]
  },
  {
    category: "Support",
    features: [
      { name: "Support email", starter: true, pro: true, enterprise: true },
      { name: "Support prioritaire", starter: false, pro: true, enterprise: true },
      { name: "Account manager", starter: false, pro: false, enterprise: true },
      { name: "Formation sur site", starter: false, pro: false, enterprise: true }
    ]
  }
];

export default function Pricing() {
  return (
    <main className="relative pt-20">
      <AnimatedBackground />
      
      <Container>
        <PageHeader
          title="Tarifs"
          description="Choisissez l'offre adaptée à votre établissement. Tous nos plans incluent un essai gratuit de 14 jours."
        />

        <Section>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white/5 backdrop-blur-xl rounded-2xl border ${
                  plan.recommended ? 'border-primary-400' : 'border-white/10'
                } p-8`}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge variant="primary">Recommandé</Badge>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-white/60 mb-6">{plan.description}</p>
                  <div className="text-4xl font-bold text-white mb-2">
                    {plan.price}€
                    <span className="text-lg text-white/60">/mois</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + (i * 0.05) }}
                      className="flex items-center space-x-3 text-white/80"
                    >
                      <Check className="w-5 h-5 text-primary-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                <Button
                  variant={plan.recommended ? 'primary' : 'secondary'}
                  className="w-full"
                  glowEffect={plan.recommended}
                >
                  Choisir {plan.name}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Comparison Table */}
        <Section>
          <Card>
            <h3 className="text-xl font-bold text-white mb-8">Comparaison détaillée</h3>
            <div className="space-y-8">
              {comparisons.map((category) => (
                <div key={category.category}>
                  <h4 className="text-lg font-semibold text-white mb-4">{category.category}</h4>
                  <div className="space-y-4">
                    {category.features.map((feature) => (
                      <div key={feature.name} className="grid grid-cols-4 gap-4 items-center py-2 border-b border-white/5">
                        <span className="text-white/80">{feature.name}</span>
                        <div className="text-center">
                          {feature.starter ? (
                            <Check className="w-5 h-5 text-primary-400 mx-auto" />
                          ) : (
                            <span className="text-white/20">-</span>
                          )}
                        </div>
                        <div className="text-center">
                          {feature.pro ? (
                            <Check className="w-5 h-5 text-primary-400 mx-auto" />
                          ) : (
                            <span className="text-white/20">-</span>
                          )}
                        </div>
                        <div className="text-center">
                          {feature.enterprise ? (
                            <Check className="w-5 h-5 text-primary-400 mx-auto" />
                          ) : (
                            <span className="text-white/20">-</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Section>

        <Section className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary-400/20 to-primary-400/5 rounded-3xl p-12 backdrop-blur-xl border border-primary-400/10"
          >
            <div className="w-16 h-16 bg-primary-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Phone className="w-8 h-8 text-primary-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Besoin d'aide pour choisir ?
            </h2>
            <p className="text-xl text-white/60 mb-8 max-w-2xl mx-auto">
              Notre équipe est là pour vous conseiller la meilleure solution pour votre établissement
            </p>
            <Button size="lg" glowEffect>
              Nous contacter
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </Section>
      </Container>
    </main>
  );
}