// Collection of fallback images based on product type
export const FALLBACK_IMAGES: Record<string, string> = {
  single_chairs: "/images/single_chairs/single_chair_1.jpeg",
  pack_of_chairs: "/images/pack_of_chairs/Noir.jpeg",
  accessories: "/images/accessories/Vérin à gaz pour chaise 150 DH.jpeg",
  desks: "/images/single_chairs/Chaise de Bureau Ergonomique  Accoudoirs 3D.jpeg", // Using chair image as fallback until we have desk images
  long_seats: "/images/pack_of_chairs/Noir.jpeg", // Using chair pack image as fallback until we have long_seats images
  all: "/images/placeholder-product.png", // Fallback for "all" collection
  default: "/images/placeholder-product.png" // Default fallback
};

// Data URL for placeholder image if local files aren't available
export const PLACEHOLDER_DATA_URL = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23f0f0f0'/%3E%3Cpath d='M150 110 L190 180 L110 180 Z' fill='%23ccc'/%3E%3Ccircle cx='150' cy='75' r='20' fill='%23ccc'/%3E%3Ctext x='150' y='220' font-family='Arial' font-size='14' text-anchor='middle'%3EImage Unavailable%3C/text%3E%3C/svg%3E";

/**
 * Checks if an image URL is likely to cause CORS issues
 */
export const isRestrictedImageUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  
  // Check for WhatsApp blob URLs
  if (url.startsWith('blob:https://web.whatsapp.com/')) {
    return true;
  }
  
  // Check for other WhatsApp URL patterns that might be problematic
  if (url.includes('web.whatsapp.com') || url.includes('whatsapp-cdn')) {
    return true;
  }
  
  // Check for other blob URLs
  if (url.startsWith('blob:')) {
    return true;
  }
  
  // Check for data URLs (they generally work but can be problematic)
  if (url.startsWith('data:')) {
    return true;
  }
  
  // Add other potential CORS-restricted sources here if needed
  
  return false;
};

/**
 * Gets a safe image URL, either the original or a fallback
 */
export const getSafeImageUrl = (
  url: string, 
  collection: "single_chairs" | "pack_of_chairs" | "accessories" | "desks" | "long_seats" | "all" = "all"
): string => {
  // Handle empty URLs
  if (!url || url.trim() === '') {
    return getFallbackImage(collection);
  }

  // Check for local image paths
  if (url.startsWith('/')) {
    return url; // Local images are safe to use
  }
  
  // Check for WhatsApp blob URLs or other restricted sources
  if (isRestrictedImageUrl(url)) {
    return getFallbackImage(collection);
  }
  
  // Otherwise, return the original URL
  return url;
};

/**
 * Gets a fallback image based on product collection
 */
export const getFallbackImage = (
  collection: "single_chairs" | "pack_of_chairs" | "accessories" | "desks" | "long_seats" | "all"
): string => {
  // Use the collection-specific fallback image or the default
  try {
    // If the file exists, use it
    return FALLBACK_IMAGES[collection] || FALLBACK_IMAGES.default;
  } catch (error) {
    // If any error occurs (like file not found), use the data URL
    console.error('Error getting fallback image:', error);
    return PLACEHOLDER_DATA_URL;
  }
}; 