# Chair Store Website with Google Sheets Integration

This application displays products from a Google Spreadsheet, allowing for easy content management without directly editing the code.

## Architecture

This application uses a server-side API approach to fetch data from Google Sheets:

1. A server-side API route (`/api/products`) fetches data from Google Sheets
2. The client-side components fetch from this API route
3. This approach avoids issues with Node.js built-in modules that aren't available in the browser

## Setup Google Sheets Integration

1. Create a new Google Spreadsheet
2. Format your spreadsheet with the following columns:
   - Column A: Name (text)
   - Column B: Price (number)
   - Column C: Collection (text - must be one of: 'single_chairs', 'pack_of_chairs', 'accessories', 'desks', 'long_seats')
   - Column D: Image URL (text - full URL to the image)
   - Make sure the first row contains headers

3. Create a Google Cloud Project:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable the Google Sheets API

4. Create a Service Account:
   - Go to "IAM & Admin" > "Service Accounts"
   - Create a new service account
   - Give it a name and description
   - Grant the role "Viewer" for Google Sheets
   - Create a new key (JSON format)
   - Download the key file (keep it secure!)

5. Share your spreadsheet:
   - Open your Google Spreadsheet
   - Click the "Share" button
   - Add the service account email (from the key file) with "Viewer" access

6. Set up environment variables using one of these methods:

   ### Method 1: Use the setup script (recommended)
   ```bash
   node scripts/setup-env.js path/to/service-account.json your-sheet-id
   ```
   This script will:
   - Read your service account key file
   - Extract the necessary credentials
   - Create a properly formatted .env.local file
   
   ### Method 2: Manual setup
   Create a `.env.local` file in the root of your project and add the following variables:
   
   ```
   GOOGLE_CLIENT_EMAIL=your-service-account-email@your-project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
   GOOGLE_SHEET_ID=your-google-sheet-id
   ```
   
   - The GOOGLE_CLIENT_EMAIL is the email address of your service account
   - The GOOGLE_PRIVATE_KEY is the private key from your JSON key file (be sure to include the newlines with \n)
   - The GOOGLE_SHEET_ID is the part of your spreadsheet URL between /d/ and /edit
   
   For example, if your spreadsheet URL is:
   ```
   https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0jklmnopqrst/edit#gid=0
   ```
   Your GOOGLE_SHEET_ID would be: `1a2b3c4d5e6f7g8h9i0jklmnopqrst`

## Working with Images

### Image URLs in Google Sheets
When adding image URLs to your Google Sheet, use one of these options:
1. **Public image URLs** - Use URLs that are publicly accessible from any browser
2. **Local image paths** - For images in your project's `/public` folder, use paths like `/images/collection/image.jpg`

### WhatsApp Images (CORS Handling)
The application includes a system to handle WhatsApp blob URLs (like `blob:https://web.whatsapp.com/...`):

1. **Automatic Fallbacks**: When a WhatsApp blob URL is detected, the system automatically shows a fallback image based on the product's collection
2. **Collection-based Images**: Different fallback images are used for different product collections:
   - `single_chairs` - Uses a chair image
   - `pack_of_chairs` - Uses a chair pack image
   - `accessories` - Uses an accessories image
   - `desks` - Uses a desk image
   - `long_seats` - Uses a sofa/armchair image
   - Other categories - Uses a generic placeholder

### For Best Results
Instead of using WhatsApp blob URLs, we recommend:
1. Save the images from WhatsApp to your device
2. Upload them to a public image hosting service (e.g., Imgur, Cloudinary)
3. Use the resulting public URLs in your Google Sheet

## Testing Your Google Sheets Connection

To test your Google Sheets connection before running the full application:

1. Install the dotenv package:
   ```bash
   npm install dotenv
   ```

2. Run the test script:
   ```bash
   node scripts/test-sheets-connection.js
   ```

This script will:
- Check your environment variables
- Connect to your Google Spreadsheet
- List the sheets in your spreadsheet
- Try to read data from the first few rows
- Verify if the data matches the expected format

## Data Flow

1. The server-side API route (`/api/products`) uses Google API client libraries to fetch product data
2. The client components fetch data from this API route
3. This architecture separates the Google API interactions to the server side only

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Troubleshooting

If you encounter issues:

1. Check your `.env.local` file contains the correct credentials
2. Make sure your spreadsheet is shared with the service account email
3. Verify your spreadsheet has the correct format (headers and data)
4. Check the server logs for specific error messages
5. The application will automatically use the first sheet in your spreadsheet if one named "Products" doesn't exist
6. For image loading issues, check the "Working with Images" section above

## Features

- Fetch products from Google Sheets via server-side API route
- Display products by collection (chairs, chair packs, accessories, desks, sofas & armchairs)
- Filter products by category
- Responsive design
- Error handling with useful feedback to users
- Smart image fallback system for CORS-restricted sources like WhatsApp
