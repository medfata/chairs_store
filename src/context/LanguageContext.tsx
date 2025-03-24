"use client";

import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

// Create the context with a default value
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation interface
interface TranslationDictionary {
  [key: string]: string;
}

interface Translations {
  fr: TranslationDictionary;
  en: TranslationDictionary;
}

// Translations object
const translations: Translations = {
  fr: {
    // Header
    'nav.home': 'Accueil',
    'nav.chairs': 'Chaises',
    'nav.chairPieces': 'Pièces de Chaise',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'Élevez Votre Espace avec des Chaises Premium',
    'hero.description': 'Découvrez notre collection de chaises et pièces détachées artisanales qui allient confort, style et durabilité.',
    'hero.button.shop': 'Acheter des Chaises',
    'hero.button.explore': 'Explorer les Pièces de Chaise',
    
    // Collections Section
    'collections.title': 'Nos Collections',
    'collections.chairs.title': 'Chaises Premium',
    'collections.chairs.description': 'Conçues pour le confort et le style',
    'collections.chairs.button': 'Voir la Collection',
    'collections.chairPieces.title': 'Pièces de Chaise',
    'collections.chairPieces.description': 'Composants pour personnalisation et réparation',
    'collections.chairPieces.button': 'Voir la Collection',
    
    // Featured Products
    'featured.title': 'Produits Vedettes',
    'featured.subtitle': 'Nos designs les plus populaires, fabriqués avec des matériaux premium pour un confort et un style durables.',
    'featured.chair1.title': 'Chaise de Bureau Ergonomique',
    'featured.chair1.description': 'Parfaite pour les longues sessions de travail avec un support lombaire ajustable.',
    'featured.chair2.title': 'Chaise de Salle à Manger Moderne',
    'featured.chair2.description': 'Design élégant avec assise confortable pour les espaces de repas.',
    'featured.button.addToCart': 'Ajouter au Panier',
    
    // Benefits Section
    'benefits.title': 'Pourquoi Nous Choisir',
    'benefits.quality.title': 'Qualité Premium',
    'benefits.quality.description': 'Nos chaises sont fabriquées avec des matériaux de haute qualité pour assurer durabilité et confort pendant des années.',
    'benefits.shipping.title': 'Livraison Gratuite',
    'benefits.shipping.description': 'Profitez de la livraison gratuite sur toutes les commandes au Maroc.',
    'benefits.warranty.title': 'Garantie de 5 ans',
    'benefits.warranty.description': 'Chaque produit est livré avec une garantie complète de 5 ans pour votre tranquillité d\'esprit.',
    
    // Newsletter Section
    'newsletter.title': 'Rejoignez Notre Newsletter',
    'newsletter.description': 'Abonnez-vous pour recevoir des mises à jour sur les nouvelles collections, promotions et offres exclusives.',
    'newsletter.placeholder': 'Entrez votre email',
    'newsletter.button': 'S\'abonner',
    
    // Footer
    'footer.about': 'Fabrication de chaises et pièces de chaises premium pour votre confort et votre style depuis 2010.',
    'footer.quickLinks': 'Liens Rapides',
    'footer.customerService': 'Service Client',
    'footer.shipping': 'Politique de Livraison',
    'footer.returns': 'Retours & Remboursements',
    'footer.warranty': 'Garantie',
    'footer.faq': 'FAQ',
    'footer.contactUs': 'Contactez-Nous',
    'footer.rights': 'Tous droits réservés.',
    
    // Language Toggle
    'language.fr': 'FR',
    'language.en': 'EN'
  },
  en: {
    // Header
    'nav.home': 'Home',
    'nav.chairs': 'Chairs',
    'nav.chairPieces': 'Chair Pieces',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'Elevate Your Space with Premium Chairs',
    'hero.description': 'Discover our collection of handcrafted chairs and chair pieces that combine comfort, style, and durability.',
    'hero.button.shop': 'Shop Chairs',
    'hero.button.explore': 'Explore Chair Pieces',
    
    // Collections Section
    'collections.title': 'Our Collections',
    'collections.chairs.title': 'Premium Chairs',
    'collections.chairs.description': 'Designed for comfort and style',
    'collections.chairs.button': 'View Collection',
    'collections.chairPieces.title': 'Chair Pieces',
    'collections.chairPieces.description': 'Components for customization and repair',
    'collections.chairPieces.button': 'View Collection',
    
    // Featured Products
    'featured.title': 'Featured Products',
    'featured.subtitle': 'Our most popular designs, crafted with premium materials for lasting comfort and style.',
    'featured.chair1.title': 'Ergonomic Office Chair',
    'featured.chair1.description': 'Perfect for long work sessions with adjustable lumbar support.',
    'featured.chair2.title': 'Modern Dining Chair',
    'featured.chair2.description': 'Elegant design with comfortable seating for dining areas.',
    'featured.button.addToCart': 'Add to Cart',
    
    // Benefits Section
    'benefits.title': 'Why Choose Us',
    'benefits.quality.title': 'Premium Quality',
    'benefits.quality.description': 'Our chairs are crafted with high-quality materials to ensure durability and comfort for years to come.',
    'benefits.shipping.title': 'Free Shipping',
    'benefits.shipping.description': 'Enjoy free shipping on all orders within Morocco.',
    'benefits.warranty.title': '5-Year Warranty',
    'benefits.warranty.description': 'Each product comes with a comprehensive 5-year warranty for your peace of mind.',
    
    // Newsletter Section
    'newsletter.title': 'Join Our Newsletter',
    'newsletter.description': 'Subscribe to receive updates on new collections, promotions, and exclusive offers.',
    'newsletter.placeholder': 'Enter your email',
    'newsletter.button': 'Subscribe',
    
    // Footer
    'footer.about': 'Crafting premium chairs and chair pieces for your comfort and style since 2010.',
    'footer.quickLinks': 'Quick Links',
    'footer.customerService': 'Customer Service',
    'footer.shipping': 'Shipping Policy',
    'footer.returns': 'Returns & Refunds',
    'footer.warranty': 'Warranty',
    'footer.faq': 'FAQs',
    'footer.contactUs': 'Contact Us',
    'footer.rights': 'All rights reserved.',
    
    // Language Toggle
    'language.fr': 'FR',
    'language.en': 'EN'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Set default language to French
  const [language, setLanguage] = useState<Language>('fr');

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 