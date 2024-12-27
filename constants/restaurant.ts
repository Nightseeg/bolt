export const cuisineTypes = [
  'Française traditionnelle',
  'Gastronomique',
  'Bistrot',
  'Italienne',
  'Japonaise',
  'Méditerranéenne',
  'Asiatique fusion',
  'Végétarienne',
  'Fruits de mer',
  'Steakhouse'
] as const;

export const serviceTypes = [
  'lunch',
  'dinner',
  'brunch',
  'takeaway',
  'delivery'
] as const;

export const restaurantCategories = [
  'Restaurant traditionnel',
  'Restaurant gastronomique',
  'Bistrot',
  'Brasserie',
  'Restaurant rapide',
  'Traiteur',
  'Food truck'
] as const;

export const verificationDocuments = [
  {
    type: 'kbis',
    label: 'Extrait Kbis',
    required: true,
    description: 'Document officiel de moins de 3 mois'
  },
  {
    type: 'siret',
    label: 'Numéro SIRET',
    required: true,
    description: 'Numéro d\'identification unique'
  },
  {
    type: 'id',
    label: 'Pièce d\'identité',
    required: true,
    description: 'Du gérant ou représentant légal'
  },
  {
    type: 'license',
    label: 'Licence restaurant',
    required: true,
    description: 'Autorisation d\'exploitation'
  }
] as const;

export const businessHours = {
  defaultSlots: {
    lunch: {
      start: '12:00',
      end: '14:30'
    },
    dinner: {
      start: '19:00',
      end: '22:30'
    }
  },
  timeSlots: Array.from({ length: 48 }, (_, i) => {
    const hour = Math.floor(i / 2);
    const minute = i % 2 === 0 ? '00' : '30';
    return `${hour.toString().padStart(2, '0')}:${minute}`;
  })
};

export const subscriptionFeatures = {
  starter: [
    'Gestion des réservations basique',
    'Assistant vocal pour les appels',
    'Tableau de bord simple',
    'Support par email'
  ],
  pro: [
    'Tout Starter +',
    'Gestion avancée des réservations',
    'Analyses et rapports détaillés',
    'Intégration site web',
    'Support prioritaire'
  ],
  enterprise: [
    'Tout Pro +',
    'Multi-restaurants',
    'API personnalisée',
    'Account manager dédié',
    'Formation sur site'
  ]
};

export const marketInsightCategories = [
  'Tendances consommateurs',
  'Prix des matières premières',
  'Analyse concurrentielle',
  'Réglementation',
  'Technologies'
] as const;