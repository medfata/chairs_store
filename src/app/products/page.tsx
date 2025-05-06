"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useLanguage } from '../../context/LanguageContext';
import WhatsAppButton from '../../components/WhatsAppButton';
import { useSearchParams } from 'next/navigation';
import { fetchProducts, Product } from '../../utils/googleSheets';
import { getSafeImageUrl } from '../../utils/imageHandler';

// Define collection types
type CollectionType = "single_chairs" | "pack_of_chairs" | "accessories" | "desks" | "long_seats" | "all";

// Loading component
function LoadingState() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
    </div>
  );
}

// Error component
function ErrorState({ message, onRetry }: { message: string, onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-center p-6">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <h3 className="text-xl font-medium mb-2">Unable to Load Products</h3>
      <p className="text-gray-600 mb-4">{message}</p>
      <button 
        onClick={onRetry}
        className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
      >
        Retry
      </button>
    </div>
  );
}

// Product Image component with error handling
function ProductImage({ product }: { product: Product }) {
  const [imgError, setImgError] = useState(false);
  
  // Use image handler to get a safe URL, forcing fallback if product is flagged
  const imageUrl = imgError || product.requiresFallbackImage
    ? getSafeImageUrl('', product.collection) // Use fallback on error or if flagged
    : getSafeImageUrl(product.image, product.collection);

  return (
    <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
      <Image
        src={imageUrl}
        alt={product.name}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        onError={() => setImgError(true)}
      />
    </div>
  );
}

// Main content component
function ProductsContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const collectionParam = searchParams.get('collection') as CollectionType | null;
  
  const [activeCollection, setActiveCollection] = useState<CollectionType>(collectionParam || "all");
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Set active collection from URL params when they change
  useEffect(() => {
    if (collectionParam && ['single_chairs', 'pack_of_chairs', 'accessories', 'desks', 'long_seats'].includes(collectionParam)) {
      setActiveCollection(collectionParam);
    } else if (collectionParam === null) {
      setActiveCollection('all');
    }
  }, [collectionParam]);

  // Load products from Google Sheets via API route
  const loadProducts = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const productsData = await fetchProducts();
      setProducts(productsData);
    } catch (error) {
      console.error('Error loading products:', error);
      setError('Failed to load products. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Initial load of products
  useEffect(() => {
    loadProducts();
  }, []);

  // Filter products by collection
  const filteredProducts = activeCollection === "all" 
    ? products 
    : products.filter(product => product.collection === activeCollection);

  // Collection display data
  const collections = [
    { id: "all", label: t('products.filter.all') || 'All Products' },
    { id: "single_chairs", label: t('products.filter.singleChairs') || 'Single Chairs' },
    { id: "pack_of_chairs", label: t('products.filter.chairPacks') || 'Chair Packs' },
    { id: "accessories", label: t('products.filter.accessories') || 'Accessories' },
    { id: "desks", label: t('products.filter.desks') || 'Desks' },
    { id: "long_seats", label: t('products.filter.longSeats') || 'Long Seats' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gray-50 py-16">
        <div className="section-container">
          <h1 className="heading-xl text-center mb-6">{t('products.title') || 'Our Products'}</h1>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
            {t('products.description') || 'Discover our premium collection of chairs, chair packs, and accessories.'}
          </p>
        </div>
      </section>

      {/* Collection Filter */}
      <section className="py-8 bg-white">
        <div className="section-container">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {collections.map((collection) => (
              <button
                key={collection.id}
                className={`px-6 py-2 rounded-full border transition-colors ${
                  activeCollection === collection.id
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-700 border-gray-300 hover:border-gray-600"
                }`}
                onClick={() => setActiveCollection(collection.id as CollectionType)}
              >
                {collection.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 bg-white">
        <div className="section-container">
          {isLoading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState message={error} onRetry={loadProducts} />
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-gray-600">
                There are no products available in this collection yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div key={product.id} className="group">
                  <ProductImage product={product} />
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-bold">MAD {product.price.toFixed(2)}</p>
                    <span className="inline-block px-3 py-1 text-xs text-gray-600 bg-gray-100 rounded-full">
                      {collections.find(c => c.id === product.collection)?.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

// Main page component
export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Suspense fallback={<LoadingState />}>
        <ProductsContent />
      </Suspense>
      <WhatsAppButton />
    </main>
  );
} 