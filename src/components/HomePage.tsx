"use client";

import Image from "next/image";
import Link from 'next/link';
import { useLanguage } from '../context/LanguageContext';
import WhatsAppButton from './WhatsAppButton';
import { useState, useEffect } from 'react';

export default function HomePageContent() {
  const { t } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);
  
  // Auto-rotate featured products carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="min-h-screen">
      {/* Hero Section - Enhanced with better overlay and animation */}
      <section className="relative bg-white">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/chairs_landing_page.avif"
            alt="Modern chair in a living room"
            fill
            className="object-cover animate-subtle-zoom"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
        </div>
        
        <div className="relative z-10 section-container min-h-[90vh] flex flex-col justify-center">
          <div className="max-w-2xl animate-fade-in">
            <span className="inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm mb-4 tracking-wider">
              {t('hero.tagline') || 'PREMIUM CHAIR COLLECTION'}
            </span>
            <h1 className="heading-xl text-white mb-6 text-5xl md:text-6xl font-bold tracking-tight">{t('hero.title')}</h1>
            <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-xl">
              {t('hero.description')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/products" className="border-2 text-black px-8 py-3 rounded-md bg-white hover:bg-gray-100 hover:text-black transition-all font-medium">
                {t('hero.button.explore')}
              </Link>
              <Link href="/contact" className="border-2 border-white text-white px-8 py-3 rounded-md hover:bg-white/10 transition-all font-medium">
                {t('hero.button.contact') || 'Contact Us'}
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products Carousel */}
      <section className="bg-gray-50 py-24">
        <div className="section-container">
          <div className="flex justify-between items-center mb-12">
            <h2 className="heading-lg">{t('featuredProducts.title') || 'Featured Products'}</h2>
            <div className="flex space-x-2">
              {[0, 1, 2].map((idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`w-3 h-3 rounded-full ${activeSlide === idx ? 'bg-black' : 'bg-gray-300'} transition-all`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
          
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {[
                { title: "Modern Office Chair", price: "1,200 DH", image: "/images/single_chairs/Chaise de Bureau Ergonomique  Accoudoirs 3D.jpeg" },
                { title: "Elegant Chair Pack", price: "3,500 DH", image: "/images/pack_of_chairs/Noir.jpeg" },
                { title: "Premium Ergonomic Chair", price: "1,800 DH", image: "/images/single_chairs/Chaise de Bureau Ergonomique  Accoudoirs 3D.jpeg" }
              ].map((product, idx) => (
                <div key={idx} className="min-w-full p-4">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                    <div className="aspect-[16/9] relative overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-semibold mb-2">{product.title}</h3>
                      <p className="text-xl font-bold text-black mb-4">{product.price}</p>
                      <Link 
                        href="/products" 
                        className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
                      >
                        {t('featuredProducts.viewDetails') || 'View Details'}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Collections Section - Enhanced with better layout */}
      <section className="bg-white py-24">
        <div className="section-container">
          <h2 className="heading-lg text-center mb-4">{t('collections.title')}</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
            {t('collections.subtitle') || 'Discover our carefully curated collections designed to meet all your seating needs.'}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Single Chairs Collection */}
            <div className="relative group overflow-hidden rounded-2xl shadow-md">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/single_chairs/Chaise de Bureau Ergonomique  Accoudoirs 3D.jpeg"
                  alt="Single Chairs Collection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10 group-hover:from-black/90 transition-all"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-2">{t('products.filter.singleChairs')}</h3>
                <p className="text-white/80 mb-6 line-clamp-2">{t('collections.singleChairs.description')}</p>
                <Link href="/products?collection=single_chairs" className="inline-block bg-white text-black px-6 py-3 rounded-md hover:bg-gray-100 transition-colors font-medium">
                  {t('collections.viewCollection')}
                </Link>
              </div>
            </div>
            
            {/* Chair Packs Collection */}
            <div className="relative group overflow-hidden rounded-2xl shadow-md">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/pack_of_chairs/Noir.jpeg"
                  alt="Chair Packs Collection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10 group-hover:from-black/90 transition-all"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-2">{t('products.filter.chairPacks')}</h3>
                <p className="text-white/80 mb-6 line-clamp-2">{t('collections.chairPacks.description')}</p>
                <Link href="/products?collection=pack_of_chairs" className="inline-block bg-white text-black px-6 py-3 rounded-md hover:bg-gray-100 transition-colors font-medium">
                  {t('collections.viewCollection')}
                </Link>
              </div>
            </div>
            
            {/* Accessories Collection */}
            <div className="relative group overflow-hidden rounded-2xl shadow-md">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/images/accessories/Vérin à gaz chromé pour chaise 180 DH.jpeg"
                  alt="Chair Accessories Collection"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10 group-hover:from-black/90 transition-all"></div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-2xl font-bold text-white mb-2">{t('products.filter.accessories')}</h3>
                <p className="text-white/80 mb-6 line-clamp-2">{t('collections.accessories.description')}</p>
                <Link href="/products?collection=accessories" className="inline-block bg-white text-black px-6 py-3 rounded-md hover:bg-gray-100 transition-colors font-medium">
                  {t('collections.viewCollection')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Benefits Section - Enhanced with icons and better design */}
      <section className="bg-gray-50 py-24">
        <div className="section-container">
          <h2 className="heading-lg text-center mb-4">{t('benefits.title')}</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
            {t('benefits.subtitle') || 'We strive to provide the best experience for our customers.'}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Benefit 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-6 w-16 h-16 flex items-center justify-center bg-black/90 rounded-2xl text-white">
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
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-6 w-16 h-16 flex items-center justify-center bg-black/90 rounded-2xl text-white">
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
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-6 w-16 h-16 flex items-center justify-center bg-black/90 rounded-2xl text-white">
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
      
      {/* Testimonials Section - New */}
      <section className="bg-white py-24">
        <div className="section-container">
          <h2 className="heading-lg text-center mb-4">{t('testimonials.title') || 'What Our Customers Say'}</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-16">
            {t('testimonials.subtitle') || 'Don\'t just take our word for it. Read what our satisfied customers have to say.'}
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Mohammed Ali",
                position: "Office Manager",
                text: "The chair pack we ordered for our office was exactly what we needed. High quality and comfortable for long work days.",
                rating: 5
              },
              {
                name: "Sophia Rayane",
                position: "Interior Designer",
                text: "These chairs are not only functional but also aesthetically pleasing. My clients love how they transform spaces.",
                rating: 5
              },
              {
                name: "Karim Hassan",
                position: "Home Office Worker",
                text: "After working from home became permanent, I invested in an ergonomic chair. Best decision ever for my back health!",
                rating: 4
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-gray-50 p-8 rounded-2xl hover:shadow-md transition-shadow">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      xmlns="http://www.w3.org/2000/svg" 
                      className={`h-5 w-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-8 italic">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-300 rounded-full mr-4 flex items-center justify-center text-white text-xl font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section - New */}
      <section className="bg-black text-white py-20">
        <div className="section-container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('cta.title') || 'Ready to transform your space?'}</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            {t('cta.description') || 'Browse our collection today and find the perfect chair for your needs.'}
          </p>
          <Link 
            href="/products" 
            className="inline-block bg-white text-black px-8 py-3 rounded-md hover:bg-gray-100 transition-colors font-medium"
          >
            {t('cta.button') || 'Shop Now'}
          </Link>
        </div>
      </section>

      <WhatsAppButton />
    </div>
  );
}