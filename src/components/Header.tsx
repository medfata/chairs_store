"use client";

import Link from 'next/link'
import Image from 'next/image'
import { FiMenu } from 'react-icons/fi'
import { useLanguage } from '../context/LanguageContext'

export default function Header() {
  const { language, setLanguage, t } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <div className="relative w-10 h-10 mr-2">
                <Image 
                  src="/images/logo.jpeg" 
                  alt="Chair Store Logo" 
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-xl font-bold text-black">ChairCraft</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-black hover:text-gray-600 px-3 py-2 text-sm font-medium">
              {t('nav.home')}
            </Link>
            <Link href="/products" className="text-black hover:text-gray-600 px-3 py-2 text-sm font-medium">
              {t('nav.products')}
            </Link>
            <Link href="/contact" className="text-black hover:text-gray-600 px-3 py-2 text-sm font-medium">
              {t('nav.contact')}
            </Link>
          </nav>

          {/* Right section - Language toggle & Mobile menu */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <button 
              onClick={toggleLanguage}
              className="border border-black rounded-md px-2 py-1 text-xs font-medium hover:bg-black hover:text-white transition-colors"
              aria-label={language === 'fr' ? 'Switch to English' : 'Passer au français'}
            >
              {t(language === 'fr' ? 'language.en' : 'language.fr')}
            </button>
            
            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 text-black" aria-label="Menu">
              <FiMenu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
} 