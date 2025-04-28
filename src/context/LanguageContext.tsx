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
    // WhatsApp Button
    'whatsapp.buttonLabel': 'Contactez-nous sur WhatsApp',
    'whatsapp.defaultMessage': 'Bonjour, je voudrais en savoir plus sur vos produits.',

    // Contact Page
    'contact.title': 'Contactez-Nous',
    'contact.description': 'Vous avez des questions ? Nous aimerions avoir de vos nouvelles. Envoyez-nous un message et nous vous répondrons dès que possible.',
    'contact.form.name': 'Nom',
    'contact.form.namePlaceholder': 'Votre nom',
    'contact.form.email': 'Email',
    'contact.form.emailPlaceholder': 'votre@email.com',
    'contact.form.phone': 'Téléphone',
    'contact.form.phonePlaceholder': '+212 XXX-XXXXXX',
    'contact.form.message': 'Message',
    'contact.form.messagePlaceholder': 'Votre message ici...',
    'contact.form.submit': 'Envoyer le Message',
    'contact.info.title': 'Autres Façons de Nous Contacter',

    // Chair Pieces Page
    'chairPieces.title': 'Notre Collection de Pièces de Chaise',
    'chairPieces.description': 'Découvrez notre sélection de pièces de chaise de haute qualité pour la réparation, la personnalisation ou les projets DIY.',

    // Chairs Page
    'chairs.title': 'Notre Collection de Chaises',
    'chairs.description': 'Découvrez notre collection soigneusement sélectionnée de chaises premium, conçues pour le confort et le style.',
    'chairs.addToCart': 'Ajouter au Panier',

    // Header
    'nav.home': 'Accueil',
    'nav.products': 'Produits',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'Élevez Votre Espace avec des Chaises Premium',
    'hero.description': 'Découvrez notre collection de chaises et pièces détachées artisanales qui allient confort, style et durabilité.',
    'hero.button.shop': 'Acheter des Chaises',
    'hero.button.explore': 'Explorer Notre Collections',
    
    // Collections Section
    'collections.title': 'Nos Collections',
    'collections.singleChairs.description': 'Conçues pour le confort et le style',
    'collections.chairPacks.description': 'Ensembles coordonnés pour votre espace',
    'collections.accessories.description': 'Composants pour personnalisation et réparation',
    'collections.viewCollection': 'Voir la Collection',
    
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
    'language.en': 'EN',

    // Products Page
    'products.title': 'Nos Produits',
    'products.description': 'Découvrez notre collection premium de chaises, packs de chaises et accessoires.',
    'products.filter.all': 'Tous les Produits',
    'products.filter.singleChairs': 'Chaises Individuelles',
    'products.filter.chairPacks': 'Packs de Chaises',
    'products.filter.accessories': 'Accessoires',
  },
  en: {
    // WhatsApp Button
    'whatsapp.buttonLabel': 'Contact us on WhatsApp',
    'whatsapp.defaultMessage': 'Hi, I would like to know more about your products.',

    // Contact Page
    'contact.title': 'Contact Us',
    'contact.description': 'Have questions? We’d love to hear from you. Send us a message and we’ll respond as soon as possible.',
    'contact.form.name': 'Name',
    'contact.form.namePlaceholder': 'Your name',
    'contact.form.email': 'Email',
    'contact.form.emailPlaceholder': 'your@email.com',
    'contact.form.phone': 'Phone',
    'contact.form.phonePlaceholder': '+212 XXX-XXXXXX',
    'contact.form.message': 'Message',
    'contact.form.messagePlaceholder': 'Your message here...',
    'contact.form.submit': 'Send Message',
    'contact.info.title': 'Other Ways to Contact Us',

    // Chair Pieces Page
    'chairPieces.title': 'Our Chair Pieces Collection',
    'chairPieces.description': 'Explore our selection of high-quality chair pieces for repair, customization, or DIY projects.',

    // Chairs Page
    'chairs.title': 'Our Chair Collection',
    'chairs.description': 'Discover our carefully curated collection of premium chairs, designed for both comfort and style.',
    'chairs.addToCart': 'Add to Cart',

    // Header
    'nav.home': 'Home',
    'nav.products': 'Products',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.title': 'Elevate Your Space with Premium Chairs',
    'hero.description': 'Discover our collection of handcrafted chairs and chair pieces that combine comfort, style, and durability.',
    'hero.button.shop': 'Shop Chairs',
    'hero.button.explore': 'Explore Chair Pieces',
    
    // Collections Section
    'collections.title': 'Our Collections',
    'collections.singleChairs.description': 'Designed for comfort and style',
    'collections.chairPacks.description': 'Coordinated sets for your space',
    'collections.accessories.description': 'Components for customization and repair',
    'collections.viewCollection': 'View Collection',
    
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
    'language.en': 'EN',

    // Products Page
    'products.title': 'Our Products',
    'products.description': 'Discover our premium collection of chairs, chair packs, and accessories.',
    'products.filter.all': 'All Products',
    'products.filter.singleChairs': 'Single Chairs',
    'products.filter.chairPacks': 'Chair Packs',
    'products.filter.accessories': 'Accessories',
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