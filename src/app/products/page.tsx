"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useLanguage } from '../../context/LanguageContext';
import WhatsAppButton from '../../components/WhatsAppButton';
import { useSearchParams } from 'next/navigation';

// Define collection types
type CollectionType = "single_chairs" | "pack_of_chairs" | "accessories" | "all";

// Product interface
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  collection: CollectionType;
}

// Loading component
function LoadingState() {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
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

  // Set active collection from URL params when they change
  useEffect(() => {
    if (collectionParam && ['single_chairs', 'pack_of_chairs', 'accessories'].includes(collectionParam)) {
      setActiveCollection(collectionParam);
    } else if (collectionParam === null) {
      setActiveCollection('all');
    }
  }, [collectionParam]);

  // Load products from image filenames
  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      
      // Single chairs
      const singleChairs: Product[] = [
        {
          id: "single_chair_1",
          name: "Chaise de Bureau",
          price: 1500.00,
          image: "/images/single_chairs/single_chair_1.jpeg",
          collection: "single_chairs"
        },
        {
          id: "chaise_de_bureau_flex",
          name: "Chaise De Bureau Flex",
          price: 1800.00,
          image: "/images/single_chairs/Chaise  De Bureau Flex.jpeg",
          collection: "single_chairs"
        },
        {
          id: "chaise_ergonomique_accoudoirs_3d",
          name: "Chaise de Bureau Ergonomique Accoudoirs 3D",
          price: 2200.00,
          image: "/images/single_chairs/Chaise de Bureau Ergonomique  Accoudoirs 3D.jpeg",
          collection: "single_chairs"
        }
      ];
      
      // Chair packs
      const chairPacks: Product[] = [
        {
          id: "noir_2",
          name: "Noir 2",
          price: 4500.00,
          image: "/images/pack_of_chairs/Noir-2.jpeg",
          collection: "pack_of_chairs"
        },
        {
          id: "marron_tabac",
          name: "Marron Tabac",
          price: 4500.00,
          image: "/images/pack_of_chairs/Marron Tabac.jpeg",
          collection: "pack_of_chairs"
        },
        {
          id: "marron_foncee",
          name: "Marron Foncée",
          price: 4500.00,
          image: "/images/pack_of_chairs/Marron foncée.jpeg",
          collection: "pack_of_chairs"
        },
        {
          id: "beige",
          name: "Beige",
          price: 4500.00,
          image: "/images/pack_of_chairs/Beige.jpeg",
          collection: "pack_of_chairs"
        },
        {
          id: "blanc",
          name: "Blanc",
          price: 4500.00,
          image: "/images/pack_of_chairs/Blanc.jpeg",
          collection: "pack_of_chairs"
        },
        {
          id: "noir",
          name: "Noir",
          price: 4500.00,
          image: "/images/pack_of_chairs/Noir.jpeg",
          collection: "pack_of_chairs"
        }
      ];
      
      // Accessories
      const accessories: Product[] = [
        {
          id: "mecanisme_double",
          name: "Mécanisme double pour chaise",
          price: 290.00,
          image: "/images/accessories/Mécanisme double pour chaise 290 DH.jpeg",
          collection: "accessories"
        },
        {
          id: "verin_a_gaz",
          name: "Vérin à gaz pour chaise",
          price: 150.00,
          image: "/images/accessories/Vérin à gaz pour chaise 150 DH.jpeg",
          collection: "accessories"
        },
        {
          id: "verin_a_gaz_chrome",
          name: "Vérin à gaz chromé pour chaise",
          price: 180.00,
          image: "/images/accessories/Vérin à gaz chromé pour chaise 180 DH.jpeg",
          collection: "accessories"
        },
        {
          id: "pack_roulettes",
          name: "Pack de roulettes de chaises",
          price: 100.00,
          image: "/images/accessories/Pack de roulettes de chaises 100 DH.jpeg",
          collection: "accessories"
        },
        {
          id: "mecanisme_simple",
          name: "Mécanisme de chaise simple",
          price: 200.00,
          image: "/images/accessories/Mécanisme de chaise simple 200 DH.jpeg",
          collection: "accessories"
        },
        {
          id: "branche_plastique",
          name: "Branche de chaises en plastique",
          price: 170.00,
          image: "/images/accessories/Branche de chaises en plastique 170 DH.jpeg",
          collection: "accessories"
        },
        {
          id: "branche_chromee",
          name: "Branche de chaises chromée",
          price: 290.00,
          image: "/images/accessories/Branche de chaises chromée 290 DH.jpeg",
          collection: "accessories"
        }
      ];
      
      // Combine all products
      setProducts([...singleChairs, ...chairPacks, ...accessories]);
      setIsLoading(false);
    };
    
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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div key={product.id} className="group">
                  <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
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