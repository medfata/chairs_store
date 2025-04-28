"use client";

import Image from "next/image";
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import WhatsAppButton from './WhatsAppButton';

export default function HomePageContent() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-white">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/chairs_landing_page.avif"
            alt="Modern chair in a living room"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="relative z-10 section-container min-h-[80vh] flex flex-col justify-center">
          <div className="max-w-2xl">
            <h1 className="heading-xl text-white mb-6">{t('hero.title')}</h1>
            <p className="text-xl text-white mb-8">
              {t('hero.description')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="border-2 text-black px-6 py-2 rounded-md bg-white hover:text-black transition-colors">
                {t('hero.button.explore')}
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Collections Section */}
      <section className="bg-white py-24">
        <div className="section-container">
          <h2 className="heading-lg text-center mb-16">{t('collections.title')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Single Chairs Collection */}
            <div className="relative group overflow-hidden rounded-lg">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/single_chairs/Chaise de Bureau Ergonomique  Accoudoirs 3D.jpeg"
                  alt="Single Chairs Collection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black group-hover:bg-opacity-20 transition-all" style={{ opacity: 0.2 }}></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{t('products.filter.singleChairs')}</h3>
                <p className="text-white mb-4">{t('collections.singleChairs.description')}</p>
                <Link href="/products?collection=single_chairs" className="inline-block bg-white text-black px-6 py-2 rounded-md hover:bg-gray-100 transition-colors">
                  {t('collections.viewCollection')}
                </Link>
              </div>
            </div>
            
            {/* Chair Packs Collection */}
            <div className="relative group overflow-hidden rounded-lg">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/pack_of_chairs/Noir.jpeg"
                  alt="Chair Packs Collection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black group-hover:bg-opacity-20 transition-all" style={{ opacity: 0.2 }}></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{t('products.filter.chairPacks')}</h3>
                <p className="text-white mb-4">{t('collections.chairPacks.description')}</p>
                <Link href="/products?collection=pack_of_chairs" className="inline-block bg-white text-black px-6 py-2 rounded-md hover:bg-gray-100 transition-colors">
                  {t('collections.viewCollection')}
                </Link>
              </div>
            </div>
            
            {/* Accessories Collection */}
            <div className="relative group overflow-hidden rounded-lg">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/accessories/Vérin à gaz chromé pour chaise 180 DH.jpeg"
                  alt="Chair Accessories Collection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black group-hover:bg-opacity-20 transition-all" style={{ opacity: 0.2 }}></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{t('products.filter.accessories')}</h3>
                <p className="text-white mb-4">{t('collections.accessories.description')}</p>
                <Link href="/products?collection=accessories" className="inline-block bg-white text-black px-6 py-2 rounded-md hover:bg-gray-100 transition-colors">
                  {t('collections.viewCollection')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="bg-gray-50 py-24">
        <div className="section-container">
          <h2 className="heading-lg text-center mb-4">{t('featured.title')}</h2>
          <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            {t('featured.subtitle')}
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {/* Featured Product 1 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden max-w-96 mx-auto">
              <div className="relative aspect-square">
                <Image
                  src="/images/chair-1.jpg"
                  alt="Ergonomic Office Chair"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">{t('featured.chair1.title')}</h3>
                <p className="text-gray-600 mb-4">{t('featured.chair1.description')}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">MAD 1500.00</span>
                </div>
              </div>
            </div>
            
            {/* Featured Product 2 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden max-w-96 mx-auto">
              <div className="relative aspect-square">
                <Image
                  src="/images/chair-2.jpeg"
                  alt="Modern Dining Chair"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">{t('featured.chair2.title')}</h3>
                <p className="text-gray-600 mb-4">{t('featured.chair2.description')}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">MAD 1000.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section */}
      <section className="bg-white py-24">
        <div className="section-container">
          <h2 className="heading-lg text-center mb-16">{t('benefits.title')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Benefit 1 */}
            <div className="text-center">
              <div className="mb-6 mx-auto w-16 h-16 flex items-center justify-center bg-black rounded-full text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">{t('benefits.quality.title')}</h3>
              <p className="text-gray-600">
                {t('benefits.quality.description')}
              </p>
            </div>
            
            {/* Benefit 2 */}
            <div className="text-center">
              <div className="mb-6 mx-auto w-16 h-16 flex items-center justify-center bg-black rounded-full text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">{t('benefits.shipping.title')}</h3>
              <p className="text-gray-600">
                {t('benefits.shipping.description')}
              </p>
            </div>
            
            {/* Benefit 3 */}
            <div className="text-center">
              <div className="mb-6 mx-auto w-16 h-16 flex items-center justify-center bg-black rounded-full text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">{t('benefits.warranty.title')}</h3>
              <p className="text-gray-600">
                {t('benefits.warranty.description')}
              </p>
            </div>
          </div>
        </div>
      </section>
      


      <WhatsAppButton />
    </div>
  );
}