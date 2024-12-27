export interface Restaurant {
  id: string;
  name: string;
  siret: string;
  kbis: {
    verified: boolean;
    verifiedAt?: Date;
    documentUrl?: string;
  };
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  details: {
    cuisine: string[];
    capacity: number;
    services: ('lunch' | 'dinner' | 'brunch' | 'takeaway' | 'delivery')[];
  };
  openingHours: {
    [key: string]: {
      open: string;
      close: string;
      breaks?: {
        start: string;
        end: string;
      }[];
    };
  };
  settings: {
    reservations: {
      enabled: boolean;
      maxPartySize: number;
      advanceBookingDays: number;
      autoConfirm: boolean;
      timeSlotDuration: number;
    };
    orders: {
      enabled: boolean;
      minimumOrder?: number;
      preparationTime: number;
      delivery: {
        enabled: boolean;
        radius?: number;
        minimumOrder?: number;
      };
    };
  };
  subscription: {
    plan: 'starter' | 'pro' | 'enterprise';
    status: 'active' | 'trial' | 'expired';
    trialEndsAt?: Date;
    features: string[];
  };
  stats: {
    averageRating: number;
    totalReservations: number;
    totalOrders: number;
    monthlyStats: {
      month: string;
      revenue: number;
      reservations: number;
      orders: number;
    }[];
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface RestaurantVerification {
  id: string;
  restaurantId: string;
  status: 'pending' | 'verified' | 'rejected';
  documents: {
    type: 'kbis' | 'siret' | 'id' | 'other';
    url: string;
    uploadedAt: Date;
    verifiedAt?: Date;
  }[];
  notes?: string;
  submittedAt: Date;
  processedAt?: Date;
}

export interface Supplier {
  id: string;
  name: string;
  type: 'food' | 'beverage' | 'equipment' | 'service';
  contact: {
    name: string;
    phone: string;
    email: string;
  };
  products: {
    id: string;
    name: string;
    category: string;
    price: number;
    unit: string;
    minimumOrder?: number;
  }[];
  deliveryAreas: string[];
  rating: number;
  verified: boolean;
}

export interface Order {
  id: string;
  restaurantId: string;
  type: 'takeaway' | 'delivery' | 'dine-in';
  customer: {
    name: string;
    phone: string;
    email?: string;
    address?: {
      street: string;
      city: string;
      postalCode: string;
    };
  };
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    options?: {
      name: string;
      value: string;
      price?: number;
    }[];
    notes?: string;
  }[];
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
  payment: {
    method: 'cash' | 'card' | 'online';
    status: 'pending' | 'paid' | 'refunded';
    amount: number;
    tip?: number;
  };
  timing: {
    orderedAt: Date;
    confirmedAt?: Date;
    readyAt?: Date;
    completedAt?: Date;
    expectedAt: Date;
  };
  delivery?: {
    address: string;
    instructions?: string;
    fee: number;
    status: 'pending' | 'assigned' | 'picked' | 'delivered';
    driver?: {
      name: string;
      phone: string;
    };
  };
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Reservation {
  id: string;
  restaurantId: string;
  customer: {
    name: string;
    phone: string;
    email?: string;
    preferences?: {
      seating?: 'indoor' | 'outdoor' | 'bar';
      allergies?: string[];
      specialRequests?: string;
    };
    visits?: number;
  };
  details: {
    date: Date;
    time: string;
    duration: number;
    partySize: number;
    tableIds?: string[];
  };
  status: 'pending' | 'confirmed' | 'seated' | 'completed' | 'cancelled';
  source: 'phone' | 'website' | 'ai-assistant' | 'walk-in';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RestaurantNews {
  id: string;
  type: 'article' | 'event' | 'regulation' | 'trend';
  title: string;
  content: string;
  category: string[];
  image?: string;
  source: string;
  publishedAt: Date;
  relevantTo: string[];
}

export interface MarketInsight {
  id: string;
  type: 'trend' | 'price' | 'competition';
  category: string;
  data: {
    date: Date;
    value: number;
    change: number;
  }[];
  analysis: string;
  recommendations: string[];
  source: string;
  updatedAt: Date;
}