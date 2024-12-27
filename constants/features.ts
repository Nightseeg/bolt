export const restaurantFeatures = [
  {
    title: "Assistant Vocal IA",
    description: "Gérez vos appels et réservations automatiquement",
    metrics: {
      label: "Taux de satisfaction",
      value: "98%"
    }
  },
  {
    title: "Gestion Professionnelle",
    description: "Tableau de bord complet pour votre établissement",
    metrics: {
      label: "Gain de temps",
      value: "15h/semaine"
    }
  },
  {
    title: "Analyses Métier",
    description: "Insights et rapports détaillés sur votre activité",
    metrics: {
      label: "Augmentation CA",
      value: "+22%"
    }
  }
];

export const professionalBenefits = [
  {
    title: "Vérification Professionnelle",
    description: "Plateforme réservée aux restaurateurs avec vérification SIRET/Kbis",
    icon: "Shield"
  },
  {
    title: "Réseau B2B",
    description: "Mise en relation avec fournisseurs et prestataires qualifiés",
    icon: "Users"
  },
  {
    title: "Veille Sectorielle",
    description: "Actualités et tendances du secteur de la restauration",
    icon: "TrendingUp"
  }
];

export const pricingPlans = [
  {
    id: "starter",
    name: "Starter",
    price: "199",
    description: "Pour les restaurants indépendants",
    features: [
      "Assistant vocal IA",
      "Gestion des réservations",
      "Tableau de bord basique",
      "Support email"
    ]
  },
  {
    id: "pro",
    name: "Professionnel",
    price: "399",
    description: "Pour les restaurants en développement",
    features: [
      "Tout Starter +",
      "Multi-canaux de réservation",
      "Analyses avancées",
      "Intégration site web",
      "Support prioritaire"
    ],
    recommended: true
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Sur mesure",
    description: "Pour les chaînes de restaurants",
    features: [
      "Tout Pro +",
      "Multi-établissements",
      "API dédiée",
      "Account manager",
      "Formation sur site"
    ]
  }
];