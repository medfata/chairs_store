import { google } from 'googleapis';
import { JWT } from 'google-auth-library';
import { NextResponse } from 'next/server';
import { isRestrictedImageUrl } from '../../../utils/imageHandler';

// Product interface
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  collection: "single_chairs" | "pack_of_chairs" | "accessories" | "desks" | "long_seats" | "all";
  requiresFallbackImage?: boolean;
}

// Create a JWT client using environment variables
const getAuthClient = () => {
  if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
    throw new Error(
      'Google Sheets API credentials are missing. Please add GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, and GOOGLE_SHEET_ID to your .env.local file.'
    );
  }

  try {
    const client = new JWT({
      email: process.env.GOOGLE_CLIENT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
    return client;
  } catch (error) {
    console.error('Error creating Google Sheets authentication client:', error);
    throw new Error('Failed to authenticate with Google Sheets API. Check your credentials.');
  }
};

export async function GET() {
  try {
    const client = getAuthClient();
    const sheets = google.sheets({ 
      version: 'v4', 
      auth: client as any // Using type assertion to fix TypeScript error
    });
    
    // First, attempt to get the spreadsheet metadata to check if it exists
    const spreadsheet = await sheets.spreadsheets.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
    });
    
    // Check if spreadsheet exists
    if (!spreadsheet.data.sheets || spreadsheet.data.sheets.length === 0) {
      return NextResponse.json(
        { error: 'No sheets found in the spreadsheet' },
        { status: 404 }
      );
    }
    
    // Find the "Products" sheet or use the first sheet as fallback
    let sheetName = "Products";
    const productsSheet = spreadsheet.data.sheets.find(
      sheet => sheet.properties?.title === "Products"
    );
    
    if (!productsSheet && spreadsheet.data.sheets[0].properties?.title) {
      // If "Products" sheet doesn't exist, use the first sheet
      sheetName = spreadsheet.data.sheets[0].properties.title;
      console.log(`"Products" sheet not found. Using first sheet: "${sheetName}"`);
    }
    
    // Get the data from the sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `${sheetName}!A2:D`, // Get first 4 columns, starting from row 2
    });
    
    const rows = response.data.values || [];
    
    if (rows.length === 0) {
      console.warn('No products found in the Google Sheet. The sheet may be empty or formatted incorrectly.');
      return NextResponse.json({ products: [] });
    }
    
    // Map rows to Product objects
    const products: Product[] = rows.map((row, index) => {
      // Ensure all required fields are present
      if (row.length < 3) {
        console.warn(`Row ${index + 2} has incomplete data. Skipping.`);
        return null;
      }
      
      const [name, priceStr, collection, imageUrl] = row;
      const price = parseFloat(priceStr);
      
      // Flag to indicate if image URL is from WhatsApp
      const hasWhatsAppImageUrl = imageUrl && typeof imageUrl === 'string' && isRestrictedImageUrl(imageUrl);
      
      // Validate the collection type
      const validCollections = ['single_chairs', 'pack_of_chairs', 'accessories', 'desks', 'long_seats'];
      const validatedCollection = validCollections.includes(collection) 
        ? collection as "single_chairs" | "pack_of_chairs" | "accessories" | "desks" | "long_seats"
        : 'all';
        
      return {
        id: `product_${index}`,
        name: name || 'Unnamed Product',
        price: isNaN(price) ? 0 : price,
        image: imageUrl || '',
        collection: validatedCollection,
        requiresFallbackImage: hasWhatsAppImageUrl // Flag for client-side to know this needs special handling
      };
    }).filter(Boolean) as Product[];
    
    return NextResponse.json({ products });
  } catch (error: any) {
    console.error('Error fetching products from Google Sheets:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to fetch products from Google Sheets';
    
    if (error.status === 404) {
      errorMessage = 'Google Sheet not found. Please check your GOOGLE_SHEET_ID.';
    } else if (error.status === 403) {
      errorMessage = 'Access denied to Google Sheet. Make sure you\'ve shared it with your service account email.';
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: error.status || 500 }
    );
  }
}